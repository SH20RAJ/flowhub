import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { NodeDetailContent } from './NodeDetailContent';
import { db } from '@/db';
import { nodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Workflow } from '@/data/mock';

interface Props {
    params: Promise<{ node: string }>;
}

async function getNodeWithWorkflows(nodeId: string) {
    return await db.query.nodes.findFirst({
        where: eq(nodes.id, nodeId),
        with: {
            workflowNodes: {
                with: {
                    workflow: {
                        with: {
                            author: true,
                            tags: { with: { tag: true } },
                            nodes: { with: { node: true } }
                        }
                    }
                }
            }
        }
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { node: nodeId } = await params;
    const nodeData = await getNodeWithWorkflows(nodeId);

    const nodeName = nodeData?.name || nodeId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    return {
        title: `${nodeName} Node Workflows`,
        description: `Discover n8n workflows that use the ${nodeName} node for automation.`,
    };
}

export default async function Page({ params }: Props) {
    const { node: nodeId } = await params;

    const nodeData = await getNodeWithWorkflows(nodeId);

    // If node not found in DB, checks if there are any workflows?
    // In DB approach, if node not found, likely no workflows either (unless querying by string match on workflows without joining).
    // Better to just require node existence or handle missing node but matching workflows?
    // Let's stick to node existence for now.

    if (!nodeData) {
        // Fallback: Check if it's a valid node ID but just empty?
        // Or 404.
        notFound();
    }

    const nodeName = nodeData.name;

    const filteredWorkflows: Workflow[] = (nodeData.workflowNodes as any[]).map(wn => {
        const w = wn.workflow;
        return {
            id: w.id,
            title: w.title,
            description: w.description || '',
            slug: w.slug,
            json: w.json,
            difficulty: (w.difficulty as any) || 'Beginner',
            source: (w.sourceType as any) || 'community',
            authorId: w.authorId || '',
            createdAt: w.createdAt || new Date().toISOString(),
            updatedAt: w.updatedAt || new Date().toISOString(),
            downloads: 0,
            views: 0,
            tags: w.tags.map((t: any) => t.tag.name),
            nodes: w.nodes.map((n: any) => n.node.name),
            license: w.license || 'MIT',
        };
    });

    return <NodeDetailContent node={undefined} nodeName={nodeName} workflows={filteredWorkflows} />;
}
