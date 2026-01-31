'use client';

import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import { Card } from "@/components/ui/Card";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import Link from "next/link";
import { Package, Check, Layers, Cloud, ShoppingCart, Users, Database, PieChart, FileText, ArrowRightLeft } from "lucide-react";

import { products } from "@/lib/data/products";
import { ArrowRight } from "lucide-react";

export default function Products() {
    return (
        <>
            <PageHero
                title="Our Products"
                subtitle="We partner with the world's leading financial platforms to bring you the best tools for your business."
            />

            <Section background="white">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-6 tracking-tight">Our Product Portfolio</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We provide and support industry-leading financial and business software solutions tailored for Rwanda's business environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, idx) => (
                        <Card key={idx} hoverEffect className="p-8 border border-border/50 flex flex-col h-full group bg-card hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
                            <div className="w-14 h-14 bg-accent/5 rounded-[5px] flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 ring-1 ring-accent/10">
                                <Package size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{product.name}</h3>
                            <p className="text-muted-foreground mb-8 text-sm leading-relaxed flex-grow">
                                {product.description}
                            </p>
                            {product.features && (
                                <ul className="space-y-3 mb-8 mt-auto pt-6 border-t border-border/50">
                                    {product.features.slice(0, 3).map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-muted-foreground">
                                            <Check size={14} className="text-accent mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="flex items-center justify-between mt-auto">
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="text-accent text-sm font-bold inline-flex items-center gap-2 group/link"
                                >
                                    Explore Product <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-muted-foreground hover:text-primary transition-colors text-xs font-semibold"
                                >
                                    Request Demo
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Need Help Choosing?"
                    description="Our experts will help you select the right software for your organization's unique needs."
                    primaryCTA="Request a Product Demo"
                    primaryHref="/contact"
                    imageUrl="/business.jpg"
                />
            </Section>
        </>
    );
}
