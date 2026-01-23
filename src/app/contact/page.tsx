'use client';

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/common/PageHero";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
    return (
        <>
            <PageHero
                title="Let's Build Smarter Financial Systems Together"
                subtitle="Whether you are looking for training, consulting, or a long-term partner, our team is ready to support you."
            />

            <Section background="white" className="relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -skew-x-12 transform origin-top-right -z-10"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
                    {/* Contact Info */}
                    <FadeIn direction="left">
                        <div>
                            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Get in touch</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 tracking-tight">Contact Information</h2>
                            <p className="text-gray-600 text-lg mb-10 max-w-md leading-relaxed">
                                Have questions about our programs or services? Reach out and our team will get back to you within 24 hours.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: <MapPin size={24} />, title: "Location", detail: "Kicukiro, Sonatubes, ININD HOUSE, Kigali, Rwanda", color: "text-blue-600", bg: "bg-blue-50" },
                                    { icon: <Phone size={24} />, title: "Phone", detail: "+250 781 278 118", link: "tel:+250781278118", color: "text-emerald-600", bg: "bg-emerald-50" },
                                    { icon: <Mail size={24} />, title: "Email", detail: "info@kuranga.co", link: "mailto:info@kuranga.co", color: "text-purple-600", bg: "bg-purple-50" },
                                    { icon: <Clock size={24} />, title: "Business Hours", detail: "Mon - Fri: 8:00 AM - 6:00 PM", color: "text-orange-600", bg: "bg-orange-50" },
                                ].map((item, idx) => (
                                    <div key={idx} className="group flex items-start gap-5 p-2 rounded-2xl transition-all duration-300 hover:bg-gray-50/80">
                                        <div className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-primary text-lg mb-1">{item.title}</h3>
                                            {item.link ? (
                                                <a href={item.link} className="text-gray-600 hover:text-accent transition-colors text-base md:text-lg">{item.detail}</a>
                                            ) : (
                                                <p className="text-gray-600 text-base md:text-lg">{item.detail}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Contact Form */}
                    <FadeIn direction="right" delay={0.2}>
                        <Card variant="glass" className="p-8 md:p-12 border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden">
                            {/* Inner subtle glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full -ml-24 -mb-24"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">Send us a Message</h3>
                                <p className="text-gray-600 mb-8">We would love to hear from you. Fill out the form below.</p>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-semibold text-primary ml-1 uppercase tracking-wider">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-5 py-4 rounded-[5px] bg-card/70 border border-border focus:bg-card focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground text-foreground"
                                                placeholder="e.g. Jean Damascene"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-semibold text-primary ml-1 uppercase tracking-wider">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-5 py-4 rounded-[5px] bg-card/70 border border-border focus:bg-card focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground text-foreground"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-semibold text-primary ml-1 uppercase tracking-wider">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="w-full px-5 py-4 rounded-[5px] bg-card/70 border border-border focus:bg-card focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all placeholder:text-muted-foreground text-foreground"
                                                placeholder="+250 7XX XXX XXX"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-semibold text-primary ml-1 uppercase tracking-wider">Subject</label>
                                            <div className="relative">
                                                <select
                                                    id="subject"
                                                    className="w-full px-5 py-4 rounded-xl bg-white/70 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all appearance-none cursor-pointer"
                                                >
                                                    <option>Training Inquiry</option>
                                                    <option>Services Consultation</option>
                                                    <option>Product Demo</option>
                                                    <option>Partnership Opportunity</option>
                                                    <option>General Inquiry</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-semibold text-primary ml-1 uppercase tracking-wider">How can we help?</label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            className="w-full px-5 py-4 rounded-xl bg-white/70 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all resize-none placeholder:text-gray-400"
                                            placeholder="Tell us about your needs..."
                                        ></textarea>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full py-6 text-lg group shadow-lg shadow-accent/20">
                                        Send Message
                                        <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            </Section>

            {/* Map Section */}
            <Section background="gray" noise className="py-0">
                <div className="max-w-[1400px] mx-auto">
                    <div className="relative h-[550px] w-full rounded-t-3xl overflow-hidden shadow-2xl border-t border-x border-white/20">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.489726205562!2d30.098939475719327!3d-1.957608836709875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca660ed372863%3A0x673479008bc50a62!2sInind%20House!5e0!3m2!1sen!2srw!4v1705086000000!5m2!1sen!2srw"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(0.95)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Kuranga Digital Office Location"
                            className="absolute inset-0"
                        ></iframe>
                        {/* Overlay to catch clicks and direct to real map if needed, or just for style */}
                        <div className="absolute top-6 left-6 z-10">
                            <Card className="py-3 px-5 bg-card/90 backdrop-blur-md border-border shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-accent/30">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-sm">Visit Our Office</h4>
                                        <p className="text-xs text-gray-600">ININD HOUSE, Kigali</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
