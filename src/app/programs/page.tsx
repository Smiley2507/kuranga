import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { Users, Rocket, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Programs() {
    return (
        <>
            <PageHero
                title="Our Initiatives"
                subtitle="Driving social impact through digital inclusion and entrepreneurship."
            />

            <Section background="white">
                <div className="space-y-24 md:space-y-32">
                    {/* Digital on Demand */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                        <div className="flex-1">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-primary mb-6">
                                <Rocket size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Digital on Demand</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Professional consulting services delivering reliable, compliant, and scalable digital systems. We help organizations modernize their operations to compete in the digital age.
                            </p>
                            <Link href="/services">
                                <Button variant="outline">View Our Services</Button>
                            </Link>
                        </div>
                        <div className="flex-1 h-[500px] w-full relative rounded-2xl overflow-hidden shadow-2xl group">
                            <Image
                                src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2670&auto=format&fit=crop"
                                alt="Consulting"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* MyPathpreneur */}
                    <div id="mypathpreneur" className="scroll-mt-24 flex flex-col md:flex-row-reverse gap-12 md:gap-20 items-center">
                        <div className="flex-1">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 mb-6">
                                <Users size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">MyPathpreneur</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Empowering youth, women, and persons with disabilities with business, accounting, and entrepreneurship skills. This initiative creates pathways to self-reliance and economic contribution.
                            </p>
                            <Button variant="outline">Support This Program</Button>
                        </div>
                        <div className="flex-1 h-[500px] w-full relative rounded-2xl overflow-hidden shadow-2xl group">
                            <Image
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop"
                                alt="Training Workshop"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Human Resources Outsourcing */}
                    <div id="hr-outsourcing" className="scroll-mt-24 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                        <div className="flex-1">
                            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-700 mb-6">
                                <Briefcase size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Human Resources Outsourcing</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                We connect trained professionals with employers, creating employment opportunities and workforce solutions. We don&#39;t just train; we help place talent in roles where they can excel.
                            </p>
                            <Link href="/contact">
                                <Button variant="outline">Find Talent / Find Work</Button>
                            </Link>
                        </div>
                        <div className="flex-1 h-[500px] w-full relative rounded-2xl overflow-hidden shadow-2xl group">
                            <Image
                                src="https://images.unsplash.com/photo-1521791136064-7985c2d11f99?q=80&w=2669&auto=format&fit=crop"
                                alt="HR Services"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-orange-900/5 mix-blend-multiply"></div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Join Forces With Us"
                    description="Are you a development partner, NGO, or government body looking to collaborate on impact-driven initiatives?"
                    primaryCTA="Become a Partner"
                    primaryHref="/contact"
                    imageUrl="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2673&auto=format&fit=crop"
                />
            </Section>
        </>
    );
}
