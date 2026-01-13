'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dropdown } from '@/components/ui/Dropdown';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    {
        name: 'Initiatives',
        href: '#',
        type: 'dropdown',
        items: [
            { name: 'Digital on Demand', href: '/services' },
            { name: 'MyPathpreneur', href: '/programs' },
            { name: 'ASA Program', href: '/training' },
            { name: 'HR Outsourcing', href: '/programs' }
        ]
    },
    { name: 'Contact', href: '/contact' },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Detect scroll to toggle glass effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <ScrollProgress />
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                    scrolled
                        ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-white/50'
                        : 'bg-transparent'
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="inline-block z-50">
                            <Image
                                src={scrolled ? "/logo-black.png" : "/logo-white.png"}
                                alt="Kuranga Digital Logo"
                                width={180}
                                height={50}
                                className="h-10 w-auto object-contain transition-all duration-300"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                item.type === 'dropdown' ? (
                                    <Dropdown
                                        key={item.name}
                                        label={item.name}
                                        items={item.items || []}
                                        scrolled={scrolled}
                                    />
                                ) : (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'text-sm font-medium transition-colors font-sans',
                                            pathname === item.href
                                                ? 'text-accent font-semibold'
                                                : scrolled
                                                    ? 'text-gray-600 hover:text-accent'
                                                    : 'text-white/90 hover:text-white'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            ))}
                            <Link href="/contact">
                                <button className={cn(
                                    "px-5 py-2.5 rounded-md text-sm font-medium transition-all font-sans",
                                    scrolled
                                        ? "bg-accent text-white hover:bg-accent/90"
                                        : "bg-white text-primary hover:bg-gray-100"
                                )}>
                                    Get Started
                                </button>
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className={cn(
                                "md:hidden z-50 p-2 transition-colors",
                                scrolled || isOpen ? "text-primary" : "text-white"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Mobile Navigation Overlay */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 rounded-xl glass-panel bg-white shadow-xl md:hidden flex flex-col gap-4"
                                >
                                    <nav className="flex flex-col gap-4 mt-2">
                                        {navItems.map((item) => (
                                            item.type === 'dropdown' ? (
                                                <div key={item.name} className="flex flex-col gap-2">
                                                    <span className="text-lg font-semibold text-primary px-4">{item.name}</span>
                                                    {item.items?.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            className="pl-8 py-1 text-base font-medium text-gray-600 hover:text-accent"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={cn(
                                                        'text-lg font-medium transition-colors font-sans px-4 py-2 hover:bg-gray-50 rounded-lg',
                                                        pathname === item.href
                                                            ? 'text-accent font-semibold'
                                                            : 'text-gray-600'
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        ))}
                                    </nav>
                                    <div className="pt-2 border-t border-gray-100">
                                        <Link href="/contact" onClick={() => setIsOpen(false)}>
                                            <button className="w-full bg-accent text-white py-3 rounded-md font-medium">Get Started</button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>
        </>
    );
}
