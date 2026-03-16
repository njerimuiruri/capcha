'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    GraduationCap,
    Users,
    Monitor,
    Calendar,
    BookOpen,
    Brain,
    School,
    Target,
    Lightbulb,
    ArrowRight,
    CheckCircle,
    Award,
    Globe,
    Heart,
    Zap,
    Sparkles,
    Newspaper,
    Link2,
    Clock,
    MessageSquare,
    Radio,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const videos = [
    '/videos/capcity2.mp4',
    '/videos/capacity3.mp4',
    '/videos/capacityenhancement.mp4',
];

const CapacityEnhancementPage = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 4000);
        return () => clearTimeout(timeout);
    }, []);

    const [scrollY, setScrollY] = useState(0);

    const capacityPrograms = [
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Summer School",
            description: "Intensive multi-week programs bringing together students, researchers, and practitioners from across Africa to build comprehensive expertise in climate-health intersections through hands-on learning.",
            color: "from-orange-500 to-red-600",
            format: "In-person/Hybrid",
            href: "/CapacityEnhancementPage/summer-school",  // update when page exists
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Bootcamps",
            description: "Intensive, fast-paced training sessions focused on practical skills and tools for addressing climate-health challenges through interdisciplinary approaches and real-world applications.",
            color: "from-teal-500 to-green-600",
            format: "Interactive workshops",
            href: "/CapacityEnhancementPage/bootcamps",
        },
        {
            icon: <Monitor className="w-8 h-8" />,
            title: "Webinars",
            description: "Regular online sessions featuring leading experts sharing latest research findings, policy developments, and innovative solutions in climate and health from across the continent.",
            color: "from-indigo-500 to-blue-600",
            format: "Virtual sessions",
            href: "/CapacityEnhancementPage/webinars",  // ← links to the new webinars listing page
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Seminars/Workshops",
            description: "Interactive sessions designed for knowledge sharing, collaborative problem-solving, and skill building on specific climate-health topics with peer-to-peer learning opportunities.",
            color: "from-pink-500 to-rose-600",
            format: "Interactive sessions",
            href: "/CapacityEnhancementPage/seminars",
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Short Self-paced Courses",
            description: "Flexible online learning modules covering various aspects of climate and health, designed for busy professionals and accessible to learners at their own pace and schedule.",
            color: "from-purple-500 to-violet-600",
            format: "Online modules",
            href: "/CapacityEnhancementPage/courses",
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "CAPCHA Spotlight Series",
            description: "A 90-minute monthly virtual series held every last Thursday (2:00–3:30 PM EAT), designed to bridge African research and real-world policy. Each session provokes cross-sector dialogue, translating climate-health science into actionable decision support. Once per quarter, structured cross-hub conversations bring together representatives from different climate-health platforms to explore complementarities, gaps, and alignment opportunities — with CAPCHA as a neutral convenor fostering ecosystem coherence.",
            color: "from-amber-500 to-orange-600",
            format: "Monthly · Last Thursday · 2:00–3:30 PM EAT",
            href: "/CapacityEnhancementPage/spotlight-series",
            highlight: true,
        },
        {
            icon: <Newspaper className="w-8 h-8" />,
            title: "CAPCHA Monthly Digest",
            description: "A curated monthly publication synthesising the latest climate-health research, policy updates, funding opportunities, and event highlights from across Africa and beyond — keeping researchers, practitioners, and policymakers informed and connected.",
            color: "from-cyan-500 to-teal-600",
            format: "Monthly publication",
            href: "/CapacityEnhancementPage/monthly-digest",
        },
        {
            icon: <Link2 className="w-8 h-8" />,
            title: "CAPCHA Connect",
            description: "A community networking platform connecting African climate-health researchers, practitioners, and policymakers. CAPCHA Connect facilitates peer-to-peer knowledge exchange, collaboration on cross-border projects, and mentorship — building the continental community of practice needed to drive evidence-informed climate-health action.",
            color: "from-rose-500 to-pink-600",
            format: "Community platform",
            href: "/CapacityEnhancementPage/connect",
        },
    ];

    const focusAreas = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community Engagement",
            description: "Empowering local populations through educational campaigns and community-based initiatives for climate adaptation and mitigation.",
            color: "from-green-500 to-emerald-600",
            href: null,
        },
        {
            icon: <School className="w-8 h-8" />,
            title: "Curriculum Integration",
            description: "Advocating for integration of health considerations in climate change courses across African universities and educational institutions.",
            color: "from-blue-500 to-cyan-600",
            href: null,
        },
    ];

    const keyOutcomes = [
        "Graduates equipped with transdisciplinary climate-health expertise",
        "Communities empowered to take climate adaptation actions",
        "Integrated health perspectives in climate education curricula",
        "Strengthened local capacity for climate-health interventions",
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                {/* Hero video section */}
                <section className="relative mt-32 h-[600px] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        {videos.map((video, index) => (
                            <video
                                key={index}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideo ? 'opacity-100' : 'opacity-0'}`}
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 via-black/20 to-black/10"></div>
                    </div>

                    <div className="relative z-10 text-left text-white px-8 max-w-7xl mx-auto w-full">
                        <div className="max-w-3xl">
                            <Badge className="mb-6 bg-[#0e8601]/20 text-white border-[#0e8601] text-sm px-4 py-2">
                                Capacity Enhancement Hub
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                                Building Climate-Health Expertise Across Africa
                            </h1>
                            <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl">
                                Empowering communities, students, and professionals with the knowledge and skills needed to address climate-health challenges through comprehensive education and training programs.
                            </p>
                            <nav className="text-lg flex items-center">
                                <span className="text-gray-300">Home</span>
                                <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                                <span className="text-[#0e8601] font-semibold">Capacity Enhancement</span>
                            </nav>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 flex space-x-2">
                        {videos.map((_, index) => (
                            <div
                                key={index}
                                className={`w-12 h-1 rounded-full transition-all duration-300 cursor-pointer ${index === currentVideo ? 'bg-[#0e8601]' : 'bg-white/30'}`}
                                onClick={() => setCurrentVideo(index)}
                            >
                                {index === currentVideo && (
                                    <div className="w-full h-full bg-[#0e8601] rounded-full animate-pulse"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission section */}
                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge className="mb-6 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20 text-sm px-4 py-2">
                                    Our Mission
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-8 leading-tight">
                                    Empowering Africa&rsquo;s Climate-Health Leaders
                                </h2>
                                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                    <p>
                                        Raising awareness about the health risks of climate change and engaging communities in adaptation and mitigation efforts are vital for Africa&rsquo;s resilience. CAPCHA supports educational campaigns and community-based initiatives while empowering local populations to take meaningful action.
                                    </p>
                                    <p>
                                        We advocate for the integration of health perspectives in climate change courses across university curricula, ensuring graduates have the capacity to tackle transdisciplinary research in climate and health.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold text-[#021d49] mb-6 flex items-center gap-3">
                                        <Award className="w-8 h-8 text-[#0e8601]" />
                                        Key Outcomes
                                    </h3>
                                    <div className="space-y-4">
                                        {keyOutcomes.map((outcome, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-700 leading-relaxed">{outcome}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#021d49] to-[#0e8601] p-8 rounded-2xl text-white">
                                    <h4 className="text-xl font-bold mb-3">Our Impact</h4>
                                    <p className="text-blue-100 mb-4">
                                        Through comprehensive capacity building programs, we&rsquo;re creating a new generation of climate-health experts equipped to address Africa&rsquo;s unique challenges.
                                    </p>
                                    <div className="flex items-center text-sm text-blue-200">
                                        <Lightbulb className="w-4 h-4 mr-2" />
                                        Building knowledge for sustainable solutions
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Focus Areas + Programs */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        {/* Focus Areas */}
                        <div className="text-center mb-16">
                            <Badge className="mb-4 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20">
                                Focus Areas
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                Strategic Capacity Building
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive approach to building climate-health expertise through community engagement, education integration, and awareness campaigns
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
                            {focusAreas.map((area, index) => {
                                const CardInner = (
                                    <Card key={index} className={`group hover:shadow-xl transition-all duration-500 border-0 bg-white hover:bg-gray-50 overflow-hidden relative ${area.href ? 'cursor-pointer' : ''}`}>
                                        <CardHeader className="pb-4">
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                {area.icon}
                                            </div>
                                            <CardTitle className="text-xl text-[#021d49] group-hover:text-[#0e8601] transition-colors">
                                                {area.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-gray-600 leading-relaxed">
                                                {area.description}
                                            </CardDescription>
                                        </CardContent>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                    </Card>
                                );
                                return area.href
                                    ? <Link key={index} href={area.href}>{CardInner}</Link>
                                    : <React.Fragment key={index}>{CardInner}</React.Fragment>;
                            })}
                        </div>

                        {/* Training Programs */}
                        <div className="text-center mb-16">
                            <Badge className="mb-4 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20">
                                Training Programs
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                Our Capacity Building Programs
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Diverse educational formats designed to build transdisciplinary expertise in climate and health across Africa
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {capacityPrograms.map((program, index) => (
                                <Link key={index} href={program.href}>
                                    <Card className={`group hover:shadow-xl transition-all duration-500 overflow-hidden relative cursor-pointer h-full flex flex-col ${program.highlight
                                        ? 'border-2 border-amber-300 bg-amber-50/30 hover:border-amber-400'
                                        : 'border border-gray-100 hover:border-[#0e8601]/30 bg-white'
                                        }`}>
                                        {/* NEW badge for spotlight series */}
                                        {program.highlight && (
                                            <div className="absolute top-3 right-3 z-10">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-sm">
                                                    <Sparkles className="w-3 h-3" /> NEW
                                                </span>
                                            </div>
                                        )}
                                        <CardHeader className="pb-4">
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                {program.icon}
                                            </div>
                                            <CardTitle className="text-xl text-[#021d49] group-hover:text-[#0e8601] transition-colors">
                                                {program.title}
                                            </CardTitle>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {/* Split format on · to show as separate pills */}
                                                {program.format.split('·').map((f, i) => (
                                                    <Badge key={i} variant="outline" className={`text-xs ${program.highlight ? 'border-amber-400 text-amber-700 bg-amber-50' : ''}`}>
                                                        {f.trim()}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex flex-col flex-1">
                                            <CardDescription className="text-gray-600 leading-relaxed flex-1">
                                                {program.description}
                                            </CardDescription>
                                            {/* Always-visible CTA button */}
                                            <div className="mt-5 pt-4 border-t border-gray-100">
                                                <span className={`inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 ${program.highlight
                                                    ? 'bg-amber-500 group-hover:bg-amber-600'
                                                    : 'bg-[#021d49] group-hover:bg-[#0e8601]'
                                                    }`}>
                                                    Explore {program.title}
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </span>
                                            </div>
                                        </CardContent>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OPEN CALLS CTA ── */}
                <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 bg-[#0e8601]/10 border border-[#0e8601]/30 text-[#0e8601] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#0e8601] animate-pulse inline-block"></span>
                                Applications Now Open
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#021d49] mb-3">Ready to Get Involved?</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">Three active calls are open right now. Apply, register, or enrol directly.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Spotlight Series */}
                            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff9500] to-[#c97000]" />
                                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                                <div className="relative p-7 flex flex-col h-full min-h-[260px]">
                                    <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                                        2026 Call Open
                                    </span>
                                    <Sparkles className="w-8 h-8 text-white mb-3" />
                                    <h3 className="text-white font-extrabold text-lg mb-2 leading-snug">Spotlight Series<br />Presenters & Moderators</h3>
                                    <p className="text-white/75 text-sm leading-relaxed flex-1 mb-5">Apply to present or moderate a 2026 CAPCHA Spotlight Series session.</p>
                                    <a href="https://ee.kobotoolbox.org/single/b5423b283351f3f61595a92a17a66e00"
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-white text-[#c97000] hover:bg-orange-50 font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200">
                                        Apply Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* CAPCHA Connect */}
                            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#021d49] to-[#03337a]" />
                                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
                                <div className="relative p-7 flex flex-col h-full min-h-[260px]">
                                    <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                                        <span className="w-1.5 h-1.5 bg-[#ff9500] rounded-full animate-ping"></span>
                                        Registration Open
                                    </span>
                                    <Link2 className="w-8 h-8 text-white mb-3" />
                                    <h3 className="text-white font-extrabold text-lg mb-2 leading-snug">CAPCHA Connect<br />Community Platform</h3>
                                    <p className="text-white/75 text-sm leading-relaxed flex-1 mb-5">Register for Africa's premier climate-health networking community.</p>
                                    <a href="https://ee.kobotoolbox.org/single/81f9beab8ea9a72662b5c429f732f7f3"
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-[#ff9500] hover:bg-[#e6850e] text-white font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200">
                                        Register Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Learning Curve */}
                            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0e8601] to-[#0a6e01]" />
                                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                                <div className="relative p-7 flex flex-col h-full min-h-[260px]">
                                    <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                                        Enrolment Open
                                    </span>
                                    <BookOpen className="w-8 h-8 text-white mb-3" />
                                    <h3 className="text-white font-extrabold text-lg mb-2 leading-snug">Learning Curve<br />Structured Programme</h3>
                                    <p className="text-white/75 text-sm leading-relaxed flex-1 mb-5">Enrol in a structured learning programme for Africa's next-generation climate-health researchers.</p>
                                    <a href="https://ee.kobotoolbox.org/single/5b3703edf1a128aa20c66dff2fadd84f"
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-white text-[#0a6e01] hover:bg-green-50 font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200">
                                        Enrol Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default CapacityEnhancementPage;