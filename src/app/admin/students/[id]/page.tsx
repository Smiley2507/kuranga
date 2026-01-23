'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { api, StudentResponse, ApiResponse } from "@/lib/api";
import {
    ChevronLeft,
    User,
    Mail,
    Phone,
    MapPin,
    GraduationCap,
    CreditCard,
    Calendar,
    FileText,
    Download,
    CheckCircle2,
    XCircle,
    Clock,
    ShieldCheck,
    MessageSquare,
    Layers
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { Dialog } from '@/components/ui/Dialog';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

export default function StudentDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { showToast } = useToast();
    const [student, setStudent] = useState<StudentResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [cohorts, setCohorts] = useState<any[]>([]);

    // Modal states
    const [approvalModal, setApprovalModal] = useState({
        isOpen: false,
        type: 'APPROVE' as 'APPROVE' | 'REJECT',
        comments: '',
        cohortId: ''
    });

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const cohortsRes = await api.getCohorts();
                setCohorts(cohortsRes.data || []);
            } catch (error) {
                console.error('Failed to fetch cohorts:', error);
            }
        };
        fetchCohorts();
    }, []);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await api.getStudentById(Number(id));
                setStudent(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const handleAction = async (action: 'APPROVE' | 'REJECT' | 'VERIFY_PAYMENT') => {
        if (action === 'VERIFY_PAYMENT') {
            setIsActionLoading(true);
            try {
                await api.verifyPayment(Number(id));
                showToast('Payment verified successfully', 'success');
                const res = await api.getStudentById(Number(id));
                setStudent(res.data);
            } catch (error: any) {
                showToast(error.message || 'Payment verification failed', 'error');
            } finally {
                setIsActionLoading(false);
            }
            return;
        }

        setApprovalModal({
            isOpen: true,
            type: action as 'APPROVE' | 'REJECT',
            comments: '',
            cohortId: student?.status === 'UNDER_REVIEW' ? '' : ''
        });
    };

    const confirmApproval = async () => {
        setIsActionLoading(true);
        try {
            const isApprove = approvalModal.type === 'APPROVE';
            const payload = {
                studentId: Number(id),
                approved: isApprove,
                comments: approvalModal.comments,
                cohortId: isApprove && approvalModal.cohortId ? Number(approvalModal.cohortId) : null
            };

            await api.approveStudent(Number(id), payload);
            showToast(`Student ${isApprove ? 'approved' : 'rejected'} successfully`, 'success');
            setApprovalModal(prev => ({ ...prev, isOpen: false }));

            const res = await api.getStudentById(Number(id));
            setStudent(res.data);
        } catch (error: any) {
            showToast(error.message || 'Action failed', 'error');
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Fetching records...</p>
            </div>
        );
    }

    if (!student) return <div>Student not found</div>;

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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/students">
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-[5px] border-border bg-card border">
                            <ChevronLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{student.fullName}</h1>
                            <Badge variant={statusVariants[student.status] as any} className="font-bold text-[10px] px-3 py-1">
                                {student.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm font-medium mt-1">Applied on {new Date(student.createdAt).toLocaleDateString()} • Ref: #{student.registrationCode}</p>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    {student.status === 'UNDER_REVIEW' && (
                        <>
                            <Button
                                onClick={() => handleAction('REJECT')}
                                disabled={isActionLoading}
                                variant="outline"
                                className="flex-1 md:flex-none border-destructive/20 text-destructive bg-card hover:bg-destructive/5 font-bold h-12 border"
                            >
                                <XCircle size={18} className="mr-2" /> Reject
                            </Button>
                            <Button
                                onClick={() => handleAction('APPROVE')}
                                disabled={isActionLoading}
                                className="flex-1 md:flex-none font-bold h-12 shadow-sm"
                            >
                                <CheckCircle2 size={18} className="mr-2" /> Approve
                            </Button>
                        </>
                    )}
                    {student.status === 'PENDING_PAYMENT' && (
                        <Button
                            onClick={() => handleAction('VERIFY_PAYMENT')}
                            disabled={isActionLoading}
                            className="w-full md:w-auto font-black h-12"
                        >
                            <ShieldCheck size={18} className="mr-2" /> Verify Payment
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Information Columns */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card className="border-border border rounded-[5px] overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border bg-muted/30 flex items-center gap-2">
                            <User size={18} className="text-accent" />
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-tighter">Personal Information</h3>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InfoItem icon={Mail} label="Email Address" value={student.email || ''} />
                            <InfoItem icon={Phone} label="Phone Number" value={student.phone || student.phoneNumber || ''} />
                            <InfoItem icon={MapPin} label="Location" value={`${student.district || student.city || ''}, Rwanda`} />
                            <InfoItem icon={Calendar} label="Date of Birth" value={student.dateOfBirth || 'N/A'} />
                        </div>
                    </Card>

                    {/* Education & Experience */}
                    <Card className="border-border border rounded-[5px] overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border bg-muted/30 flex items-center gap-2">
                            <GraduationCap size={18} className="text-accent" />
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-tighter">Academic & Professional</h3>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InfoItem label="Education Level" value={student.educationLevel || ''} />
                            <InfoItem label="Current Occupation" value={student.currentOccupation || 'Not specified'} />
                            <div className="md:col-span-2 capitalize">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Selected Program</p>
                                <div className="p-4 bg-muted/20 rounded-[5px] border border-border">
                                    <p className="font-bold text-foreground">{student.courseSelected}</p>
                                    <p className="text-xs text-muted-foreground font-bold mt-1">Application Type: <span className="text-primary">{student.registrationType}</span></p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Motivation */}
                    <Card className="border-border border rounded-[5px] overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border bg-muted/30 flex items-center gap-2">
                            <FileText size={18} className="text-accent" />
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-tighter">Motivation & Goals</h3>
                        </div>
                        <div className="p-6 md:p-8">
                            <p className="text-muted-foreground leading-relaxed font-medium whitespace-pre-wrap">{student.motivation || 'No motivation statement provided.'}</p>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Documents */}
                <div className="space-y-8">
                    {/* Payment Status */}
                    <Card className="border-border border rounded-[5px] overflow-hidden shadow-sm bg-foreground text-background p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <CreditCard size={32} className="text-accent mb-6" />
                        <h3 className="font-bold text-xl mb-4 leading-tight">Billing &<br />Payments</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-background/10 uppercase tracking-tighter font-bold text-[10px]">
                                <span className="opacity-40">Status</span>
                                <span className={cn(
                                    student.status === 'PENDING_PAYMENT' ? "text-amber-400" : "text-emerald-400"
                                )}>{student.status.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-background/10 uppercase tracking-tighter font-bold text-[10px]">
                                <span className="opacity-40">Amount</span>
                                <span>50,000 RWF</span>
                            </div>
                        </div>
                    </Card>

                    {/* Documents List */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground text-xs uppercase tracking-widest px-2">Uploaded Documents</h4>

                        <DocumentCard
                            title="Payment Receipt"
                            fileName={student.paymentReceipt || 'Not uploaded'}
                            isAvailable={!!student.paymentReceipt}
                            onView={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/students/${student.id}/payment-receipt`, '_blank')}
                        />

                        <DocumentCard
                            title="National ID / Passport"
                            fileName={student.idDocument || 'Not uploaded'}
                            isAvailable={!!student.idDocument}
                            onView={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/students/${student.id}/id-document`, '_blank')}
                        />
                    </div>
                </div>
            </div>
            <Dialog
                isOpen={approvalModal.isOpen}
                onClose={() => setApprovalModal(prev => ({ ...prev, isOpen: false }))}
                title={approvalModal.type === 'APPROVE' ? 'Approve Application' : 'Reject Application'}
                description={approvalModal.type === 'APPROVE' ? 'You are about to approve this student application. Please add any comments and assign a cohort if necessary.' : 'Please provide a reason for rejecting this application.'}
                type={approvalModal.type === 'APPROVE' ? 'success' : 'danger'}
                confirmLabel={approvalModal.type === 'APPROVE' ? 'Confirm Approval' : 'Confirm Rejection'}
                onConfirm={confirmApproval}
                isLoading={isActionLoading}
            >
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground flex items-center gap-2">
                            <MessageSquare size={14} className="text-accent" />
                            {approvalModal.type === 'APPROVE' ? 'Internal Comments' : 'Rejection Reason'}
                        </label>
                        <textarea
                            className="w-full min-h-[100px] p-4 bg-muted/50 border border-border rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none font-medium"
                            placeholder={approvalModal.type === 'APPROVE' ? 'Add any notes for the team...' : 'Explain why the application was rejected...'}
                            value={approvalModal.comments}
                            onChange={(e) => setApprovalModal(prev => ({ ...prev, comments: e.target.value }))}
                        />
                    </div>

                    {approvalModal.type === 'APPROVE' && student?.registrationType === 'REGULAR' && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <Select
                                label="Assign Cohort (Optional)"
                                value={approvalModal.cohortId}
                                onChange={(e) => setApprovalModal(prev => ({ ...prev, cohortId: e.target.value }))}
                                options={cohorts.map(c => ({ value: c.id, label: c.name }))}
                            />
                            <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase flex items-center gap-1">
                                <Layers size={10} /> Assigning a cohort marks the student as enrolled.
                            </p>
                        </div>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon?: any, label: string, value: string }) {
    return (
        <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                {Icon && <Icon size={12} className="opacity-50" />} {label}
            </p>
            <p className="font-bold text-foreground text-sm">{value}</p>
        </div>
    );
}

function DocumentCard({ title, fileName, isAvailable, onView }: { title: string, fileName: string, isAvailable: boolean, onView: () => void }) {
    return (
        <Card className={cn(
            "p-5 border rounded-[5px] transition-all",
            isAvailable ? "border-border bg-card hover:border-accent/20 group cursor-pointer transition-all duration-300 shadow-sm" : "border-border bg-muted/50 opacity-60"
        )} onClick={isAvailable ? onView : undefined}>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors",
                        isAvailable ? "bg-foreground text-accent group-hover:bg-accent group-hover:text-background" : "bg-muted text-muted-foreground"
                    )}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-foreground text-xs leading-none">{title}</p>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 truncate max-w-[150px]">{fileName}</p>
                    </div>
                </div>
                {isAvailable && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[5px] text-muted-foreground group-hover:text-accent">
                        <Download size={16} />
                    </Button>
                )}
            </div>
        </Card>
    );
}
