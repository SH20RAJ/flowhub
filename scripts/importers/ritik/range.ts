/**
 * Range-based parallel importer with resume support.
 * Usage: bun scripts/importers/ritik/range.ts --start=0 --end=625
 * 
 * Logs to:
 * - .ritik-success.txt (successful workflow IDs)
 * - .ritik-error.txt (failed workflow IDs)
 * - .ritik-skipped.txt (skipped/duplicate workflow IDs)
 */

import { db } from '@/db';
import { workflows, tags, workflowTags, nodes, workflowNodes } from '@/db/schema';
import { slugify } from '@/utils/slug';
import { computeWorkflowHash } from '../github/dedupe';
import pLimit from 'p-limit';
import { readFileSync, appendFileSync, existsSync } from 'fs';

const LOCAL_META_FILE = './2000.json';
const BASE_URL = 'https://n8n-templates.ritiktechs.com/';
const CONCURRENCY = 100; // Per-range concurrency

const SUCCESS_LOG = './.ritik-success.txt';
const ERROR_LOG = './.ritik-error.txt';
const SKIPPED_LOG = './.ritik-skipped.txt';

interface RitikWorkflow {
    id: number;
    slug: string;
    name: string;
    fileName: string;
    categoryGroup: string;
    tags: string[];
    complexity: string;
    nodeCount: number;
    preview: string;
    relativePath: string;
}

function logSuccess(id: number) {
    appendFileSync(SUCCESS_LOG, `${id}\n`);
}

function logError(id: number) {
    appendFileSync(ERROR_LOG, `${id}\n`);
}

function logSkipped(id: number) {
    appendFileSync(SKIPPED_LOG, `${id}\n`);
}

function getProcessedIds(): Set<number> {
    const ids = new Set<number>();
    for (const file of [SUCCESS_LOG, ERROR_LOG, SKIPPED_LOG]) {
        if (existsSync(file)) {
            const content = readFileSync(file, 'utf-8');
            content.split('\n').filter(Boolean).forEach(line => ids.add(parseInt(line, 10)));
        }
    }
    return ids;
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

async function processWorkflow(w: RitikWorkflow, existingHashes: Set<string>): Promise<'success' | 'skipped' | 'error'> {
    const jsonUrl = `${BASE_URL}${w.relativePath}`;

    try {
        const jsonContent = await fetchWorkflowJson(jsonUrl);
        if (!jsonContent) {
            logError(w.id);
            return 'error';
        }

        const hash = computeWorkflowHash(jsonContent);
        if (existingHashes.has(hash)) {
            logSkipped(w.id);
            return 'skipped';
        }

        const workflowId = Math.random().toString(36).substring(2, 15);
        const slug = slugify(w.name) + '-' + Math.random().toString(36).substring(2, 6);

        await db.insert(workflows).values({
            id: workflowId,
            title: w.name,
            description: w.preview || `Imported: ${w.name}`,
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

        logSuccess(w.id);
        return 'success';
    } catch {
        logError(w.id);
        return 'error';
    }
}

async function main() {
    // Parse args
    const args = process.argv.slice(2);
    let start = 0;
    let end = 625;

    for (const arg of args) {
        if (arg.startsWith('--start=')) start = parseInt(arg.split('=')[1], 10);
        if (arg.startsWith('--end=')) end = parseInt(arg.split('=')[1], 10);
    }

    console.log(`🚀 Range Importer [${start} - ${end}]`);
    console.log(`⚡ Concurrency: ${CONCURRENCY}`);

    // Read metadata
    const rawData = readFileSync(LOCAL_META_FILE, 'utf-8');
    const allWorkflows: RitikWorkflow[] = JSON.parse(rawData);

    // Slice to range
    const workflowsList = allWorkflows.slice(start, end);
    console.log(`📦 Processing ${workflowsList.length} workflows (indices ${start}-${end})`);

    // Get already processed IDs
    const processedIds = getProcessedIds();
    const toProcess = workflowsList.filter(w => !processedIds.has(w.id));
    console.log(`⏭️ Skipping ${workflowsList.length - toProcess.length} already processed`);
    console.log(`📝 Remaining: ${toProcess.length}`);

    if (toProcess.length === 0) {
        console.log('✨ Nothing to do!');
        return;
    }

    // Fetch existing hashes
    console.log('🔍 Fetching existing hashes...');
    const existingWorkflows = await db.query.workflows.findMany({
        columns: { hash: true }
    });
    const existingHashes = new Set(existingWorkflows.map(w => w.hash).filter(Boolean) as string[]);
    console.log(`📊 ${existingHashes.size} existing in DB`);

    const limit = pLimit(CONCURRENCY);
    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let processed = 0;

    const startTime = Date.now();

    const tasks = toProcess.map(w =>
        limit(async () => {
            const result = await processWorkflow(w, existingHashes);
            processed++;

            if (result === 'success') successCount++;
            if (result === 'skipped') skippedCount++;
            if (result === 'error') errorCount++;

            if (processed % 50 === 0) {
                console.log(`📊 [${start}-${end}] ${processed}/${toProcess.length} | ✅ ${successCount} | ⏭️ ${skippedCount} | ❌ ${errorCount}`);
            }
        })
    );

    await Promise.all(tasks);

    const elapsed = (Date.now() - startTime) / 1000;
    console.log(`\n✨ Range [${start}-${end}] Complete!`);
    console.log(`⏱️ Time: ${elapsed.toFixed(1)}s`);
    console.log(`📊 Final: ✅ ${successCount} | ⏭️ ${skippedCount} | ❌ ${errorCount}`);
}

main().catch(console.error);
