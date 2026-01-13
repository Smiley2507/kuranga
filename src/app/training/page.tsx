import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { GraduationCap, BookOpen, UserCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const programs = [
    "QuickBooks Desktop, Online & POS",
    "Xero Accounting",
    "HR & Payroll Systems",
    "Asset Management Software",
    "Financial Reporting & Analysis",
    "Financial Modeling & MS Office",
    "Entrepreneurship & Financial Literacy"
];

export default function Training() {
    return (
        <>
            <PageHero
                title="Practical Accounting & Digital Finance Training"
                subtitle="Accounting Software Academy (ASA) — Bridging the gap between academic theory and workplace reality through practical, hands-on training."
            />

            <Section background="white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-6">Training Philosophy</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            ASA was designed to bridge the gap between academic theory and workplace requirements. Our programs emphasize hands-on learning, real software environments, and industry-aligned outcomes.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <BookOpen className="text-accent shrink-0" />
                                <span className="text-primary font-medium">Hands-on Software</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserCheck className="text-accent shrink-0" />
                                <span className="text-primary font-medium">Job-Ready Skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[500px] w-full relative rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"
                            alt="Classroom Training"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
                    </div>
                </div>
            </Section>

            <Section background="gray" noise>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary">Training Programs</h2>
                    <p className="text-gray-600 mt-2">Certified courses designed for your career growth.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, idx) => (
                        <Card key={idx} hoverEffect className="p-6 flex flex-col justify-between">
                            <div>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${idx % 3 === 0 ? 'bg-blue-100 text-blue-700' :
                                    idx % 3 === 1 ? 'bg-purple-100 text-purple-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    <GraduationCap size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-2">{program}</h3>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link href="/contact" className="text-accent text-sm font-medium hover:underline">
                                    Inquire now
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Certification & Outcomes"
                    description="Our programs are endorsed by the Ministry of Education and trusted by employers seeking job-ready professionals."
                    primaryCTA="Enroll in a Training Program"
                    primaryHref="/contact"
                    imageUrl="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop"
                />
            </Section>
        </>
    );
}
