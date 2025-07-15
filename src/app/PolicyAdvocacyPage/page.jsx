'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Scale,
    Globe,
    MapPin,
    Building,
    Users,
    Megaphone,
    FileText,
    Handshake,
    ArrowRight,
    CheckCircle,
    BookOpen,
    GraduationCap,
    Monitor,
    Calendar,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import PageLoader from '@/app/PageLoader';


const PolicyAdvocacyPage = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const videos = [
        '/videos/windmill.mp4',

        '/videos/healthvideo.mp4',
        '/videos/climate industry.mp4',

    ];
    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 4000);
        return () => clearTimeout(timeout);
    }, []);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [videos.length]);

    const policyFocusAreas = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Level",
            description: "Influencing international climate policies and negotiations to incorporate African health priorities and ensure global climate actions account for the continent's unique vulnerabilities.",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Regional Level",
            description: "Coordinating regional climate and health policies across African countries, fostering collaboration and shared strategies for climate resilience.",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: <Building className="w-8 h-8" />,
            title: "National Level",
            description: "Supporting national governments in developing and implementing climate-health policies that address local vulnerabilities and build resilient health systems.",
            color: "from-purple-500 to-violet-600"
        }
    ];

    const keyImpacts = [
        "Advocating for Africa-specific climate-health policies globally",
        "Building unified voice for African health priorities in climate negotiations",
        "Strengthening national capacity for climate-health policy development",
        "Integrating health considerations into climate adaptation strategies"
    ];

    return (
        <>

            <Navbar />
            <div className="min-h-screen bg-white">
                <section className="relative mt-32 h-[600px] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        {videos.map((video, index) => (
                            <video
                                key={index}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideo ? 'opacity-100' : 'opacity-0'
                                    }`}
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
                                Policy & Advocacy Platform
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                                Shaping Climate-Health Policy Across Africa
                            </h1>
                            <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl">
                                Creating unified advocacy platforms and building capacity to influence climate policies that prioritize health outcomes and address Africa&apos;s unique vulnerabilities.
                            </p>
                            <nav className="text-lg flex items-center">
                                <span className="text-gray-300">Home</span>
                                <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                                <span className="text-[#0e8601] font-semibold">Policy and Advocacy</span>
                            </nav>
                        </div>
                    </div>

                    {/* Video indicators */}
                    <div className="absolute bottom-8 left-8 flex space-x-2">
                        {videos.map((_, index) => (
                            <div
                                key={index}
                                className={`w-12 h-1 rounded-full transition-all duration-300 cursor-pointer ${index === currentVideo ? 'bg-[#0e8601]' : 'bg-white/30'
                                    }`}
                                onClick={() => setCurrentVideo(index)}
                            >
                                {index === currentVideo && (
                                    <div className="w-full h-full bg-[#0e8601] rounded-full animate-pulse"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge className="mb-6 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20 text-sm px-4 py-2">
                                    Our Mission
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-8 leading-tight">
                                    Unified Advocacy for Climate-Health Policy
                                </h2>

                                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                    <p>
                                        CAPCHA serves as a unified platform to advocate for policies addressing the health impacts of climate change, creating avenues to influence national and international climate policies that incorporate health considerations.
                                    </p>
                                    <p>
                                        We align health strategies with broader climate resilience efforts and provide opportunities for participation in international climate negotiations, ensuring Africa&apos;s health priorities are represented in global climate actions.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold text-[#021d49] mb-6 flex items-center gap-3">
                                        <Megaphone className="w-8 h-8 text-[#0e8601]" />
                                        Key Impact Areas
                                    </h3>
                                    <div className="space-y-4">
                                        {keyImpacts.map((impact, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-700 leading-relaxed">{impact}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#021d49] to-[#0e8601] p-8 rounded-2xl text-white">
                                    <h4 className="text-xl font-bold mb-3">Our Voice</h4>
                                    <p className="text-blue-100 mb-4">
                                        Through strategic advocacy and capacity building, we&apos;re ensuring Africa&apos;s unique climate-health vulnerabilities are addressed at every policy level.
                                    </p>
                                    <div className="flex items-center text-sm text-blue-200">
                                        <Handshake className="w-4 h-4 mr-2" />
                                        Building partnerships for policy influence
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge className="mb-4 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20">
                                Policy Focus
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                Policy and Advocacy Levels
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Strategic advocacy across global, regional, and national levels to ensure comprehensive climate-health policy integration
                            </p>
                        </div>

                        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                            {policyFocusAreas.map((area, index) => (
                                <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white hover:bg-gray-50 overflow-hidden">
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
                            ))}
                        </div>

                        <div className="text-center mb-16">
                            <Badge className="mb-4 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20">
                                Policy Impact
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                Climate Negotiations & Policy Influence
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Participating in international climate negotiations and creating unified platforms for African climate-health advocacy
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-12 rounded-3xl border border-gray-100 mb-16">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl font-bold text-[#021d49] mb-6">International Climate Negotiations</h3>
                                    <div className="space-y-4 text-gray-700">
                                        <div className="flex items-start gap-3">
                                            <Globe className="w-6 h-6 text-[#0e8601] mt-1 flex-shrink-0" />
                                            <p>Advocating for Africa&apos;s health priorities in global climate forums</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <FileText className="w-6 h-6 text-[#0e8601] mt-1 flex-shrink-0" />
                                            <p>Ensuring global climate actions account for continental vulnerabilities</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Handshake className="w-6 h-6 text-[#0e8601] mt-1 flex-shrink-0" />
                                            <p>Building coalitions for unified African representation</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-lg">
                                    <h4 className="text-xl font-bold text-[#021d49] mb-4">Key Achievements</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-[#0e8601] rounded-full"></div>
                                            <span>Health integration in climate policies</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-[#0e8601] rounded-full"></div>
                                            <span>African vulnerability recognition</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-[#0e8601] rounded-full"></div>
                                            <span>Unified advocacy platform</span>
                                        </div>
                                    </div>
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

export default PolicyAdvocacyPage;