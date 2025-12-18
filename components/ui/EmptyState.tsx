'use client';

import { Title, Text, Button } from 'rizzui';
import { LucideIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    title,
    description,
    icon: Icon = Search,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed rounded-3xl bg-muted/5 border-muted/20 animate-in fade-in zoom-in duration-500",
            className
        )}>
            <div className="p-5 rounded-2xl bg-muted/30 mb-6 text-muted-foreground/40 ring-8 ring-muted/5">
                <Icon className="w-12 h-12" />
            </div>
            <Title as="h3" className="text-xl font-black uppercase tracking-widest text-muted-foreground/80 text-center">
                {title}
            </Title>
            <Text className="text-muted-foreground font-medium mt-3 text-center max-w-sm leading-relaxed">
                {description}
            </Text>
            {action && (
                <Button
                    variant="flat"
                    className="mt-8 rounded-xl px-10 h-12 font-bold transition-transform hover:scale-105"
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
}
