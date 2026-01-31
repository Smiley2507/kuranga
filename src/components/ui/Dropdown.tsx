'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DropdownItem {
    name: string;
    href: string;
}

interface DropdownProps {
    label: string;
    items: DropdownItem[];
    scrolled: boolean;
}

export function Dropdown({ label, items, scrolled }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={cn(
                    'text-sm font-medium transition-colors flex items-center gap-1 py-6 px-4 relative group',
                    scrolled
                        ? 'text-foreground hover:text-accent'
                        : 'text-white/90 hover:text-white'
                )}
            >
                {label}
                <ChevronDown
                    size={14}
                    className={cn(
                        'transition-transform duration-300',
                        isOpen && 'rotate-180'
                    )}
                />
                <span className={cn(
                    "absolute bottom-4 left-4 right-4 h-0.5 bg-accent scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
                    isOpen && "scale-x-100"
                )} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-0 w-64 bg-background/95 backdrop-blur-xl rounded-[5px] shadow-2xl border border-border overflow-hidden z-50 focus:outline-none"
                    >
                        <div className="py-2">
                            {items.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-6 py-3 text-sm font-medium text-foreground hover:bg-muted/50 hover:text-accent transition-all border-l-2 border-transparent hover:border-accent"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {item.name}
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
