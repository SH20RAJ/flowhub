'use client';

import { Title, Text, Button } from 'rizzui';
import {
    Copy,
    Check,
    ChevronDown,
    ChevronRight,
    Search,
    Code2,
    Eye
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface JsonViewerProps {
    json: string;
    title?: string;
    className?: string;
}

export function JsonViewerImpl({ json, title, className }: JsonViewerProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn(
            "group relative overflow-hidden border-2 border-muted/30 rounded-[2rem] bg-card/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5",
            isExpanded ? "ring-2 ring-primary/10" : "",
            className
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-muted/50 bg-muted/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                        <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                            {title || "Workflow Configuration"}
                        </Title>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="text"
                        size="sm"
                        onClick={handleCopy}
                        className="h-9 px-3 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-2 hover:bg-primary/5 hover:text-primary transition-all"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button
                        variant="flat"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="h-9 px-4 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-2 bg-primary/5 text-primary hover:bg-primary/10 transition-all border border-primary/10"
                    >
                        {isExpanded ? <Eye className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
                        {isExpanded ? "Collapse" : "Explore Code"}
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </Button>
                </div>
            </div>

            {/* Content Buffer */}
            <div className={cn(
                "transition-all duration-700 ease-in-out relative overflow-hidden",
                isExpanded ? "max-h-[800px] overflow-y-auto" : "max-h-24"
            )}>
                <pre className="p-8 text-[11px] font-mono leading-relaxed text-muted-foreground/80 selection:bg-primary selection:text-primary-foreground select-all">
                    <code>{json}</code>
                </pre>

                {!isExpanded && (
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/80 to-transparent pointer-events-none flex items-end justify-center pb-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                            Click Explore to view full configuration
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            {isExpanded && (
                <div className="px-8 py-3 bg-muted/5 border-t border-muted/50 flex items-center justify-between">
                    <Text className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                        {json.length.toLocaleString()} characters • UTF-8 JSON
                    </Text>
                </div>
            )}
        </div>
    );
}
