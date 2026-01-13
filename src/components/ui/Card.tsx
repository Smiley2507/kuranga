import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'white' | 'glass' | 'glass-dark';
    hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'white', hoverEffect = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl p-6 transition-all duration-500 ease-out border',
                    {
                        // Classic White
                        'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-gray-100/50': variant === 'white',

                        // Glass Effects
                        'glass-panel shadow-lg border-white/20': variant === 'glass',
                        'glass-panel-dark text-white border-white/10': variant === 'glass-dark',

                        // Premium Hover Effects with lift and glow
                        'hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-accent/20 hover:bg-white': hoverEffect && variant === 'white',
                        'hover:-translate-y-1 hover:shadow-xl hover:bg-white/90': hoverEffect && variant === 'glass',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
