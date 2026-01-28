'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
    {
        id: 1,
        headline: 'Market‑Ready Digital Accounting & Finance Skills',
        subheadline: 'Through the Accounting Software Academy, we bridge the gap between classroom learning and the labor market using hands‑on training with industry‑leading tools like QuickBooks and Xero.',
        ctaPrimary: 'Discover ASA',
        ctaPrimaryHref: '/training',
        ctaSecondary: 'Register for Training',
        ctaSecondaryHref: '/training',
        image: '/student.jpg',
    },
    {
        id: 2,
        headline: 'Smart Financial Systems for Smarter Organizations',
        subheadline: 'We help businesses, NGOs, schools, and public institutions design, implement, and support reliable accounting, payroll, and financial management systems tailored to Rwanda’s context.',
        ctaPrimary: 'Explore Our Services',
        ctaPrimaryHref: '/services',
        ctaSecondary: 'Request a Consultation',
        ctaSecondaryHref: '/contact',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2622&auto=format&fit=crop',
    },
    {
        id: 3,
        headline: 'A Trusted FinTech & EdTech Partner Since 2014',
        subheadline: 'Certified by Intuit, endorsed by the Ministry of Education, and trusted by partners across Rwanda to deliver impact‑driven digital finance solutions.',
        ctaPrimary: 'About Kuranga',
        ctaPrimaryHref: '/about',
        ctaSecondary: 'Partner With Us',
        ctaSecondaryHref: '/contact',
        image: '/business.jpg',
    },
];

export function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[800px] w-full overflow-hidden text-white bg-primary"> {/* Add default bg-primary to avoid white flash */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slides[current].image}
                            alt=""
                            fill
                            priority
                            className="object-cover"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#073161]/95 to-[#073161]/60 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-black/30" />
                    </div>

                    {/* Noise Overlay */}
                    <div className="absolute inset-0 opacity-20 noise-bg mix-blend-overlay pointer-events-none"></div>

                    <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                        <div className="max-w-3xl pt-32 md:pt-20">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6 backdrop-blur-sm">
                                    Digital Excellence in Rwanda
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                            >
                                {slides[current].headline}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
                            >
                                {slides[current].subheadline}
                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link href={slides[current].ctaPrimaryHref}>
                                    <Button size="lg" className="w-full sm:w-auto">
                                        {slides[current].ctaPrimary}
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href={slides[current].ctaSecondaryHref}>
                                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                        {slides[current].ctaSecondary}
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? 'bg-accent w-8' : 'bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
