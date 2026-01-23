'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { Table, THeader, TBody, TRow, THead, TCell } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { api, ApiResponse } from "@/lib/api";
import { Search, UserPlus, Mail, Shield, Building2, Edit2, Trash2, X, Check, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { Dialog } from '@/components/ui/Dialog';

export default function UsersManagementPage() {
    const { showToast } = useToast();
    const [users, setUsers] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Dialog state
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; userId: number | null }>({
        isOpen: false,
        userId: null
    });

    // Modal Form State
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'ADMIN',
        partnerId: '',
        active: true
    });

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await api.getUsers(page, 10);
            if (res.data.content) {
                setUsers(res.data.content);
                setTotalPages(res.data.totalPages);
            }
        } catch (error: any) {
            console.error('Failed to fetch users:', error);
            showToast(error.message || 'Failed to fetch users', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPartners = async () => {
        try {
            const res = await api.getPartners();
            setPartners(res.data);
        } catch (error) {
            console.error('Failed to fetch partners:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchPartners();
    }, [page]);

    const handleOpenModal = (user: any = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                username: user.username,
                email: user.email,
                password: '', // Don't show password
                role: user.role,
                partnerId: user.partnerId?.toString() || '',
                active: user.active
            });
        } else {
            setEditingUser(null);
            setFormData({
                username: '',
                email: '',
                password: '',
                role: 'ADMIN',
                partnerId: '',
                active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.email || (!editingUser && !formData.password)) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                partnerId: formData.role === 'PARTNER' && formData.partnerId ? parseInt(formData.partnerId) : null
            };

            if (editingUser) {
                await api.updateUser(editingUser.id, payload);
                showToast('User account updated successfully', 'success');
            } else {
                await api.createUser(payload);
                showToast('New user account provisioned successfully', 'success');
            }
            setIsModalOpen(false);
            fetchUsers();
        } catch (error: any) {
            console.error('Operation failed:', error);
            showToast(error.message || 'Failed to save user. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.userId) return;

        setIsSubmitting(true);
        try {
            await api.deleteUser(deleteDialog.userId);
            showToast('User account disabled successfully', 'success');
            setDeleteDialog({ isOpen: false, userId: null });
            fetchUsers();
        } catch (error: any) {
            console.error('Delete failed:', error);
            showToast(error.message || 'Failed to disable user', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">User Management</h1>
                    <p className="text-muted-foreground text-sm font-medium">Control system access and assign roles to personnel.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="font-bold h-11 shadow-lg shadow-accent/20 transition-all active:scale-[0.98]">
                    <UserPlus size={18} className="mr-2" /> Add New User
                </Button>
            </div>

            {/* Content Card */}
            <Card className="border-border bg-card shadow-sm overflow-hidden border rounded-[5px]">
                <div className="p-4 md:p-6 border-b border-border bg-muted/30">
                    <div className="relative group max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                        <Input
                            placeholder="Search by username or email..."
                            className="pl-11 h-11 bg-background border border-border focus:border-accent transition-all ring-0 rounded-[5px]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <Table>
                        <THeader>
                            <TRow className="bg-muted/50 hover:bg-muted/50">
                                <THead>User Information</THead>
                                <THead>Role & Permission</THead>
                                <THead>Status</THead>
                                <THead>Joined Date</THead>
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
                            ) : filteredUsers.length === 0 ? (
                                <TRow>
                                    <TCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground opacity-20">
                                                <Shield size={32} />
                                            </div>
                                            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No personnel found</p>
                                        </div>
                                    </TCell>
                                </TRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TRow key={user.id} className="group hover:bg-muted/30 transition-colors">
                                        <TCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-[5px] bg-foreground flex items-center justify-center text-accent font-black text-sm shadow-md transition-transform group-hover:scale-110">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground leading-tight flex items-center gap-2">
                                                        {user.username}
                                                        {user.role === 'ADMIN' && <Shield size={12} className="text-accent" />}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                                                        <Mail size={12} /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge variant={user.role === 'ADMIN' ? 'info' : 'default'} className="w-fit font-bold text-[10px] uppercase rounded-[5px]">
                                                    {user.role}
                                                </Badge>
                                                {user.partnerName && (
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                                                        <Building2 size={10} /> {user.partnerName}
                                                    </p>
                                                )}
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full", user.active ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-muted-foreground/30")} />
                                                <span className={cn("text-xs font-bold uppercase", user.active ? "text-green-600" : "text-muted-foreground/50")}>
                                                    {user.active ? 'Active' : 'Disabled'}
                                                </span>
                                            </div>
                                        </TCell>
                                        <TCell>
                                            <p className="text-xs font-bold text-muted-foreground">
                                                {new Date(user.createdAt).toLocaleDateString('en-RW', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </TCell>
                                        <TCell className="text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    onClick={() => handleOpenModal(user)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-accent/10 hover:text-accent rounded-[5px]"
                                                >
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button
                                                    onClick={() => setDeleteDialog({ isOpen: true, userId: user.id })}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-[5px]"
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

                {/* Pagination */}
                <div className="p-4 md:p-6 border-t border-border bg-muted/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Total System Personnel: <span className="text-foreground">{users.length}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="w-9 h-9 p-0 rounded-[5px] border-border bg-card"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <div className="flex items-center bg-muted/50 px-3 h-9 rounded-[5px] text-xs font-bold text-foreground">
                            Page {page + 1} of {totalPages || 1}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            className="w-9 h-9 p-0 rounded-[5px] border-border bg-card"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </Card>

            <Dialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, userId: null })}
                title="Disable User Account"
                description="Are you sure you want to disable this user account? The user will no longer be able to access the system until re-enabled."
                type="danger"
                confirmLabel="Disable Account"
                onConfirm={handleDelete}
                isLoading={isSubmitting}
            />

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                            <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">
                                        {editingUser ? 'Update Account' : 'Provision New Account'}
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">Define access levels and authentication credentials.</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-[5px] transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Username"
                                        placeholder="j.doe"
                                        disabled={!!editingUser}
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="doe@kuranga.rw"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <Input
                                    label={editingUser ? "New Password (Leave blank to keep current)" : "Access Password"}
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required={!editingUser}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground/90">System Role</label>
                                        <Select
                                            className="w-full h-11 border border-zinc-300 rounded-[5px]"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                            options={[
                                                { value: 'ADMIN', label: 'Administrator' },
                                                { value: 'PARTNER', label: 'Partner Rep' },
                                            ]}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground/90">Entity Association</label>
                                        <Select
                                            className="w-full h-11 border border-zinc-300 rounded-[5px]"
                                            value={formData.partnerId}
                                            onChange={(e) => setFormData({ ...formData, partnerId: e.target.value })}
                                            disabled={formData.role !== 'PARTNER'}
                                            options={[
                                                { value: '', label: 'No Association' },
                                                ...partners.map(p => ({ value: p.id.toString(), label: p.name }))
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, active: !formData.active })}
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
                                        {formData.active ? 'Account Enabled' : 'Account Disabled'}
                                    </span>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 font-bold h-11"
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isSubmitting}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 font-bold h-11"
                                        isLoading={isSubmitting}
                                    >
                                        {editingUser ? 'Commit Changes' : 'Initialize Account'}
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
