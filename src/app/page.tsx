import { HeroSlider } from "@/components/home/HeroSlider";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Counter } from "@/components/ui/Counter";
import { CTAWithParallax } from "@/components/ui/CTAWithParallax";
import { ArrowRight, BookOpen, Laptop, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <LogoMarquee />

      {/* About Preview */}
      <Section background="white">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:flex-1 space-y-6">
              <span className="text-accent font-semibold tracking-wider text-sm">WHO WE ARE</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Bridging Skills, Technology, and Financial Growth</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Kuranga Digital Ltd is a Rwanda-based accounting software consulting and training company established in 2014. We help organizations modernize their financial systems and empower individuals with practical, job-ready skills.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our work sits at the intersection of <strong>technology, finance, and capacity building</strong>, enabling sustainable growth in a digital economy.
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="outline">Learn More About Us</Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:flex-1">
              <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-xl group">
                <Image
                  src="/ASA3.jpg"
                  alt="Team collaborating"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Services Preview */}
      <Section background="gray" noise>
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wider text-sm">WHAT WE DO</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-gray-600">Empowering your business with the right tools and your people with the right skills.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Laptop, color: 'text-primary', bg: 'bg-blue-100', title: 'Accounting & IT Consulting', desc: 'Implementation and support for QuickBooks, Xero, and custom financial systems.', href: '/services', link: 'Learn more' },
            { icon: BookOpen, color: 'text-green-700', bg: 'bg-green-100', title: 'Professional Training', desc: 'Certified, hands-on training programs that close the gap between theory and practice.', href: '/training', link: 'Explore Programs' },
            { icon: Users, color: 'text-purple-700', bg: 'bg-purple-100', title: 'Entrepreneurship Programs', desc: 'Empowering youth and persons with disabilities with essential business skills.', href: '/programs', link: 'View Initiatives' },
            { icon: Users, color: 'text-orange-700', bg: 'bg-orange-100', title: 'Workforce & HR Support', desc: 'Connecting trained talent with employers to create real employment pathways.', href: '/services', link: 'Workforce Services' }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Card hoverEffect className="p-8 h-full flex flex-col items-start">
                <div className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center ${item.color} mb-6`}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6 text-base leading-relaxed flex-grow">
                  {item.desc}
                </p>
                <Link href={item.href} className="text-accent font-medium inline-flex items-center hover:underline mt-auto">
                  {item.link} <ArrowRight size={16} className="ml-1" />
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Why Choose Us - Redesigned */}
      <Section background="white">
        <FadeIn>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">Why Organizations Choose Kuranga</span>
              <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">Expertise grounded in real-world impact.</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Over a decade of experience in accounting software and digital finance. Deep understanding of Rwanda's tax and compliance environment. Trusted by public institutions, private companies, and development partners.
              </p>
              <Link href="/contact">
                <Button size="lg">Partner With Kuranga</Button>
              </Link>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {[
                {
                  val: 10,
                  suffix: '+',
                  label: 'Years of Experience',
                  desc: 'Serving the Rwandan market since 2014 with consistent quality.'
                },
                {
                  val: 500,
                  suffix: '+',
                  label: 'Professionals Trained',
                  desc: 'Empowering the next generation of accountants and entrepreneurs.'
                },
                {
                  val: 100,
                  suffix: '%',
                  label: 'Compliance Focus',
                  desc: 'Systems designed to meet RRA and local regulatory standards.'
                },
                {
                  val: 50,
                  suffix: '+',
                  label: 'Corporate Partners',
                  desc: 'Trusted by leading NGOs, schools, and private enterprises.'
                }
              ].map((stat, i) => (
                <div key={i} className="border-t border-gray-200 pt-6">
                  <h3 className="text-5xl font-bold text-accent mb-2">
                    <Counter end={stat.val} suffix={stat.suffix} />
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</h4>
                  <p className="text-gray-600 leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Final CTA with Parallax */}
      <Section background="white">
        <FadeIn>
          <CTAWithParallax
            title="Ready to Upgrade Your Skills or Systems?"
            description="Whether you need training, consulting, or long-term support, our experts are ready to help."
            primaryCTA="Talk to Our Experts"
            primaryHref="/contact"
            secondaryCTA="Explore Services"
            secondaryHref="/services"
            imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
          />
        </FadeIn>
      </Section>
    </>
  );
}
