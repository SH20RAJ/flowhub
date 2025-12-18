import { nodes, workflows } from '@/data/mock';
import { NodesContent } from './NodesContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Node Registry",
    description: "Explore the fundamental building blocks of n8n. Browse nodes and find workflows that use them.",
    openGraph: {
        title: "Node Registry | Flowhub",
        description: "Browse n8n nodes and discover compatible workflows.",
    },
};

export default function NodesPage() {
    const nodeStats = nodes.map(node => ({
        ...node,
        count: workflows.filter(w => w.nodes.includes(node.id)).length
    }));

    return (
        <NodesContent initialNodes={nodeStats} />
    );
}
