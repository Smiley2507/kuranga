import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/common/PageHero";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import Link from "next/link";
import { Package, Check } from "lucide-react";

const products = [
    { name: "QuickBooks Desktop", desc: "Robust accounting for SMEs.", features: ["Multi-user support", "Advanced inventory", "Job costing"] },
    { name: "QuickBooks Online", desc: "Cloud-based accounting anywhere.", features: ["Mobile access", "Real-time collaboration", "Auto backups"] },
    { name: "QuickBooks POS", desc: "Integrated point-of-sale solution.", features: ["Inventory sync", "Sales tracking", "Customer management"] },
    { name: "TeamRoll", desc: "Rwanda-compliant HR & Payroll.", features: ["Local tax compliance", "Employee self-service", "Automated payroll"] },
    { name: "AssetAccountant", desc: "Fixed asset management.", features: ["Depreciation tracking", "Asset lifecycle", "Compliance reports"] },
    { name: "Xero", desc: "Modern cloud accounting platform.", features: ["Bank reconciliation", "Invoice management", "Real-time reporting"] },
    { name: "Fathom", desc: "Financial analysis & reporting.", features: ["KPI dashboards", "Budgeting tools", "Performance insights"] },
    { name: "Taxation Systems", desc: "Tax compliance & filing tools.", features: ["RRA integration", "Tax calculations", "Filing automation"] },
    { name: "Transaction Pro", desc: "Bulk data import tools for QuickBooks.", features: ["Mass imports", "Data validation", "Error handling"] }
];

export default function Products() {
    return (
        <>
            <PageHero
                title="Trusted Accounting & Financial Software Solutions"
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
                        <Card key={idx} hoverEffect className="p-8 border border-gray-100">
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-6">
                                <Package size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-6">{product.desc}</p>
                            {product.features && (
                                <ul className="space-y-2 mb-6">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                            <Check size={16} className="text-accent mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Link href="/contact" className="text-accent text-sm font-medium hover:underline">
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
