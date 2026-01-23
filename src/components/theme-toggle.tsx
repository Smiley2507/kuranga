'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10 rounded-[5px] border border-border bg-card" />;
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-[5px] border border-border hover:bg-muted transition-all"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? (
                <Sun className="h-5 w-5 text-amber-500" />
            ) : (
                <Moon className="h-5 w-5 text-accent" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
