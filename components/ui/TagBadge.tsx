'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { slugify } from '@/utils/slug';

interface TagBadgeProps {
    tag: string;
    className?: string;
    variant?: 'default' | 'flat' | 'outline';
}

export function TagBadge({ tag, className, variant = 'default' }: TagBadgeProps) {
    const styles = {
        default: "bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground",
        flat: "bg-primary/10 text-primary hover:bg-primary/20",
        outline: "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground",
    };

    return (
        <Link
            href={ROUTES.TAG_DETAIL(slugify(tag))}
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border transition-colors",
                styles[variant],
                className
            )}
        >
            {tag}
        </Link>
    );
}
