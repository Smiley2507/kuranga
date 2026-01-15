'use client';

import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { Award, Target, Users, CheckCircle, Laptop, BookOpen } from "lucide-react";
import Image from "next/image";
import { Counter } from "@/components/ui/Counter";

const partners = [
    { name: 'Ministry of Education', src: '/republic_of_rwanda_education.png' },
    { name: 'Kigali City', src: '/Kigali_City_Logo.png' },
    { name: 'EBCR', src: '/EBCR_logo.png' },
    { name: 'BPN', src: '/BPN_Logo.png' },
    { name: 'ICT Chamber', src: '/ICT_Chamber_logo.png' },
    { name: 'NUDOR', src: '/NUDOR-Logo.png' },
    { name: 'RICEM', src: '/ricem-logo.png' },
    { name: 'MONDIANT', src: '/mondiant-logo.png' },
    { name: 'Intuit QuickBooks', src: '/Intuit_QuickBooks_logo.png' },
    { name: 'Xero', src: '/Xero logo.png' },
    { name: 'Fathom', src: '/fathom-logo.png' },
];

const values = [
    { title: 'Practical Impact', desc: 'We focus on solutions and training that work in real-life business environments.' },
    { title: 'Integrity & Trust', desc: 'We operate with transparency, professionalism, and accountability in everything we do.' },
    { title: 'Innovation with Purpose', desc: 'We embrace technology not for its own sake, but to solve meaningful problems.' },
    { title: 'Inclusivity', desc: 'We are committed to creating opportunities for diverse communities and underserved groups.' },
    { title: 'Partnership', desc: 'We believe sustainable impact is achieved through collaboration.' },
];

export default function About() {
    return (
        <>
            <PageHero
                title="About Kuranga"
                subtitle="A trusted FinTech and EdTech consulting agency empowering businesses, professionals, and communities through digital finance solutions and practical skills."
            />

            {/* Who We Are - Text Left, Image Right */}
            <Section background="white" className="overflow-visible">
                <FadeIn>
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-full md:flex-1 space-y-6">
                            <span className="text-accent font-semibold tracking-wider text-sm uppercase block">Who We Are</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">A Leading FinTech & EdTech Consulting Agency</h2>
                            <div className="prose prose-lg text-gray-600 leading-relaxed">
                                <p>
                                    Kuranga Digital Ltd is a FinTech and EdTech consulting agency specializing in digital accounting systems, financial management solutions, and professional training. Operating legally since <strong>2014</strong> under the Rwanda Development Board (RDB), we support organizations and individuals to adopt modern financial tools, build practical skills, and unlock economic opportunities.
                                </p>
                                <p>
                                    Our work combines <strong>technology, education, and consulting</strong> to drive sustainable impact in businesses, institutions, and communities.
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:flex-1 relative">
                            {/* Decorative background element */}
                            <div className="absolute -top-10 -right-10 w-2/3 h-full bg-blue-50 rounded-3xl -z-10"></div>

                            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/kuranga1.jpg"
                                    alt="Team meeting"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-lg border border-gray-50 max-w-xs hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full text-accent">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-lg">Since 2014</p>
                                        <p className="text-xs text-gray-500">Registered with RDB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* Our Journey - Image Left, Text Right */}
            <Section background="gray" noise className="overflow-visible">
                <FadeIn>
                    <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
                        <div className="w-full md:flex-1 space-y-6">
                            <span className="text-accent font-semibold tracking-wider text-sm uppercase block">Our History</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">From Software Consultancy to National Impact</h2>
                            <div className="prose prose-lg text-gray-600 leading-relaxed">
                                <p>
                                    Kuranga Digital was founded in response to a growing challenge in Rwanda’s economy—the widening gap between traditional accounting education and the practical skills required in modern, technology-driven workplaces.
                                </p>
                                <p>
                                    Over the past <strong>10+ years</strong>, we have evolved from an accounting software consultancy into a nationally recognized organization delivering digital accounting systems, hands-on professional training, and capacity-building initiatives aligned with national development goals.
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:flex-1 relative">
                            {/* Decorative background element */}
                            <div className="absolute -bottom-10 -left-10 w-2/3 h-full bg-accent/5 rounded-3xl -z-10"></div>

                            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/kuranga-meet3.jpg"
                                    alt="Team collaboration"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-6 bg-white p-5 rounded-xl shadow-lg border border-gray-50 max-w-xs hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-full text-primary">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-lg">Impact Driven</p>
                                        <p className="text-xs text-gray-500">10+ Years Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* What We Do */}
            <Section background="white">
                <div className="text-center mb-16">
                    <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Our Core Pillars</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">What We Do</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FadeIn delay={0}>
                        <Card className="p-8 h-full flex flex-col hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                                <Laptop size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">Digital Finance & Accounting Systems</h3>
                            <p className="text-gray-600 leading-relaxed flex-grow">
                                We design, implement, customize, and support accounting and financial management systems that improve accuracy, efficiency, and compliance. Our expertise includes industry-leading tools such as <strong>QuickBooks, Xero</strong>, payroll systems, and custom financial solutions tailored to Rwanda’s regulatory environment.
                            </p>
                        </Card>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <Card className="p-8 h-full flex flex-col hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">Professional Training & Capacity Building</h3>
                            <p className="text-gray-600 leading-relaxed flex-grow">
                                Through our flagship initiative, the <strong>Accounting Software Academy (ASA)</strong>, we deliver hands-on, experiential training that bridges the gap between classroom learning and labor market requirements. Our programs focus on real-world application, confidence building, and employability.
                            </p>
                        </Card>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <Card className="p-8 h-full flex flex-col hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-6">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">Workforce Development & Inclusion</h3>
                            <p className="text-gray-600 leading-relaxed flex-grow">
                                We promote inclusive digital skills development by empowering youth, women, and persons with disabilities, while connecting trained talent with employers and partners to unlock job opportunities.
                            </p>
                        </Card>
                    </FadeIn>
                </div>
            </Section>

            {/* Mission, Vision, Values - Stacked Layout */}
            <Section background="gray" noise>
                <div className="max-w-6xl mx-auto space-y-20">
                    {/* Mission & Vision Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Target size={120} className="text-blue-600" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl inline-flex w-fit mb-6">
                                    <Target size={28} />
                                </div>
                                <h3 className="text-3xl font-bold text-primary mb-4">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed text-lg flex-grow">
                                    To empower professionals, entrepreneurs, and organizations with <strong>practical skills, reliable digital systems, and expert guidance</strong> in accounting software and financial management.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={120} className="text-purple-600" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl inline-flex w-fit mb-6">
                                    <Award size={28} />
                                </div>
                                <h3 className="text-3xl font-bold text-primary mb-4">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed text-lg flex-grow">
                                    To be Rwanda’s leading provider of <strong>digital finance solutions and market-ready skills</strong>, simplifying financial management and enabling individuals and organizations to focus on growth and impact.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Values Grid - Below Mission/Vision */}
                    <div>
                        <div className="text-center mb-10">
                            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">Our Culture</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-primary">Our Core Values</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((val, i) => (
                                <Card key={i} className="p-6 border-none shadow-sm hover:shadow-md transition-all h-full bg-white/50 backdrop-blur-sm">
                                    <div className="flex flex-col gap-4">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-primary mb-2">
                                                {val.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {val.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Our Impact - Simplified & Visual */}
            <Section background="dark-blue" className="text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>

                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
                        <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Our Impact</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Measurable Impact Over a Decade</h2>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Since 2014, Kuranga Digital has been at the forefront of financial transformation in Rwanda. Our numbers reflect a consistent commitment to job creation, skills development, and institutional strengthening.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                                <Counter end={10} suffix="+" />
                            </div>
                            <div className="h-1 w-12 bg-white/20 mx-auto mb-4 rounded-full"></div>
                            <div className="text-lg font-medium text-white">Years of Operation</div>
                        </div>

                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                                <Counter end={2000} suffix="+" />
                            </div>
                            <div className="h-1 w-12 bg-white/20 mx-auto mb-4 rounded-full"></div>
                            <div className="text-lg font-medium text-white">Individuals Trained</div>
                        </div>

                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                                <Counter end={120} suffix="+" />
                            </div>
                            <div className="h-1 w-12 bg-white/20 mx-auto mb-4 rounded-full"></div>
                            <div className="text-lg font-medium text-white">Placed Talent (2024)</div>
                        </div>

                        <div className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                                2024
                            </div>
                            <div className="h-1 w-12 bg-white/20 mx-auto mb-4 rounded-full"></div>
                            <div className="text-lg font-medium text-white">Best Employer Award</div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* Leadership */}
            <Section background="white">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Expertise you can trust</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Leadership Team</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Kuranga Digital is led by a passionate, multidisciplinary team with deep expertise in accounting, finance, technology, and education. Our leadership combines technical excellence with a strong understanding of Rwanda’s business and development landscape.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { name: 'UWITONZE Patrick Aimable', role: 'Founder & CEO', img: '/CEO.png' },
                            { name: 'INGABIRE Tona Nancy', role: 'Chief Financial Officer', img: '/CFO.png' },
                            { name: 'BIZIMANA Alexandre', role: 'Business Development and Partnerships Advisor', img: '/team02.png' },
                            { name: 'INTUMWA Tonia Marty', role: 'Operations Manager', img: '/Tonia.jpeg' },
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

            {/* Why Kuranga - Parallax Design */}
            <div className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')" }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/80"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">Why Choose Us</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">Why Kuranga?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Proven Experience', desc: 'More than a decade of navigating Rwanda’s unique financial landscape.' },
                            { title: 'Certified Partnerships', desc: 'Official partners with Intuit QuickBooks, Xero, and local government bodies.' },
                            { title: 'Local Expertise', desc: 'Deep understanding of Rwandan tax laws, labor market, and business context.' },
                            { title: 'Hands-on Approach', desc: 'We don’t just advise; we implement, train, and support until it works.' },
                            { title: 'Mission-Driven', desc: 'Every project we undertake is aimed at creating sustainable economic impact.' },
                            { title: 'Full-Service', desc: 'From software installation to staff training and recruitment—we cover it all.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-white/80 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Partners Grid */}
            <Section background="white">
                <div className="text-center mb-16">
                    <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Our Ecosystem</span>
                    <h2 className="text-3xl font-bold text-primary mb-4">Partnerships & Recognition</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kuranga Digital’s work is strengthened by strong institutional partnerships and industry recognition.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center max-w-6xl mx-auto px-4">
                    {partners.map((partner, i) => (
                        <div key={i} className="flex items-center justify-center p-4 h-30 bg-white rounded-xl shadow-sm border border-gray-100 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <div className="relative w-full h-full">
                                <Image
                                    src={partner.src}
                                    alt={partner.name}
                                    fill
                                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Partner With a Team That Understands Both Technology and People"
                    description="Whether you are an organization seeking reliable financial systems, an institution building capacity, or a partner driving impact, Kuranga Digital is ready to work with you."
                    primaryCTA="Contact Us"
                    primaryHref="/contact"
                    secondaryCTA="Explore Our Programs"
                    secondaryHref="/training"
                    imageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop"
                />
            </Section>
        </>
    );
}
