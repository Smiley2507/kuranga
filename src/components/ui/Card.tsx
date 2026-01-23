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
                    'rounded-[5px] p-6 transition-all duration-500 ease-out border',
                    {
                        // Classic White (Adaptable)
                        'bg-card text-card-foreground shadow-sm border-border': variant === 'white',

                        // Glass Effects (Keeping for specific uses, but updated)
                        'glass-panel shadow-md border-border': variant === 'glass',
                        'glass-panel-dark text-white border-white/10': variant === 'glass-dark',

                        // Premium Hover Effects - simplified
                        'hover:shadow-md hover:border-accent/20': hoverEffect,
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
