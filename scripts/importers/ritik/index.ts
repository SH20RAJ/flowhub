
import { db } from '@/db';
import { workflows, tags, workflowTags, nodes, workflowNodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { slugify } from '@/utils/slug';
import { computeWorkflowHash } from '../github/dedupe';

const META_URL = 'https://n8n-templates.ritiktechs.com/template-meta.json';
const BASE_URL = 'https://n8n-templates.ritiktechs.com/';

interface RitikWorkflow {
    id: number;
    slug: string;
    name: string;
    fileName: string;
    categoryGroup: string;
    description?: string; // Sometimes missing
    tags: string[];
    complexity: string;
    nodeCount: number;
    preview: string;
    relativePath: string;
    jsonUrl?: string; // We construct this
}

async function fetchMetadata(): Promise<RitikWorkflow[]> {
    console.log(`🔍 Fetching metadata from ${META_URL}...`);
    const res = await fetch(META_URL);
    if (!res.ok) throw new Error(`Failed to fetch metadata: ${res.statusText}`);
    return await res.json();
}

async function fetchWorkflowJson(url: string): Promise<string | null> {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.text();
    } catch (e) {
        return null;
    }
}

async function main() {
    console.log('🚀 Starting RitikTechs Importer...');

    const workflowsList = await fetchMetadata();
    console.log(`📦 Found ${workflowsList.length} workflows to process.`);

    let validCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const w of workflowsList) {
        // Construct JSON URL
        // e.g. https://n8n-templates.ritiktechs.com/templates/cool-workflow.json
        const jsonUrl = `${BASE_URL}${w.relativePath}`;

        console.log(`Processing: ${w.name}`);

        try {
            // 1. Fetch JSON Content
            const jsonContent = await fetchWorkflowJson(jsonUrl);
            if (!jsonContent) {
                console.warn(`   ⚠️ Not Found (JSON): ${jsonUrl}`);
                errorCount++;
                continue;
            }

            // 2. Compute Hash & Dedupe
            const hash = computeWorkflowHash(jsonContent);
            const existing = await db.query.workflows.findFirst({
                where: eq(workflows.hash, hash)
            });

            if (existing) {
                console.log(`   ⏭️ Skipped (Duplicate)`);
                skippedCount++;
                continue;
            }

            // 3. Prepare Data
            const workflowId = Math.random().toString(36).substring(2, 15);
            // Ensure unique slug
            const slug = slugify(w.name) + '-' + Math.random().toString(36).substring(2, 6);

            // 4. Insert Workflow
            await db.insert(workflows).values({
                id: workflowId,
                title: w.name,
                description: w.preview || `Imported workflow: ${w.name}`, // Fallback description
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
            });

            // 5. Process Tags
            // Merge 'tags' array and 'categoryGroup'
            const allTags = new Set([...w.tags, w.categoryGroup]);
            for (const tagName of allTags) {
                if (!tagName) continue;
                const tagSlug = slugify(tagName);

                // Ensure Tag Exists
                const existingTag = await db.query.tags.findFirst({ where: eq(tags.slug, tagSlug) });
                if (!existingTag) {
                    try {
                        await db.insert(tags).values({ id: tagSlug, name: tagName, slug: tagSlug }).onConflictDoNothing();
                    } catch (e) { }
                }

                // Link Tag
                try {
                    await db.insert(workflowTags).values({ workflowId, tagId: tagSlug }).onConflictDoNothing();
                } catch (e) { }
            }

            // 6. Process Nodes (Parse JSON for nodes)
            // Ritik metadata has nodeCount but not node names. We parse the JSON for this.
            try {
                const workflowData = JSON.parse(jsonContent);
                const nodesList = workflowData.nodes || [];
                const distinctNodes = new Set(nodesList.map((n: any) => n.type.replace('n8n-nodes-base.', '')));

                for (const nodeName of distinctNodes as Set<string>) {
                    const nodeId = slugify(nodeName);
                    // Ensure Node Exists
                    const existingNode = await db.query.nodes.findFirst({ where: eq(nodes.id, nodeId) });
                    if (!existingNode) {
                        try {
                            await db.insert(nodes).values({ id: nodeId, name: nodeName }).onConflictDoNothing();
                        } catch (e) { }
                    }

                    // Link Node
                    try {
                        await db.insert(workflowNodes).values({ workflowId, nodeId }).onConflictDoNothing();
                    } catch (e) { }
                }

            } catch (e) {
                console.warn(`   ⚠️ Failed to parse nodes for ${w.name}`);
            }

            console.log(`   ✅ Imported`);
            validCount++;

        } catch (e) {
            console.error(`   ❌ Error:`, e);
            errorCount++;
        }
    }

    console.log('\n✨ Import Complete!');
    console.log(`📊 Imported: ${validCount} | Skipped: ${skippedCount} | Errors: ${errorCount}`);
}

main().catch(console.error);
