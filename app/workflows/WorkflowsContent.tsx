'use client';

import { useState, useMemo } from 'react';
import { Workflow } from '@/data/mock';
import { Title, Text, ActionIcon, Button } from 'rizzui';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { WorkflowTable } from '@/components/workflows/WorkflowTable';
import { SearchBar } from '@/components/workflows/SearchBar';
import { FilterPanel } from '@/components/workflows/FilterPanel';
import { cn } from '@/lib/utils';

interface WorkflowsContentProps {
    workflows: Workflow[];
}

export function WorkflowsContent({ workflows }: WorkflowsContentProps) {
    const [view, setView] = useState<'grid' | 'table'>('grid');
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('all');
    const [source, setSource] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const filteredWorkflows = useMemo(() => {
        return workflows.filter((w) => {
            const matchesSearch =
                w.title.toLowerCase().includes(search.toLowerCase()) ||
                w.description.toLowerCase().includes(search.toLowerCase()) ||
                w.nodes.some(n => n.toLowerCase().includes(search.toLowerCase())) ||
                w.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

            const matchesDifficulty = difficulty === 'all' || w.difficulty === difficulty;
            const matchesSource = source === 'all' || (w as typeof w & { source?: string }).source === source;

            return matchesSearch && matchesDifficulty && matchesSource;
        });
    }, [workflows, search, difficulty, source]);

    const clearFilters = () => {
        setDifficulty('all');
        setSource('all');
        setSearch('');
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header & View Toggles */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b pb-8">
                <div className="space-y-2">
                    <Title as="h1" className="text-4xl font-black tracking-tight">
                        Workflows
                    </Title>
                    <Text className="text-muted-foreground font-medium">
                        Browse through {workflows.length} production-ready automations.
                    </Text>
                </div>

                <div className="flex items-center gap-3">
                    <div className="inline-flex rounded-xl border bg-muted/20 p-1.5 backdrop-blur-sm">
                        <ActionIcon
                            variant={view === 'grid' ? 'flat' : 'text'}
                            onClick={() => setView('grid')}
                            className={cn(
                                "w-9 h-9 rounded-lg transition-all",
                                view === 'grid' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                            title="Grid View"
                            aria-label="Grid View"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </ActionIcon>
                        <ActionIcon
                            variant={view === 'table' ? 'flat' : 'text'}
                            onClick={() => setView('table')}
                            className={cn(
                                "w-9 h-9 rounded-lg transition-all",
                                view === 'table' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                            title="Table View"
                            aria-label="Table View"
                        >
                            <List className="w-4 h-4" />
                        </ActionIcon>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "gap-2.5 h-12 px-5 rounded-xl border-muted/50 font-bold transition-all",
                            showFilters && "text-primary border-primary bg-primary/5 ring-4 ring-primary/5"
                        )}
                        aria-expanded={showFilters}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {(difficulty !== 'all' || source !== 'all') && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    onClear={() => setSearch('')}
                    className="max-w-2xl"
                />

                {showFilters && (
                    <FilterPanel
                        difficulty={difficulty}
                        source={source}
                        onDifficultyChange={setDifficulty}
                        onSourceChange={setSource}
                        onClear={clearFilters}
                    />
                )}

                {filteredWorkflows.length > 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {view === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredWorkflows.map((workflow) => (
                                    <WorkflowCard
                                        key={workflow.id}
                                        workflow={workflow}
                                    />
                                ))}
                            </div>
                        ) : (
                            <WorkflowTable workflows={filteredWorkflows} />
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed rounded-3xl bg-muted/5 border-muted/30">
                        <div className="p-4 rounded-full bg-muted/50 mb-6">
                            <SlidersHorizontal className="w-10 h-10 text-muted-foreground opacity-30" />
                        </div>
                        <Title as="h3" className="text-xl font-black uppercase tracking-widest text-muted-foreground/80">
                            No workflows found
                        </Title>
                        <Text className="text-muted-foreground font-medium mt-2">
                            Try adjusting your search criteria or clear all filters.
                        </Text>
                        <Button
                            variant="flat"
                            className="mt-8 rounded-xl px-8 h-11 font-bold"
                            onClick={clearFilters}
                        >
                            Reset All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
