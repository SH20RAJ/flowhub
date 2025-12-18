import Link from 'next/link';
import { cn } from '@/lib/utils';

export function TagBadge({ tag, className }: { tag: string; className?: string }) {
    const slug = tag.toLowerCase().replace(/\s+/g, '-');
    return (
        <Link
            href={`/tags/${slug}`}
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors",
                className
            )}
        >
            {tag}
        </Link>
    );
}
