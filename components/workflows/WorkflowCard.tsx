'use client';

import Link from 'next/link';
import { Title, Text } from 'rizzui';
import { TagBadge } from '@/components/ui/TagBadge';
import { NodeBadge } from '@/components/ui/NodeBadge';
import { Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { Difficulty } from '@/constants/enums';

interface WorkflowCardProps {
    workflow: {
        id: string;
        slug: string;
        title: string;
        description: string;
        difficulty: Difficulty;
        tags: string[];
        nodes: string[];
        source: string;
        createdAt: string;
    };
    className?: string;
}

const difficultyStyles: Record<Difficulty, string> = {
    [Difficulty.Beginner]: 'text-green-500',
    [Difficulty.Intermediate]: 'text-yellow-500',
    [Difficulty.Advanced]: 'text-red-500',
};

export function WorkflowCard({ workflow, className }: WorkflowCardProps) {
    return (
        <div className={cn(
            "flex flex-col h-full p-6 border rounded-lg bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-all hover:shadow-md",
            className
        )}>
            <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        href={ROUTES.WORKFLOW_DETAIL(workflow.slug)}
                        className="hover:underline underline-offset-4 decoration-primary/30"
                    >
                        <Title as="h3" className="text-base font-semibold line-clamp-1">
                            {workflow.title}
                        </Title>
                    </Link>
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", difficultyStyles[workflow.difficulty])}>
                        {workflow.difficulty}
                    </span>
                </div>

                <Text className="text-muted-foreground text-sm line-clamp-2 leading-relaxed h-[2.5rem]">
                    {workflow.description}
                </Text>

                <div className="flex flex-wrap gap-1 mt-auto overflow-hidden h-6">
                    {workflow.tags.slice(0, 3).map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                    ))}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 opacity-70" />
                        <span className="truncate max-w-[100px]">{workflow.source}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                        <span>{new Date(workflow.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1">
                    {workflow.nodes.slice(0, 4).map((node) => (
                        <NodeBadge key={node} node={node} />
                    ))}
                    {workflow.nodes.length > 4 && (
                        <span className="text-[10px] flex items-center text-muted-foreground">+{workflow.nodes.length - 4}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
