'use client';

import { Title, Text, Button } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { TagBadge } from '@/components/ui/TagBadge';
import Link from 'next/link';
import { ArrowRight, Zap, Shield } from 'lucide-react';
import { Workflow } from '@/data/mock';

interface HomeContentProps {
    featuredWorkflows: Workflow[];
    recentWorkflows: Workflow[];
    popularTags: string[];
}

export function HomeContent({ featuredWorkflows, recentWorkflows, popularTags }: HomeContentProps) {
    return (
        <div className="space-y-16 py-10">
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center space-y-8 py-12">
                <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 animate-pulse">
                        <Zap className="w-3 h-3" />
                        <span>Community Powered Automations</span>
                    </div>
                    <Title as="h1" className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        The Hub for <span className="text-primary italic">n8n</span> Workflows
                    </Title>
                    <Text className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Discover, share, and deploy production-ready automations.
                        Built by developers, for developers. Open source and free forever.
                    </Text>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/workflows">
                        <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold transition-transform hover:scale-105">
                            Explore Workflows
                        </Button>
                    </Link>
                    <Link href="/submit">
                        <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-semibold">
                            Submit Workflow
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Trust Section */}
            <div className="border rounded-2xl p-8 bg-muted/5 flex flex-col md:flex-row items-center justify-center gap-12 border-muted/50">
                <div className="flex items-center gap-3">
                    <Shield className="w-10 h-10 text-primary opacity-50" />
                    <div>
                        <Text className="font-bold">Verified Code</Text>
                        <Text className="text-xs text-muted-foreground">All JSONs are community vetted</Text>
                    </div>
                </div>
                <div className="h-10 w-px bg-border hidden md:block" />
                <div className="flex items-center gap-3">
                    <Zap className="w-10 h-10 text-primary opacity-50" />
                    <div>
                        <Text className="font-bold">One-Click Export</Text>
                        <Text className="text-xs text-muted-foreground">Seamless n8n integration</Text>
                    </div>
                </div>
            </div>

            {/* Featured Workflows */}
            <section className="space-y-8">
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <Title as="h2" className="text-2xl font-bold">Featured Workflows</Title>
                        <Text className="text-muted-foreground">Hand-picked automations to supercharge your stack.</Text>
                    </div>
                    <Link href="/workflows" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredWorkflows.map((workflow) => (
                        <WorkflowCard key={workflow.id} workflow={workflow} />
                    ))}
                </div>
            </section>

            {/* Popular Tags */}
            <section className="space-y-6">
                <Title as="h2" className="text-xl font-bold">Browse by Category</Title>
                <div className="flex flex-wrap gap-3">
                    {popularTags.map((tag) => (
                        <TagBadge key={tag} tag={tag} className="px-4 py-2 text-sm bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all border-none" />
                    ))}
                    <Link href="/tags" className="px-4 py-2 text-sm font-semibold text-primary">
                        + More Tags
                    </Link>
                </div>
            </section>

            {/* Recent Updates */}
            <section className="space-y-8">
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <Title as="h2" className="text-2xl font-bold">Recently Added</Title>
                        <Text className="text-muted-foreground">The latest contributions from our global community.</Text>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentWorkflows.map((workflow) => (
                        <WorkflowCard key={workflow.id} workflow={workflow} />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground rounded-3xl p-12 text-center space-y-6">
                <Title as="h2" className="text-3xl font-bold">Have a workflow to share?</Title>
                <Text className="text-primary-foreground/80 max-w-lg mx-auto">
                    Join the community of builders sharing production-grade n8n workflows.
                    Your contribution could save someone hours of work.
                </Text>
                <Link href="/submit">
                    <Button size="lg" variant="flat" className="rounded-full px-10 h-12 font-bold transition-transform hover:scale-105">
                        Submit Now
                    </Button>
                </Link>
            </section>
        </div>
    );
}
