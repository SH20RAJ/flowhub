'use client';

import { use } from 'react';
import { workflows, authors } from '@/data/mock';
import { notFound } from 'next/navigation';
import { Title, Text, Button, Avatar } from 'rizzui';
import { TagBadge } from '@/components/ui/TagBadge';
import { NodeBadge } from '@/components/ui/NodeBadge';
import { JsonViewer } from '@/components/workflows/JsonViewer';
import {
    ArrowLeft,
    Download,
    ExternalLink,
    FileCode,
    Calendar,
    Globe,
    ShieldCheck,
    Github
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { slugify } from '@/utils/slug';

export default function WorkflowDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const workflow = workflows.find((w) => w.slug === slug);

    if (!workflow) {
        notFound();
    }

    const author = authors.find((a) => a.id === workflow.authorId);

    return (
        <div className="max-w-6xl mx-auto py-4 space-y-10 animate-in fade-in duration-700">
            <Link
                href={ROUTES.WORKFLOWS}
                className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
                Back to Library
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2.5">
                            <TagBadge tag={workflow.difficulty} variant="flat" />
                            <TagBadge tag={workflow.source} variant="outline" />
                        </div>
                        <Title as="h1" className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1]">
                            {workflow.title}
                        </Title>
                        <Text className="text-muted-foreground text-lg font-medium leading-relaxed max-w-3xl">
                            {workflow.description}
                        </Text>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 py-8 border-y border-muted/50">
                        <Button size="lg" className="rounded-xl gap-3 px-8 h-14 font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-transform hover:scale-105">
                            <Download className="w-5 h-5" /> Download JSON
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-xl gap-3 px-8 h-14 font-black uppercase tracking-widest border-muted/50 hover:border-primary/50 transition-all" onClick={() => {
                            navigator.clipboard.writeText(workflow.json);
                        }}>
                            <FileCode className="w-5 h-5" /> Copy JSON
                        </Button>
                        <Button size="lg" variant="text" className="rounded-xl gap-3 px-6 h-14 font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
                            <ExternalLink className="w-5 h-5" /> View Source
                        </Button>
                    </div>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            <Title as="h2" className="text-xl font-black uppercase tracking-widest">Workflow Config</Title>
                        </div>
                        <JsonViewer json={workflow.json} title="Implementation Details" />
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            <Title as="h2" className="text-xl font-black uppercase tracking-widest">Node Dependencies</Title>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {workflow.nodes.map((node) => (
                                <div key={node} className="p-4 border rounded-2xl bg-card/30 hover:bg-muted/30 transition-all flex items-center gap-4 border-muted/50 group">
                                    <NodeBadge node={node} className="scale-110" />
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">{node}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Metadata */}
                <aside className="space-y-8">
                    <div className="p-8 space-y-8 border rounded-3xl bg-card/50 text-card-foreground shadow-2xl shadow-black/10 border-muted/50 backdrop-blur-md">
                        <div className="space-y-5">
                            <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Contributed By</Title>
                            {author && (
                                <Link href={ROUTES.AUTHOR_PROFILE(author.username)} className="flex items-center gap-4 group">
                                    <Avatar
                                        name={author.name}
                                        className="w-12 h-12 ring-2 ring-primary/10 group-hover:ring-primary/50 transition-all p-0.5"
                                    />
                                    <div>
                                        <Text className="font-black text-sm group-hover:text-primary transition-colors tracking-tight">{author.name}</Text>
                                        <Text className="text-xs font-bold text-muted-foreground/70 uppercase">@{author.username}</Text>
                                    </div>
                                </Link>
                            )}
                        </div>

                        <div className="space-y-5 pt-8 border-t border-muted/50">
                            <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Technical Specs</Title>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-3">
                                        <Calendar className="w-4 h-4 opacity-50" /> Updated
                                    </span>
                                    <span className="font-black font-mono bg-muted/50 px-2 py-1 rounded text-[10px]">{new Date(workflow.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-3 text-xs">
                                        <ShieldCheck className="w-4 h-4 opacity-50" /> License
                                    </span>
                                    <span className="font-black text-xs uppercase">{workflow.license}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-3 text-xs">
                                        <Globe className="w-4 h-4 opacity-50" /> Distribution
                                    </span>
                                    <span className="font-black text-xs uppercase">{workflow.source}</span>
                                </div>
                            </div>
                        </div>

                        {author?.github && (
                            <div className="pt-8 border-t border-muted/50">
                                <Link href={author.github} target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="w-full h-12 gap-3 rounded-xl font-bold uppercase tracking-widest text-[10px] border-muted/50 hover:border-primary/50">
                                        <Github className="w-4 h-4" /> Maintainer Profile
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="p-8 space-y-6 border rounded-3xl bg-muted/5 shadow-sm border-muted/20">
                        <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Categories</Title>
                        <div className="flex flex-wrap gap-2.5">
                            {workflow.tags.map((tag) => (
                                <TagBadge key={tag} tag={tag} variant="flat" className="bg-background/50" />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
