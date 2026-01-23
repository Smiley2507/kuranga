'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, Bell, ChevronLeft, CreditCard, Layers, PieChart, User as UserIcon, LogOut as LogOutIcon, Settings as SettingsIcon, ChevronDown, BookOpen, Wifi } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import Image from 'next/image';

const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Users', href: '/admin/users', icon: UserIcon },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Cohorts', href: '/admin/cohorts', icon: Layers },
    { name: 'Reports', href: '/admin/reports', icon: PieChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));

    useEffect(() => {
        const token = localStorage.getItem('asa_token');
        const role = localStorage.getItem('asa_role');

        if (!token || role !== 'ADMIN') {
            if (pathname !== '/admin/login') {
                router.push('/admin/login');
            }
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [pathname, router]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Handle click outside for profile dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('asa_token');
        localStorage.removeItem('asa_role');
        router.push('/admin/login');
    };

    if (pathname && pathname.startsWith('/admin/login')) return <>{children}</>;

    if (isLoggedIn === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex overflow-hidden text-foreground">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-background transition-all duration-300 ease-in-out transform md:relative md:translate-x-0 border-r border-border",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                !isSidebarOpen && "md:w-20"
            )}>
                <div className="h-full flex flex-col">
                    <div className="h-20 flex items-center justify-between px-6">
                        <div className={cn(
                            "flex flex-col gap-1 transition-all duration-300",
                            !isSidebarOpen && "md:w-0 md:opacity-0 md:overflow-hidden"
                        )}>
                            {mounted && (
                                <img
                                    src={isDarkMode ? '/logo-white.png' : '/logo-black.png'}
                                    alt="Kuranga Logo"
                                    className="h-8 w-auto object-contain"
                                />
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Admin Dashboard
                            </span>
                        </div>
                        <div className={cn(
                            "transition-all duration-300",
                            isSidebarOpen && "md:opacity-0 md:w-0 md:overflow-hidden"
                        )}>
                            <div className="w-10 h-10 rounded-[5px] bg-accent/10 flex items-center justify-center">
                                <Wifi size={20} className="text-accent" />
                            </div>
                        </div>
                        <div className="flex md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="hidden md:flex p-1.5 rounded-[5px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                        >
                            <ChevronLeft size={16} className={cn("transition-transform duration-300", !isSidebarOpen && "rotate-180")} />
                        </motion.button>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={cn(
                                        "flex items-center gap-3 px-3.5 py-2.5 rounded-[5px] transition-all duration-200 group relative",
                                        pathname.startsWith(item.href)
                                            ? "bg-accent/10 text-accent font-semibold"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}>
                                    <item.icon size={20} className={cn(
                                        "shrink-0",
                                        pathname.startsWith(item.href) ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                                    )} />
                                    <span className={cn(
                                        "font-semibold text-sm transition-all duration-300 overflow-hidden whitespace-nowrap",
                                        !isSidebarOpen && "md:w-0 md:opacity-0"
                                    )}>{item.name}</span>
                                    {pathname.startsWith(item.href) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute right-0 w-1 h-5 bg-accent rounded-l-[5px]"
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-border">
                        <motion.button
                            whileHover={{ x: 4, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3.5 py-2.5 w-full rounded-[5px] text-muted-foreground hover:text-destructive transition-all duration-200 group"
                        >
                            <LogOut size={20} className="shrink-0" />
                            <span className={cn(
                                "font-semibold text-sm transition-all duration-300 overflow-hidden whitespace-nowrap",
                                !isSidebarOpen && "md:w-0 md:opacity-0"
                            )}>Logout</span>
                        </motion.button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
                {/* Topbar */}
                <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 shrink-0">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-[5px] transition-colors"
                        >
                            <Menu size={22} />
                        </motion.button>
                        <h2 className="hidden md:block font-semibold text-foreground capitalize tracking-tight">
                            {pathname.split('/').pop()?.replace('-', ' ')}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <ThemeToggle />

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-[5px] transition-all relative group"
                        >
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-destructive rounded-full"></span>
                        </motion.button>

                        <div className="h-4 w-px bg-border mx-1 hidden sm:block"></div>

                        <div ref={profileRef} className="relative">
                            <motion.div
                                whileHover={{ backgroundColor: 'var(--muted)' }}
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 group cursor-pointer p-1.5 rounded-[5px] transition-all"
                            >
                                <div className="text-sm text-right hidden lg:block">
                                    <p className="font-semibold text-foreground leading-none">Administrator</p>
                                    <p className="text-[10px] uppercase font-semibold text-muted-foreground mt-1 tracking-widest flex items-center gap-1">
                                        Super Admin <ChevronDown size={10} className={cn("transition-transform", isProfileOpen && "rotate-180")} />
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-[5px] bg-foreground flex items-center justify-center text-accent font-bold text-xs shadow-lg shadow-accent/20">
                                    A
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-[5px] shadow-2xl z-50 py-2"
                                    >
                                        <div className="px-4 py-2 border-b border-border mb-1 lg:hidden">
                                            <p className="font-bold text-sm">Administrator</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Super Admin</p>
                                        </div>
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                            onClick={() => { router.push('/admin/users'); setIsProfileOpen(false); }}
                                        >
                                            <UserIcon size={16} /> User Management
                                        </button>
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                            onClick={() => { router.push('/admin/settings'); setIsProfileOpen(false); }}
                                        >
                                            <SettingsIcon size={16} /> System Settings
                                        </button>
                                        <div className="h-px bg-border my-1" />
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                            onClick={handleLogout}
                                        >
                                            <LogOutIcon size={16} /> Logout Session
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
