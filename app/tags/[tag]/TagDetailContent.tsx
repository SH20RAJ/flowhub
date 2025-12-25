'use client';

import { Title, Text } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import Link from 'next/link';
import { ArrowLeft, Tag as TagIcon, ChevronDown } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { EmptyState } from '@/components/ui/EmptyState';
import { Workflow } from '@/data/mock';
import { useRouter, useSearchParams } from 'next/navigation';

interface TagDetailContentProps {
    tagName: string;
    workflows: Workflow[];
}

export function TagDetailContent({ tagName, workflows }: TagDetailContentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || 'newest';

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', value);
        router.push(`?${params.toString()}`);
    };

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

                <div className="relative inline-block h-12 min-w-[160px]">
                    <select
                        value={currentSort}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="w-full appearance-none h-full pl-4 pr-10 rounded-xl border border-muted/50 font-bold bg-transparent transition-all hover:bg-muted/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 cursor-pointer"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="most-upvoted">Most Upvoted</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
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
