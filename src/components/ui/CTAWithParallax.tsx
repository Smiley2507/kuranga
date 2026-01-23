'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useRef } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

interface CTAWithParallaxProps {
    title: string;
    description: string;
    primaryCTA: string;
    primaryHref: string;
    secondaryCTA?: string;
    secondaryHref?: string;
    imageUrl: string;
}

export function CTAWithParallax({
    title,
    description,
    primaryCTA,
    primaryHref,
    secondaryCTA,
    secondaryHref,
    imageUrl
}: CTAWithParallaxProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <motion.div
            ref={ref}
            style={{ scale }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
        >
            {/* Parallax Background Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%]"
            >
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                />
                {/* Multi-layer Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </motion.div>

            {/* Animated dots pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            {/* Noise Texture */}
            <div className="absolute inset-0 noise-bg opacity-10 mix-blend-overlay"></div>

            {/* Floating accent blobs */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 py-16 md:py-24 px-6 md:px-12 text-center flex flex-col items-center justify-center"
            >
                {/* Decorative accent */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-accent mb-6"
                >
                    <Sparkles size={16} />
                    <span className="text-sm font-medium text-white">Let's Work Together</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl leading-tight"
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed"
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href={primaryHref}>
                        <Button
                            size="lg"
                            className="bg-white text-primary border-none hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 group"
                        >
                            {primaryCTA}
                            <motion.span
                                className="ml-2 inline-block"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                →
                            </motion.span>
                        </Button>
                    </Link>
                    {secondaryCTA && secondaryHref && (
                        <Link href={secondaryHref}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/40 text-white hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300"
                            >
                                {secondaryCTA}
                            </Button>
                        </Link>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
