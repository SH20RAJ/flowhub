'use client';

import { use } from 'react';
import { workflows, authors } from '@/data/mock';
import { Title, Text, Avatar, Button } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import Link from 'next/link';
import { ArrowLeft, Github, Globe, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function AuthorProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = use(params);

    const author = authors.find(a => a.username.toLowerCase() === username.toLowerCase());
    const authorWorkflows = workflows.filter(w => w.authorId === author?.id);

    if (!author) {
        notFound();
    }

    return (
        <div className="space-y-12 py-8">
            <Link
                href="/workflows"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to workflows
            </Link>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Author Info */}
                <div className="w-full md:w-80 p-6 space-y-6 shrink-0 border rounded-lg bg-card text-card-foreground shadow-sm border-muted/50">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar
                            name={author.name}
                            className="w-24 h-24 text-3xl ring-4 ring-primary/5"
                        />
                        <div className="space-y-1">
                            <Title as="h1" className="text-xl font-bold">{author.name}</Title>
                            <Text className="text-sm text-muted-foreground italic">@{author.username}</Text>
                        </div>
                        <Text className="text-sm leading-relaxed">
                            {author.bio || 'This author hasn&apos;t shared a bio yet.'}
                        </Text>
                    </div>

                    <div className="space-y-3 pt-6 border-t">
                        {author.github && (
                            <Link href={author.github} target="_blank" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-4 h-4" /> GitHub Profile
                            </Link>
                        )}
                        {author.website && (
                            <Link href={author.website} target="_blank" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Globe className="w-4 h-4" /> Website
                            </Link>
                        )}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" /> Remote
                        </div>
                    </div>

                    <Button className="w-full rounded-full">Follow Author</Button>
                </div>

                {/* Author Workflows */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-1 border-b pb-4">
                        <Title as="h2" className="text-2xl font-bold">Contributions</Title>
                        <Text className="text-muted-foreground">Workflows shared by {author.name} ({authorWorkflows.length})</Text>
                    </div>

                    {authorWorkflows.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {authorWorkflows.map((workflow) => (
                                <WorkflowCard key={workflow.id} workflow={workflow} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border border-dashed rounded-lg bg-muted/5">
                            <Text className="text-muted-foreground">This author hasn&apos;t contributed any workflows yet.</Text>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
