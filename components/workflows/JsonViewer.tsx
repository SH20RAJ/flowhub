'use client';

import { useState } from 'react';
import { Title, ActionIcon } from 'rizzui';
import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';

export function JsonViewer({ json, title }: { json: string, title?: string }) {
    const [copied, setCopied] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-lg border bg-muted/30 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <div className="flex items-center gap-2">
                    <ActionIcon
                        variant="flat"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-6 h-6"
                    >
                        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </ActionIcon>
                    <Title as="h4" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {title || 'Workflow JSON'}
                    </Title>
                </div>
                <ActionIcon
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="w-8 h-8 rounded-md"
                    title="Copy JSON"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </ActionIcon>
            </div>

            {!isCollapsed && (
                <pre className="p-4 text-xs font-mono overflow-x-auto bg-black/5 dark:bg-black/20 leading-relaxed max-h-[500px]">
                    <code>{json}</code>
                </pre>
            )}

            {isCollapsed && (
                <div className="px-4 py-2 italic text-xs text-muted-foreground">
                    JSON content collapsed...
                </div>
            )}
        </div>
    );
}
