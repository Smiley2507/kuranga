'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';

interface PageHeroProps {
    title: string;
    subtitle: string;
    className?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
    return (
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28 bg-primary text-white overflow-hidden">
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute inset-0 noise-bg opacity-5 mix-blend-overlay"></div>

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="max-w-3xl">
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {title}
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-white/90 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {subtitle}
                        </motion.p>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
