'use client';

import { Title, Text, Button } from 'rizzui';
import { Github, Heart, Shield, Code, Workflow, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 space-y-16">
            <section className="space-y-4 text-center">
                <Title as="h1" className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    About Flowhub
                </Title>
                <Text className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Built for the builders. Flowhub is an open-source platform dedicated
                    to making automation accessible to everyone.
                </Text>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 space-y-4 border rounded-lg bg-muted/5 shadow-sm border-muted/50">
                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary">
                        <Shield className="w-6 h-6" />
                    </div>
                    <Title as="h3" className="text-xl font-bold">Open & Transparent</Title>
                    <Text className="text-muted-foreground leading-relaxed">
                        All workflows on Flowhub are open-source. We believe in the power of
                        shared knowledge and transparent automation code.
                    </Text>
                </div>

                <div className="p-8 space-y-4 border rounded-lg bg-muted/5 shadow-sm border-muted/50">
                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary">
                        <Users className="w-6 h-6" />
                    </div>
                    <Title as="h3" className="text-xl font-bold">Community First</Title>
                    <Text className="text-muted-foreground leading-relaxed">
                        Flowhub is driven by the n8n community. Our goal is to provide a
                        centralized hub for developers to discover and share high-quality flows.
                    </Text>
                </div>
            </div>

            <section className="space-y-8 py-12 border-y border-border/50">
                <Title as="h2" className="text-2xl font-bold text-center">Our Mission</Title>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Workflow className="w-8 h-8 text-primary" />
                        <Title as="h4" className="text-base font-bold">Standardization</Title>
                        <Text className="text-sm text-muted-foreground">Defining best practices for n8n workflow structure and naming.</Text>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Code className="w-8 h-8 text-primary" />
                        <Title as="h4" className="text-base font-bold">Accessibility</Title>
                        <Text className="text-sm text-muted-foreground">Making complex automations simple to understand and deploy.</Text>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Heart className="w-8 h-8 text-primary" />
                        <Title as="h4" className="text-base font-bold">Contribution</Title>
                        <Text className="text-sm text-muted-foreground">Empowering every developer to contribute to the global automation library.</Text>
                    </div>
                </div>
            </section>

            <section className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 flex flex-col items-center text-center space-y-6">
                <Title as="h2" className="text-3xl font-bold">Ready to contribute?</Title>
                <Text className="text-primary-foreground/80 max-w-md">
                    Join hundreds of developers who are building the future of open-source
                    automation. Together, we can automate the world.
                </Text>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/submit">
                        <Button size="lg" variant="flat" className="rounded-full px-8">
                            Submit Your First Flow
                        </Button>
                    </Link>
                    <Link href="https://github.com/n8n-io/n8n" target="_blank">
                        <Button size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/30 hover:bg-primary-foreground/10">
                            <Github className="w-4 h-4 mr-2" /> View on GitHub
                        </Button>
                    </Link>
                </div>
            </section>

            <footer className="pt-8 text-center text-sm text-muted-foreground">
                © 2023 Flowhub. Built with Next.js, RizzUI, and a lot of caffeine.
            </footer>
        </div>
    );
}
