'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { Table, THeader, TBody, TRow, THead, TCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Layers, Plus, Calendar, Users, ChevronRight, Search, Filter, Edit2, CheckCircle2, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';
import { Dialog } from '@/components/ui/Dialog';

export default function CohortsPage() {
    const { showToast } = useToast();
    const [cohorts, setCohorts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingCohort, setEditingCohort] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        active: true
    });

    const fetchCohorts = async () => {
        setIsLoading(true);
        try {
            const res = await api.getAdminCohorts();
            setCohorts(res.data || []);
        } catch (error: any) {
            console.error('Failed to fetch cohorts:', error);
            showToast(error.message || 'Failed to fetch cohorts', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCohorts();
    }, []);

    const handleOpenModal = (cohort: any = null) => {
        if (cohort) {
            setEditingCohort(cohort);
            setFormData({
                name: cohort.name,
                startDate: cohort.startDate,
                endDate: cohort.endDate || '',
                active: cohort.active
            });
        } else {
            setEditingCohort(null);
            setFormData({
                name: '',
                startDate: '',
                endDate: '',
                active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.startDate) {
            showToast('Name and Start Date are required', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            if (editingCohort) {
                await api.updateCohort(editingCohort.id, formData);
                showToast('Cohort updated successfully', 'success');
            } else {
                await api.createCohort(formData);
                showToast('New cohort created successfully', 'success');
            }
            setIsModalOpen(false);
            fetchCohorts();
        } catch (error: any) {
            showToast(error.message || 'Action failed', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const statusVariants: Record<string, string> = {
        true: 'success',
        false: 'default',
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Cohorts</h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage training groups and intake periods.</p>
                </div>
                <Button className="font-bold h-11 px-6 shadow-lg shadow-primary/10" onClick={() => handleOpenModal()}>
                    <Plus size={18} className="mr-2" /> New Cohort
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Layers} label="Total Cohorts" value={cohorts.length.toString()} color="text-primary" />
                <StatCard icon={Users} label="Total Students" value={cohorts.reduce((acc, c) => acc + (c.studentCount || 0), 0).toString()} color="text-accent" />
                <StatCard icon={Calendar} label="Active Intakes" value={cohorts.filter(c => c.active).length.toString()} color="text-emerald-500" />
            </div>

            <Card className="border-border shadow-sm rounded-[5px] overflow-hidden border">
                <div className="p-4 md:p-6 border-b border-border bg-muted/30 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                        <Input
                            placeholder="Search cohorts..."
                            className="pl-11 h-11 bg-background border-border ring-0 focus:border-accent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <THeader>
                            <TRow className="bg-muted/50 hover:bg-muted/50">
                                <THead>Cohort Name</THead>
                                <THead>Start Date</THead>
                                <THead>End Date</THead>
                                <THead>Students</THead>
                                <THead>Status</THead>
                                <THead className="text-right">Actions</THead>
                            </TRow>
                        </THeader>
                        <TBody>
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TRow key={i} className="animate-pulse">
                                        <TCell colSpan={6}><div className="h-12 bg-muted rounded-[5px] w-full"></div></TCell>
                                    </TRow>
                                ))
                            ) : cohorts.length === 0 ? (
                                <TRow>
                                    <TCell colSpan={6} className="h-32 text-center text-muted-foreground font-bold">No cohorts found.</TCell>
                                </TRow>
                            ) : (
                                cohorts.map((cohort) => (
                                    <TRow key={cohort.id} className="group">
                                        <TCell>
                                            <p className="font-bold text-foreground leading-none">{cohort.name}</p>
                                        </TCell>
                                        <TCell>
                                            <p className="text-xs font-bold text-muted-foreground">{new Date(cohort.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </TCell>
                                        <TCell>
                                            <p className="text-xs font-bold text-muted-foreground">{cohort.endDate ? new Date(cohort.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Ongoing'}</p>
                                        </TCell>
                                        <TCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-[5px] bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs border border-border">
                                                    {cohort.studentCount || 0}
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Students</span>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <Badge variant={statusVariants[cohort.active.toString()] as any} className="font-bold text-[10px] px-2.5 py-1 rounded-[5px]">
                                                {cohort.active ? 'ACTIVE' : 'INACTIVE'}
                                            </Badge>
                                        </TCell>
                                        <TCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 w-9 p-0 hover:bg-muted rounded-[5px] group-hover:text-accent"
                                                onClick={() => handleOpenModal(cohort)}
                                            >
                                                <Edit2 size={18} />
                                            </Button>
                                        </TCell>
                                    </TRow>
                                ))
                            )}
                        </TBody>
                    </Table>
                </div>
            </Card>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => !isSubmitting && setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-[5px] overflow-hidden"
                        >
                            <div className="p-8 border-b border-border bg-muted/30 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-[5px] bg-foreground text-accent flex items-center justify-center">
                                        <Layers size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground tracking-tight">{editingCohort ? 'Edit' : 'New'} Cohort</h2>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Cohort Information</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => !isSubmitting && setIsModalOpen(false)}
                                    className="p-2 hover:bg-muted rounded-[5px] transition-colors"
                                >
                                    <X size={20} className="text-muted-foreground" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <Input
                                    label="Cohort Name"
                                    placeholder="e.g. ASA 2026 Q1"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-6">
                                    <Input
                                        type="date"
                                        label="Start Date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                        required
                                    />
                                    <Input
                                        type="date"
                                        label="End Date (Optional)"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-muted/50 border border-border rounded-[5px]">
                                    <input
                                        type="checkbox"
                                        id="cohort-active"
                                        className="w-5 h-5 rounded-[5px] border-border text-accent focus:ring-accent"
                                        checked={formData.active}
                                        onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                    />
                                    <label htmlFor="cohort-active" className="text-sm font-bold text-foreground cursor-pointer">
                                        Mark as Active Intake
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 font-bold h-12"
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-[2] font-bold h-12 text-lg shadow-xl shadow-foreground/10"
                                        isLoading={isSubmitting}
                                    >
                                        {editingCohort ? 'Update Cohort' : 'Create Cohort'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    return (
        <Card className="p-6 border-border shadow-sm rounded-[5px] border">
            <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-[5px] bg-muted flex items-center justify-center border border-border", color)}>
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{label}</p>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                </div>
            </div>
        </Card>
    );
}
