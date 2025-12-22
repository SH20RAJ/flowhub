'use client';

import { useState, useEffect } from 'react';
import { Workflow } from '@/data/mock';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { WorkflowTable } from '@/components/workflows/WorkflowTable';
import { SearchBar } from '@/components/workflows/SearchBar';
import { FilterPanel } from '@/components/workflows/FilterPanel';
import { Pagination } from '@/components/ui/Pagination';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface WorkflowsContentProps {
    workflows: Workflow[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
}

export function WorkflowsContent({ workflows, totalPages, currentPage, totalCount }: WorkflowsContentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [view, setView] = useState<'grid' | 'table'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Get initial state from URL
    const initialSearch = searchParams.get('search') || '';
    const initialDifficulty = searchParams.get('difficulty') || 'all';
    const initialSource = searchParams.get('source') || 'all';

    const [search, setSearch] = useState(initialSearch);
    const [difficulty, setDifficulty] = useState(initialDifficulty);
    const [source, setSource] = useState(initialSource);

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== initialSearch) {
                updateFilters({ search });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const updateFilters = (updates: { search?: string; difficulty?: string; source?: string }) => {
        const params = new URLSearchParams(searchParams.toString());

        if (updates.search !== undefined) {
            if (updates.search) params.set('search', updates.search);
            else params.delete('search');
        }

        if (updates.difficulty !== undefined) {
            if (updates.difficulty !== 'all') params.set('difficulty', updates.difficulty);
            else params.delete('difficulty');
        }

        if (updates.source !== undefined) {
            if (updates.source !== 'all') params.set('source', updates.source);
            else params.delete('source');
        }

        // Reset to page 1 on filter change
        params.set('page', '1');

        router.push(`?${params.toString()}`);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
        updateFilters({ difficulty: value });
    };

    const handleSourceChange = (value: string) => {
        setSource(value);
        updateFilters({ source: value });
    };

    const clearFilters = () => {
        setSearch('');
        setDifficulty('all');
        setSource('all');
        router.push('?');
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header & View Toggles */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b pb-8 border-muted/30">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">
                        Workflows
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Browse through {totalCount} production-ready automations.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="inline-flex rounded-xl border border-muted/30 bg-muted/20 p-1.5 backdrop-blur-sm">
                        <button
                            onClick={() => setView('grid')}
                            className={cn(
                                "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
                                view === 'grid' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                            )}
                            title="Grid View"
                            aria-label="Grid View"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setView('table')}
                            className={cn(
                                "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
                                view === 'table' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                            )}
                            title="Table View"
                            aria-label="Table View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-2.5 h-12 px-5 rounded-xl border border-muted/50 font-bold transition-all hover:bg-muted/30",
                            showFilters && "text-primary border-primary bg-primary/5 ring-4 ring-primary/5"
                        )}
                        aria-expanded={showFilters}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {(difficulty !== 'all' || source !== 'all') && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <SearchBar
                    value={search}
                    onChange={handleSearchChange}
                    onClear={() => handleSearchChange('')}
                    className="max-w-2xl"
                />

                {showFilters && (
                    <FilterPanel
                        difficulty={difficulty}
                        source={source}
                        onDifficultyChange={handleDifficultyChange}
                        onSourceChange={handleSourceChange}
                        onClear={clearFilters}
                    />
                )}

                {workflows.length > 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {view === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {workflows.map((workflow) => (
                                    <WorkflowCard
                                        key={workflow.id}
                                        workflow={workflow}
                                    />
                                ))}
                            </div>
                        ) : (
                            <WorkflowTable workflows={workflows} />
                        )}

                        <Pagination totalPages={totalPages} currentPage={currentPage} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed rounded-3xl bg-muted/5 border-muted/30">
                        <div className="p-4 rounded-full bg-muted/50 mb-6">
                            <SlidersHorizontal className="w-10 h-10 text-muted-foreground opacity-30" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-widest text-muted-foreground/80">
                            No workflows found
                        </h3>
                        <p className="text-muted-foreground font-medium mt-2">
                            Try adjusting your search criteria or clear all filters.
                        </p>
                        <button
                            className="mt-8 rounded-xl px-8 h-11 font-bold bg-muted/20 hover:bg-muted/40 transition-colors text-foreground"
                            onClick={clearFilters}
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
