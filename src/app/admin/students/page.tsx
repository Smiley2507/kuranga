'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { Table, THeader, TBody, TRow, THead, TCell } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { api, StudentResponse, StudentStatus, RegistrationType } from "@/lib/api";
import { Search, Filter, Eye, User, ChevronLeft, ChevronRight, ArrowUpDown, Download, CheckSquare, Square, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function StudentsListPage() {
    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [sortField, setSortField] = useState('createdAt');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const res = await api.filterStudents({
                status: statusFilter,
                type: typeFilter,
                search: search,
                page: page,
                size: 10
            });

            if (res.data.content) {
                setStudents(res.data.content);
                setTotalPages(res.data.totalPages || 0);
            } else {
                setStudents(res.data || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchStudents();
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [statusFilter, typeFilter, search, page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchStudents();
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === students.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(students.map(s => s.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('asc');
        }
        // Ideally API would handle sorting, for now we can sort the local state
        const sorted = [...students].sort((a: any, b: any) => {
            const valA = a[field];
            const valB = b[field];
            if (valA < valB) return sortDir === 'asc' ? -1 : 1;
            if (valA > valB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
        setStudents(sorted);
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
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Students</h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage student registrations and application reviews.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-border text-muted-foreground bg-card hover:bg-muted font-bold h-11 border">
                        <Download size={18} className="mr-2" /> Export
                    </Button>
                    <Link href="/training/register" className="flex-1 md:flex-none">
                        <Button className="w-full font-bold h-11">Add Student</Button>
                    </Link>
                </div>
            </div>

            <Card className="border-border bg-card shadow-sm overflow-visible border rounded-[5px]">
                <div className="p-4 md:p-6 border-b border-border bg-muted/30">
                    <div className="flex flex-col md:flex-row gap-4">
                        <form onSubmit={handleSearch} className="flex-1 relative group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                            <Input
                                placeholder="Search students..."
                                className="pl-11 h-11 bg-background border border-border focus:border-accent transition-all ring-0 rounded-[5px]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                        <div className="flex gap-2">
                            <Select
                                className="w-full md:w-44 h-11 border border-border font-bold text-xs rounded-[5px]"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                options={[
                                    { value: '', label: 'All Status' },
                                    { value: 'PENDING_PAYMENT', label: 'Pending' },
                                    { value: 'UNDER_REVIEW', label: 'Review' },
                                    { value: 'PARTNER_REVIEW', label: 'Partner' },
                                    { value: 'APPROVED', label: 'Approved' },
                                ]}
                            />
                            <Select
                                className="w-full md:w-44 h-11 border border-border font-bold text-xs rounded-[5px]"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                options={[
                                    { value: '', label: 'All types' },
                                    { value: 'REGULAR', label: 'Regular' },
                                    { value: 'SPONSORED', label: 'Sponsored' },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <Table>
                        <THeader>
                            <TRow className="bg-muted/50 hover:bg-muted/50">
                                <THead className="w-12">
                                    <button onClick={toggleSelectAll} className="p-1 rounded hover:bg-muted text-muted-foreground">
                                        {selectedIds.length === students.length && students.length > 0 ? <CheckSquare size={18} className="text-accent" /> : <Square size={18} />}
                                    </button>
                                </THead>
                                <THead className="cursor-pointer group" onClick={() => handleSort('fullName')}>
                                    <div className="flex items-center gap-1">Student <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" /></div>
                                </THead>
                                <THead>Registration Code</THead>
                                <THead className="cursor-pointer group" onClick={() => handleSort('registrationType')}>
                                    <div className="flex items-center gap-1">Type <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" /></div>
                                </THead>
                                <THead>Course</THead>
                                <THead className="cursor-pointer group" onClick={() => handleSort('status')}>
                                    <div className="flex items-center gap-1">Status <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" /></div>
                                </THead>
                                <THead className="text-right">Action</THead>
                            </TRow>
                        </THeader>
                        <TBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TRow key={i} className="animate-pulse">
                                        <TCell colSpan={7}><div className="h-12 bg-muted rounded-[5px] w-full"></div></TCell>
                                    </TRow>
                                ))
                            ) : students.length === 0 ? (
                                <TRow>
                                    <TCell colSpan={7} className="h-64 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground opacity-20">
                                                <User size={32} />
                                            </div>
                                            <p className="text-muted-foreground font-bold">No students found matching filters</p>
                                        </div>
                                    </TCell>
                                </TRow>
                            ) : (
                                students.map((student) => (
                                    <TRow key={student.id} data-state={selectedIds.includes(student.id) ? 'selected' : ''}>
                                        <TCell>
                                            <button onClick={() => toggleSelect(student.id)} className="p-1 rounded hover:bg-muted text-muted-foreground">
                                                {selectedIds.includes(student.id) ? <CheckSquare size={18} className="text-accent" /> : <Square size={18} />}
                                            </button>
                                        </TCell>
                                        <TCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-[5px] bg-foreground flex items-center justify-center text-accent font-bold text-xs shadow-sm">
                                                    {student.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground leading-tight">{student.fullName}</p>
                                                    <p className="text-xs text-muted-foreground font-medium">{student.email}</p>
                                                </div>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <span className="text-[11px] font-bold bg-muted text-muted-foreground px-2 py-1 rounded-[5px] border border-border uppercase tracking-tight">
                                                {student.registrationCode}
                                            </span>
                                        </TCell>
                                        <TCell>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase px-2 py-0.5 rounded-[5px] border",
                                                student.registrationType === 'SPONSORED' ? "bg-purple-500/10 text-purple-600 border-purple-500/20" : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                            )}>
                                                {student.registrationType}
                                            </span>
                                        </TCell>
                                        <TCell>
                                            <span className="text-xs font-bold text-muted-foreground">
                                                {student.courseSelected}
                                            </span>
                                        </TCell>
                                        <TCell>
                                            <Badge variant={statusVariants[student.status] as any} className="font-bold text-[10px] px-2.5 py-1 rounded-[5px]">
                                                {student.status.replace('_', ' ')}
                                            </Badge>
                                        </TCell>
                                        <TCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/students/${student.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-accent/10 hover:text-accent rounded-[5px]">
                                                        <Eye size={18} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-9 w-9 p-0 hover:bg-rose-500/10 hover:text-rose-500 rounded-[5px]"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this student?')) {
                                                            api.deleteStudent(student.id).then(() => fetchStudents());
                                                        }
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        </TCell>
                                    </TRow>
                                ))
                            )}
                        </TBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="p-4 md:p-6 border-t border-border bg-muted/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Showing <span className="text-foreground font-bold">{students.length}</span> of <span className="text-foreground font-bold">{students.length}</span> entries
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="w-10 h-10 p-0 rounded-[5px] border-border bg-card"
                        >
                            <ChevronLeft size={18} />
                        </Button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages || 1 }).map((_, i) => (
                                <Button
                                    key={i}
                                    variant={page === i ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setPage(i)}
                                    className={cn(
                                        "w-10 h-10 p-0 rounded-[5px] font-bold text-xs",
                                        page === i ? "bg-foreground text-background" : "border-border bg-card"
                                    )}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages - 1 || totalPages === 0}
                            onClick={() => setPage(p => p + 1)}
                            className="w-10 h-10 p-0 rounded-[5px] border-border bg-card"
                        >
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function Loader2({ className, size }: { className?: string, size?: number }) {
    return <svg className={cn("animate-spin", className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
}
