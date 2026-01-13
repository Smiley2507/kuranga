import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/common/PageHero";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { Check, Settings, Cog, Code, FileText, Database, Shield, Monitor, Server, Laptop, Users } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: <Check size={24} />,
        color: 'text-green-700',
        bg: 'bg-green-100',
        title: "Accounting Software Sales & Installation",
        description: "We provide licensed, discounted accounting software solutions including QuickBooks, Xero, Sage, and specialized add-ons, ensuring proper installation and long-term usability."
    },
    {
        icon: <Settings size={24} />,
        color: 'text-blue-700',
        bg: 'bg-blue-100',
        title: "System Setup & Configuration",
        description: "We configure charts of accounts, user roles, workflows, inventory, payroll, and tax settings to align with your industry and operational needs."
    },
    {
        icon: <Cog size={24} />,
        color: 'text-purple-700',
        bg: 'bg-purple-100',
        title: "Software Customization",
        description: "We tailor accounting, HR, payroll, asset management, and reporting systems to match how your organization actually works."
    },
    {
        icon: <Code size={24} />,
        color: 'text-indigo-700',
        bg: 'bg-indigo-100',
        title: "System Analysis & Custom Development",
        description: "We assess your workflows, identify inefficiencies, and develop custom digital solutions such as dashboards, HR systems, payroll automation, and ERP modules."
    },
    {
        icon: <FileText size={24} />,
        color: 'text-orange-700',
        bg: 'bg-orange-100',
        title: "Bookkeeping & Compliance Services",
        description: "We maintain clean, accurate financial records and ensure compliance with Rwanda accounting and tax regulations."
    },
    {
        icon: <Database size={24} />,
        color: 'text-cyan-700',
        bg: 'bg-cyan-100',
        title: "Financial Reporting & Analysis",
        description: "We transform financial data into actionable insights using KPIs, dashboards, and management reports."
    },
    {
        icon: <Server size={24} />,
        color: 'text-pink-700',
        bg: 'bg-pink-100',
        title: "Data Migration & System Conversion",
        description: "We securely migrate financial data between systems or software versions with minimal downtime."
    },
    {
        icon: <Shield size={24} />,
        color: 'text-emerald-700',
        bg: 'bg-emerald-100',
        title: "Multi-User & LAN Setup",
        description: "We design secure, high-performance multi-user environments for desktop accounting systems."
    },
    {
        icon: <Monitor size={24} />,
        color: 'text-violet-700',
        bg: 'bg-violet-100',
        title: "Desktop as a Service (DaaS)",
        description: "Access your desktop accounting software securely from anywhere with cloud-based infrastructure."
    },
    {
        icon: <Laptop size={24} />,
        color: 'text-teal-700',
        bg: 'bg-teal-100',
        title: "System Integration & Automation",
        description: "We connect accounting systems with HR, payroll, POS, banking, CRM, and inventory platforms."
    },
    {
        icon: <Users size={24} />,
        color: 'text-rose-700',
        bg: 'bg-rose-100',
        title: "Ongoing Support & Advisory",
        description: "We provide continuous technical support, system maintenance, and strategic advisory services."
    }
];

export default function ServicesPage() {
    return (
        <>
            <PageHero
                title="End-to-End Accounting & Digital System Services"
                subtitle="Digital on Demand services helping organizations design, implement, and manage accounting and business systems that are accurate, compliant, and scalable."
            />

            <Section background="white">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-6">Streamline Your Operations</h2>
                    <p className="text-gray-600 text-lg">
                        From system setup to ongoing support, we provide the digital infrastructure you need to operate efficiently and compliantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Card key={index} hoverEffect className="p-6">
                            <div className={`w-12 h-12 ${service.bg} rounded-lg flex items-center justify-center ${service.color} mb-4`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {service.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section background="white">
                <CTAWithParallax
                    title="Need a Custom Solution?"
                    description="Every business is unique. Let's discuss your specific requirements and build a system that works for you."
                    primaryCTA="Request a Service Consultation"
                    primaryHref="/contact"
                    imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                />
            </Section>
        </>
    );
}
