'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Github, Search, Menu } from 'lucide-react';
import { Input, ActionIcon } from 'rizzui';

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md">
            <div className="container mx-auto flex h-14 items-center gap-4 px-4">
                <div className="flex items-center gap-2 md:hidden">
                    <ActionIcon
                        variant="flat"
                        onClick={onMenuClick}
                        className="w-8 h-8"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </ActionIcon>
                </div>

                <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-xl">
                    <span>Flowhub</span>
                </Link>

                <div className="flex-1 flex items-center justify-center max-w-md mx-auto hidden md:flex">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search workflows..."
                            className="pl-9 h-9 w-full bg-muted/50 border-none focus:ring-1"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <Link
                        href="https://github.com/n8n-io/n8n"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:block"
                    >
                        <ActionIcon variant="outline" className="rounded-full w-9 h-9" aria-label="GitHub">
                            <Github className="w-4 h-4" />
                        </ActionIcon>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
