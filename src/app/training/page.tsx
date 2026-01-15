'use client';

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { Card } from "@/components/ui/Card";
import { GraduationCap, BookOpen, UserCheck, AlertTriangle, Lightbulb, Layout, Users, TrendingUp, Award, Handshake, Briefcase, CheckCircle, ArrowRight, Calendar, Clock, MapPin, Search, BarChart3, Receipt, FileSpreadsheet, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Counter } from "@/components/ui/Counter";

export default function Training() {
    return (
        <div className="bg-white">
            {/* Custom Hero for ASA */}
            <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="hidden md:block absolute inset-0">
                        <Image
                            src="/student2.jpg"
                            alt="ASA Students Desktop"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="md:hidden absolute inset-0">
                        <Image
                            src="/student.jpg"
                            alt="ASA Students Mobile"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Refined gradient tint - less blue, more balanced */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950/40 to-slate-950/90 mix-blend-multiply"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <FadeIn>
                        {/* ASA Logo Placeholder */}
                        <div className="mx-auto mb-8 w-32 h-32 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl relative group p-6">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/asa-logo.png"
                                    alt="ASA Logo"
                                    fill
                                    className="object-contain transition-transform group-hover:scale-110 duration-500"
                                />
                            </div>
                            <div className="absolute inset-0 rounded-full border border-accent/20 animate-[ping_3s_linear_infinite] opacity-30 pointer-events-none"></div>
                        </div>

                        {/* Refined Badge Style */}
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-accent-light text-sm font-bold tracking-wider uppercase">
                            Accounting Software Academy
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter">
                            Master <span className="relative inline-block px-1">
                                <span className="relative z-10 text-accent">Digital</span>
                                <span className="absolute bottom-[0.15em] left-0 w-full h-[0.4em] bg-accent/10 backdrop-blur-sm -z-10 rounded-sm border-b-2 border-accent/30"></span>
                            </span> Finance.
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
                            Bridging the gap between classroom learning and the real-world digital finance job market through hands-on, practical training.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link href="#register">
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary-dark font-black min-w-[220px] shadow-[0_10px_30px_-10px_rgba(244,197,94,0.4)] transition-all hover:scale-105 active:scale-95 text-lg">
                                    Apply Now
                                </Button>
                            </Link>
                            <Link href="#curriculum">
                                <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white hover:text-accent min-w-[220px] font-bold text-lg backdrop-blur-sm transition-all">
                                    Explore Program
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white/40 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Redesigned Challenges & Solutions - Transformation Layout */}
            <Section background="white" className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-50/30 -skew-x-12 transform origin-top translate-x-1/2 -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-20">
                        <span className="text-accent font-black tracking-widest text-sm uppercase mb-3 block">Perspective</span>
                        <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">Bridging the Skills Mismatch</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                        {/* The Problem (Before) */}
                        <FadeIn direction="left">
                            <div className="h-full bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-slate-200">
                                    <AlertTriangle size={80} />
                                </div>
                                <div className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-wider text-sm mb-6">
                                    <div className="w-2 h-2 rounded-full bg-red-600"></div> The Problem
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-6">Reality in Modern Accounting</h3>
                                <ul className="space-y-6">
                                    {[
                                        { title: 'Academic Gap', desc: 'Graduates leave school without practical exposure to real accounting systems.' },
                                        { title: 'Market Demand', desc: 'Employers struggle to find ready talent with digital software competency.' },
                                        { title: 'Economic Impact', desc: 'Youth unemployment increases due to a massive mismatch in job skills.' },
                                        { title: 'Business Risk', desc: 'Organizations lack digital financial literacy, leading to poor accountability.' }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5"></div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">{item.title}</h4>
                                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        {/* The ASA Solution (After) */}
                        <FadeIn direction="right">
                            <div className="h-full bg-primary p-8 rounded-3xl border border-primary-light/10 text-white flex flex-col relative overflow-hidden shadow-2xl">
                                <div className="absolute -bottom-10 -right-10 text-white opacity-5">
                                    <Award size={200} />
                                </div>
                                <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-wider text-sm mb-6">
                                    <div className="w-2 h-2 rounded-full bg-accent"></div> The ASA Transformation
                                </div>
                                <h3 className="text-2xl font-bold mb-6">The Career Development Pathway</h3>
                                <div className="space-y-6 flex-grow">
                                    <p className="text-white/80 leading-relaxed">
                                        ASA isn't just a training program — it's an ecosystem designed to bridge students and professionals into the modern workforce.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { icon: Layout, text: 'Practical Software Exposure' },
                                            { icon: Users, text: 'Job-Ready Talent Prep' },
                                            { icon: TrendingUp, text: 'Employability Boost' },
                                            { icon: Handshake, text: 'Financial Literacy Growth' }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                                                <item.icon size={20} className="text-accent" />
                                                <span className="text-sm font-semibold">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-slate-700 overflow-hidden relative">
                                                    <Image src={`https://i.pravatar.cc/150?img=${i + 15}`} alt="Graduate" fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-xs font-medium text-white/60">Success Stories: <span className="text-accent font-bold">2,000+ Certified Graduates</span></div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </Section>

            {/* Why QuickBooks - Parallax Background */}
            <div className="relative py-32 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="QuickBooks Desktop"
                        fill
                        className="object-cover opacity-20 bg-fixed"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <span className="text-accent font-black tracking-widest text-sm uppercase mb-4 block">Industry Standard</span>
                            <h2 className="text-4xl font-bold text-white mb-6">Why QuickBooks?</h2>
                            <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-xl">
                                ASA is centered around QuickBooks, the world’s leading accounting software trusted by over 7 million businesses globally. It offers an all-in-one platform that is reliable, scalable, and produces decision-ready financial data.
                            </p>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                {[
                                    'All-in-one Management',
                                    'User Friendly UI',
                                    'Cloud & Desktop Options',
                                    'Accurate Financial Data',
                                    'Intuit Certified Provider',
                                    'Rwanda Compliant'
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-accent" />
                                        <span className="text-white/80 text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-3">
                                        <Image src="/quickbooks-logo.png" alt="QuickBooks" width={60} height={60} className="object-contain scale-180" />
                                    </div>
                                    <div>
                                        <div className="font-black text-xl text-white">QuickBooks</div>
                                        <div className="text-xs text-accent uppercase tracking-widest font-bold">Standard Certification</div>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="h-2.5 bg-white/10 rounded-full w-full overflow-hidden">
                                        <div className="h-full bg-accent w-[85%]"></div>
                                    </div>
                                    <div className="h-2.5 bg-white/10 rounded-full w-full overflow-hidden">
                                        <div className="h-full bg-accent w-[65%]"></div>
                                    </div>
                                    <div className="h-2.5 bg-white/10 rounded-full w-full overflow-hidden">
                                        <div className="h-full bg-accent w-[92%]"></div>
                                    </div>
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">KURANGA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Curriculum - Single Page Full Coverage */}
            <Section background="white" noise id="curriculum">
                <div className="text-center max-w-4xl mx-auto mb-20 px-4">
                    <span className="text-accent font-black tracking-widest text-sm uppercase mb-3 block">Course Catalog</span>
                    <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">Comprehensive Learning Tracks</h2>
                    <p className="text-gray-600 mt-6 text-lg">ASA delivers deep, hands-on training across all key areas of digital accounting and financial management.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                    {/* Track 1: Core Accounting Software */}
                    <div className="flex flex-col h-full">
                        <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex-grow relative group transition-all duration-300">
                            <div className="absolute top-0 right-8 -translate-y-1/2 flex gap-2">
                                <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">Popular</span>
                            </div>
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Search size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-6 leading-tight">Core Accounting Software</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'QuickBooks Desktop', icon: Layout, desc: 'Pro, Premier, Enterprise (On-Premise)' },
                                    { name: 'QuickBooks Online', icon: Globe, desc: 'Cloud accounting for global collaboration' },
                                    { name: 'Xero Introduction', icon: Layout, desc: 'Alternative modern accounting platforms' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-blue-100 flex items-center justify-center text-blue-600">
                                            <item.icon size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Track 2: Accounting & Finance Skills */}
                    <div className="flex flex-col h-full">
                        <div className="bg-purple-50/50 p-8 rounded-3xl border border-purple-100 flex-grow relative group transition-all duration-300">
                            <div className="absolute top-0 right-8 -translate-y-1/2 flex gap-2">
                                <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">High Demand</span>
                            </div>
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-6 leading-tight">Accounting & Finance Skills</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Digital Bookkeeping', icon: Receipt, desc: 'End-to-end transaction management' },
                                    { name: 'Payroll & VAT', icon: Receipt, desc: 'Taxation workflows for Rwandan context' },
                                    { name: 'Financial Analysis', icon: BarChart3, desc: 'Statements and performance reporting' },
                                    { name: 'Budgeting & Forecasts', icon: BarChart3, desc: 'Predictive financial planning' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-purple-100 flex items-center justify-center text-purple-600">
                                            <item.icon size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Track 3: Business & Digital Skills */}
                    <div className="flex flex-col h-full">
                        <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 flex-grow relative group transition-all duration-300">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Lightbulb size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-6 leading-tight">Business & Digital Skills</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Advanced Excel', icon: FileSpreadsheet, desc: 'Reporting automation and data cleaning' },
                                    { name: 'Process Automation', icon: Layout, desc: 'Digital workflows and business logic' },
                                    { name: 'Entrepreneurship', icon: Lightbulb, desc: 'Financial literacy fundamentals' },
                                    { name: 'Career Readiness', icon: Award, desc: 'Professional development and placement' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-emerald-100 flex items-center justify-center text-emerald-600">
                                            <item.icon size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Popular: The 3-Month Program Track */}
                <div className="mt-16 max-w-4xl mx-auto px-4">
                    <div className="bg-primary p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
                            <Award size={150} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="md:w-3/5">
                                <div className="inline-block px-3 py-1 bg-accent text-primary-dark font-black text-[10px] rounded-full uppercase mb-4 tracking-widest">Flagship Track</div>
                                <h3 className="text-3xl font-black mb-4">The Complete 3-Month Intensive</h3>
                                <p className="text-white/70 leading-relaxed mb-6">
                                    Our most popular career track follows a structured progression through Excel, QuickBooks Core, and Advanced Finance Modules.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} className="text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-widest">3 Months</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={18} className="text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Day/Evening shifts</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-2/5 flex justify-center">
                                <Link href="#register">
                                    <Button size="lg" className="bg-white hover:bg-slate-100 text-primary font-bold px-10 shadow-xl transition-all hover:scale-105 hover:text-white hover:bg-accent">
                                        Review Plan
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Redesigned Payment Options - Clean & Minimalist */}
            <Section background="gray" noise id="register">
                <div className="text-center max-w-3xl mx-auto mb-20 px-4">
                    <span className="text-accent font-black tracking-widest text-sm uppercase mb-3 block">Flexible Enrollment</span>
                    <h2 className="text-4xl font-black text-primary leading-tight">Invest in Your Journey</h2>
                    <p className="text-gray-600 mt-6 text-lg">We believe financial status should never be a barrier to high-quality digital skills.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch px-4">
                    {/* Option 1: Standard Application */}
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 flex flex-col relative group transition-all duration-300 hover:border-accent/40 active:translate-y-1">
                        <div className="mb-10">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-2">Standard Entry</h3>
                            <p className="text-slate-500 text-sm font-medium">Self-Sponsored or Company Sponsored</p>
                        </div>

                        <ul className="space-y-4 mb-12 flex-grow">
                            {[
                                'Immediate graduation certification',
                                'Flexible interest-free installments',
                                'Full access to all physical labs & software licenses',
                                'One-on-one career consultation session'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5">
                                        <Check size={12} className="text-emerald-600" />
                                    </div>
                                    <span className="text-slate-700 text-sm leading-tight">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href="/contact" className="w-full">
                            <Button size="lg" className="w-full bg-primary hover:bg-slate-900 text-white font-black text-[15px] uppercase tracking-widest py-6 rounded-2xl shadow-xl transition-all">
                                Register Standard
                            </Button>
                        </Link>
                    </div>

                    {/* Option 2: Study Now Pay Later (Chancen) */}
                    <div className="bg-white rounded-3xl shadow-2xl shadow-primary/5 border border-primary/5 flex flex-col relative overflow-hidden transition-all duration-300 hover:border-accent/40 active:translate-y-1">
                        {/* Highlighting Strip */}
                        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-600 via-accent to-emerald-500"></div>

                        <div className="p-10 flex flex-col h-full bg-gradient-to-br from-white to-slate-50/50">
                            <div className="mb-10 flex justify-between items-start">
                                <div>
                                    {/* Chancen Logo Placeholder */}
                                    <div className="w-40 h-16 relative bg-white rounded-xl border border-slate-200 mb-6 flex items-center justify-center p-4 shadow-sm hover:grayscale transition-all">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/Chancen-logo.png"
                                                alt="CHANCEN Logo"
                                                fill
                                                className="object-contain scale-200"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-accent mb-2">Study Now, Pay Later</h3>
                                </div>
                                <div className="bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-[10px] font-black text-accent-dark uppercase tracking-widest">
                                    Sponsored
                                </div>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">
                                "Our mission is to ensure quality education is accessible regardless of financial background."
                            </p>

                            <ul className="space-y-4 mb-12 flex-grow font-medium">
                                {[
                                    'Zero upfront tuition fees',
                                    'Pay only a percentage after you are hired',
                                    'Fixed 3-month physical class requirement',
                                    'Available for Day and Evening shifts'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <ArrowRight size={14} className="text-blue-600 mt-1 shrink-0" />
                                        <span className="text-slate-800 text-sm leading-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact" className="w-full">
                                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[15px] uppercase tracking-widest py-6 rounded-2xl shadow-2xl shadow-blue-600/20 transition-all">
                                    Apply for Sponsorship
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Testimonial / Success Stats Strip */}
            <div className="bg-primary py-16 border-t border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(244,197,94,0.1)_0%,transparent_50%)]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 text-white/50">
                        <div className="text-center md:text-left transition-all hover:scale-105">
                            <div className="text-5xl lg:text-7xl font-black text-white mb-2 leading-none"><Counter end={120} suffix="+" /></div>
                            <div className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-accent/70">Placed in 2024</div>
                        </div>
                        <div className="h-16 w-px bg-white/10 hidden md:block"></div>
                        <div className="text-center md:text-left transition-all hover:scale-105">
                            <div className="text-5xl lg:text-7xl font-black text-white mb-2 leading-none"><Counter end={2000} suffix="+" /></div>
                            <div className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-accent/70">Global Alumni</div>
                        </div>
                        <div className="h-16 w-px bg-white/10 hidden md:block"></div>
                        <div className="text-center md:text-left transition-all hover:scale-105">
                            <div className="text-5xl lg:text-7xl font-black text-white mb-2 leading-none">#1</div>
                            <div className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-accent/70">Employer Award</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <Section background="white" className="py-24">
                <CTAWithParallax
                    title="Unlock Your Career Potential"
                    description="Expert training meets job market needs. Join the next intake of the Accounting Software Academy."
                    primaryCTA="Contact Admissions"
                    primaryHref="/contact"
                    secondaryCTA="Our Portfolio"
                    secondaryHref="/products"
                    imageUrl="/ASA1.jpg"
                />
            </Section>
        </div>
    );
}

// Custom sub-components or Icons needed
function Check({ className, size }: { className?: string, size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );
}
