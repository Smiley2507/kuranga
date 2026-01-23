import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    container?: boolean;
    background?: 'white' | 'gray' | 'glass' | 'none' | 'dark-blue';
    noise?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
    ({ className, container = true, background = 'white', noise = false, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn(
                    'py-20 md:py-32 relative overflow-hidden',
                    {
                        'bg-background': background === 'white',
                        'bg-muted/50': background === 'gray',
                        'glass-panel': background === 'glass',
                        'bg-primary text-white': background === 'dark-blue',
                        'noise-bg': noise,
                    },
                    className
                )}
                {...props}
            >
                {container ? (
                    <div
                        className={cn(
                            'container mx-auto px-4 md:px-6 relative z-10',
                            {
                                'py-16 md:py-24': !className?.includes('py-'),
                            },
                            className
                        )}
                    >
                        {children}
                    </div>
                ) : (
                    children
                )}
            </section>
        );
    }
);

Section.displayName = 'Section';
