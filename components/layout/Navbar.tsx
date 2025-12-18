'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Github, Menu } from 'lucide-react';
import { ActionIcon } from 'rizzui';
import { SearchBar } from '@/components/workflows/SearchBar';
import { ROUTES } from '@/constants/routes';
import { UserButton } from '@stackframe/stack';

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
    const [search, setSearch] = useState('');
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch and SSG errors by only rendering auth/theme components on client
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = (val: string) => {
        setSearch(val);
        // In a real app, this might navigate or trigger a global filter
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center gap-6 px-4">
                {/* Mobile Menu Trigger */}
                <div className="flex items-center gap-2 md:hidden">
                    <ActionIcon
                        variant="flat"
                        onClick={onMenuClick}
                        className="w-10 h-10 rounded-xl"
                        aria-label="Toggle Navigation Menu"
                    >
                        <Menu className="w-5 h-5" />
                    </ActionIcon>
                </div>

                {/* Logo */}
                <Link
                    href={ROUTES.HOME}
                    className="flex items-center gap-2 font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity"
                >
                    <span className="bg-primary text-primary-foreground px-1.5 rounded-lg">F</span>
                    <span className="hidden sm:inline">Flowhub</span>
                </Link>

                {/* Desktop Search */}
                <div className="flex-1 flex items-center justify-center max-w-xl mx-auto hidden md:flex">
                    <SearchBar
                        value={search}
                        onChange={handleSearch}
                        placeholder="Quick search..."
                        className="w-full"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 ml-auto">
                    <Link
                        href={ROUTES.GITHUB_REPO}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:block"
                    >
                        <ActionIcon
                            variant="outline"
                            className="rounded-xl w-10 h-10 border-muted/50 hover:border-primary/50 transition-all hover:bg-primary/5"
                            aria-label="View Project Source on GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </ActionIcon>
                    </Link>
                    {mounted && (
                        <>
                            <ThemeToggle />
                            {/* Stack Auth User Button */}
                            <div className="ml-2 border-l pl-4 border-muted/50 h-8 flex items-center">
                                <UserButton />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
