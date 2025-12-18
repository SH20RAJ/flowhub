'use client';

import { Select, Text, Button } from 'rizzui';
import { X } from 'lucide-react';
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
            "grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border rounded-2xl bg-muted/10 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300",
            className
        )}>
            <div className="space-y-2">
                <Text className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
                    Difficulty Level
                </Text>
                <Select
                    options={DIFFICULTY_OPTIONS}
                    value={difficulty}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(val: any) => onDifficultyChange(val)}
                    className="w-full"
                    dropdownClassName="rounded-xl border-muted/50 shadow-xl"
                />
            </div>

            <div className="space-y-2">
                <Text className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
                    Content Source
                </Text>
                <Select
                    options={SOURCE_OPTIONS}
                    value={source}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(val: any) => onSourceChange(val)}
                    className="w-full"
                    dropdownClassName="rounded-xl border-muted/50 shadow-xl"
                />
            </div>

            <div className="flex items-end">
                <Button
                    variant="text"
                    className="text-xs font-bold text-muted-foreground hover:text-primary h-11 px-4 gap-2 transition-colors"
                    onClick={onClear}
                >
                    <X className="w-4 h-4" />
                    Reset All Filters
                </Button>
            </div>
        </div>
    );
}
