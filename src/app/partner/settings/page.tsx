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
    Save,
    Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PartnerSettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Partner Profile', icon: Building },
        { id: 'account', label: 'My Account', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Settings</h1>
                <p className="text-muted-foreground text-sm font-medium">Manage your partner organization and account preferences.</p>
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
                                    <h3 className="font-bold text-foreground text-xl tracking-tighter">Organization Profile</h3>
                                    <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">Public information about your company</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Company Name</p>
                                            <Input defaultValue="Chancen International" className="h-12 border-2 border-border focus:border-accent rounded-[5px] font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Website URL</p>
                                            <Input defaultValue="https://chancen.international" className="h-12 border-2 border-border focus:border-accent rounded-[5px] font-bold" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">About Organization</p>
                                        <textarea
                                            className="w-full min-h-[120px] p-4 bg-background border-2 border-border focus:border-accent rounded-[5px] font-bold text-sm outline-none transition-all"
                                            defaultValue="CHANCEN International provides fair and ethical financing for education in Africa."
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border flex justify-end">
                                    <Button className="font-bold h-12 px-8 rounded-[5px]">
                                        Save Organization
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="font-bold text-foreground text-xl tracking-tighter">My Account</h3>
                                    <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">Your personal representative details</p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-10 items-start">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-[5px] bg-foreground flex items-center justify-center text-accent text-3xl font-bold shadow-xl shadow-foreground/10">C</div>
                                        <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-[5px] bg-card border border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                            <Save size={14} className="text-muted-foreground" />
                                        </button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</p>
                                            <Input defaultValue="Chancen Representative" className="h-12 border-2 border-border focus:border-accent rounded-[5px] font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Work Email</p>
                                            <Input defaultValue="rep@chancen.rw" className="h-12 border-2 border-border focus:border-accent rounded-[5px] font-bold" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border flex justify-end">
                                    <Button className="font-bold h-12 px-8 rounded-[5px]">
                                        Update Details
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* More tabs can be added here if needed */}
                        {activeTab === 'security' && (
                            <div className="py-12 text-center text-muted-foreground">
                                <Lock size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-[10px]">Account Security Settings Coming Soon</p>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="py-12 text-center text-muted-foreground">
                                <Bell size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-[10px]">Notification Preferences Coming Soon</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
