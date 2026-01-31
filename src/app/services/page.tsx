'use client';

import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import { services } from "@/lib/data/services";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <PageHero
                title="Expert Services"
                subtitle="End-to-end digital solutions designed to streamline your operations, ensure compliance, and drive efficiency."
            />

            <Section background="white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-24 md:gap-32">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                id={service.slug}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={cn(
                                    "flex flex-col lg:items-center gap-12 md:gap-20",
                                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                )}
                            >
                                {/* Image side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative aspect-video lg:aspect-[4/3] rounded-[5px] overflow-hidden shadow-2xl group">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[5px]" />
                                    </div>
                                </div>

                                {/* Content side */}
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                                        Service {index + 1}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight">
                                        {service.title}
                                    </h2>

                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>

                                    {service.features && (
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                                                    <CheckCircle2 size={18} className="text-accent shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="pt-8 flex flex-wrap gap-6 items-center">
                                        <Link href="/contact">
                                            <Button size="lg" className="shadow-lg hover:shadow-xl group/btn">
                                                Inquire Now <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="text-primary font-bold hover:text-accent transition-colors flex items-center gap-2"
                                        >
                                            Consult an Expert
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Need a Custom Digital Solution for Your Business?"
                    description="Every business is unique. We specialize in building tailored systems that integrate perfectly with your current workflows."
                    primaryCTA="Start Your Journey"
                    primaryHref="/contact"
                    imageUrl="/ASA3.jpg"
                />
            </Section>
        </main>
    );
}
