'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    PieChart as PieIcon,
    BarChart as BarIcon,
    Download,
    Calendar,
    Users,
    CheckCircle2,
    Clock,
    TrendingUp,
    FileSpreadsheet,
    FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState('Last 30 Days');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Reports & Analytics</h1>
                    <p className="text-muted-foreground text-sm font-medium">Insights and data exports for training programs.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-card border border-border rounded-[5px] p-1 flex items-center gap-1 shadow-sm">
                        {['Last 7d', 'Last 30d', 'Quarter', 'Year'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={cn(
                                    "px-4 py-1.5 rounded-[5px] text-xs font-bold transition-all",
                                    dateRange === range ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats */}
                <Card className="lg:col-span-2 border-border shadow-sm p-8 border">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-tighter">Application Trends</h3>
                            <p className="text-xs text-muted-foreground font-bold mt-1">Growth over the selected period</p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            <TrendingUp size={14} />
                            <span className="text-[10px] font-bold">+12.5%</span>
                        </div>
                    </div>

                    {/* Mock Chart Area */}
                    <div className="h-64 w-full bg-muted/30 rounded-[5px] border border-dashed border-border flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-end justify-around px-8 pb-4">
                            {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95].map((h, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 w-full max-w-[20px]">
                                    <div
                                        className="w-full bg-accent/30 group-hover:bg-accent rounded-t-[5px] transition-all duration-700 delay-[i*50ms] group-hover:scale-y-110 origin-bottom"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest z-10 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">Daily Registrations</p>
                    </div>
                </Card>

                {/* Distribution */}
                <Card className="border-border shadow-sm p-8 border">
                    <h3 className="font-bold text-foreground text-sm uppercase tracking-tighter mb-8">Status Distribution</h3>
                    <div className="space-y-6">
                        <DistributionItem label="Approved" count={124} percentage={65} color="bg-emerald-500" />
                        <DistributionItem label="Under Review" count={38} percentage={20} color="bg-blue-500" />
                        <DistributionItem label="Pending Payment" count={28} percentage={15} color="bg-amber-500" />
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ExportCard title="All Students" count="240" format="CSV" icon={FileSpreadsheet} className="border-emerald-500/20 hover:border-emerald-500" />
                <ExportCard title="Revenue Report" count="12.5M" format="PDF" icon={FileText} className="border-blue-500/20 hover:border-blue-500" />
                <ExportCard title="Cohort List" count="ASA-2026" format="XLSX" icon={FileSpreadsheet} className="border-purple-500/20 hover:border-purple-500" />
                <ExportCard title="Partner Audit" count="Chancen" format="PDF" icon={FileText} className="border-amber-500/20 hover:border-amber-500" />
            </div>
        </div>
    );
}

function DistributionItem({ label, count, percentage, color }: { label: string, count: number, percentage: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs font-bold text-foreground leading-none">{label}</p>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1">{count} applications</p>
                </div>
                <span className="text-[10px] font-bold text-foreground">{percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}

function ExportCard({ title, count, format, icon: Icon, className }: { title: string, count: string, format: string, icon: any, className: string }) {
    return (
        <Card className={cn("p-6 border transition-all cursor-pointer group", className)} hoverEffect>
            <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-[5px] bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-accent transition-all">
                    <Icon size={20} />
                </div>
                <span className="text-[10px] font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-[5px] border border-border">{format}</span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{title}</p>
            <p className="text-xl font-bold text-foreground">{count}</p>
            <Button variant="ghost" size="sm" className="w-full mt-6 h-9 rounded-[5px] font-bold group-hover:bg-foreground group-hover:text-background transition-all">
                <Download size={14} className="mr-2" /> Download
            </Button>
        </Card>
    );
}
