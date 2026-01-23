'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { api, DashboardStats } from "@/lib/api";
import { Users, Clock, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getAdminStats()
            .then(res => setStats(res.data))
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const cards = [
        { title: 'Total Students', value: stats?.totalStudents || 0, icon: Users, color: 'text-primary', trend: '+12%', isUp: true },
        { title: 'Under Review', value: stats?.underReview || 0, icon: Clock, color: 'text-amber-500', trend: 'Waitlist', isUp: true },
        { title: 'Sponsored Apps', value: stats?.sponsoredStudents || 0, icon: Zap, color: 'text-purple-500', trend: 'Partner', isUp: true },
        { title: 'Approved Students', value: stats?.approved || 0, icon: CheckCircle2, color: 'text-emerald-500', trend: 'Selected', isUp: true },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Overview</h1>
                    <p className="text-muted-foreground text-sm font-medium">Platform performance and student registration metrics.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-[5px]">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <Card key={card.title} className="p-6 border-border shadow-sm border bg-card group" hoverEffect>
                        <div className="flex items-start justify-between mb-6">
                            <div className={cn("w-12 h-12 rounded-[5px] bg-muted flex items-center justify-center border border-border transition-colors group-hover:bg-foreground group-hover:text-accent", card.color)}>
                                <card.icon size={22} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-[5px] border",
                                card.isUp ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                            )}>
                                {card.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {card.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-2">{card.title}</p>
                            <p className="text-3xl font-bold text-foreground tracking-tighter">
                                {isLoading ? (
                                    <span className="inline-block w-12 h-8 bg-muted animate-pulse rounded-[5px]"></span>
                                ) : card.value}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-border shadow-sm p-8 md:p-10 border bg-card">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-tighter">Registration Statistics</h3>
                            <p className="text-xs text-muted-foreground font-bold mt-1">Growth overview</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-9 rounded-[5px] font-bold text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
                            Detailed Report
                        </Button>
                    </div>
                    <div className="h-64 w-full bg-muted/30 rounded-[5px] border border-dashed border-border flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-end justify-around px-8 pb-4">
                            {[30, 60, 40, 80, 55, 75, 45, 95, 65, 85].map((h, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 w-full max-w-[16px]">
                                    <div
                                        className="w-full bg-muted group-hover:bg-accent rounded-t-[5px] transition-all duration-700 delay-[i*30ms] origin-bottom"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest z-10 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">Intake Volume</p>
                    </div>
                </Card>

                <Card className="border-border shadow-sm p-8 md:p-10 border bg-card flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-[5px] bg-foreground flex items-center justify-center text-accent shadow-xl shadow-foreground/5 mb-6">
                        <TrendingUp size={32} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg tracking-tighter leading-none mb-2">Real-time Insights</h3>
                    <p className="text-xs text-muted-foreground font-medium mb-8">System is processing registrations efficiently.</p>
                    <div className="w-full space-y-3">
                        <InsightRow label="Server Load" value="Normal" color="emerald" />
                        <InsightRow label="Pending Sync" value="0 files" color="blue" />
                    </div>
                </Card>
            </div>
        </div>
    );
}

function InsightRow({ label, value, color }: { label: string, value: string, color: string }) {
    const colors: Record<string, string> = {
        emerald: "bg-emerald-500",
        blue: "bg-blue-500",
        amber: "bg-amber-500"
    };
    return (
        <div className="flex items-center justify-between p-3 bg-muted rounded-[5px] border border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{value}</span>
                <div className={cn("w-1.5 h-1.5 rounded-full", colors[color])}></div>
            </div>
        </div>
    );
}
