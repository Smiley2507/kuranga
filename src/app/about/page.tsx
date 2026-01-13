import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { Award, Target, Users } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <>
            <PageHero
                title="About Kuranga Digital Ltd"
                subtitle="A decade of empowering businesses and professionals through accounting technology and practical skills."
            />

            <Section background="white">
                <FadeIn>
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Story</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Founded in 2014, Kuranga Digital Ltd was created to address a critical gap in the market: the disconnect between traditional accounting education and real-world financial systems.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Over the years, we have grown into a trusted ICT and accounting software consulting firm, supporting organizations and individuals as they transition to modern, digital-first financial operations. What started as a small training initiative has evolved into a comprehensive digital solutions provider.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 h-[500px] w-full relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                                alt="Team meeting"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            <Section background="gray" noise>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <FadeIn>
                        <Card className="p-10 h-full border-none shadow-lg">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 mb-8">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-primary mb-4">Mission</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                To empower professionals, entrepreneurs, and organizations with practical skills, reliable systems, and expert guidance in accounting software and digital finance.
                            </p>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <Card className="p-10 h-full border-none shadow-lg">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 mb-8">
                                <Award size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-primary mb-4">Vision</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                To become Rwanda's leading provider of digital finance solutions and market-ready skills, enabling organizations to operate efficiently and individuals to thrive in the digital economy.
                            </p>
                        </Card>
                    </FadeIn>
                </div>
            </Section>

            <Section background="white">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Expertise you can trust</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Leadership Team</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            The visionaries behind Kuranga Digital Ltd.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { name: 'Celse Amiel', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop' },
                            { name: 'Sarah M.', role: 'Head of Training', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop' },
                            { name: 'David K.', role: 'Senior Consultant', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop' },
                            { name: 'Lisa R.', role: 'Operations Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop' },
                        ].map((member, i) => (
                            <div key={i} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-accent/20 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all duration-500">
                                        <Image
                                            src={member.img}
                                            alt={member.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                                <p className="text-accent font-medium text-sm tracking-wide uppercase">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </Section>

            {/* Partners Grid */}
            <Section background="gray" noise>
                <div className="text-center mb-12">
                    <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Our Ecosystem</span>
                    <h2 className="text-3xl font-bold text-primary">Trusted Partners</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {['Ministry of Education', 'ICT Chamber', 'Intuit', 'EBCR', 'Kigali City', 'QuickBooks', 'Xero', 'Sage'].map((partner, i) => (
                        <div key={i} className="bg-white/50 h-24 rounded-lg flex items-center justify-center border border-gray-200 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                            <span className="font-bold text-gray-400 group-hover:text-primary transition-colors">{partner}</span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Ready to Transform Your Business?"
                    description="Join the hundreds of organizations that trust Kuranga for their financial systems and training needs."
                    primaryCTA="Get in Touch"
                    primaryHref="/contact"
                    imageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop"
                />
            </Section>
        </>
    );
}
