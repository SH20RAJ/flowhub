'use client';

import { Title, Text, Button } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import Link from 'next/link';
import { ArrowLeft, Box, ExternalLink } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { EmptyState } from '@/components/ui/EmptyState';
import { Workflow, Node } from '@/data/mock';

interface NodeDetailContentProps {
    node?: Node;
    nodeName: string;
    workflows: Workflow[];
}

export function NodeDetailContent({ node, nodeName, workflows }: NodeDetailContentProps) {
    return (
        <div className="space-y-12 py-4 animate-in fade-in duration-700">
            <Link
                href={ROUTES.NODES}
                className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
                All Nodes
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-12">
                    <div className="flex flex-col sm:flex-row items-start gap-8">
                        <div className="p-6 rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 ring-8 ring-primary/5">
                            <Box className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <Title as="h1" className="text-4xl md:text-5xl font-black tracking-tighter">{nodeName}</Title>
                            <Text className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl">
                                {node?.description || `Explore production-ready community workflows that leverage the power of the ${nodeName} node.`}
                            </Text>
                            <div className="flex gap-4 pt-2">
                                <Button size="sm" variant="outline" className="rounded-xl font-bold uppercase tracking-wider text-[10px] gap-2 border-muted/50">
                                    <ExternalLink className="w-3.5 h-3.5" /> Documentation
                                </Button>
                            </div>
                        </div>
                    </div>

                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-muted/50 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                <Title as="h2" className="text-xl font-black uppercase tracking-widest">Compatible Workflows</Title>
                            </div>
                            <span className="text-xs font-black font-mono bg-muted/50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                                {workflows.length} Results
                            </span>
                        </div>

                        {workflows.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {workflows.map((workflow) => (
                                    <WorkflowCard key={workflow.id} workflow={workflow} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No workflows found"
                                description={`No workflows have been shared using the ${nodeName} node yet.`}
                                action={{
                                    label: "Explore Other Workflows",
                                    onClick: () => window.location.href = ROUTES.WORKFLOWS
                                }}
                            />
                        )}
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="p-8 space-y-6 border rounded-3xl bg-card/50 backdrop-blur-md border-muted/50 shadow-sm">
                        <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Node Status</Title>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-muted-foreground uppercase tracking-widest">Type</span>
                                <span className="bg-primary/5 text-primary px-2 py-1 rounded-md uppercase tracking-wider text-[10px]">Community Favorite</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-muted-foreground uppercase tracking-widest">Complexity</span>
                                <span className="uppercase font-black">Standard</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-6 border rounded-3xl bg-primary/5 border-primary/10">
                        <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Join the discussion</Title>
                        <Text className="text-xs font-medium text-muted-foreground leading-relaxed">
                            Have questions about {nodeName}? Join the n8n forum or our Discord to talk with other experts.
                        </Text>
                        <Button size="sm" className="w-full rounded-xl font-black uppercase tracking-widest text-[9px]">
                            Community Forum
                        </Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
