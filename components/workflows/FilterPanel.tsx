'use client';

import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DIFFICULTY_OPTIONS, SOURCE_OPTIONS } from '@/constants/enums';

interface FilterPanelProps {
    difficulty: string;
    source: string;
    onDifficultyChange: (value: string) => void;
    onSourceChange: (value: string) => void;
    onClear: () => void;
    className?: string;
}

export function FilterPanel({
    difficulty,
    source,
    onDifficultyChange,
    onSourceChange,
    onClear,
    className,
}: FilterPanelProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-border/40 rounded-2xl bg-muted/10 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300",
            className
        )}>
            <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1 block">
                    Difficulty Level
                </span>
                <div className="relative">
                    <select
                        value={difficulty}
                        onChange={(e) => onDifficultyChange(e.target.value)}
                        className="w-full appearance-none bg-background border border-muted/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    >
                        {DIFFICULTY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
            </div>

            <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1 block">
                    Content Source
                </span>
                <div className="relative">
                    <select
                        value={source}
                        onChange={(e) => onSourceChange(e.target.value)}
                        className="w-full appearance-none bg-background border border-muted/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    >
                        {SOURCE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
            </div>

            <div className="flex items-end">
                <button
                    className="flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-primary h-[42px] px-4 gap-2 transition-colors w-full md:w-auto"
                    onClick={onClear}
                >
                    <X className="w-4 h-4" />
                    Reset All Filters
                </button>
            </div>
        </div>
    );
}
