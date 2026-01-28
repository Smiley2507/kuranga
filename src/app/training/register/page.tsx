'use client';

import { useState, useEffect } from 'react';
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { api, StudentRegistrationRequest, RegistrationType, Course } from "@/lib/api";
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, Upload, Loader2, CreditCard, User, GraduationCap, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const steps = [
    { title: 'Type', icon: CreditCard },
    { title: 'Personal', icon: User },
    { title: 'Education', icon: GraduationCap },
    { title: 'Review', icon: Search },
    { title: 'Payment', icon: CheckCircle2 },
];

const SPONSORSHIP_COURSES = ['QuickBooks Desktop', 'Taxation& Declaration', 'Advanced Excel'];

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [partners, setPartners] = useState<any[]>([]);
    const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
    const [registrationCode, setRegistrationCode] = useState<string | null>(null);
    const [studentId, setStudentId] = useState<number | null>(null);
    const [receiptFile, setReceiptFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<Partial<StudentRegistrationRequest>>({
        registrationType: 'REGULAR',
        paymentMethod: 'MOMO',
        paymentAmount: 10000,
    });

    useEffect(() => {
        api.getPartners().then(res => setPartners(res.data)).catch(console.error);
        api.getActiveCourses()
            .then(res => setAvailableCourses(res.data))
            .catch(console.error)
            .finally(() => setIsLoadingCourses(false));
    }, []);

    // Handle auto-selection for sponsored students
    useEffect(() => {
        if (formData.registrationType === 'SPONSORED') {
            setFormData(prev => ({
                ...prev,
                courseSelected: SPONSORSHIP_COURSES.join(', ')
            }));
        }
    }, [formData.registrationType]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateStep = (currentStep: number) => {
        switch (currentStep) {
            case 1:
                return !!formData.registrationType;
            case 2:
                return !!(formData.fullName && formData.email && formData.phone && formData.district);
            case 3:
                const baseInfo = !!(formData.educationLevel && formData.university && formData.programType && formData.session);
                const coursesCount = formData.courseSelected ? formData.courseSelected.split(', ').length : 0;
                const requiredCourses = formData.registrationType === 'SPONSORED' ? 3 : 1;
                const courseInfo = coursesCount >= requiredCourses;
                if (formData.registrationType === 'SPONSORED') {
                    return baseInfo && courseInfo && !!formData.motivationStatement && !!formData.partnerId;
                }
                return baseInfo && courseInfo;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        } else {
            alert('Please fill in all required fields before proceeding.');
        }
    };
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmitRegistration = async () => {
        setIsSubmitting(true);
        try {
            const res = await api.registerStudent(formData as StudentRegistrationRequest);
            setRegistrationCode(res.data.registrationCode);
            setStudentId(res.data.id);
            setStep(5); // Move to payment step
        } catch (error: any) {
            alert(error.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUploadReceipt = async () => {
        if (!receiptFile || !studentId) return;
        setIsLoading(true);
        try {
            await api.uploadPaymentProof(studentId, receiptFile);
            setStep(6); // Success step
        } catch (error: any) {
            alert(error.message || 'Upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (step === 6) {
        return (
            <Section background="white" className="min-h-screen pt-32">
                <FadeInContainer>
                    <div className="max-w-md mx-auto text-center space-y-6">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Registration Complete!</h1>
                        <p className="text-gray-600 text-sm">
                            Thank you for registering. Your application is now under review.
                        </p>
                        <Card className="bg-muted border-border p-6 rounded-[5px] border">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-bold">Your Registration Code</p>
                            <p className="text-2xl font-mono font-bold text-accent">{registrationCode}</p>
                        </Card>
                        <div className="flex flex-col gap-3">
                            <Link href={`/training/status?code=${registrationCode}`}>
                                <Button className="w-full" size="sm">Track My Status</Button>
                            </Link>
                            <Link href="/training">
                                <Button variant="ghost" className="w-full" size="sm">Return Home</Button>
                            </Link>
                        </div>
                    </div>
                </FadeInContainer>
            </Section>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-900 font-sans">
            {/* Background Image with Overlays */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: 'url("/ASA2.jpg")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-accent/50" />
                <div className="absolute inset-0 noise-bg opacity-20 mix-blend-soft-light" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
            </div>

            <Section background="none" className="relative z-10 min-h-screen pt-24 md:pt-32 pb-20 flex items-center justify-center">
                <div className="w-full max-w-4xl mx-auto px-4">
                    {/* Centered Stepper */}
                    <div className="mb-12 flex justify-between max-w-3xl mx-auto">
                        {steps.map((s, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step > i + 1 ? 'bg-accent text-white shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]' :
                                    step === i + 1 ? 'bg-white text-primary scale-110 shadow-xl' :
                                        'bg-white/10 text-white/50 border border-white/20'
                                    }`}>
                                    {step > i + 1 ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${step >= i + 1 ? 'text-white' : 'text-white/30'
                                    }`}>{s.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <StepContainer key="step1">
                                    <h1 className="text-xl font-bold text-primary mb-2 text-center">Registration Type</h1>
                                    <p className="text-gray-500 text-center mb-6 text-sm">Select your enrollment category.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { id: 'REGULAR', title: 'Regular Student', desc: 'Self-sponsored or organization sponsored student.' },
                                            { id: 'SPONSORED', title: 'Sponsored Student', desc: 'Applying via Chancen or other partner programs.' }
                                        ].map(type => (
                                            <div
                                                key={type.id}
                                                onClick={() => setFormData(p => ({ ...p, registrationType: type.id as RegistrationType }))}
                                                className={`cursor-pointer p-6 rounded-[5px] border transition-all ${formData.registrationType === type.id
                                                    ? 'border-accent bg-accent/5 ring-1 ring-accent/10'
                                                    : 'border-border bg-card'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-foreground">{type.title}</h3>
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationType === type.id ? 'border-accent bg-accent' : 'border-border'
                                                        }`}>
                                                        {formData.registrationType === type.id && <div className="w-1.5 h-1.5 bg-background rounded-full" />}
                                                    </div>
                                                </div>
                                                <p className="text-muted-foreground text-xs leading-relaxed font-medium">{type.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 flex justify-center">
                                        <Button size="md" className="px-8 shadow-lg hover:shadow-accent/20" onClick={handleNext}>
                                            Continue <ArrowRight size={16} className="ml-2" />
                                        </Button>
                                    </div>
                                </StepContainer>
                            )}

                            {step === 2 && (
                                <StepContainer key="step2">
                                    <h2 className="text-xl font-bold text-primary mb-6">Personal Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Full Name"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={formData.fullName || ''}
                                            onChange={handleChange}
                                            className="text-sm py-2"
                                        />
                                        <Input
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email || ''}
                                            onChange={handleChange}
                                            className="text-sm py-2"
                                        />
                                        <Input
                                            label="Phone Number"
                                            name="phone"
                                            placeholder="+250..."
                                            value={formData.phone || ''}
                                            onChange={handleChange}
                                            className="text-sm py-2"
                                        />
                                        <Input
                                            label="District"
                                            name="district"
                                            placeholder="Where do you live?"
                                            value={formData.district || ''}
                                            onChange={handleChange}
                                            className="text-sm py-2"
                                        />
                                    </div>
                                    <div className="mt-8 flex justify-between">
                                        <Button variant="ghost" size="sm" onClick={handleBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft size={16} className="mr-2" /> Back</Button>
                                        <Button size="md" className="px-8" onClick={handleNext}>Next Step <ArrowRight size={16} className="ml-2" /></Button>
                                    </div>
                                </StepContainer>
                            )}

                            {step === 3 && (
                                <StepContainer key="step3">
                                    <h2 className="text-xl font-bold text-primary mb-6">Program & Education</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Select
                                            label="Education Level"
                                            name="educationLevel"
                                            value={formData.educationLevel || ''}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'HIGH_SCHOOL', label: 'High School' },
                                                { value: 'BACHELOR', label: 'Bachelor\'s Degree' },
                                                { value: 'MASTERS', label: 'Master\'s Degree' },
                                                { value: 'PHD', label: 'PHD' },
                                                { value: 'OTHER', label: 'Other' },
                                            ]}
                                        />
                                        <Input
                                            label="University / School"
                                            name="university"
                                            placeholder="Name of institution"
                                            value={formData.university || ''}
                                            onChange={handleChange}
                                            className="text-sm py-2"
                                        />
                                        <Select
                                            label="Program Type"
                                            name="programType"
                                            value={formData.programType || ''}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'GRADUATE_JOB_SEEKER', label: 'Graduate/Job Seeker' },
                                                { value: 'PROFESSIONAL', label: 'Professional' },
                                                { value: 'INTERNSHIP', label: 'Internship' },
                                                { value: 'ENTREPRENEUR', label: 'Entrepreneur' },
                                            ]}
                                        />
                                        <Select
                                            label="Desired Session"
                                            name="session"
                                            value={formData.session || ''}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'MORNING', label: 'Morning class (9:00am - 12:00pm)' },
                                                { value: 'AFTERNOON', label: 'Afternoon class (2:00pm - 5:00pm)' },
                                                { value: 'EVENING', label: 'Evening class (5:30pm - 8:30pm)' },
                                            ]}
                                        />
                                        {formData.registrationType === 'SPONSORED' && (
                                            <Select
                                                label="Sponsoring Partner"
                                                name="partnerId"
                                                value={formData.partnerId || ''}
                                                onChange={handleChange}
                                                options={partners.map(p => ({ value: p.id, label: p.name }))}
                                            />
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                                            Course Selection {formData.registrationType === 'SPONSORED' ? '(Chancen Package - Preselected)' : '(Max 2 Courses)'}
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 h-[250px] overflow-y-auto pr-2 custom-scrollbar border border-white/10 p-4 rounded-[5px] bg-black/20">
                                            {isLoadingCourses ? (
                                                <div className="col-span-full flex flex-col items-center justify-center py-10 text-center opacity-50">
                                                    <Loader2 className="animate-spin mb-4" />
                                                    <p className="text-sm">Loading available courses...</p>
                                                </div>
                                            ) : availableCourses.length > 0 ? (
                                                availableCourses.map(course => {
                                                    const selected = formData.courseSelected?.split(', ').includes(course.name);
                                                    const isLocked = formData.registrationType === 'SPONSORED' && SPONSORSHIP_COURSES.includes(course.name);

                                                    return (
                                                        <div
                                                            key={course.id}
                                                            onClick={() => {
                                                                if (isLocked) return;
                                                                const current = formData.courseSelected ? formData.courseSelected.split(', ') : [];
                                                                let next;
                                                                if (selected) {
                                                                    next = current.filter(c => c !== course.name);
                                                                } else {
                                                                    const limit = formData.registrationType === 'SPONSORED' ? 3 : 2;
                                                                    if (current.length >= limit) return;
                                                                    next = [...current, course.name];
                                                                }
                                                                setFormData(p => ({ ...p, courseSelected: next.join(', ') }));
                                                            }}
                                                            className={cn(
                                                                "flex items-center gap-3 p-3 rounded-[5px] border cursor-pointer transition-all text-xs font-bold relative overflow-hidden group/item",
                                                                selected
                                                                    ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                                                    : "bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-800 hover:border-accent/40 hover:text-white hover:shadow-md",
                                                                isLocked && "opacity-80 cursor-not-allowed border-accent/30"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                                                                selected ? "bg-white border-white" : "border-white/30"
                                                            )}>
                                                                {selected && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                                                            </div>
                                                            {course.name}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="col-span-full flex flex-col items-center justify-center py-10 text-center opacity-50">
                                                    <p className="text-sm">No active courses available.</p>
                                                    <p className="text-[10px] uppercase tracking-widest mt-2">Please contact admin or add courses via dashboard</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {formData.registrationType === 'SPONSORED' && (
                                        <div className="mt-6">
                                            <label className="text-xs font-bold text-muted-foreground block mb-2 uppercase tracking-tight">Motivation Statement (Required)</label>
                                            <textarea
                                                name="motivationStatement"
                                                className="w-full rounded-[5px] border border-border bg-background/50 p-3 text-sm focus:ring-2 focus:ring-accent min-h-[100px] text-foreground font-medium"
                                                placeholder="Why are you applying for sponsorship?"
                                                value={formData.motivationStatement || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}

                                    <div className="mt-8 flex justify-between">
                                        <Button variant="ghost" size="sm" onClick={handleBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft size={16} className="mr-2" /> Back</Button>
                                        <Button
                                            size="md"
                                            className="px-8"
                                            onClick={() => {
                                                const count = formData.courseSelected ? formData.courseSelected.split(', ').length : 0;
                                                const requiredCount = formData.registrationType === 'SPONSORED' ? 3 : 1;
                                                if (count < requiredCount) {
                                                    alert(`Please select ${formData.registrationType === 'SPONSORED' ? 'the full package' : 'at least one course'}.`);
                                                    return;
                                                }
                                                handleNext();
                                            }}
                                        >
                                            Review Application <ArrowRight size={16} className="ml-2" />
                                        </Button>
                                    </div>
                                </StepContainer>
                            )}

                            {step === 4 && (
                                <StepContainer key="step4">
                                    <h2 className="text-xl font-bold text-primary mb-6 text-center">Review Your Information</h2>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-1">Personal Details</p>
                                                    <div className="bg-white/80 border border-slate-200 p-4 rounded-[5px] space-y-2">
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Name:</span> <span className="font-bold text-slate-900">{formData.fullName}</span></div>
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Email:</span> <span className="font-bold text-slate-900">{formData.email}</span></div>
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Phone:</span> <span className="font-bold text-slate-900">{formData.phone}</span></div>
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">District:</span> <span className="font-bold text-slate-900">{formData.district}</span></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-1">Education & Program</p>
                                                    <div className="bg-white/80 border border-slate-200 p-4 rounded-[5px] space-y-2">
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Level:</span> <span className="font-bold text-slate-900">{formData.educationLevel}</span></div>
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Institute:</span> <span className="font-bold text-slate-900">{formData.university}</span></div>
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Type:</span> <span className="font-bold uppercase text-slate-900">{formData.registrationType}</span></div>
                                                        <div className="flex justify-between text-sm"><span className="text-slate-500">Session:</span> <span className="font-bold text-accent">{formData.session}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-1">Course Selections</p>
                                                    <div className="bg-white/80 border border-slate-200 p-4 rounded-[5px]">
                                                        <div className="flex flex-wrap gap-2">
                                                            {formData.courseSelected?.split(', ').map(c => (
                                                                <span key={c} className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-[10px] font-bold text-accent">
                                                                    {c}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                {formData.registrationType === 'SPONSORED' && (
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-1">Motivation</p>
                                                        <div className="bg-white/80 border border-slate-200 p-4 rounded-[5px]">
                                                            <p className="text-xs italic text-slate-600 line-clamp-4 leading-relaxed font-normal">"{formData.motivationStatement}"</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-[5px] mt-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] font-bold uppercase text-emerald-500">Registration Fee</span>
                                                        <span className="text-lg font-black text-emerald-500">10,000 FRW</span>
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground mt-1 italic leading-tight">Paid via MoMo in the next step.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <Button variant="ghost" size="sm" onClick={handleBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft size={16} className="mr-2" /> Back</Button>
                                        <Button
                                            size="md"
                                            className="px-8 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                                            onClick={handleSubmitRegistration}
                                            isLoading={isSubmitting}
                                        >
                                            Confirm & Submit <CheckCircle2 size={16} className="ml-2" />
                                        </Button>
                                    </div>
                                </StepContainer>
                            )}

                            {step === 5 && (
                                <StepContainer key="step5">
                                    <div className="text-center space-y-3 mb-6">
                                        <div className="w-12 h-12 bg-blue-500/10 text-accent rounded-full flex items-center justify-center mx-auto">
                                            <CreditCard size={24} />
                                        </div>
                                        <h2 className="text-xl font-bold text-primary">Registration Fee</h2>
                                        <p className="text-muted-foreground text-sm font-medium">Please pay <span className="font-bold text-foreground">10,000 FRW</span> to the MoMo Code below.</p>
                                    </div>

                                    <Card className="p-8 border-dashed border border-border bg-accent/5 text-center mb-8 rounded-[5px]">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-2">MoMo Code / Account</p>
                                        <p className="text-4xl font-mono font-bold text-foreground tracking-tighter">088 788</p>
                                        <p className="text-sm text-accent mt-2 font-bold uppercase tracking-widest">Kuranga Digital Ltd</p>
                                    </Card>

                                    <div className="space-y-4">
                                        <div
                                            className="border border-dashed border-border rounded-[5px] p-10 text-center hover:border-accent group transition-all cursor-pointer relative bg-background/30"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                if (e.dataTransfer.files[0]) setReceiptFile(e.dataTransfer.files[0]);
                                            }}
                                        >
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) setReceiptFile(e.target.files[0]);
                                                }}
                                            />
                                            {receiptFile ? (
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                                                        <CheckCircle2 size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground text-sm">{receiptFile.name}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{(receiptFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                    <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-destructive" onClick={(e) => {
                                                        e.stopPropagation();
                                                        setReceiptFile(null);
                                                    }}>Remove File</Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                                        <Upload size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground text-sm transition-colors group-hover:text-accent">Upload Payment Receipt</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Drag or click to browse files</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            size="md"
                                            className="w-full h-14 font-black shadow-xl"
                                            disabled={!receiptFile}
                                            onClick={handleUploadReceipt}
                                            isLoading={isLoading}
                                        >
                                            Complete Registration
                                        </Button>
                                    </div>
                                </StepContainer>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Section>
        </div>
    );
}

function StepContainer({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-card/90 backdrop-blur-xl rounded-[5px] p-8 md:p-12 shadow-2xl border border-white/10"
        >
            {children}
        </motion.div>
    );
}

function FadeInContainer({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            {children}
        </motion.div>
    );
}

