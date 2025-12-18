'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { ActionIcon } from 'rizzui';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <ActionIcon variant="outline" className="rounded-full w-9 h-9" aria-label="Toggle theme">
                <span className="w-4 h-4" />
            </ActionIcon>
        );
    }

    return (
        <ActionIcon
            variant="outline"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full w-9 h-9"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </ActionIcon>
    );
}
