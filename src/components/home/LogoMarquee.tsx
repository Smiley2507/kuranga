'use client';

import { motion } from 'framer-motion';

const partners = [
    'Ministry of Education',
    'ICT Chamber',
    'Intuit',
    'EBCR',
    'Kigali City',
    'QuickBooks',
    'Xero',
    'Sage',
    // Duplicate for seamless loop
    'Ministry of Education',
    'ICT Chamber',
    'Intuit',
    'EBCR',
    'Kigali City',
    'QuickBooks',
    'Xero',
    'Sage',
];

export function LogoMarquee() {
    return (
        <div className="py-10 bg-white border-b border-gray-100 overflow-hidden relative">
            <div className="flex w-full">
                <motion.div
                    className="flex gap-16 whitespace-nowrap"
                    animate={{ x: [0, -1000] }} // Adjust based on width
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 30, // Adjust speed
                    }}
                >
                    {partners.map((partner, index) => (
                        <div key={index} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-default">
                            {/* Placeholder for Logo - Replaced with Text for now */}
                            <span className="text-xl font-bold font-mono text-gray-400">{partner}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
    );
}
