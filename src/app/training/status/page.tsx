'use client';

import { useState, useEffect, useRef } from 'react';
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { api, StudentStatusResponse } from "@/lib/api";
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle2, Clock, XCircle, FileText, Calendar, Layout, User, Upload } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export default function StudentStatusPage() {
    const searchParams = useSearchParams();
    const [code, setCode] = useState(searchParams.get('code') || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [statusData, setStatusData] = useState<StudentStatusResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const checkStatus = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!code) return;

        setIsLoading(true);
        setError(null);
        try {
            const res = await api.checkStatus(code);
            setStatusData(res.data);
        } catch (err: any) {
            setError(err.message || 'Registration code not found');
            setStatusData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadPayment = async () => {
        if (!receiptFile || !statusData?.id) return;

        setIsUploading(true);
        try {
            console.log('Uploading payment for student ID:', statusData.id);
            console.log('File:', receiptFile.name, receiptFile.size);

            const response = await api.uploadPaymentProof(statusData.id, receiptFile);
            console.log('Upload response:', response);

            // Refresh status
            await checkStatus();
            setReceiptFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            alert('Payment proof uploaded successfully! Your application is now under review.');
        } catch (err: any) {
            console.error('Upload error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Upload failed. Please try again.';
            alert(`Upload failed: ${errorMessage}`);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (searchParams.get('code')) {
            checkStatus();
        }
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'APPROVED': return <CheckCircle2 size={32} className="text-emerald-500" />;
            case 'REJECTED': return <XCircle size={32} className="text-rose-500" />;
            case 'PENDING_PAYMENT': return <Clock size={32} className="text-amber-500" />;
            default: return <Clock size={32} className="text-blue-500" />;
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'success';
            case 'REJECTED': return 'error';
            case 'PENDING_PAYMENT': return 'warning';
            default: return 'info';
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-900 font-sans">
            {/* Background Image with Overlays */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: 'url("/ASA1.jpg")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-accent/50" />
                <div className="absolute inset-0 noise-bg opacity-20 mix-blend-soft-light" />
            </div>

            <Section background="none" className="relative z-10 pt-32 pb-20">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-4">Application Status</h1>
                        <p className="text-white/70">Enter your registration code to track your progress.</p>
                    </div>

                    <Card className="bg-card/90 backdrop-blur-xl border-white/10 p-6 md:p-8 rounded-[5px] shadow-2xl mb-8">
                        <form onSubmit={checkStatus} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    placeholder="Enter Registration Code (e.g. ASA1234)"
                                    className="pl-10 h-12 bg-background/50 border-white/20 text-gray-900"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                />
                            </div>
                            <Button size="md" className="h-12 px-8 font-bold" isLoading={isLoading}>
                                Check
                            </Button>
                        </form>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-rose-400 text-xs font-bold mt-4 px-1"
                            >
                                {error}
                            </motion.p>
                        )}
                    </Card>

                    <AnimatePresence mode="wait">
                        {statusData && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <Card className="bg-card/90 backdrop-blur-xl border-white/10 p-8 rounded-[5px] shadow-2xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-muted/50 rounded-[5px] flex items-center justify-center border  border-white/10">
                                                {getStatusIcon(statusData.status)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-secondary">{statusData.fullName}</h3>
                                                <p className="text-accent text-[10px] font-black uppercase tracking-widest mt-1">{statusData.registrationCode}</p>
                                            </div>
                                        </div>
                                        <Badge variant={getStatusVariant(statusData.status) as any} className="h-7 px-3 rounded-full font-bold">
                                            {statusData.statusDisplayName}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                        <div className="flex items-start gap-3">
                                            <Layout className="text-accent shrink-0 mt-0.5" size={18} />
                                            <div>
                                                <p className="text-[10px] text-gray-900/40 uppercase font-black tracking-widest mb-1">Applied Program</p>
                                                <p className="text-gray-700 text-sm font-bold">{statusData.program}</p>
                                            </div>
                                        </div>
                                        {statusData.cohort && (
                                            <div className="flex items-start gap-3">
                                                <Calendar className="text-accent shrink-0 mt-0.5" size={18} />
                                                <div>
                                                    <p className="text-[10px] text-gray-900/40 uppercase font-black tracking-widest mb-1">Assigned Cohort</p>
                                                    <p className="text-gray-700 text-sm font-bold">{statusData.cohort.name}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 p-6 bg-accent/5 border border-accent/10 rounded-[5px]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FileText size={16} className="text-accent" />
                                            <p className="text-xs font-bold text-accent uppercase tracking-widest">Next Steps</p>
                                        </div>
                                        <p className="text-gray-700/80 text-sm leading-relaxed font-medium">
                                            {statusData.nextSteps}
                                        </p>
                                        {statusData.adminComments && (
                                            <div className="mt-4 pt-4 border-t border-gray-700/5">
                                                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Remarks</p>
                                                <p className="text-white/70 text-sm italic">"{statusData.adminComments}"</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Upload Section */}
                                    {statusData.status === 'PENDING_PAYMENT' && (
                                        <div className="mt-6 space-y-4">
                                            <div
                                                className="border border-dashed border-white/20 rounded-[5px] p-10 text-center hover:border-accent group transition-all cursor-pointer relative bg-white/5"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    if (e.dataTransfer.files[0]) setReceiptFile(e.dataTransfer.files[0]);
                                                }}
                                            >
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) setReceiptFile(e.target.files[0]);
                                                    }}
                                                />
                                                {receiptFile ? (
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                                                            <CheckCircle2 size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-700 text-sm">{receiptFile.name}</p>
                                                            <p className="text-xs text-gray-700/60 mt-1">{(receiptFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>
                                                        <Button size="sm" variant="ghost" className="h-8 text-xs text-red-700 hover:text-red-600" onClick={(e) => {
                                                            e.stopPropagation();
                                                            setReceiptFile(null);
                                                            if (fileInputRef.current) {
                                                                fileInputRef.current.value = '';
                                                            }
                                                        }}>Remove File</Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="w-12 h-12 bg-white/10 text-gray-700/60 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                                            <Upload size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-700 text-sm transition-colors group-hover:text-accent">Upload Payment Receipt</p>
                                                            <p className="text-xs text-gray-700/60 mt-1">Drag or click to browse files</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                size="md"
                                                className="w-full h-12 font-bold"
                                                disabled={!receiptFile}
                                                onClick={handleUploadPayment}
                                                isLoading={isUploading}
                                            >
                                                Complete Registration
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Section>
        </div>
    );
}
