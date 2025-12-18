import { Badge } from 'rizzui';
import Link from 'next/link';
import { Box } from 'lucide-react';

export function NodeBadge({ node }: { node: string }) {
    return (
        <Link href={`/nodes/${node.toLowerCase()}`}>
            <Badge
                variant="outline"
                className="flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md hover:bg-muted transition-colors cursor-pointer border-border/50"
            >
                <Box className="w-3 h-3" />
                {node}
            </Badge>
        </Link>
    );
}
