'use client';

import { Workflow } from '@/data/mock';
import { Table } from 'rizzui';
import Link from 'next/link';
import { TagBadge } from '@/components/ui/TagBadge';
import { cn } from '@/lib/utils';

export function WorkflowTable({ workflows }: { workflows: Workflow[] }) {
    return (
        <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-full">
                <Table.Header>
                    <Table.Row>
                        <Table.Head className="py-3 px-4 text-left font-semibold">Workflow</Table.Head>
                        <Table.Head className="py-3 px-4 text-left font-semibold">Difficulty</Table.Head>
                        <Table.Head className="py-3 px-4 text-left font-semibold">Tags</Table.Head>
                        <Table.Head className="py-3 px-4 text-left font-semibold text-right">Updated</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {workflows.map((workflow) => (
                        <Table.Row key={workflow.id} className="hover:bg-muted/30 transition-colors">
                            <Table.Cell className="py-3 px-4">
                                <div className="flex flex-col">
                                    <Link
                                        href={`/workflows/${workflow.slug}`}
                                        className="font-medium hover:underline underline-offset-4"
                                    >
                                        {workflow.title}
                                    </Link>
                                    <span className="text-xs text-muted-foreground">{workflow.source}</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="py-3 px-4 text-xs font-semibold uppercase">
                                <span className={cn({
                                    'text-green-500': workflow.difficulty === 'Beginner',
                                    'text-yellow-500': workflow.difficulty === 'Intermediate',
                                    'text-red-500': workflow.difficulty === 'Advanced',
                                })}>
                                    {workflow.difficulty}
                                </span>
                            </Table.Cell>
                            <Table.Cell className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                    {workflow.tags.slice(0, 2).map((tag) => (
                                        <TagBadge key={tag} tag={tag} />
                                    ))}
                                    {workflow.tags.length > 2 && (
                                        <span className="text-[10px] text-muted-foreground">+{workflow.tags.length - 2}</span>
                                    )}
                                </div>
                            </Table.Cell>
                            <Table.Cell className="py-3 px-4 text-xs text-muted-foreground text-right font-mono">
                                {new Date(workflow.updatedAt).toLocaleDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
