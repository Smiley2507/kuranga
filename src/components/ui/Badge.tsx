import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' | 'info';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
    const variants = {
        default: 'bg-muted text-muted-foreground border-border',
        success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
        error: 'bg-red-500/10 text-red-600 border-red-500/20',
        info: 'bg-accent/10 text-accent border-accent/20',
        outline: 'border-border text-muted-foreground',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-[5px] border px-2.5 py-0.5 text-[10px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 uppercase tracking-tight',
                variants[variant],
                className
            )}
            {...props}
        />
    );
};
