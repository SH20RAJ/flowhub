'use client';

import { Title, Text, Avatar, Button } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import Link from 'next/link';
import { ArrowLeft, Github, Globe, MapPin, ExternalLink, Mail } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { EmptyState } from '@/components/ui/EmptyState';
import { Workflow, Author } from '@/data/mock';

interface AuthorProfileContentProps {
    author: Author;
    workflows: Workflow[];
}

export function AuthorProfileContent({ author, workflows }: AuthorProfileContentProps) {
    return (
        <div className="space-y-12 py-4 animate-in fade-in duration-700">
            <Link
                href={ROUTES.WORKFLOWS}
                className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
                Back to Gallery
            </Link>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <aside className="w-full lg:w-96 space-y-8 shrink-0">
                    <div className="p-10 space-y-8 border-2 border-muted/30 rounded-[3rem] bg-card/30 backdrop-blur-xl shadow-2xl shadow-black/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />

                        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                            <div className="p-1.5 rounded-full ring-4 ring-primary/5 relative">
                                <Avatar
                                    name={author.name}
                                    className="w-32 h-32 text-4xl ring-8 ring-background p-0.5 shadow-2xl"
                                />
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-background rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <Title as="h1" className="text-2xl font-black tracking-tight">{author.name}</Title>
                                <div className="inline-flex items-center px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                    @{author.username}
                                </div>
                            </div>
                            <Text className="text-muted-foreground font-medium leading-relaxed">
                                {author.bio || 'Productivity expert and automation enthusiast contributing to the n8n ecosystem.'}
                            </Text>
                        </div>

                        <div className="space-y-4 pt-10 border-t border-muted/50">
                            <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Connect & Network</Title>
                            <div className="space-y-4">
                                {author.github && (
                                    <Link href={author.github} target="_blank" className="flex items-center justify-between group">
                                        <span className="flex items-center gap-3 text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                            <Github className="w-5 h-5 opacity-60" /> GitHub
                                        </span>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all transform group-hover:translate-x-1" />
                                    </Link>
                                )}
                                {author.website && (
                                    <Link href={author.website} target="_blank" className="flex items-center justify-between group">
                                        <span className="flex items-center gap-3 text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                            <Globe className="w-5 h-5 opacity-60" /> Portfolio
                                        </span>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all transform group-hover:translate-x-1" />
                                    </Link>
                                )}
                                <div className="flex items-center justify-between group">
                                    <span className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                                        <MapPin className="w-5 h-5 opacity-60" /> Remote
                                    </span>
                                    <span className="text-[10px] uppercase font-black text-muted-foreground/40 tracking-widest">Global</span>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20 font-black uppercase tracking-[0.15em] transition-transform hover:scale-[1.02]">
                            Follow Maintainer
                        </Button>
                    </div>

                    <div className="p-8 space-y-6 border rounded-3xl bg-primary/5 border-primary/10 flex items-center gap-4">
                        <Mail className="w-8 h-8 text-primary opacity-40 shrink-0" />
                        <div>
                            <Text className="text-xs font-black uppercase tracking-widest text-primary/80">Affiliate Partnerships</Text>
                            <Text className="text-[10px] font-medium text-muted-foreground mt-1">Contact for custom workflow development.</Text>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 space-y-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-muted/50 pb-8">
                        <div className="space-y-2">
                            <Title as="h2" className="text-3xl font-black tracking-tight">Public Contributions</Title>
                            <Text className="text-muted-foreground font-medium">Verified workflows and automation templates.</Text>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-muted/30 rounded-2xl border border-muted/50 shadow-inner">
                            <span className="text-xl font-black font-mono text-primary">{workflows.length}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Total Flows</span>
                        </div>
                    </div>

                    {workflows.length > 0 ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {workflows.map((workflow) => (
                                <WorkflowCard key={workflow.id} workflow={workflow} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No public flows"
                            description={`${author.name} is currently working on new automations. Check back soon for updates.`}
                            action={{
                                label: "Back to Gallery",
                                onClick: () => window.location.href = ROUTES.WORKFLOWS
                            }}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
