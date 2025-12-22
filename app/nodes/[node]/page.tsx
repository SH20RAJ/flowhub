import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { NodeDetailContent } from './NodeDetailContent';
import { db } from '@/db';
import { nodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Workflow, Node } from '@/data/mock';
import { Difficulty, Source } from '@/constants/enums';

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

    if (!nodeData) {
        notFound();
    }

    const nodeName = nodeData.name;

    const nodeForDisplay: Node = {
        id: nodeData.id,
        name: nodeData.name,
    };

    const filteredWorkflows: Workflow[] = nodeData.workflowNodes.map(wn => {
        const w = wn.workflow;
        return {
            id: w.id,
            title: w.title,
            description: w.description || '',
            slug: w.slug,
            json: w.json,
            difficulty: (w.difficulty as Difficulty) || Difficulty.Beginner,
            source: (w.sourceType as Source) || Source.Community,
            authorId: w.authorId || '',
            createdAt: w.createdAt || new Date().toISOString(),
            updatedAt: w.updatedAt || new Date().toISOString(),
            tags: (w.tags || [])
                .map(t => t.tag?.name)
                .filter((name): name is string => !!name),
            nodes: (w.nodes || [])
                .map(n => n.node?.name)
                .filter((name): name is string => !!name),
            license: w.license || 'MIT',
        };
    });

    return <NodeDetailContent node={nodeForDisplay} nodeName={nodeName} workflows={filteredWorkflows} />;
}
