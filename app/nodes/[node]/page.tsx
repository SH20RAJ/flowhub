import { workflows, nodes } from '@/data/mock';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { NodeDetailContent } from './NodeDetailContent';

interface Props {
    params: Promise<{ node: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { node: nodeId } = await params;
    const node = nodes.find(n => n.id.toLowerCase() === nodeId.toLowerCase());
    const nodeName = node?.name || nodeId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    return {
        title: `${nodeName} Node Workflows`,
        description: `Discover n8n workflows that use the ${nodeName} node for automation.`,
    };
}

export default async function Page({ params }: Props) {
    const { node: nodeId } = await params;

    const node = nodes.find(n => n.id.toLowerCase() === nodeId.toLowerCase());
    const filteredWorkflows = workflows.filter(w =>
        w.nodes.some(n => n.toLowerCase() === nodeId.toLowerCase())
    );

    if (!node && filteredWorkflows.length === 0) {
        notFound();
    }

    const nodeName = node?.name || nodeId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    return <NodeDetailContent nodeId={nodeId} node={node} nodeName={nodeName} workflows={filteredWorkflows} />;
}
