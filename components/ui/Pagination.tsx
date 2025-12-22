'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    className?: string;
}

export function Pagination({ totalPages, currentPage, className }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `?${params.toString()}`;
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        router.push(createPageURL(page));
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center gap-2 mt-12", className)}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 rounded-xl border border-muted/50 hover:bg-muted/30 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-2">
                <span className="text-sm font-medium text-muted-foreground">
                    Page <span className="text-foreground font-bold">{currentPage}</span> of <span className="text-foreground font-bold">{totalPages}</span>
                </span>
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-xl border border-muted/50 hover:bg-muted/30 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                aria-label="Next page"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
