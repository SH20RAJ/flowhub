'use client';

import Link from 'next/link';
import { Title, Text } from 'rizzui';
import { TagBadge } from '@/components/ui/TagBadge';
import { NodeBadge } from '@/components/ui/NodeBadge';
import { Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { Workflow } from '@/data/mock';

interface WorkflowCardProps {
    workflow: Workflow;
    className?: string;
}

const difficultyStyles: Record<string, string> = {
    'Beginner': 'text-green-500',
    'Intermediate': 'text-yellow-500',
    'Advanced': 'text-red-500',
};

export function WorkflowCard({ workflow, className }: WorkflowCardProps) {
    return (
        <div className={cn(
            "flex flex-col h-full p-8 border-2 border-muted/30 rounded-[2.5rem] bg-card/30 backdrop-blur-xl shadow-sm hover:border-primary/50 transition-all group hover:shadow-2xl hover:shadow-primary/5",
            className
        )}>
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                    <Link
                        href={ROUTES.WORKFLOW_DETAIL(workflow.slug)}
                        className="group/title"
                    >
                        <Title as="h3" className="text-xl font-black tracking-tight group-hover/title:text-primary transition-colors line-clamp-2 leading-tight">
                            {workflow.title}
                        </Title>
                    </Link>
                    <div className={cn(
                        "text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md bg-muted/50 whitespace-nowrap",
                        difficultyStyles[workflow.difficulty]
                    )}>
                        {workflow.difficulty}
                    </div>
                </div>

                <Text className="text-muted-foreground/80 font-medium text-sm line-clamp-2 leading-relaxed h-[3rem]">
                    {workflow.description}
                </Text>

                <div className="flex flex-wrap gap-1.5 mt-2">
                    {workflow.tags.slice(0, 3).map((tag) => (
                        <TagBadge key={tag} tag={tag} variant="flat" />
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-muted/50 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate max-w-[100px]">
                            {workflow.source}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(workflow.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {workflow.nodes.slice(0, 4).map((node) => (
                        <NodeBadge key={node} node={node} />
                    ))}
                    {workflow.nodes.length > 4 && (
                        <div className="h-7 px-2 flex items-center justify-center rounded-lg bg-muted text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">
                            +{workflow.nodes.length - 4}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
