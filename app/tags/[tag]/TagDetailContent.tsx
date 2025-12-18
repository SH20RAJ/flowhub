'use client';

import { Title, Text } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import Link from 'next/link';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { EmptyState } from '@/components/ui/EmptyState';
import { Workflow } from '@/data/mock';

interface TagDetailContentProps {
    tagName: string;
    workflows: Workflow[];
}

export function TagDetailContent({ tagName, workflows }: TagDetailContentProps) {
    return (
        <div className="space-y-12 py-4 animate-in fade-in duration-700">
            <Link
                href={ROUTES.TAGS}
                className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
                All Categories
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-muted/50">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <TagIcon className="w-5 h-5" />
                        </div>
                        <Title as="h1" className="text-4xl font-black tracking-tighter capitalize">{tagName}</Title>
                    </div>
                    <Text className="text-muted-foreground text-lg font-medium leading-relaxed">
                        Discover {workflows.length} production-grade workflows in this category.
                    </Text>
                </div>
            </div>

            {workflows.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workflows.map((workflow) => (
                        <WorkflowCard
                            key={workflow.id}
                            workflow={workflow}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="No workflows yet"
                    description={`We couldn't find any workflows in the "${tagName}" category. Be the first to contribute one!`}
                    action={{
                        label: "Explore All Workflows",
                        onClick: () => window.location.href = ROUTES.WORKFLOWS
                    }}
                />
            )}
        </div>
    );
}
