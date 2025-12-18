'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={cn("animate-pulse rounded-md bg-muted/30", className)} />
    );
}

export function WorkflowCardSkeleton() {
    return (
        <div className="flex flex-col h-full p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-4">
            <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="mt-auto pt-4 flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
            </div>
        </div>
    );
}

export function WorkflowTableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex gap-4 border-b pb-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 py-4 border-b last:border-0">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
        </div>
    );
}
