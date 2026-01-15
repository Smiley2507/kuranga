'use client';

import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/common/PageHero";
import { Card } from "@/components/ui/Card";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import Link from "next/link";
import { Package, Check, Layers, Cloud, ShoppingCart, Users, Database, PieChart, FileText, ArrowRightLeft } from "lucide-react";

const products = [
    {
        name: "QuickBooks Desktop",
        desc: "A powerful, feature-rich accounting solution designed for organizations that require advanced financial controls, industry-specific tools, and full on premise data ownership. Ideal for manufacturing, NGOs, hotels, schools, and enterprises with complex workflows.",
        icon: <Layers size={24} />,
        features: ["Advanced financial controls", "Industry-specific tools", "On-premise data ownership"]
    },
    {
        name: "QuickBooks Online",
        desc: "A modern cloud accounting platform that gives real-time access to business finances from anywhere. Perfect for SMEs seeking automation, collaboration, online invoicing, and simplified financial management.",
        icon: <Cloud size={24} />,
        features: ["Real-time access", "Online invoicing", "Collaboration tools"]
    },
    {
        name: "QuickBooks POS",
        desc: "A comprehensive point-of-sale solution that integrates seamlessly with QuickBooks to track sales, inventory, and customers in real-time.",
        icon: <ShoppingCart size={24} />,
        features: ["Sales tracking", "Inventory management", "Customer data sync"]
    },
    {
        name: "TeamRoll (HR & Payroll System)",
        desc: "HR & Payroll system customised for Rwanda-compliant. It automates employee records, leave management, payroll processing, taxes, RSSB deductions, and payslip generation, fully integrable with QuickBooks and other core business systems.",
        icon: <Users size={24} />,
        features: ["Rwanda tax compliant", "RSSB deductions", "QuickBooks integration"]
    },
    {
        name: "AssetAccountant",
        desc: "A smart fixed-asset management software that tracks assets from acquisition to disposal. It automates depreciation, reporting, and compliance, seamlessly integrating with QuickBooks for accurate asset accounting.",
        icon: <Database size={24} />,
        features: ["Asset lifecycle tracking", "Automated depreciation", "Compliance reporting"]
    },
    {
        name: "Xero",
        desc: "A user-friendly cloud accounting software offering automated reconciliation, online invoicing, budgeting, and insightful financial reporting for small and medium businesses.",
        icon: <Cloud size={24} />,
        features: ["Automated reconciliation", "Online invoicing", "Financial reporting"]
    },
    {
        name: "Fathom",
        desc: "A powerful financial analysis and performance-reporting tool. It converts your accounting data into dynamic dashboards, KPIs, and visual insights to enhance strategic decision-making.",
        icon: <PieChart size={24} />,
        features: ["Dynamic dashboards", "KPI tracking", "Visual insights"]
    },
    {
        name: "Taxation System",
        desc: "Digital taxation platforms tailored for Rwanda’s tax environment, ensuring accuracy and compliance. Core Features: PAYE, VAT, WHT & CIT Automation, Auto-Generated Tax Forms, Filing Support & Alerts, System Integrations, Compliance Validation, Tax Summaries & Reports.",
        icon: <FileText size={24} />,
        features: ["PAYE, VAT, WHT & CIT", "Auto-generated forms", "Compliance validation"]
    },
    {
        name: "Transaction Pro",
        desc: "Easily manage your QuickBooks data with Transaction Pro Importer. Import, export, and delete batch transactions, invoices, customers, vendors, and other lists effortlessly. It saves time, reduces errors, and streamlines your accounting workflow by handling large volumes of data quickly and accurately.",
        icon: <ArrowRightLeft size={24} />,
        features: ["Batch import/export", "Data cleaning", "Error reduction"]
    }
];

export default function Products() {
    return (
        <>
            <PageHero
                title="Products"
                subtitle="We partner with the world's leading financial platforms to bring you the best tools for your business."
            />

            <Section background="white">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-6">Our Product Portfolio</h2>
                    <p className="text-gray-600 text-lg">
                        We provide and support industry-leading financial and business software solutions tailored for Rwanda's business environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, idx) => (
                        <Card key={idx} hoverEffect className="p-8 border border-gray-100 flex flex-col h-full">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-accent mb-6 shrink-0">
                                {product.icon || <Package size={24} />}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{product.name}</h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                                {product.desc}
                            </p>
                            {product.features && (
                                <ul className="space-y-2 mb-6 mt-auto pt-4 border-t border-gray-50">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                                            <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Link href="/contact" className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1 mt-auto">
                                Request Demo →
                            </Link>
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
                    imageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop"
                />
            </Section>
        </>
    );
}
