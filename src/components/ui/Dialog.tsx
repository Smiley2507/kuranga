'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Info, HelpCircle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children?: React.ReactNode;
    type?: 'info' | 'success' | 'warning' | 'danger' | 'confirm';
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    isLoading?: boolean;
}

export function Dialog({
    isOpen,
    onClose,
    title,
    description,
    children,
    type = 'info',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    isLoading = false
}: DialogProps) {
    const icons = {
        info: <Info className="text-blue-500" size={24} />,
        success: <CheckCircle2 className="text-emerald-500" size={24} />,
        warning: <AlertCircle className="text-amber-500" size={24} />,
        danger: <AlertCircle className="text-red-500" size={24} />,
        confirm: <HelpCircle className="text-accent" size={24} />
    };

    const colors = {
        info: 'bg-blue-500/10 border-blue-500/20',
        success: 'bg-emerald-500/10 border-emerald-500/20',
        warning: 'bg-amber-500/10 border-amber-500/20',
        danger: 'bg-red-500/10 border-red-500/20',
        confirm: 'bg-accent/10 border-accent/20'
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    onClick={() => !isLoading && onClose()}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-card border border-border shadow-2xl rounded-[5px] overflow-hidden"
                >
                    <div className="p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className={cn("p-3 rounded-[5px] border shrink-0", colors[type])}>
                                {icons[type]}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground leading-tight mb-2">{title}</h3>
                                {description && <p className="text-sm text-muted-foreground font-medium leading-relaxed">{description}</p>}
                            </div>
                        </div>

                        {children && <div className="mb-6">{children}</div>}

                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                                className="font-bold h-11 px-6 rounded-[5px]"
                            >
                                {cancelLabel}
                            </Button>
                            {onConfirm && (
                                <Button
                                    variant={type === 'danger' ? 'outline' : 'primary'}
                                    onClick={onConfirm}
                                    isLoading={isLoading}
                                    className={cn(
                                        "font-bold h-11 px-8 rounded-[5px]",
                                        type === 'danger' && "border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                                    )}
                                >
                                    {confirmLabel}
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
