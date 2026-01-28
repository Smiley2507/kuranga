'use client';

import { useState, useEffect } from 'react';
import { api, StudentResponse, StudentStatus } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, CheckCircle2, XCircle, Clock, FileText, Download, Calendar, User, Mail, Phone, MapPin, Building2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Section } from "@/components/ui/Section";

export default function StudentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<StudentResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchStudent();
        }
    }, [params.id]);

    const fetchStudent = async () => {
        setIsLoading(true);
        try {
            const res = await api.getStudentById(Number(params.id));
            setStudent(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[500px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div></div>;
    }

    if (!student) {
        return <div className="text-center py-20">Student not found</div>;
    }

    const handleVerifyPayment = async () => {
        if (!confirm('Are you sure you want to verify this payment?')) return;
        setIsActionLoading(true);
        try {
            await api.verifyPayment(student.id);
            fetchStudent();
        } catch (error) {
            console.error(error);
            alert('Failed to verify payment');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleApproval = async (approved: boolean) => {
        const comments = prompt(`Enter comments for ${approved ? 'approval' : 'rejection'}:`);
        if (comments === null) return;

        setIsActionLoading(true);
        try {
            await api.approveStudent(student.id, { approved, comments });
            fetchStudent();
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        } finally {
            setIsActionLoading(false);
        }
    };

    const statusVariants: Record<string, string> = {
        PENDING_PAYMENT: 'warning',
        UNDER_REVIEW: 'info',
        PARTNER_REVIEW: 'warning',
        APPROVED: 'success',
        REJECTED: 'error',
        ENROLLED: 'success',
        COMPLETED: 'default',
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/admin/students">
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full border border-border hover:bg-card">
                        <ArrowLeft size={18} />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Student Details</h1>
                    <p className="text-muted-foreground text-sm">View and manage student application.</p>
                </div>
                <div className="ml-auto flex gap-2">
                    {student.status === 'UNDER_REVIEW' && (
                        <>
                            <Button
                                variant="outline"
                                className="border-rose-200 text-rose-600 hover:bg-rose-50"
                                onClick={() => handleApproval(false)}
                                isLoading={isActionLoading}
                            >
                                <XCircle size={18} className="mr-2" /> Reject
                            </Button>
                            <Button
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => handleApproval(true)}
                                isLoading={isActionLoading}
                            >
                                <CheckCircle2 size={18} className="mr-2" /> Approve
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <Card className="lg:col-span-2 space-y-8 p-6 md:p-8 bg-card border-border shadow-sm">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-[5px] bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                {student.fullName.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">{student.fullName}</h2>
                                <p className="text-muted-foreground font-medium">{student.email}</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant={statusVariants[student.status] as any} className="font-bold">
                                        {student.status.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-[5px] bg-muted border border-border text-muted-foreground uppercase tracking-wider">
                                        {student.registrationCode}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div>
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                <User size={14} /> Personal Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground font-medium">Phone</span>
                                    <span className="text-sm font-bold">{student.phone}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground font-medium">District</span>
                                    <span className="text-sm font-bold">{student.district}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground font-medium">Registration Type</span>
                                    <span className="text-sm font-bold">{student.registrationType}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Building2 size={14} /> Academic Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground font-medium">Education Level</span>
                                    <span className="text-sm font-bold">{student.educationLevel}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground font-medium">University</span>
                                    <span className="text-sm font-bold">{student.university || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground font-medium">Program</span>
                                    <span className="text-sm font-bold">{student.programType}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground font-medium">Selected Course</span>
                                    <span className="text-sm font-bold text-accent">{student.courseSelected}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {student.motivationStatement && (
                        <div>
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FileText size={14} /> Motivation Statement
                            </h3>
                            <div className="bg-muted/30 p-4 rounded-[5px] border border-border/50">
                                <p className="text-sm italic text-muted-foreground leading-relaxed">
                                    "{student.motivationStatement}"
                                </p>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Payment Status Card */}
                    <Card className="p-6 bg-card border-border shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-foreground">Payment Status</h3>
                            {student.payment?.verified ? (
                                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                    <CheckCircle2 size={12} className="mr-1" /> Verified
                                </span>
                            ) : (
                                <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                    <Clock size={12} className="mr-1" /> Pending
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Method</span>
                                <span className="font-bold">{student.payment?.method || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-bold">{student.payment?.amount?.toLocaleString()} FRW</span>
                            </div>
                        </div>

                        {student.payment?.proofUrl && (
                            <div className="pt-4 border-t border-border">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Proof of Payment</p>
                                <a
                                    href={student.payment.proofUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-[5px] border border-border bg-muted/50 hover:bg-muted transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded bg-background flex items-center justify-center border border-border group-hover:border-accent group-hover:text-accent transition-colors">
                                        <FileText size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">View Receipt</p>
                                        <p className="text-[10px] text-muted-foreground">Click to open</p>
                                    </div>
                                </a>

                                {!student.payment.verified && (
                                    <Button
                                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                                        onClick={handleVerifyPayment}
                                        isLoading={isActionLoading}
                                    >
                                        <CheckCircle2 size={16} className="mr-2" /> Verify Payment
                                    </Button>
                                )}
                            </div>
                        )}
                    </Card>

                    {/* Admin Actions */}
                    {student.adminComments && (
                        <Card className="p-6 bg-card border-border shadow-sm">
                            <h3 className="font-bold text-foreground mb-4">Admin Remarks</h3>
                            <p className="text-sm text-muted-foreground italic">
                                "{student.adminComments}"
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
