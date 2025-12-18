'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/LoadingSkeleton';

interface JsonViewerProps {
    json: string;
    title?: string;
    className?: string;
}

// Lazy load the JsonViewer as it's a heavy client-side component (often includes highlights/editors)
const JsonViewerImpl = dynamic<JsonViewerProps>(() => import('./JsonViewerImpl').then(mod => mod.JsonViewerImpl), {
    loading: () => (
        <div className="w-full h-96 animate-pulse bg-muted/20 rounded-2xl flex items-center justify-center border border-muted/50">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="w-32 h-4 bg-muted/30 rounded-full" />
            </div>
        </div>
    ),
    ssr: false,
});

export function JsonViewer(props: JsonViewerProps) {
    return <JsonViewerImpl {...props} />;
}
