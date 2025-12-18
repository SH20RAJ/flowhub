'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Home,
    Workflow,
    Tag,
    Box,
    PlusCircle,
    Info,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { ActionIcon } from 'rizzui';
import { useState } from 'react';

const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Workflows', href: '/workflows', icon: Workflow },
    { name: 'Tags', href: '/tags', icon: Tag },
    { name: 'Nodes', href: '/nodes', icon: Box },
    { name: 'Submit Workflow', href: '/submit', icon: PlusCircle },
    { name: 'About', href: '/about', icon: Info },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] border-r bg-background transition-all duration-300 md:sticky",
                collapsed ? "w-16" : "w-64",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}
        >
            <div className="flex h-full flex-col gap-2 p-2">
                <div className="flex-1 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                    collapsed && "justify-center px-2"
                                )}
                                title={collapsed ? item.name : undefined}
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="h-4 w-4 shrink-0" />
                                {!collapsed && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-auto hidden md:block">
                    <ActionIcon
                        variant="flat"
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-full h-9 rounded-md"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </ActionIcon>
                </div>
            </div>
        </aside>
    );
}
