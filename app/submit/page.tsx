'use client';

import { Title, Text, Input, Textarea, Select, Button } from 'rizzui';
import {
    AlertCircle,
    FileJson,
    ArrowRight,
    ShieldCheck,
    Zap,
    CheckCircle2
} from 'lucide-react';
import { DIFFICULTY_OPTIONS } from '@/constants/enums';
import { cn } from '@/lib/utils';

export default function SubmitPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-12 animate-in fade-in duration-700">
            <div className="space-y-4 max-w-2xl">
                <Title as="h1" className="text-4xl md:text-5xl font-black tracking-tighter">Submit Workflow</Title>
                <Text className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Contribute to the largest collection of n8n automations. Help others build faster by sharing your battle-tested flows.
                </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 p-10 space-y-10 border-2 border-muted/30 rounded-[2.5rem] bg-card/30 backdrop-blur-xl shadow-2xl shadow-black/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
                                Workflow Title
                            </label>
                            <Input
                                id="title"
                                placeholder="e.g., Slack to Google Sheets Reporter"
                                className="h-14 font-bold text-sm bg-background/50 border-muted/50 focus:border-primary transition-all rounded-2xl"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
                                Brief Description
                            </label>
                            <Textarea
                                id="description"
                                placeholder="Explain the core functionality and any specific prerequisites..."
                                rows={4}
                                className="font-medium bg-background/50 border-muted/50 focus:border-primary transition-all rounded-2xl p-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="difficulty" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
                                Difficulty Level
                            </label>
                            <Select
                                options={DIFFICULTY_OPTIONS}
                                className="w-full"
                                dropdownClassName="rounded-xl border-muted/50 shadow-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tags" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
                                Keywords / Tags
                            </label>
                            <Input
                                id="tags"
                                placeholder="AI, Productivity, Slack"
                                className="h-14 font-bold text-sm bg-background/50 border-muted/50 focus:border-primary transition-all rounded-2xl"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-3">
                            <div className="flex items-center justify-between ml-1">
                                <label htmlFor="json" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                                    Workflow Configuration (JSON)
                                </label>
                                <div className="text-[9px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded-md">
                                    <AlertCircle className="w-3 h-3" /> Credentials will be removed automatically
                                </div>
                            </div>
                            <div className="relative group">
                                <Textarea
                                    id="json"
                                    placeholder="Paste your n8n workflow JSON exported from the editor..."
                                    rows={12}
                                    className="font-mono text-[11px] bg-black/20 border-muted/50 focus:border-primary transition-all rounded-2xl p-6 leading-relaxed"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform scale-95 group-hover:scale-100 backdrop-blur-[2px]">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-4 rounded-full bg-primary/10 text-primary">
                                            <FileJson className="w-10 h-10" />
                                        </div>
                                        <Text className="text-sm font-black uppercase tracking-widest text-primary">Drop JSON File Here</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-muted/50 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>GPL-3.0 Submission License</span>
                        </div>
                        <Button size="lg" disabled className="rounded-2xl w-full md:w-auto px-12 h-14 font-black uppercase tracking-[0.15em] shadow-xl shadow-primary/10">
                            Submit Draft <ArrowRight className="w-5 h-5 ml-3" />
                        </Button>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="p-8 space-y-6 border rounded-3xl bg-primary/5 border-primary/10 relative overflow-hidden group">
                        <Zap className="absolute -right-4 -top-4 w-24 h-24 text-primary/5 transform -rotate-12 transition-transform group-hover:scale-110" />
                        <div className="relative z-10 space-y-4">
                            <Title as="h3" className="text-xl font-black tracking-tight">System Status</Title>
                            <div className="p-4 rounded-2xl bg-white/5 border border-primary/20 space-y-3">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                    <span className="text-xs font-bold">Frontend Ready</span>
                                </div>
                                <div className="flex items-center gap-3 opacity-50">
                                    <div className="w-5 h-5 rounded-full border-2 border-primary/30 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
                                    </div>
                                    <span className="text-xs font-bold">Backend Pending</span>
                                </div>
                            </div>
                            <Text className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                                The contribution engine is currently in <strong>Preview Mode</strong>. Submissions won&apos;t be persisted to the database yet.
                            </Text>
                        </div>
                    </div>

                    <div className="p-8 space-y-6 border rounded-3xl border-muted/30 bg-card/30">
                        <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Submission Checklist</Title>
                        <ul className="space-y-4">
                            {[
                                "Valid JSON structure",
                                "Clear, descriptive title",
                                "Anonymized environment variables",
                                "Relevant tags attached"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs font-bold text-muted-foreground/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
