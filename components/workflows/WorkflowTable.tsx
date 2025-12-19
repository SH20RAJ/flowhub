'use client';

import Link from 'next/link';
import { TagBadge } from '@/components/ui/TagBadge';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { Difficulty } from '@/constants/enums';

interface WorkflowTableProps {
    workflows: Array<{
        id: string;
        slug: string;
        title: string;
        difficulty: Difficulty;
        tags: string[];
        source: string;
        updatedAt: string;
    }>;
    className?: string;
}

const difficultyStyles: Record<Difficulty, string> = {
    [Difficulty.Beginner]: 'text-green-500',
    [Difficulty.Intermediate]: 'text-yellow-500',
    [Difficulty.Advanced]: 'text-red-500',
};

export function WorkflowTable({ workflows, className }: WorkflowTableProps) {
    return (
        <div className={cn("overflow-x-auto rounded-xl border border-muted/30 bg-card/30 backdrop-blur-sm", className)}>
            <table className="min-w-full divide-y divide-muted/30">
                <thead className="bg-muted/30">
                    <tr>
                        <th className="py-4 px-6 text-left font-bold text-xs uppercase tracking-wider text-muted-foreground">Workflow</th>
                        <th className="py-4 px-6 text-left font-bold text-xs uppercase tracking-wider text-muted-foreground">Difficulty</th>
                        <th className="py-4 px-6 text-left font-bold text-xs uppercase tracking-wider text-muted-foreground">Tags</th>
                        <th className="py-4 px-6 text-right font-bold text-xs uppercase tracking-wider text-muted-foreground whitespace-nowrap">Last Updated</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-muted/30">
                    {workflows.map((workflow) => (
                        <tr key={workflow.id} className="hover:bg-muted/20 transition-colors">
                            <td className="py-4 px-6">
                                <div className="flex flex-col gap-0.5">
                                    <Link
                                        href={ROUTES.WORKFLOW_DETAIL(workflow.slug)}
                                        className="font-bold text-sm text-foreground hover:text-primary transition-colors"
                                    >
                                        {workflow.title}
                                    </Link>
                                    <span className="text-[10px] uppercase font-medium text-muted-foreground opacity-70 tracking-tight">
                                        {workflow.source}
                                    </span>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <span className={cn("text-[10px] font-black uppercase tracking-widest", difficultyStyles[workflow.difficulty])}>
                                    {workflow.difficulty}
                                </span>
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex flex-wrap gap-1.5 items-center">
                                    {workflow.tags.slice(0, 3).map((tag) => (
                                        <TagBadge key={tag} tag={tag} variant="outline" className="border-none bg-muted/30" />
                                    ))}
                                    {workflow.tags.length > 3 && (
                                        <span className="text-[10px] font-bold text-muted-foreground/50">+{workflow.tags.length - 3}</span>
                                    )}
                                </div>
                            </td>
                            <td className="py-4 px-6 text-[10px] text-muted-foreground text-right font-mono uppercase font-bold opacity-80">
                                {new Date(workflow.updatedAt).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
