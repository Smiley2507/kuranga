'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { Table, THeader, TBody, TRow, THead, TCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { api, StudentResponse } from "@/lib/api";
import { ShieldCheck, Eye, CreditCard, Search, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { Dialog } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';

export default function PaymentsPage() {
    const { showToast } = useToast();
    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [verificationModal, setVerificationModal] = useState({
        isOpen: false,
        studentId: null as number | null,
        studentName: ''
    });

    const fetchPendingPayments = async () => {
        setIsLoading(true);
        try {
            const res = await api.filterStudents({ status: 'PENDING_PAYMENT' });
            setStudents(res.data.content || res.data || []);
        } catch (error: any) {
            showToast(error.message || 'Failed to fetch payments', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const handleVerifyClick = (id: number, name: string) => {
        setVerificationModal({
            isOpen: true,
            studentId: id,
            studentName: name
        });
    };

    const confirmVerification = async () => {
        if (!verificationModal.studentId) return;

        setIsActionLoading(true);
        try {
            await api.verifyPayment(verificationModal.studentId);
            showToast('Payment verified successfully', 'success');
            setVerificationModal(prev => ({ ...prev, isOpen: false }));
            fetchPendingPayments();
        } catch (error: any) {
            showToast(error.message || 'Verification failed', 'error');
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Payment Verification</h1>
                    <p className="text-muted-foreground text-sm font-medium">Verify student registration fees and move them to review status.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={CreditCard} label="Pending Verification" value={students.length.toString()} color="text-amber-500" />
                <StatCard icon={Clock} label="Avg. Wait Time" value="2.4 Hours" color="text-primary" />
                <StatCard icon={CheckCircle2} label="Verified Today" value="12" color="text-emerald-500" />
            </div>

            <Card className="border-border shadow-sm rounded-[5px] overflow-hidden border">
                <div className="p-4 md:p-6 border-b border-border bg-muted/30 flex items-center justify-between">
                    <h3 className="font-bold text-foreground text-xs uppercase tracking-widest px-2">Pending Payments</h3>
                </div>

                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <THeader>
                            <TRow className="bg-muted/50 hover:bg-muted/50">
                                <THead>Student</THead>
                                <THead>Ref Code</THead>
                                <THead>Amount</THead>
                                <THead>Date Applied</THead>
                                <THead className="text-right">Actions</THead>
                            </TRow>
                        </THeader>
                        <TBody>
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TRow key={i} className="animate-pulse">
                                        <TCell colSpan={5}><div className="h-12 bg-muted rounded-[5px] w-full"></div></TCell>
                                    </TRow>
                                ))
                            ) : students.length === 0 ? (
                                <TRow>
                                    <TCell colSpan={5} className="h-32 text-center text-muted-foreground font-bold italic">
                                        All payments are currently verified.
                                    </TCell>
                                </TRow>
                            ) : (
                                students.map((student) => (
                                    <TRow key={student.id} className="group">
                                        <TCell>
                                            <div>
                                                <p className="font-bold text-foreground leading-none">{student.fullName}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-tighter">{student.email}</p>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <Badge variant="default" className="font-bold text-[10px]">{student.registrationCode}</Badge>
                                        </TCell>
                                        <TCell>
                                            <p className="font-bold text-foreground">50,000 RWF</p>
                                        </TCell>
                                        <TCell>
                                            <p className="text-xs font-bold text-muted-foreground">{new Date(student.createdAt).toLocaleDateString()}</p>
                                        </TCell>
                                        <TCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/students/${student.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-muted rounded-[5px]">
                                                        <Eye size={18} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => handleVerifyClick(student.id, student.fullName)}
                                                    size="sm"
                                                    className="font-bold h-9 shadow-sm"
                                                >
                                                    <ShieldCheck size={16} className="mr-2" /> Verify
                                                </Button>
                                            </div>
                                        </TCell>
                                    </TRow>
                                ))
                            )}
                        </TBody>
                    </Table>
                </div>
            </Card>

            <Dialog
                isOpen={verificationModal.isOpen}
                onClose={() => setVerificationModal(prev => ({ ...prev, isOpen: false }))}
                title="Verify Payment"
                description={`You are about to verify the payment for ${verificationModal.studentName}. This student will be moved to "Under Review" status.`}
                confirmLabel="Confirm Verification"
                onConfirm={confirmVerification}
                isLoading={isActionLoading}
                type="success"
            />
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
