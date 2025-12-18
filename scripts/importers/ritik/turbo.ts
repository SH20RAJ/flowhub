/**
 * Ultra-fast parallel importer using local JSON file.
 * Runs with 1000 concurrent requests for maximum speed.
 */

import { db } from '@/db';
import { workflows, tags, workflowTags, nodes, workflowNodes } from '@/db/schema';
import { slugify } from '@/utils/slug';
import { computeWorkflowHash } from '../github/dedupe';
import pLimit from 'p-limit';
import { readFileSync } from 'fs';

const LOCAL_META_FILE = './2000.json';
const BASE_URL = 'https://n8n-templates.ritiktechs.com/';
const CONCURRENCY = 1000; // Maximum parallel requests

interface RitikWorkflow {
    id: number;
    slug: string;
    name: string;
    fileName: string;
    categoryGroup: string;
    description?: string;
    tags: string[];
    complexity: string;
    nodeCount: number;
    preview: string;
    relativePath: string;
}

async function fetchWorkflowJson(url: string): Promise<string | null> {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.text();
    } catch {
        return null;
    }
}

async function processWorkflow(w: RitikWorkflow, existingHashes: Set<string>): Promise<{ success: boolean; skipped: boolean; error: boolean }> {
    const jsonUrl = `${BASE_URL}${w.relativePath}`;

    try {
        const jsonContent = await fetchWorkflowJson(jsonUrl);
        if (!jsonContent) {
            return { success: false, skipped: false, error: true };
        }

        const hash = computeWorkflowHash(jsonContent);
        if (existingHashes.has(hash)) {
            return { success: false, skipped: true, error: false };
        }

        const workflowId = Math.random().toString(36).substring(2, 15);
        const slug = slugify(w.name) + '-' + Math.random().toString(36).substring(2, 6);

        // Insert workflow
        await db.insert(workflows).values({
            id: workflowId,
            title: w.name,
            description: w.preview || `Imported workflow: ${w.name}`,
            slug,
            json: jsonContent,
            jsonUrl,
            hash,
            difficulty: w.complexity || 'Intermediate',
            nodeCount: w.nodeCount,
            preview: w.preview,
            sourceType: 'ritik',
            sourceUrl: jsonUrl,
            license: 'unknown',
            authorId: 'system_importer',
            isVerified: false
        }).onConflictDoNothing();

        // Tags
        const allTags = new Set([...w.tags, w.categoryGroup].filter(Boolean));
        for (const tagName of allTags) {
            const tagSlug = slugify(tagName);
            try {
                await db.insert(tags).values({ id: tagSlug, name: tagName, slug: tagSlug }).onConflictDoNothing();
                await db.insert(workflowTags).values({ workflowId, tagId: tagSlug }).onConflictDoNothing();
            } catch { }
        }

        // Nodes
        try {
            const workflowData = JSON.parse(jsonContent);
            const nodesList = workflowData.nodes || [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const distinctNodes = new Set(nodesList.map((n: any) => n.type?.replace('n8n-nodes-base.', '') || 'unknown'));

            for (const nodeName of distinctNodes as Set<string>) {
                const nodeId = slugify(nodeName);
                try {
                    await db.insert(nodes).values({ id: nodeId, name: nodeName }).onConflictDoNothing();
                    await db.insert(workflowNodes).values({ workflowId, nodeId }).onConflictDoNothing();
                } catch { }
            }
        } catch { }

        return { success: true, skipped: false, error: false };
    } catch {
        return { success: false, skipped: false, error: true };
    }
}

async function main() {
    console.log('🚀 Starting TURBO RitikTechs Importer...');
    console.log(`⚡ Concurrency: ${CONCURRENCY} parallel requests`);
    console.log(`📂 Reading local metadata from: ${LOCAL_META_FILE}`);

    // Read from local file
    const rawData = readFileSync(LOCAL_META_FILE, 'utf-8');
    const workflowsList: RitikWorkflow[] = JSON.parse(rawData);
    console.log(`📦 Found ${workflowsList.length} workflows to process.`);

    // Pre-fetch existing hashes for deduplication
    console.log('🔍 Fetching existing workflow hashes...');
    const existingWorkflows = await db.query.workflows.findMany({
        columns: { hash: true }
    });
    const existingHashes = new Set(existingWorkflows.map(w => w.hash).filter(Boolean) as string[]);
    console.log(`📊 ${existingHashes.size} existing workflows in database.`);

    const limit = pLimit(CONCURRENCY);
    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let processed = 0;

    const tasks = workflowsList.map(w =>
        limit(async () => {
            const result = await processWorkflow(w, existingHashes);
            processed++;

            if (result.success) successCount++;
            if (result.skipped) skippedCount++;
            if (result.error) errorCount++;

            if (processed % 500 === 0) {
                console.log(`📊 Progress: ${processed}/${workflowsList.length} | ✅ ${successCount} | ⏭️ ${skippedCount} | ❌ ${errorCount}`);
            }
        })
    );

    const startTime = Date.now();
    await Promise.all(tasks);
    const elapsed = (Date.now() - startTime) / 1000;

    console.log('\n✨ Import Complete!');
    console.log(`⏱️ Time: ${elapsed.toFixed(1)}s`);
    console.log(`📊 Final: Imported: ${successCount} | Skipped: ${skippedCount} | Errors: ${errorCount}`);
}

main().catch(console.error);
