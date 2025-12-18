'use client';

import { useState } from 'react';
import { workflows } from '@/data/mock';
import { Title, Text, Input, Select, ActionIcon, Button } from 'rizzui';
import { Search, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { WorkflowTable } from '@/components/workflows/WorkflowTable';
import { cn } from '@/lib/utils';

const difficultyOptions = [
    { label: 'All Difficulties', value: 'all' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
];

const sourceOptions = [
    { label: 'All Sources', value: 'all' },
    { label: 'Official', value: 'Official' },
    { label: 'Community', value: 'Community' },
];

export default function WorkflowsPage() {
    const [view, setView] = useState<'grid' | 'table'>('grid');
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('all');
    const [source, setSource] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const filteredWorkflows = workflows.filter((w) => {
        const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.description.toLowerCase().includes(search.toLowerCase());
        const matchesDifficulty = difficulty === 'all' || w.difficulty === difficulty;
        const matchesSource = source === 'all' || w.source === source;
        return matchesSearch && matchesDifficulty && matchesSource;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1">
                    <Title as="h1" className="text-3xl font-bold">Workflows</Title>
                    <Text className="text-muted-foreground">Discover and explore automations for your tech stack.</Text>
                </div>
                <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-lg border bg-muted/50 p-1">
                        <ActionIcon
                            variant={view === 'grid' ? 'flat' : 'text'}
                            onClick={() => setView('grid')}
                            className={cn("w-8 h-8", view === 'grid' && "bg-background shadow-sm")}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </ActionIcon>
                        <ActionIcon
                            variant={view === 'table' ? 'flat' : 'text'}
                            onClick={() => setView('table')}
                            className={cn("w-8 h-8", view === 'table' && "bg-background shadow-sm")}
                        >
                            <List className="w-4 h-4" />
                        </ActionIcon>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn("gap-2", showFilters && "text-primary border-primary bg-primary/5")}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by title, description, or tools..."
                        className="pl-10 h-10 w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/20 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-1.5">
                            <Text className="text-xs font-bold uppercase text-muted-foreground">Difficulty</Text>
                            <Select
                                options={difficultyOptions}
                                value={difficulty}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(val: any) => setDifficulty(val)}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Text className="text-xs font-bold uppercase text-muted-foreground">Source</Text>
                            <Select
                                options={sourceOptions}
                                value={source}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(val: any) => setSource(val)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                variant="text"
                                className="text-xs text-muted-foreground hover:text-foreground h-9"
                                onClick={() => {
                                    setDifficulty('all');
                                    setSource('all');
                                    setSearch('');
                                }}
                            >
                                <X className="w-3.5 h-3.5 mr-1" /> Clear all filters
                            </Button>
                        </div>
                    </div>
                )}

                {filteredWorkflows.length > 0 ? (
                    view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWorkflows.map((workflow) => (
                                <WorkflowCard key={workflow.id} workflow={workflow} />
                            ))}
                        </div>
                    ) : (
                        <WorkflowTable workflows={filteredWorkflows} />
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-lg bg-muted/10">
                        <Search className="w-10 h-10 text-muted-foreground mb-4 opacity-20" />
                        <Title as="h3" className="text-lg font-semibold">No workflows found</Title>
                        <Text className="text-muted-foreground text-sm">Try adjusting your search or filters.</Text>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setDifficulty('all');
                                setSource('all');
                                setSearch('');
                            }}
                        >
                            Reset all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
