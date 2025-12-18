'use client';

import { Badge } from 'rizzui';
import Link from 'next/link';
import { Box } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { slugify } from '@/utils/slug';

interface NodeBadgeProps {
    node: string;
    className?: string;
    showIcon?: boolean;
}

export function NodeBadge({ node, className, showIcon = true }: NodeBadgeProps) {
    return (
        <Link href={ROUTES.NODE_DETAIL(slugify(node))}>
            <Badge
                variant="outline"
                className={({
                    className: "flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md hover:bg-muted transition-colors cursor-pointer border-border/50",
                }).className + (className ? ` ${className}` : '')}
            >
                {showIcon && <Box className="w-3 h-3" />}
                {node}
            </Badge>
        </Link>
    );
}
