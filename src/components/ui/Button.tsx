import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-[5px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
                    {
                        // Variants - Standardized with theme variables
                        'bg-accent text-white hover:bg-accent/90 hover:shadow-md': variant === 'primary',
                        'bg-background text-foreground border border-border hover:bg-muted': variant === 'secondary',
                        'border border-border text-foreground bg-transparent hover:bg-muted': variant === 'outline',
                        'hover:bg-muted text-foreground': variant === 'ghost',
                        // Sizes
                        'h-10 px-4 text-xs': size === 'sm',
                        'h-11 px-6 text-sm': size === 'md',
                        'h-12 px-8 text-sm': size === 'lg',
                    },
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
