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

      <Section background="white" className="overflow-visible">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:flex-1 space-y-8">
              <div>
                <span className="text-accent font-semibold tracking-wider text-sm">WHO WE ARE</span>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mt-6 leading-tight">Bridging Skills, Technology, and Financial Growth</h2>
              </div>
              <div className="prose prose-lg text-gray-600 leading-relaxed text-lg">
                <p>
                  Kuranga Digital Ltd is a FinTech and EdTech consulting agency specializing in digital accounting systems, financial management solutions, and professional training. Operating legally since <strong>2014</strong> under the Rwanda Development Board (RDB), we support organizations and individuals to adopt modern financial tools, build practical skills, and unlock economic opportunities.
                </p>
                <p>
                  Our work combines <strong>technology, education, and consulting</strong> to drive sustainable impact in businesses, institutions, and communities.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/about">
                  <Button className="shadow-lg hover:shadow-xl transition-all duration-300">Learn More About Kuranga</Button>
                </Link>
              </div>
            </div>

            <div className="w-full md:flex-1 relative">
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-2/3 h-full bg-blue-50 rounded-3xl -z-10"></div>

              <div className="relative h-[400px] md:h-[550px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/ASA3.jpg"
                  alt="Team collaborating"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg border border-gray-50 max-w-xs hidden md:block">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full text-accent">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">RDB Registered</p>
                    <p className="text-sm text-gray-500">Operating legally since 2014 supporting Rwanda's growth.</p>
                  </div>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Empowering your business with the right tools and your people with the right skills.</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Laptop, color: 'text-primary', bg: 'bg-blue-100', title: 'Systems Consulting', desc: 'End-to-end implementation of QuickBooks, Xero, and custom financial solutions.', href: '/services', link: 'Our Services' },
            { icon: BookOpen, color: 'text-green-700', bg: 'bg-green-100', title: 'Professional Training (ASA)', desc: 'Job-ready digital accounting skills for the real world through experiential learning.', href: '/training', link: 'Our Academy' },
            { icon: Users, color: 'text-purple-700', bg: 'bg-purple-100', title: 'Inclusion Programs', desc: 'Empowering youth, women, and entrepreneurs with financial literacy and digital skills.', href: '/programs', link: 'Our Impact' },
            { icon: Users, color: 'text-orange-700', bg: 'bg-orange-100', title: 'Workforce Solutions', desc: 'Connecting trained financial talent with top employers to improve accountability.', href: '/services', link: 'Find Talent' }
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
              <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">Why Choose Kuranga</span>
              <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">Certified, Endorsed, and Experienced.</h2>
              <ul className="space-y-4 mb-8">
                {[
                  'Certified Intuit QuickBooks Provider',
                  'Endorsed by Ministry of Education',
                  'Expertise in Rwanda’s Tax & SME Environment',
                  'Proven Public & Private Sector Experience'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-lg">
                    <CheckCircle className="text-accent shrink-0" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button size="lg">Work With Us</Button>
              </Link>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {[
                {
                  val: 2000,
                  suffix: '+',
                  label: 'Individuals Trained',
                  desc: 'In QuickBooks and digital accounting since 2015.'
                },
                {
                  val: 120,
                  suffix: '+',
                  label: 'Talents Placed',
                  desc: 'Trained and placed in 2024 alone.'
                },
                {
                  val: 2024,
                  suffix: '',
                  label: 'Best Employer Award',
                  desc: 'Kigali City Job Net Program.'
                },
                {
                  val: 10,
                  suffix: '+',
                  label: 'Years of Impact',
                  desc: 'Strong contribution to job creation and digital literacy.'
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
            title="Ready to Build Skills, Systems, or Partnerships That Last?"
            description="Whether you are a student, organization, or partner, Kuranga Digital is ready to support your journey in the digital economy."
            primaryCTA="Contact Our Team"
            primaryHref="/contact"
            secondaryCTA="Explore Our Programs"
            secondaryHref="/training"
            imageUrl="/"
          />
        </FadeIn>
      </Section>
    </>
  );
}
