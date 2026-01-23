'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
    { name: 'Ministry of Education', src: '/republic_of_rwanda_education.png' },
    { name: 'Kigali City', src: '/Kigali_City_Logo.png' },
    { name: 'EBCR', src: '/EBCR_logo.png' },
    { name: 'BPN', src: '/BPN_Logo.png' },
    { name: 'ICT Chamber', src: '/ICT_Chamber_logo.png' },
    { name: 'Intuit QuickBooks', src: '/Intuit_QuickBooks_logo.png' },
    { name: 'Xero', src: '/Xero logo.png' },
];

export function LogoMarquee() {
    return (
        <div className="py-10 bg-background border-b border-border overflow-hidden relative">
            <div className="flex w-full">
                <motion.div
                    className="flex gap-16 whitespace-nowrap items-center"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 60,
                    }}
                >
                    {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                        <div key={index} className="relative w-32 h-16 shrink-0 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-default">
                            <Image
                                src={partner.src}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
    );
}
