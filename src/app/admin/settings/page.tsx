'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    User,
    Shield,
    Bell,
    Mail,
    Lock,
    Globe,
    CreditCard,
    Save,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'system', label: 'System Settings', icon: Globe },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'payments', label: 'Billing Configuration', icon: CreditCard },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Settings</h1>
                <p className="text-muted-foreground text-sm font-medium">Manage your account and platform preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-[5px] transition-all duration-200 border font-bold text-sm",
                                activeTab === tab.id
                                    ? "bg-foreground text-background border-foreground shadow-lg shadow-foreground/10"
                                    : "bg-card text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <Card className="border-border shadow-sm bg-card overflow-hidden p-8 md:p-12 border">
                        {activeTab === 'profile' && (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="font-bold text-foreground text-xl tracking-tighter">Personal Profile</h3>
                                    <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">Update your basic information</p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-10 items-start">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-[5px] bg-foreground flex items-center justify-center text-accent text-3xl font-bold shadow-xl shadow-foreground/10">A</div>
                                        <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-[5px] bg-card border-2 border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                            <Save size={14} className="text-muted-foreground" />
                                        </button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</p>
                                            <Input defaultValue="Administrative Officer" className="h-12 border-2 border-border focus:border-accent rounded-[5px] font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</p>
                                            <Input defaultValue="admin@kuranga.rw" className="h-12 border-2 border-border focus:border-accent rounded-[5px] font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Role</p>
                                            <Input value="Super Admin" disabled className="h-12 bg-muted border-2 border-border rounded-[5px] font-bold text-xs text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border flex justify-end">
                                    <Button className="font-bold h-12 px-8 rounded-[5px]">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'system' && (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="font-bold text-foreground text-xl tracking-tighter">Platform Configuration</h3>
                                    <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">Global ASA settings</p>
                                </div>

                                <div className="space-y-8">
                                    <Card className="p-6 border-border bg-muted/30 rounded-[5px] border flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground text-sm">Caution Fee Amount</p>
                                            <p className="text-xs text-muted-foreground font-medium">The standard fee for all regular registrations.</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-muted-foreground text-xs">RWF</span>
                                            <Input defaultValue="50,000" className="w-32 h-10 border-2 border-border text-right font-bold" />
                                        </div>
                                    </Card>

                                    <Card className="p-6 border-border bg-muted/30 rounded-[5px] border flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground text-sm">Auto-Approve Payments</p>
                                            <p className="text-xs text-muted-foreground font-medium">Bypass admin verification for MoMo transactions.</p>
                                        </div>
                                        <button className="w-12 h-6 bg-muted border border-border rounded-full relative transition-colors p-1">
                                            <div className="w-4 h-4 bg-background rounded-full shadow-sm"></div>
                                        </button>
                                    </Card>

                                    <Card className="p-6 border-border bg-muted/30 rounded-[5px] border flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground text-sm">Notification Emails</p>
                                            <p className="text-xs text-muted-foreground font-medium">Send confirmation when registration is submitted.</p>
                                        </div>
                                        <button className="w-12 h-6 bg-accent rounded-full relative transition-colors p-1 flex justify-end">
                                            <div className="w-4 h-4 bg-background rounded-full shadow-sm"></div>
                                        </button>
                                    </Card>
                                </div>

                                <div className="pt-6 border-t border-border flex justify-end">
                                    <Button className="font-bold h-12 px-8 rounded-[5px]">
                                        Apply Config
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
