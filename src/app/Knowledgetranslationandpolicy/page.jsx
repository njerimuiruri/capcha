'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    Globe,
    DollarSign,
    Link,
    Target,
    Lightbulb,
    ArrowRight,
    CheckCircle,
    BookOpen,
    TrendingUp,
    Award
} from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const Knowledgetranslationandpolicy = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const videos = [
        {
            id: 1,
            src: "/videos/climate industry.mp4",
            alt: "Policy implementation video"
        },
        {
            id: 2,
            src: "/videos/dna.mp4",
            alt: "Research translation video"
        },
        {
            id: 3,
            src: "/videos/windmill.mp4",
            alt: "Evidence synthesis video"
        }
    ];

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 4000);
        return () => clearTimeout(timeout);
    }, []);

    const implementationApproaches = [
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Evidence Synthesis and State of Evidence Reports",
            description: "Evidence synthesis from discussions on status, gaps and opportunities in Transdisciplinary Research on Climate and Health leading to the publishing of state of evidence reports",
            color: "from-blue-500 to-cyan-600",
            features: ["Status assessment", "Gap identification", "Opportunity mapping", "Evidence compilation"]
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Africa Position Outlooks and Position Papers",
            description: "Outlooks that can inform Africa Position on Transdisciplinary research and interventions on climate and health leading to the publishing of position papers",
            color: "from-green-500 to-emerald-600",
            features: ["Continental perspective", "Research priorities", "Intervention strategies", "Policy recommendations"]
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Mini-grants for Transdisciplinary Research",
            description: "Facilitation of Mini-grants to transdisciplinary climate and health research in africa",
            color: "from-purple-500 to-violet-600",
            features: ["Research funding", "Capacity building", "Innovation support", "Cross-sector projects"]
        }
    ];

    const keyBenefits = [
        "Bridge gap between research and application",
        "Enable evidence-based decision-making",
        "Protect and improve public health",
        "Inform health policies and practices"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [videos.length]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                <section className="relative mt-32 h-[600px] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        {videos.map((video, index) => (
                            <div
                                key={video.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <video
                                    src={video.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    style={{ display: index === currentVideoIndex ? 'block' : 'none' }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 via-black/20 to-black/10"></div>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 text-left text-white px-8 max-w-7xl mx-auto w-full">
                        <div className="max-w-3xl">
                            <Badge className="mb-6 bg-[#0e8601]/20 text-white border-[#0e8601] text-sm px-4 py-2">
                                Knowledge Translation & Policy
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                                Bridging Science and Policy
                            </h1>
                            <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                                To bridge the gap between scientific research and practical application, providing a dynamic and responsive interface between science and policy for evidence-based decision-making.
                            </p>
                            <nav className="text-lg flex items-center">
                                <span className="text-gray-300">Home</span>
                                <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                                <span className="text-[#0e8601] font-semibold">Knowledge Translation and Policy</span>
                            </nav>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 flex space-x-2">
                        {videos.map((_, index) => (
                            <div key={index} className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className={`w-full h-full bg-[#0e8601] rounded-full transition-all duration-300 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-40'
                                        }`}
                                    style={{
                                        animation: index === currentVideoIndex ? 'fillIndicator 5s linear infinite' : 'none'
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge className="mb-6 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20 text-sm px-4 py-2">
                                    Our Mission
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-8 leading-tight">
                                    From Research to Action
                                </h2>

                                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                    <p>
                                        Knowledge translation and policy: to bridge the gap between scientific research and practical application, the platform provides a dynamic and responsive interface between science and policy, ensuring that the latest research informs practical actions and strategies.
                                    </p>
                                    <p>
                                        This process is crucial for enabling evidence-based decision-making that can protect and improve public health in the context of climate change by ensuring that research findings are effectively communicated and utilized to inform health policies, practices, and interventions.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold text-[#021d49] mb-6 flex items-center gap-3">
                                        <Target className="w-8 h-8 text-[#0e8601]" />
                                        Key Benefits
                                    </h3>
                                    <div className="space-y-4">
                                        {keyBenefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-700 leading-relaxed">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#021d49] to-[#0e8601] p-8 rounded-2xl text-white">
                                    <h4 className="text-xl font-bold mb-3">Policy Impact</h4>
                                    <p className="text-blue-100 mb-4">
                                        Transforming research findings into actionable policies that protect and improve public health across Africa's changing climate landscape.
                                    </p>
                                    <div className="flex items-center text-sm text-blue-200">
                                        <Link className="w-4 h-4 mr-2" />
                                        Connecting science with implementation
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Implementation Approaches Section */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge className="mb-4 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20">
                                Implementation Strategy
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                How We Bridge the Gap
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                This will be done through three key approaches that ensure research findings inform policy and practice
                            </p>
                        </div>

                        <div className="space-y-12">
                            {implementationApproaches.map((approach, index) => (
                                <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white hover:bg-gray-50 overflow-hidden">
                                    <div className="grid lg:grid-cols-3 gap-8 p-8">
                                        <div className="lg:col-span-2">
                                            <CardHeader className="p-0 pb-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${approach.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                                                        {approach.icon}
                                                    </div>
                                                    <div>
                                                        <Badge className="mb-2 bg-[#0e8601]/10 text-[#0e8601] text-xs">
                                                            Approach {String.fromCharCode(65 + index)}
                                                        </Badge>
                                                        <CardTitle className="text-2xl text-[#021d49] group-hover:text-[#0e8601] transition-colors">
                                                            {approach.title}
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <CardDescription className="text-gray-600 leading-relaxed text-base mb-6">
                                                    {approach.description}
                                                </CardDescription>
                                            </CardContent>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-semibold text-[#021d49] mb-4 flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" />
                                                Key Components
                                            </h4>
                                            <div className="space-y-3">
                                                {approach.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 bg-gradient-to-br ${approach.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <style jsx>{`
                @keyframes fillIndicator {
                    from {
                        transform: scaleX(0);
                        transform-origin: left;
                    }
                    to {
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                }
            `}</style>
            </div>

            <Footer />
        </>

    );
};

export default Knowledgetranslationandpolicy;