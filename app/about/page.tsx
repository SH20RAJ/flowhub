'use client';

import { Title, Text, Button } from 'rizzui';
import { Github, Heart, Shield, Code, Workflow, Users, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto py-8 space-y-24 animate-in fade-in duration-1000">
            {/* Hero Section */}
            <section className="space-y-8 text-center relative py-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-primary/5 blur-3xl -z-10 rounded-full" />
                <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        Version 1.0.0 Stable
                    </div>
                    <Title as="h1" className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        Built for the <span className="text-primary italic">Builders.</span>
                    </Title>
                </div>
                <Text className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
                    Flowhub is more than a directory. It&apos;s a shared operating system for the world&apos;s most ambitious automations.
                </Text>
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                    <Link href={ROUTES.WORKFLOWS}>
                        <Button size="lg" className="rounded-2xl h-16 px-10 font-black uppercase tracking-widest shadow-2xl shadow-primary/20 transition-transform hover:scale-105">
                            Explore Gallery <ArrowRight className="w-5 h-5 ml-3" />
                        </Button>
                    </Link>
                    <Link href={ROUTES.GITHUB_REPO} target="_blank">
                        <Button size="lg" variant="outline" className="rounded-2xl h-16 px-10 font-black uppercase tracking-widest border-muted/50 hover:border-primary/50 gap-3">
                            <Github className="w-5 h-5" /> Fork on GitHub
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-10 space-y-6 border-2 border-muted/30 rounded-[3rem] bg-card/30 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
                    <div className="p-4 w-fit rounded-2xl bg-primary/10 text-primary shadow-inner">
                        <Shield className="w-8 h-8" />
                    </div>
                    <Title as="h3" className="text-2xl font-black tracking-tight">Open Authority</Title>
                    <Text className="text-muted-foreground font-medium leading-relaxed">
                        We believe that the best code is visible. Every workflow on Flowhub is GPL-3.0 by default, ensuring that knowledge remains free and accessible.
                    </Text>
                </div>

                <div className="p-10 space-y-6 border-2 border-muted/30 rounded-[3rem] bg-card/30 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
                    <div className="p-4 w-fit rounded-2xl bg-primary/10 text-primary shadow-inner">
                        <Users className="w-8 h-8" />
                    </div>
                    <Title as="h3" className="text-2xl font-black tracking-tight">Maintainer Collective</Title>
                    <Text className="text-muted-foreground font-medium leading-relaxed">
                        Flowhub isn&apos;t a company—it&apos;s a collective. Driven by the n8n community, we prioritize quality, security, and developer experience above all else.
                    </Text>
                </div>
            </div>

            {/* Mission Pillars */}
            <section className="space-y-16 py-20 border-y border-muted/30">
                <div className="text-center space-y-4">
                    <Title as="h2" className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">Core Mission</Title>
                    <Title as="h3" className="text-4xl font-black tracking-tight">Our Pillars of Operation</Title>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center space-y-6 group">
                        <div className="p-5 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 ring-8 ring-muted/20">
                            <Workflow className="w-10 h-10" />
                        </div>
                        <Title as="h4" className="text-xl font-black tracking-tight">Standardization</Title>
                        <Text className="text-sm font-medium text-muted-foreground leading-relaxed max-w-[240px]">
                            Defining the industry standard for workflow documentation and naming conventions.
                        </Text>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-6 group">
                        <div className="p-5 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 ring-8 ring-muted/20">
                            <Code className="w-10 h-10" />
                        </div>
                        <Title as="h4" className="text-xl font-black tracking-tight">Zero-Config</Title>
                        <Text className="text-sm font-medium text-muted-foreground leading-relaxed max-w-[240px]">
                            Aiming for 1-click deployments by simplifying node requirements and environment setups.
                        </Text>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-6 group">
                        <div className="p-5 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 ring-8 ring-muted/20">
                            <Heart className="w-10 h-10" />
                        </div>
                        <Title as="h4" className="text-xl font-black tracking-tight">Altruistic Growth</Title>
                        <Text className="text-sm font-medium text-muted-foreground leading-relaxed max-w-[240px]">
                            Fostering a culture of contribution where every expert helps the next beginner.
                        </Text>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary text-primary-foreground rounded-[4rem] p-12 md:p-24 flex flex-col items-center text-center space-y-10 relative overflow-hidden shadow-3xl shadow-primary/30">
                <Zap className="absolute -right-10 -top-10 w-64 h-64 text-white/5 transform -rotate-12" />
                <div className="space-y-6 relative z-10">
                    <Title as="h2" className="text-4xl md:text-6xl font-black tracking-tighter">Ready to Scale?</Title>
                    <Text className="text-primary-foreground/70 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        The world of automation is vast, but you don&apos;t have to explore it alone. Contribute your flows and join the vanguard of n8n builders.
                    </Text>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 relative z-10">
                    <Link href={ROUTES.SUBMIT}>
                        <Button size="lg" variant="flat" className="rounded-2xl h-18 px-12 font-black uppercase tracking-[0.2em] shadow-2xl transition-transform hover:scale-105">
                            Submit Your Flow
                        </Button>
                    </Link>
                </div>
            </section>

            <footer className="pt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                © 2025 Flowhub Protocol • Engineered with Pride
            </footer>
        </div>
    );
}
