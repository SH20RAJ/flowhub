'use client';

import { use } from 'react';
import { workflows, authors } from '@/data/mock';
import { notFound } from 'next/navigation';
import { Title, Text, Button, Card, Avatar } from 'rizzui';
import { TagBadge } from '@/components/ui/TagBadge';
import { NodeBadge } from '@/components/ui/NodeBadge';
import { JsonViewer } from '@/components/workflows/JsonViewer';
import {
    ArrowLeft,
    Download,
    ExternalLink,
    Github,
    Calendar,
    Globe,
    FileCode,
    ShieldCheck,
    User
} from 'lucide-react';
import Link from 'next/link';

export default function WorkflowDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const workflow = workflows.find((w) => w.slug === slug);

    if (!workflow) {
        notFound();
    }

    const author = authors.find((a) => a.id === workflow.authorId);

    return (
        <div className="max-w-6xl mx-auto py-8 space-y-8">
            <Link
                href="/workflows"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to workflows
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <TagBadge tag={workflow.difficulty} />
                            <TagBadge tag={workflow.source} />
                        </div>
                        <Title as="h1" className="text-3xl md:text-4xl font-bold tracking-tight">
                            {workflow.title}
                        </Title>
                        <Text className="text-muted-foreground text-lg leading-relaxed">
                            {workflow.description}
                        </Text>
                    </div>

                    <div className="flex items-center gap-3 py-4 border-y border-border/50">
                        <Button className="rounded-full gap-2 px-6">
                            <Download className="w-4 h-4" /> Download JSON
                        </Button>
                        <Button variant="outline" className="rounded-full gap-2 px-6" onClick={() => {
                            navigator.clipboard.writeText(workflow.json);
                        }}>
                            <FileCode className="w-4 h-4" /> Copy JSON
                        </Button>
                        <Button variant="text" className="rounded-full gap-2 px-6">
                            <ExternalLink className="w-4 h-4" /> View Source
                        </Button>
                    </div>

                    <div className="space-y-6">
                        <Title as="h2" className="text-xl font-bold">Execution Plan</Title>
                        <JsonViewer json={workflow.json} title={`${workflow.title} Config`} />
                    </div>

                    <div className="space-y-4">
                        <Title as="h2" className="text-xl font-bold">Required Nodes</Title>
                        <div className="flex flex-wrap gap-3">
                            {workflow.nodes.map((node) => (
                                <div key={node} className="p-3 border rounded-lg bg-card hover:bg-muted/30 transition-colors flex items-center gap-3 min-w-[160px]">
                                    <NodeBadge node={node} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Metadata */}
                <div className="space-y-6">
                    <Card className="p-6 space-y-6 border-muted/50">
                        <div className="space-y-4">
                            <Title as="h3" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Author</Title>
                            {author && (
                                <Link href={`/authors/${author.username}`} className="flex items-center gap-3 group">
                                    <Avatar name={author.name} className="ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all" />
                                    <div>
                                        <Text className="font-bold group-hover:text-primary transition-colors text-sm">{author.name}</Text>
                                        <Text className="text-xs text-muted-foreground">@{author.username}</Text>
                                    </div>
                                </Link>
                            )}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border/50">
                            <Title as="h3" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Metadata</Title>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Updated</span>
                                    <span className="font-medium font-mono">{new Date(workflow.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> License</span>
                                    <span className="font-medium">{workflow.license}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><Globe className="w-4 h-4" /> Source</span>
                                    <span className="font-medium">{workflow.source}</span>
                                </div>
                            </div>
                        </div>

                        {author?.github && (
                            <div className="pt-4">
                                <Link href={author.github} target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="w-full gap-2 rounded-md">
                                        <Github className="w-4 h-4" /> View on GitHub
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </Card>

                    <Card className="p-6 space-y-4 border-muted/50 bg-muted/5">
                        <Title as="h3" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tags</Title>
                        <div className="flex flex-wrap gap-2">
                            {workflow.tags.map((tag) => (
                                <TagBadge key={tag} tag={tag} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
