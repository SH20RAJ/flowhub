'use client';

import { use } from 'react';
import { workflows } from '@/data/mock';
import { Title, Text, Button } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TagDetailPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = use(params);

    const filteredWorkflows = workflows.filter(w =>
        w.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );

    const tagName = tag.charAt(0).toUpperCase() + tag.slice(1);

    return (
        <div className="space-y-8 py-8">
            <Link
                href="/tags"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to tags
            </Link>

            <div className="space-y-2">
                <Title as="h1" className="text-3xl font-bold">{tagName} Workflows</Title>
                <Text className="text-muted-foreground">
                    Showing {filteredWorkflows.length} workflows tagged with &quot;{tagName}&quot;.
                </Text>
            </div>

            {filteredWorkflows.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkflows.map((workflow) => (
                        <WorkflowCard key={workflow.id} workflow={workflow} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed rounded-lg bg-muted/5">
                    <Text className="text-muted-foreground">No workflows found for this tag.</Text>
                    <Link href="/workflows">
                        <Button variant="outline" className="mt-4">Browse all workflows</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
