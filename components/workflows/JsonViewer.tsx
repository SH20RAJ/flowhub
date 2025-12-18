'use client';

import { useState, Suspense, lazy } from 'react';
import { Title, ActionIcon } from 'rizzui';
import { Copy, Check, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Potential for a real code highlighter later
const CodeBlock = lazy(() => Promise.resolve({
    default: ({ code }: { code: string }) => (
        <pre className="p-4 text-xs font-mono overflow-x-auto bg-black/5 dark:bg-black/20 leading-relaxed max-h-[500px] scrollbar-thin scrollbar-thumb-muted">
            <code>{code}</code>
        </pre>
    )
}));

interface JsonViewerProps {
    json: string;
    title?: string;
    className?: string;
    defaultExpanded?: boolean;
}

export function JsonViewer({
    json,
    title = 'Workflow JSON',
    className,
    defaultExpanded = true,
}: JsonViewerProps) {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(json);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={cn("rounded-2xl border bg-card/50 overflow-hidden transition-all duration-300", className)}>
            <div className="flex items-center justify-between px-5 py-3 border-b bg-muted/30">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    aria-expanded={isExpanded}
                >
                    <div className="p-1 rounded-md bg-muted/50">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                    <Title as="h4" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">
                        {title}
                    </Title>
                </button>

                <ActionIcon
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="w-10 h-10 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    title="Copy JSON to clipboard"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </ActionIcon>
            </div>

            <div className={cn(
                "grid transition-all duration-300 ease-in-out",
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}>
                <div className="overflow-hidden">
                    <Suspense fallback={
                        <div className="p-8 flex items-center justify-center text-muted-foreground">
                            <Loader2 className="w-6 h-6 animate-spin mr-2" />
                            <span className="text-xs font-bold uppercase tracking-wider">Parsing JSON...</span>
                        </div>
                    }>
                        <CodeBlock code={json} />
                    </Suspense>
                </div>
            </div>

            {!isExpanded && (
                <div className="px-5 py-2 italic text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest bg-muted/10">
                    Click header to expand workflow code
                </div>
            )}
        </div>
    );
}
