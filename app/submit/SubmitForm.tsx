'use client';

import { Title, Text, Input, Textarea, Select, Button } from 'rizzui';
import {
    AlertCircle,
    FileJson,
    ArrowRight,
    ShieldCheck,
    Lock
} from 'lucide-react';
import { DIFFICULTY_OPTIONS } from '@/constants/enums';
import { useUser, useStackApp } from '@stackframe/stack';
import { Skeleton } from '@/components/ui/LoadingSkeleton';
import { useState, useTransition } from 'react';
import { submitWorkflow } from './actions';

export function SubmitForm() {
    const user = useUser();
    const app = useStackApp();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    if (user === undefined) {
        return (
            <div className="max-w-4xl mx-auto py-32 flex flex-col items-center gap-6">
                <Skeleton className="h-64 rounded-[2.5rem]" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-xl mx-auto py-32 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
                    <Lock className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                    <Title as="h1" className="text-3xl font-black uppercase tracking-tight">Authentication Required</Title>
                    <Text className="text-muted-foreground font-medium text-lg">
                        You need to be signed in to contribute workflows to the community gallery.
                    </Text>
                </div>
                <Button
                    size="lg"
                    className="rounded-2xl px-12 h-14 font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    onClick={() => window.location.href = app.urls.signIn}
                >
                    Sign In to Continue
                </Button>
            </div>
        );
    }

    async function handleSubmit(formData: FormData) {
        setError(null);
        startTransition(async () => {
            try {
                await submitWorkflow(formData);
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : 'Something went wrong';
                setError(message);
            }
        });
    }

    return (
        <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 p-10 space-y-10 border-2 border-muted/30 rounded-[2.5rem] bg-card/30 backdrop-blur-xl shadow-2xl shadow-black/5">
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" /> {error}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-2">
                        <label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
                            Workflow Title
                        </label>
                        <Input
                            id="title"
                            name="title"
                            required
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
                            name="description"
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
                            name="difficulty"
                            options={DIFFICULTY_OPTIONS.filter(o => o.value !== 'all')}
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
                            name="tags"
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
                                name="json"
                                required
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
                    <Button
                        type="submit"
                        isLoading={isPending}
                        className="rounded-2xl w-full md:w-auto px-12 h-14 font-black uppercase tracking-[0.15em] shadow-xl shadow-primary/10"
                    >
                        Submit Workflow <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                </div>
            </div>
        </form>
    );
}
