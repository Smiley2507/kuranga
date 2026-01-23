'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { Lock, Mail, ArrowRight, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';


export default function PartnerLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await api.login({ username: email, password: password });
            if (res.data.role !== 'PARTNER') {
                throw new Error('Unauthorized access: Partner portal restricted.');
            }
            localStorage.setItem('asa_token', res.data.token);
            localStorage.setItem('asa_role', res.data.role);
            router.push('/partner/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background font-sans overflow-hidden">
            {/* Left Column - Image & Branding (60%) */}
            <div className="hidden md:flex md:w-[60%] relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1614854262318-831574f15f1f?q=80&w=2670&auto=format&fit=crop")' }}
                />
            </div>

            {/* Right Column - Login Form (40%) */}
            <div className="w-full md:w-[40%] flex flex-col bg-background relative z-10">
                <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-12">
                    <div className="mb-10 text-center md:text-left">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-[5px] bg-primary/10 text-primary mb-6">
                            <Building2 size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-foreground tracking-tighter leading-none mb-3">Partner Access</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-3.5 top-[38px] text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                <Input
                                    label="Partner Email"
                                    className="pl-11 h-14 bg-muted/30 focus:bg-background transition-all ring-primary/20 rounded-[5px]"
                                    placeholder="partner@chancen.rw"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3.5 top-[38px] text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                <Input
                                    label="Security Key"
                                    type="password"
                                    className="pl-11 h-14 bg-muted/30 focus:bg-background transition-all ring-primary/20 rounded-[5px]"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-[5px] bg-destructive/10 border border-destructive/20"
                            >
                                <p className="text-xs font-bold text-destructive text-center uppercase tracking-tight">
                                    {error}
                                </p>
                            </motion.div>
                        )}

                        <Button
                            variant="primary"
                            className="w-full h-14 font-extrabold shadow-xl shadow-primary/10 rounded-[5px] group active:scale-[0.98] transition-all bg-primary hover:bg-primary/90"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Enter Partner Portal <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                </div>

                <div className="px-8 md:px-12 py-8 border-t border-border/50">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] text-center md:text-left">
                        &copy; 2026 Kuranga Digital Ltd
                    </p>
                </div>
            </div>
        </div>
    );
}
