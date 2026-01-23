'use client';

import { useState, useEffect } from 'react';
import { api, Course } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import { Table, THeader, TBody, TRow, THead, TCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Plus, Edit2, Trash2, Search, Hash, BookOpen, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState<Partial<Course>>({ name: '', active: true });

    const { showToast } = useToast();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const res = await api.getAllCourses();
            setCourses(res.data || []);
        } catch (error: any) {
            showToast(error.message || 'Failed to fetch courses', 'error');
            setCourses([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            await api.createCourse(formData);
            showToast('Course created successfully', 'success');
            setIsCreateModalOpen(false);
            setFormData({ name: '', active: true });
            fetchCourses();
        } catch (error: any) {
            showToast(error.message || 'Failed to create course', 'error');
        }
    };

    const handleUpdate = async () => {
        if (!selectedCourse) return;
        try {
            await api.updateCourse(selectedCourse.id, formData);
            showToast('Course updated successfully', 'success');
            setIsEditModalOpen(false);
            setSelectedCourse(null);
            fetchCourses();
        } catch (error: any) {
            showToast(error.message || 'Failed to update course', 'error');
        }
    };

    const handleDelete = async () => {
        if (!selectedCourse) return;
        try {
            await api.deleteCourse(selectedCourse.id);
            showToast('Course deleted successfully', 'success');
            setIsDeleteModalOpen(false);
            setSelectedCourse(null);
            fetchCourses();
        } catch (error: any) {
            showToast(error.message || 'Failed to delete course', 'error');
        }
    };

    const filteredCourses = (courses || []).filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Course Management</h1>
                    <p className="text-muted-foreground text-sm font-medium">Enable or disable courses for the registration form.</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="rounded-[5px] h-11 px-6 shadow-lg shadow-accent/20 transition-all active:scale-[0.98]">
                    <Plus size={18} className="mr-2" /> Add New Course
                </Button>
            </div>

            {/* Content Card */}
            <Card className="border-border bg-card shadow-sm overflow-hidden border rounded-[5px]">
                <div className="p-4 md:p-6 border-b border-border bg-muted/30">
                    <div className="relative group max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                        <Input
                            placeholder="Search courses by name..."
                            className="pl-11 h-11 bg-background border border-border focus:border-accent transition-all ring-0 rounded-[5px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <Table>
                        <THeader>
                            <TRow className="bg-muted/50 hover:bg-muted/50">
                                <THead className="w-[100px]">ID</THead>
                                <THead>Course Information</THead>
                                <THead>Status</THead>
                                <THead>Last Updated</THead>
                                <THead className="text-right">Actions</THead>
                            </TRow>
                        </THeader>
                        <TBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TRow key={i} className="animate-pulse">
                                        <TCell colSpan={5}><div className="h-12 bg-muted rounded-[5px] w-full"></div></TCell>
                                    </TRow>
                                ))
                            ) : filteredCourses.length === 0 ? (
                                <TRow>
                                    <TCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground opacity-20">
                                                <AlertCircle size={32} />
                                            </div>
                                            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No courses found</p>
                                        </div>
                                    </TCell>
                                </TRow>
                            ) : (
                                filteredCourses.map((course) => (
                                    <TRow key={course.id} className="group hover:bg-muted/30 transition-colors">
                                        <TCell>
                                            <div className="flex items-center gap-2">
                                                <Hash size={12} className="text-accent" />
                                                <span className="text-xs font-mono font-bold text-muted-foreground">{course.id}</span>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-[5px] bg-foreground flex items-center justify-center text-accent font-black text-sm shadow-md">
                                                    <BookOpen size={18} />
                                                </div>
                                                <p className="font-bold text-foreground leading-tight">{course.name}</p>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full", course.active ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-muted-foreground/30")} />
                                                <span className={cn("text-xs font-bold uppercase", course.active ? "text-green-600" : "text-muted-foreground/50")}>
                                                    {course.active ? 'Active' : 'Disabled'}
                                                </span>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <p className="text-xs font-bold text-muted-foreground">
                                                {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString('en-RW', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                            </p>
                                        </TCell>
                                        <TCell className="text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedCourse(course);
                                                        setFormData({ name: course.name, active: course.active });
                                                        setIsEditModalOpen(true);
                                                    }}
                                                    className="h-8 w-8 p-0 rounded-[5px] hover:bg-accent/10 hover:text-accent"
                                                >
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedCourse(course);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="h-8 w-8 p-0 rounded-[5px] hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TCell>
                                    </TRow>
                                ))
                            )}
                        </TBody>
                    </Table>
                </div>

                {/* Info Footer */}
                <div className="p-4 md:p-6 border-t border-border bg-muted/30 flex justify-between items-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Total System Courses: <span className="text-foreground">{(courses || []).length}</span>
                    </p>
                </div>
            </Card>

            {/* Create Modal */}
            <Dialog
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Add New Course"
            >
                <div className="space-y-4 py-4">
                    <Input
                        label="Course Name"
                        placeholder="e.g. QuickBooks Enterprise"
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        required
                    />
                    <div className="flex items-center gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, active: !p.active }))}
                            className={cn(
                                "w-10 h-5 rounded-full transition-colors relative flex items-center px-1",
                                formData.active ? "bg-accent" : "bg-muted-foreground/30"
                            )}
                        >
                            <div className={cn(
                                "w-3 h-3 bg-white rounded-full transition-transform",
                                formData.active ? "translate-x-5" : "translate-x-0"
                            )} />
                        </button>
                        <span className="text-sm font-semibold text-foreground">
                            {formData.active ? 'Visible in Registration' : 'Hidden from Registration'}
                        </span>
                    </div>
                    <div className="flex justify-end gap-3 pt-6">
                        <Button variant="outline" className="flex-1 font-bold h-11" onClick={() => setIsCreateModalOpen(false)}>Discard</Button>
                        <Button className="flex-1 font-bold h-11" onClick={handleCreate}>Initialize Course</Button>
                    </div>
                </div>
            </Dialog>

            {/* Edit Modal */}
            <Dialog
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Course"
            >
                <div className="space-y-4 py-4">
                    <Input
                        label="Course Name"
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        required
                    />
                    <div className="flex items-center gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, active: !p.active }))}
                            className={cn(
                                "w-10 h-5 rounded-full transition-colors relative flex items-center px-1",
                                formData.active ? "bg-accent" : "bg-muted-foreground/30"
                            )}
                        >
                            <div className={cn(
                                "w-3 h-3 bg-white rounded-full transition-transform",
                                formData.active ? "translate-x-5" : "translate-x-0"
                            )} />
                        </button>
                        <span className="text-sm font-semibold text-foreground">
                            {formData.active ? 'Visible in Registration' : 'Hidden from Registration'}
                        </span>
                    </div>
                    <div className="flex justify-end gap-3 pt-6">
                        <Button variant="outline" className="flex-1 font-bold h-11" onClick={() => setIsEditModalOpen(false)}>Discard</Button>
                        <Button className="flex-1 font-bold h-11" onClick={handleUpdate}>Commit Changes</Button>
                    </div>
                </div>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Course Asset"
                description={`Are you sure you want to permanently remove "${selectedCourse?.name}"? This action will disable the course for all future registrations.`}
                type="danger"
                confirmLabel="Delete Permanently"
                onConfirm={handleDelete}
            />
        </div>
    );
}
