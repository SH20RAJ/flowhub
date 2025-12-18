import { WorkflowsContent } from './WorkflowsContent';
import { Metadata } from 'next';
import { db } from '@/db';
import { Workflow } from '@/data/mock';

export const metadata: Metadata = {
    title: "Workflow Library",
    description: "Browse through hundreds of production-ready n8n automations. Filter by difficulty, tool, and industry.",
    openGraph: {
        title: "Workflow Library | Flowhub",
        description: "Browse through production-ready n8n automations.",
    },
};

export default async function WorkflowsPage() {
    const workflowsData = await db.query.workflows.findMany({
        orderBy: (workflows, { desc }) => [desc(workflows.createdAt)],
        with: {
            author: true,
            tags: {
                with: {
                    tag: true
                }
            },
            nodes: {
                with: {
                    node: true
                }
            }
        }
    });

    // Map DB result to Mock interfaces
    const workflows: Workflow[] = workflowsData.map(w => ({
        id: w.id,
        title: w.title,
        description: w.description || '',
        slug: w.slug,
        json: w.json,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        difficulty: (w.difficulty as any) || 'Beginner',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        source: (w.sourceType as any) || 'community',
        authorId: w.authorId || '',
        createdAt: w.createdAt || new Date().toISOString(),
        updatedAt: w.updatedAt || new Date().toISOString(),
        downloads: 0,
        views: 0,
        tags: w.tags.map(t => t.tag.name),
        nodes: w.nodes.map(n => n.node.name),
        license: w.license || 'MIT',
    }));

    return (
        <WorkflowsContent workflows={workflows} />
    );
}
