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
    Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import PageLoader from '@/app/PageLoader';


const videos = [
    '/videos/healthvideo.mp4',
    '/videos/climate industry.mp4',
    '/videos/windmill.mp4',
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
            format: "In-person/Hybrid"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Bootcamps",
            description: "Intensive, fast-paced training sessions focused on practical skills and tools for addressing climate-health challenges through interdisciplinary approaches and real-world applications.",
            color: "from-teal-500 to-green-600",
            format: "Interactive workshops"
        },
        {
            icon: <Monitor className="w-8 h-8" />,
            title: "Webinars",
            description: "Regular online sessions featuring leading experts sharing latest research findings, policy developments, and innovative solutions in climate and health from across the continent.",
            color: "from-indigo-500 to-blue-600",
            format: "Virtual sessions"
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Seminars/Workshops",
            description: "Interactive sessions designed for knowledge sharing, collaborative problem-solving, and skill building on specific climate-health topics with peer-to-peer learning opportunities.",
            color: "from-pink-500 to-rose-600",
            format: "Interactive sessions"
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Short Self-paced Courses",
            description: "Flexible online learning modules covering various aspects of climate and health, designed for busy professionals and accessible to learners at their own pace and schedule.",
            color: "from-purple-500 to-violet-600",
            format: "Online modules"
        }
    ];

    const focusAreas = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community Engagement",
            description: "Empowering local populations through educational campaigns and community-based initiatives for climate adaptation and mitigation.",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: <School className="w-8 h-8" />,
            title: "Curriculum Integration",
            description: "Advocating for integration of health considerations in climate change courses across African universities and educational institutions.",
            color: "from-blue-500 to-cyan-600"
        },
    ];

    const keyOutcomes = [
        "Graduates equipped with transdisciplinary climate-health expertise",
        "Communities empowered to take climate adaptation actions",
        "Integrated health perspectives in climate education curricula",
        "Strengthened local capacity for climate-health interventions"
    ];

    return (
        <>
            <PageLoader isLoading={isLoading} theme="light" />

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

                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
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
                            {focusAreas.map((area, index) => (
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
                                <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white hover:bg-gray-50 overflow-hidden">
                                    <CardHeader className="pb-4">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            {program.icon}
                                        </div>
                                        <CardTitle className="text-xl text-[#021d49] group-hover:text-[#0e8601] transition-colors">
                                            {program.title}
                                        </CardTitle>
                                        <div className="flex gap-2 mt-2">
                                            <Badge variant="outline" className="text-xs">{program.format}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-gray-600 leading-relaxed">
                                            {program.description}
                                        </CardDescription>
                                    </CardContent>

                                    <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default CapacityEnhancementPage;