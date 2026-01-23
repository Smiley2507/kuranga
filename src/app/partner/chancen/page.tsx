'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { Table, THeader, TBody, TRow, THead, TCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { api, StudentResponse } from "@/lib/api";
import { Eye, Loader2, User } from 'lucide-react';
import Link from 'next/link';

export default function PartnerStudentsPage() {
    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const res = await api.getPartnerStudents();
            setStudents(res.data.content || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const statusVariants: Record<string, string> = {
        PENDING_PAYMENT: 'warning',
        UNDER_REVIEW: 'info',
        PARTNER_REVIEW: 'warning',
        APPROVED: 'success',
        REJECTED: 'error',
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Sponsored Students</h1>
                <p className="text-muted-foreground">Review and manage students assigned for sponsorship.</p>
            </div>

            <Card className="p-6 border-border bg-card shadow-sm border">
                <div className="border border-border rounded-[5px] overflow-hidden">
                    <Table>
                        <THeader>
                            <TRow>
                                <THead>Student</THead>
                                <THead>Education</THead>
                                <THead>Course</THead>
                                <THead>Status</THead>
                                <THead className="text-right">Actions</THead>
                            </TRow>
                        </THeader>
                        <TBody>
                            {isLoading ? (
                                <TRow>
                                    <TCell colSpan={5} className="h-64 text-center">
                                        <Loader2 className="animate-spin mx-auto text-accent" size={32} />
                                    </TCell>
                                </TRow>
                            ) : students.length === 0 ? (
                                <TRow>
                                    <TCell colSpan={5} className="h-64 text-center">
                                        <User className="text-muted-foreground/20 mx-auto mb-2" size={48} />
                                        <p className="text-muted-foreground">No students assigned for review.</p>
                                    </TCell>
                                </TRow>
                            ) : (
                                students.map((student: any) => (
                                    <TRow key={student.id}>
                                        <TCell>
                                            <div>
                                                <p className="font-bold text-foreground">{student.fullName}</p>
                                                <p className="text-xs text-muted-foreground">{student.email}</p>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <span className="text-xs text-muted-foreground font-medium">{student.educationLevel}</span>
                                        </TCell>
                                        <TCell>
                                            <span className="text-xs text-muted-foreground">{student.courseSelected}</span>
                                        </TCell>
                                        <TCell>
                                            <Badge variant={statusVariants[student.status] as any}>
                                                {student.status.replace('_', ' ')}
                                            </Badge>
                                        </TCell>
                                        <TCell className="text-right">
                                            <Link href={`/partner/chancen/${student.id}`}>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Eye size={16} />
                                                </Button>
                                            </Link>
                                        </TCell>
                                    </TRow>
                                ))
                            )}
                        </TBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}


