import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-primary text-white pt-20 pb-8 overflow-hidden">
            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none noise-bg mix-blend-overlay"></div>

            {/* Gradient Blob */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo-white.png"
                                alt="Kuranga Digital Logo"
                                width={180}
                                height={50}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed mb-8">
                            Bridging skills, technology, and financial growth since 2014. We help organizations modernize their financial systems and empower individuals with practical skills.
                        </p>
                        <div className="flex gap-3">
                            <Link href="#" className="w-10 h-10 rounded-[5px] bg-foreground/10 flex items-center justify-center hover:bg-accent transition-all">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-[5px] bg-foreground/10 flex items-center justify-center hover:bg-accent transition-all">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-[5px] bg-foreground/10 flex items-center justify-center hover:bg-accent transition-all">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-[5px] bg-foreground/10 flex items-center justify-center hover:bg-accent transition-all">
                                <Facebook size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/programs" className="text-white/70 hover:text-white transition-colors">Initiatives</Link></li>
                            <li><Link href="/programs#mypathpreneur" className="text-white/70 hover:text-white transition-colors">MyPathpreneur</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/programs" className="text-white/70 hover:text-white transition-colors">Digital on Demand</Link></li>
                            <li><Link href="/training" className="text-white/70 hover:text-white transition-colors">Training (ASA)</Link></li>
                            <li><Link href="/products" className="text-white/70 hover:text-white transition-colors">Software Solutions</Link></li>
                            <li><Link href="/services" className="text-white/70 hover:text-white transition-colors">Custom System Development</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/70">
                                <MapPin className="shrink-0 text-accent mt-1" size={18} />
                                <span className="text-sm">Kicukiro, Sonatubes, ININD HOUSE, KN 3 Rd, Kigali, Rwanda</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <Phone className="shrink-0 text-accent" size={18} />
                                <a href="tel:+250781278118" className="hover:text-white text-sm">+250 781 278 118</a>
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <Mail className="shrink-0 text-accent" size={18} />
                                <a href="mailto:info@kuranga.co" className="hover:text-white text-sm">info@kuranga.co</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-white/60 text-sm">
                    <p>© {new Date().getFullYear()} Kuranga Digital Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
