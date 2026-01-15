'use client';

import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { Card } from "@/components/ui/Card";
import {
    Download, Settings, PenTool, BarChart3, GraduationCap,
    FileSpreadsheet, PieChart, Network, ArrowRightLeft,
    Cloud, Link, Wrench, Lightbulb, ArrowRight
} from "lucide-react";
import NextLink from "next/link"; // Renamed to avoid verification conflict if any, though standard Link is fine.

const services = [
    {
        icon: <Download size={24} />,
        title: "Software Sales & Installation",
        description: "We provide discounted sales and installation of leading desktop accounting software, including QuickBooks, as well as affordable online solutions and specialized add-ons. Our goal is to offer reliable, cost-effective tools that support efficient financial management for businesses of all sizes."
    },
    {
        icon: <Settings size={24} />,
        title: "Initial Setup",
        description: "Professional installation and configuration of accounting and business systems. We align your chart of accounts, workflows, user roles, and settings to best fit your industry needs."
    },
    {
        icon: <PenTool size={24} />,
        title: "Software Customization",
        description: "Tailoring QuickBooks, TeamRoll, AssetAccountant, Xero, Fathom, and Taxation Systems to match your operations."
    },
    {
        icon: <BarChart3 size={24} />,
        title: "System Analysis & Development",
        description: "We examine workflows, identify gaps, and design Custom-built digital systems tailored to your operations for efficiency and compliance, including HR solutions, payroll automation, dashboards, ERP modules, and workflow tools—built for efficiency and growth."
    },
    {
        icon: <GraduationCap size={24} />,
        title: "Trainings",
        description: "Practical, certified training in QuickBooks (all versions) endorsed by the Ministry of Education and other accounting tools like Xero, HR & Payroll, Asset Management, Fathom, MS Office, Financial Modeling, Reporting, Entrepreneurship and Financial Literacy. Customized for individuals, groups, professionals, organizations, and educational institutions to meet your unique needs."
    },
    {
        icon: <FileSpreadsheet size={24} />,
        title: "Bookkeeping",
        description: "Reliable, accurate, and compliant bookkeeping services tailored to your business. We ensure clean financial records, proper reconciliation, and adherence to Rwanda’s accounting and tax standards."
    },
    {
        icon: <PieChart size={24} />,
        title: "Report Analysis & Customization",
        description: "Advanced interpretation and analysis of financial reports including performance metrics, cash flow, profitability, variances, and risk indicators. We provide insights, strategic recommendations to strengthen decision-making and custom dashboards and management reports for informed decision-making."
    },
    {
        icon: <Network size={24} />,
        title: "Multi-User Environment Setup (LAN)",
        description: "Local Area Network Secure and optimized office network setup for multi-user systems such as QuickBooks Desktop. Ensures fast performance, stability, and protected access across your organization. We set up secure, optimized multi-user environments for desktop systems."
    },
    {
        icon: <ArrowRightLeft size={24} />,
        title: "Data Migration",
        description: "Whether moving from another accounting software to QuickBooks or upgrading your existing QuickBooks version, we ensure all your transactions are accurately migrated. We seamlessly transfer your financial data to QuickBooks with our secure data migration services. Minimize downtime, avoid errors, and start managing your finances efficiently from day one."
    },
    {
        icon: <Cloud size={24} />,
        title: "DaaS (Desktop as a Service)",
        description: "Desktop as a Service is Secure, cloud-based access to your desktop software from anywhere. Enables multiple users to work on QuickBooks Desktop or other applications in real time, with automatic backups, strong security, and reduced IT infrastructure costs. Desktop as a Service runs your desktop applications in the cloud with access from anywhere. Supporting all Desktop Applications: QuickBooks Desktop, Sage, Tally, and more."
    },
    {
        icon: <Link size={24} />,
        title: "Integration",
        description: "Connecting your QuickBooks and Xero with HR&Payroll platforms, POS, CRM tools, banking APIs, Inventory systems, and other digital solutions to create a unified and automated business ecosystem."
    },
    {
        icon: <Wrench size={24} />,
        title: "System Maintenance, Assistance & Support",
        description: "End-to-end technical support covering system updates, troubleshooting, security checks, performance optimization, backups, user assistance and ongoing system guidance to ensure your operations run without interruption."
    },
    {
        icon: <Lightbulb size={24} />,
        title: "Advisory Services",
        description: "Expert guidance in digital finance, system optimization, financial processes, automation, compliance, and best practices to help businesses operate efficiently and make informed decisions."
    }
];

export default function ServicesPage() {
    return (
        <>
            <PageHero
                title="Our Services"
                subtitle="End-to-end digital solutions designed to streamline your operations, ensure compliance, and drive efficiency."
            />

            <Section background="white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} hoverEffect className="p-8 h-full flex flex-col border border-gray-100">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center text-accent mb-6 shrink-0 shadow-sm border border-blue-100/50">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4 leading-tight">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm flex-grow mb-6">
                                {service.description}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-accent font-medium text-sm group cursor-pointer">
                                <NextLink href="/contact" className="flex items-center gap-2 hover:gap-3 transition-all">
                                    Get Started <ArrowRight size={16} />
                                </NextLink>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section background="gray" noise>
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
