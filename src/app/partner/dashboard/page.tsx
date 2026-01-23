'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { api, StudentResponse } from "@/lib/api";
import { Users, Clock, CheckCircle2, Search, ArrowUpRight, Calendar, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PartnerDashboard() {
    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getPartnerStudents()
            .then(res => {
                if (res.success) {
                    setStudents(res.data.content || res.data || []);
                }
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const stats = [
        { title: 'Total Applications', value: students.length, icon: Users, color: 'text-primary' },
        { title: 'Under Review', value: students.filter(s => s.status === 'PARTNER_REVIEW').length, icon: Clock, color: 'text-amber-500' },
        { title: 'Approved', value: students.filter(s => s.status === 'APPROVED' || s.status === 'ENROLLED').length, icon: CheckCircle2, color: 'text-emerald-500' },
        {
            title: 'Recently Added', value: students.filter(s => {
                const date = new Date(s.createdAt);
                const now = new Date();
                return (now.getTime() - date.getTime()) < (7 * 24 * 60 * 60 * 1000);
            }).length, icon: UserPlus, color: 'text-blue-500'
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Partner Dashboard</h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage your sponsorship applications and student status.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-[5px]">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={stat.title} className="p-6 border-border shadow-sm border bg-card group" hoverEffect>
                        <div className="flex items-start justify-between mb-6">
                            <div className={cn("w-12 h-12 rounded-[5px] bg-muted flex items-center justify-center border border-border transition-colors group-hover:bg-foreground group-hover:text-accent", stat.color)}>
                                <stat.icon size={22} />
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-2">{stat.title}</p>
                            <p className="text-3xl font-bold text-foreground tracking-tighter">
                                {isLoading ? (
                                    <span className="inline-block w-12 h-8 bg-muted animate-pulse rounded-[5px]"></span>
                                ) : stat.value}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card className="border-border shadow-sm p-0 border bg-card overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-foreground text-lg tracking-tighter">Recent Applications</h3>
                            <p className="text-xs text-muted-foreground font-medium">Students requesting sponsorship via Chancen.</p>
                        </div>
                        <Link href="/partner/chancen">
                            <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest">
                                View All Applications <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 border-b border-border">
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Student Name</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Course</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {isLoading ? (
                                    [...Array(3)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="h-4 w-32 bg-muted rounded"></div></td>
                                            <td className="px-6 py-4"><div className="h-4 w-24 bg-muted rounded"></div></td>
                                            <td className="px-6 py-4"><div className="h-4 w-20 bg-muted rounded"></div></td>
                                            <td className="px-6 py-4"><div className="h-4 w-16 bg-muted rounded"></div></td>
                                        </tr>
                                    ))
                                ) : students.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                            No applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    students.slice(0, 5).map((student) => (
                                        <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">{student.fullName}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{student.courseSelected}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(student.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-[5px] text-[10px] font-bold uppercase tracking-widest border",
                                                    student.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                        student.status === 'PARTNER_REVIEW' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                            "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                )}>
                                                    {student.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
