'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MegaMenuItem {
    name: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
}

interface MegaMenuProps {
    label: string;
    items: MegaMenuItem[];
    scrolled: boolean;
}

export function MegaMenu({ label, items, scrolled }: MegaMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    return (
        <div
            className="static"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={cn(
                    'text-sm font-medium transition-colors flex items-center gap-1 py-6 px-2 relative group',
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
                    "absolute bottom-4 left-2 right-2 h-0.5 bg-accent scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
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
                        className="absolute top-full left-0 right-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl z-40 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="lg:col-span-1">
                                    <h3 className="text-2xl font-bold text-primary mb-4">{label}</h3>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                        Discover our range of {label.toLowerCase()} tailored for your business success.
                                    </p>
                                    <Link
                                        href={label.toLowerCase() === 'products' ? '/products' : '/services'}
                                        onClick={() => setIsOpen(false)}
                                        className="inline-flex items-center gap-2 text-accent text-sm font-bold hover:gap-3 transition-all"
                                    >
                                        View All {label} <ArrowRight size={16} />
                                    </Link>
                                </div>
                                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                                    {items.map((item, index) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="group p-4 rounded-xl hover:bg-muted/50 transition-all border border-transparent hover:border-border/50"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors mb-1">
                                                    {item.name}
                                                </span>
                                                {item.description && (
                                                    <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                        {item.description}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
