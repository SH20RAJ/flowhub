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
    ChevronRight,
    UserCircle,
    LayoutDashboard
} from 'lucide-react';
import { ActionIcon, Tooltip } from 'rizzui';
import { useState, useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { useUser } from '@stackframe/stack';

const navigation = [
    { name: 'Home', href: ROUTES.HOME, icon: Home },
    { name: 'Workflows', href: ROUTES.WORKFLOWS, icon: Workflow },
    { name: 'Tags', href: ROUTES.TAGS, icon: Tag },
    { name: 'Nodes', href: ROUTES.NODES, icon: Box },
    { name: 'About', href: ROUTES.ABOUT, icon: Info },
];

const authNavigation = [
    { name: 'My Workflows', href: '/my-workflows', icon: LayoutDashboard },
    { name: 'Profile Settings', href: '/profile', icon: UserCircle },
    { name: 'Submit Workflow', href: ROUTES.SUBMIT, icon: PlusCircle },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const pathname = usePathname();
    const user = useUser();
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Load persistence state from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('sidebar-collapsed');
        if (saved !== null) {
            setCollapsed(saved === 'true');
        }
        setMounted(true);
    }, []);

    // Save persistence state to localStorage
    const toggleCollapsed = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem('sidebar-collapsed', String(newState));
    };

    if (!mounted) return null;

    const navItems = user ? [...navigation, ...authNavigation] : [...navigation, { name: 'Submit Workflow', href: ROUTES.SUBMIT, icon: PlusCircle }];

    return (
        <aside
            className={cn(
                "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] border-r bg-card/30 backdrop-blur-xl transition-all duration-500 ease-in-out md:sticky",
                collapsed ? "w-20" : "w-72",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}
        >
            <div className="flex h-full flex-col gap-4 p-4">
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const content = (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                                    collapsed && "justify-center px-0 h-12"
                                )}
                                onClick={() => setIsOpen(false)}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground/60 group-hover:text-primary"
                                )} />
                                {!collapsed && <span className="truncate">{item.name}</span>}
                            </Link>
                        );

                        if (collapsed) {
                            return (
                                <Tooltip key={item.name} content={item.name} placement="right">
                                    {content}
                                </Tooltip>
                            );
                        }
                        return content;
                    })}
                </nav>

                <div className="mt-auto hidden md:block pt-4 border-t border-muted/50">
                    <ActionIcon
                        variant="flat"
                        onClick={toggleCollapsed}
                        className="w-full h-12 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all group"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? (
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                            <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                                Collapse Menu
                            </div>
                        )}
                    </ActionIcon>
                </div>
            </div>
        </aside>
    );
}
