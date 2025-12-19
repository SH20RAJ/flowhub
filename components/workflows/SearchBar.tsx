'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({
    value,
    onChange,
    onClear,
    placeholder = "Search workflows...",
    className,
}: SearchBarProps) {
    return (
        <div className={cn("relative group", className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
                type="search"
                placeholder={placeholder}
                className="pl-10 pr-10 h-11 w-full bg-muted/20 border border-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all rounded-xl text-foreground placeholder:text-muted-foreground/50"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && onClear && (
                <button
                    onClick={onClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                    aria-label="Clear search"
                >
                    <X className="w-3 h-3" />
                </button>
            )}
        </div>
    );
}
