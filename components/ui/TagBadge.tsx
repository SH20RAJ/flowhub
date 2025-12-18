import { Badge } from 'rizzui';
import Link from 'next/link';

export function TagBadge({ tag }: { tag: string }) {
    return (
        <Link href={`/tags/${tag.toLowerCase()}`}>
            <Badge
                variant="flat"
                className="text-[10px] font-medium px-2 py-0.5 rounded-full hover:bg-muted transition-colors cursor-pointer"
            >
                {tag}
            </Badge>
        </Link>
    );
}
