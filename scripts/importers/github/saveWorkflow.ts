
import { db } from '@/db';
import { workflows, sources, tags, workflowTags, nodes, workflowNodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ParsedWorkflow } from './parseWorkflow';
import { slugify } from '@/utils/slug';
import { computeWorkflowHash } from './dedupe';

export async function saveWorkflow(
    workflow: ParsedWorkflow,
    repo: { owner: string; name: string; url: string },
    repoLicense: string,
    authorId: string = 'system_importer'
) {
    const hash = computeWorkflowHash(workflow.json);

    // 1. Check Dedupe
    const existing = await db.query.workflows.findFirst({
        where: eq(workflows.hash, hash)
    });

    if (existing) {
        console.log(`[Dedupe] Skipping ${workflow.title} (Hash match)`);
        return false;
    }

    // 2. Insert Workflow
    const workflowId = Math.random().toString(36).substring(2, 15);

    await db.insert(workflows).values({
        id: workflowId,
        title: workflow.title,
        description: workflow.description,
        slug: workflow.slug,
        json: workflow.json, // Stored as string
        hash: hash,
        sourceType: 'github',
        sourceUrl: `${repo.url}/blob/main/workflows/${workflow.title}`, // Approximation
        license: repoLicense || 'unknown',
        authorId: authorId,
        isVerified: false
    });

    // 3. Process Tags
    for (const tagName of workflow.tags) {
        const slug = slugify(tagName);
        // Ensure tag exists
        let tagId = slug; // use slug as ID for simplicity or uuid? Schema says text. 
        // Let's check if tag exists
        const existingTag = await db.query.tags.findFirst({
            where: eq(tags.slug, slug)
        });

        if (!existingTag) {
            try {
                await db.insert(tags).values({
                    id: slug,
                    name: tagName,
                    slug
                }).onConflictDoNothing();
            } catch (e) { }
        }

        // Link Tag
        try {
            await db.insert(workflowTags).values({
                workflowId,
                tagId: slug
            }).onConflictDoNothing();
        } catch (e) { }
    }

    // 4. Process Nodes
    for (const nodeName of workflow.nodes) {
        const nodeId = slugify(nodeName);
        // Ensure node exists
        const existingNode = await db.query.nodes.findFirst({
            where: eq(nodes.id, nodeId)
        });

        if (!existingNode) {
            try {
                await db.insert(nodes).values({
                    id: nodeId,
                    name: nodeName
                }).onConflictDoNothing();
            } catch (e) { }
        }

        // Link Node
        try {
            await db.insert(workflowNodes).values({
                workflowId,
                nodeId: nodeId
            }).onConflictDoNothing();
        } catch (e) { }
    }

    return true;
}
