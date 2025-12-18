'use client';

import { use } from 'react';
import { workflows, nodes } from '@/data/mock';
import { Title, Text, Button } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import Link from 'next/link';
import { ArrowLeft, Box } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function NodeDetailPage({ params }: { params: Promise<{ node: string }> }) {
    const { node: nodeId } = use(params);

    const node = nodes.find(n => n.id.toLowerCase() === nodeId.toLowerCase());
    const filteredWorkflows = workflows.filter(w =>
        w.nodes.some(n => n.toLowerCase() === nodeId.toLowerCase())
    );

    if (!node && filteredWorkflows.length === 0) {
        notFound();
    }

    const nodeName = node?.name || nodeId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    return (
        <div className="space-y-8 py-8">
            <Link
                href="/nodes"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to nodes
            </Link>

            <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary">
                    <Box className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <Title as="h1" className="text-3xl font-bold">{nodeName}</Title>
                    <Text className="text-muted-foreground max-w-2xl">
                        {node?.description || `Showing community workflows that use the ${nodeName} node in their automation flows.`}
                    </Text>
                </div>
            </div>

            <div className="space-y-6 pt-4">
                <Title as="h2" className="text-xl font-bold">Workflows using {nodeName}</Title>
                {filteredWorkflows.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorkflows.map((workflow) => (
                            <WorkflowCard key={workflow.id} workflow={workflow} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border border-dashed rounded-lg bg-muted/5">
                        <Text className="text-muted-foreground">No workflows found using this node yet.</Text>
                        <Link href="/workflows">
                            <Button variant="outline" className="mt-4">Explore all workflows</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
