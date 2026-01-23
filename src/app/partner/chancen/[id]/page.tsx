'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { api } from "@/lib/api";
import {
    ArrowLeft, CheckCircle2, XCircle,
    Download, ExternalLink, Mail, Phone,
    GraduationCap, FileText, Loader2
} from 'lucide-react';

export default function PartnerStudentDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchStudent = async () => {
        try {
            const res = await api.getStudentDetails(Number(id));
            setStudent(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [id]);

    const handleAction = async (approved: boolean) => {
        setActionLoading(approved ? 'approve' : 'reject');
        try {
            await api.partnerApprove(Number(id), { approved, comments: approved ? 'Approved by Partner' : 'Rejected by Partner' });
            await fetchStudent();
        } catch (error) {
            console.error(error);
        } finally {
            setActionLoading(null);
        }
    };

    if (isLoading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={32} /></div>;
    if (!student) return <div>Student not found</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()} className="h-10 w-10 p-0 rounded-full">
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">{student.fullName}</h1>
                    <p className="text-muted-foreground font-mono text-sm">{student.registrationCode}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-8 bg-card border-border shadow-sm border">
                        <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                            <GraduationCap size={20} className="text-accent" />
                            Application Profile
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <InfoItem label="Email" value={student.email} />
                                <InfoItem label="Education" value={student.educationLevel} />
                                <InfoItem label="University" value={student.university} />
                            </div>
                            <div className="space-y-4">
                                <InfoItem label="Program" value={student.programType} />
                                <InfoItem label="Course" value={student.courseSelected} />
                                <InfoItem label="Session" value={student.session} />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 bg-card border-border shadow-sm border">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <FileText size={20} className="text-accent" />
                            Motivation
                        </h3>
                        <p className="text-muted-foreground bg-muted/30 p-6 rounded-[5px] italic leading-relaxed border border-border">
                            "{student.motivationStatement || 'No statement provided.'}"
                        </p>
                    </Card>

                    <Card className="p-8 bg-card border-border shadow-sm border">
                        <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                            <FileText size={20} className="text-accent" />
                            Submitted Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DocumentCard title="CV / Resume" />
                            <DocumentCard title="Degree Certificate" />
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="p-6 bg-slate-900 text-white border-none sticky top-24">
                        <h3 className="font-bold mb-6">Sponsorship Decision</h3>
                        {student.status === 'PARTNER_REVIEW' ? (
                            <div className="space-y-3">
                                <Button
                                    className="w-full h-12 bg-accent hover:bg-accent/90 border-none"
                                    onClick={() => handleAction(true)}
                                    isLoading={actionLoading === 'approve'}
                                >
                                    Approve Sponsorship
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 border-slate-700 text-slate-400 hover:bg-slate-800"
                                    onClick={() => handleAction(false)}
                                    isLoading={actionLoading === 'reject'}
                                >
                                    Reject Application
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center p-6 bg-muted/30 rounded-[5px] border border-border">
                                <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                                <p className="font-bold text-white">Decision Recorded</p>
                                <p className="text-xs text-white/50 mt-1">Status: {student.status}</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
            <p className="font-semibold text-foreground">{value || 'N/A'}</p>
        </div>
    );
}

function DocumentCard({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-[5px] border border-border hover:border-accent/20 hover:bg-muted/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
                <FileText size={20} className="text-muted-foreground" />
                <p className="text-sm font-bold text-foreground">{title}</p>
            </div>
            <button className="p-2 text-muted-foreground hover:text-accent transition-colors"><ExternalLink size={18} /></button>
        </div>
    );
}


