import Link from 'next/link';
import { Workflow } from '@/data/mock';
import { Title, Text } from 'rizzui';
import { TagBadge } from '@/components/ui/TagBadge';
import { NodeBadge } from '@/components/ui/NodeBadge';
import { Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
    const difficultyColor = {
        Beginner: 'text-green-500',
        Intermediate: 'text-yellow-500',
        Advanced: 'text-red-500',
    }[workflow.difficulty];

    return (
        <div className="flex flex-col h-full p-6 border rounded-lg bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
            <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/workflows/${workflow.slug}`} className="hover:underline underline-offset-4">
                        <Title as="h3" className="text-base font-semibold line-clamp-1">
                            {workflow.title}
                        </Title>
                    </Link>
                    <span className={cn("text-[10px] font-bold uppercase", difficultyColor)}>
                        {workflow.difficulty}
                    </span>
                </div>

                <Text className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {workflow.description}
                </Text>

                <div className="flex flex-wrap gap-1 mt-auto">
                    {workflow.tags.slice(0, 3).map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                    ))}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        <span>{workflow.source}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(workflow.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                    {workflow.nodes.slice(0, 4).map((node) => (
                        <NodeBadge key={node} node={node} />
                    ))}
                </div>
            </div>
        </div>
    );
}
