'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data/products';
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import Image from "next/image";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = products.find(p => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <PageHero
                title={product.name}
                subtitle={product.category}
            />

            <Section background="white">
                <div className="container mx-auto px-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-square lg:aspect-video rounded-[5px] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-primary mb-6">Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {product.longDescription || product.description}
                            </p>

                            <h3 className="text-xl font-bold text-primary mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 p-4 rounded-[5px] bg-muted/30 border border-border/50">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={14} className="text-accent" />
                                        </div>
                                        <span className="text-sm font-medium text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 flex flex-wrap gap-4">
                                <Link href="/contact">
                                    <Button size="lg" className="shadow-lg hover:shadow-xl">
                                        Request a Demo
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="lg" variant="outline">
                                        Speak to an Expert
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>

            <Section background="gray" noise>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-card rounded-[5px] p-8 md:p-16 border border-border shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Why Choose {product.name}?</h2>
                                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                                    Join hundreds of businesses in Rwanda that have transformed their operations using our expert implementation of {product.name}. We don't just sell software; we provide a complete solution tailored to your growth.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-border pt-12 mt-12">
                                    <div>
                                        <div className="text-4xl font-bold text-accent mb-2">100%</div>
                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Compliance</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Support</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-accent mb-2">ROI</div>
                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Guaranteed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Ready to get started?"
                    description={`Our team of experts is ready to help you implement ${product.name} today.`}
                    primaryCTA="Get Started Now"
                    primaryHref="/contact"
                    imageUrl={product.image}
                />
            </Section>
        </main>
    );
}
