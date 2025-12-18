'use client';

import { useState } from 'react';
import { Title, Text, Input, Textarea, Select, Button, Card } from 'rizzui';
import {
    Upload,
    Terminal,
    Tag as TagIcon,
    Link as LinkIcon,
    AlertCircle,
    FileJson,
    CheckCircle2
} from 'lucide-react';

const difficultyOptions = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
];

export default function SubmitPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="max-w-3xl mx-auto py-12 space-y-8">
            <div className="space-y-2">
                <Title as="h1" className="text-3xl font-bold">Submit Workflow</Title>
                <Text className="text-muted-foreground">
                    Share your n8n automation with the community. Please ensure your JSON is anonymized.
                </Text>
            </div>

            <Card className="p-8 space-y-8 border-muted/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <Text className="text-sm font-bold uppercase text-muted-foreground">Workflow Title</Text>
                        <Input
                            placeholder="e.g., Slack to Google Sheets Reporter"
                            className="h-11"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <Text className="text-sm font-bold uppercase text-muted-foreground">Description</Text>
                        <Textarea
                            placeholder="Explain what this workflow does and any requirements..."
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <Text className="text-sm font-bold uppercase text-muted-foreground">Difficulty</Text>
                        <Select options={difficultyOptions} />
                    </div>

                    <div className="space-y-2">
                        <Text className="text-sm font-bold uppercase text-muted-foreground">Tags (Comma separated)</Text>
                        <Input placeholder="AI, Productivity, Slack" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <div className="flex items-center justify-between">
                            <Text className="text-sm font-bold uppercase text-muted-foreground">Workflow JSON</Text>
                            <Text className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 text-yellow-500" /> Remove credentials from JSON
                            </Text>
                        </div>
                        <div className="relative group">
                            <Textarea
                                placeholder="Paste your n8n workflow JSON here..."
                                rows={10}
                                className="font-mono text-xs"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-muted/20 border-2 border-dashed rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="flex flex-col items-center gap-2">
                                    <FileJson className="w-8 h-8 text-muted-foreground" />
                                    <Text className="text-sm font-medium">Drop JSON file here</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>By submitting, you agree to the open-source license.</span>
                    </div>
                    <Button size="lg" disabled className="rounded-full w-full md:w-auto px-10">
                        Submit Workflow
                    </Button>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <Text className="text-sm font-bold text-primary">Submission is currently UI-only</Text>
                        <Text className="text-xs text-primary/80 leading-relaxed">
                            We are working on the backend integration. For now, you can explore the interface.
                            Full functionality coming soon.
                        </Text>
                    </div>
                </div>
            </Card>
        </div>
    );
}
