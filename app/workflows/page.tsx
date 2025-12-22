import { WorkflowsContent } from './WorkflowsContent';
import { Metadata } from 'next';
import { db } from '@/db';
import { Workflow } from '@/data/mock';
import { Difficulty, Source } from '@/constants/enums';

export const metadata: Metadata = {
    title: "Workflow Library | Flowhub",
    description: "Browse through hundreds of production-ready n8n automations. Filter by difficulty, tool, and industry.",
    openGraph: {
        title: "Workflow Library | Flowhub",
        description: "Browse through production-ready n8n automations.",
    },
};

export default async function WorkflowsPage() {
    // 1. Fetch workflows from database with relations
    // We order by createdAt descending to show newest first
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

    // 2. Map DB results to the Workflow interface expected by the UI components
    // CRITICAL: We explicitly set 'json' to an empty string here to keep the RSC payload small.
    // The full JSON is only needed on the individual workflow detail page.
    const mappedWorkflows: Workflow[] = workflowsData.map(w => {
        try {
            return {
                id: w.id,
                title: w.title,
                description: w.description || '',
                slug: w.slug,
                json: '', // Excluded for performance in list view
                // Map DB difficulty to expected enum or default to Beginner
                difficulty: (w.difficulty as Difficulty) || Difficulty.Beginner,
                // Map sourceType to source as expected by the Mock interface
                source: (w.sourceType as Source) || Source.Community,
                authorId: w.authorId || '',
                createdAt: w.createdAt || new Date().toISOString(),
                updatedAt: w.updatedAt || new Date().toISOString(),
                // Extract tag names and filter out any potential nulls
                tags: (w.tags || [])
                    .map(t => t.tag?.name)
                    .filter((name): name is string => !!name),
                // Extract node names and filter out any potential nulls
                nodes: (w.nodes || [])
                    .map(n => n.node?.name)
                    .filter((name): name is string => !!name),
                license: w.license || 'MIT',
            };
        } catch (error) {
            console.error(`Failed to map workflow with ID ${w.id}:`, error);
            return null;
        }
    }).filter((w): w is Workflow => w !== null);

    // 3. Render the client component with the optimized data list
    return (
        <WorkflowsContent workflows={mappedWorkflows} />
    );
}
