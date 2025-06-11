'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Heart,
    Droplets,
    Bug,
    Wind,
    Sun,
    Shield,
    Baby,
    Brain,
    Scale,
    Leaf,
    Globe,
    Users,
    ArrowRight,
    CheckCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const ResearchPage = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const videos = [
        {
            id: 1,
            src: "/videos/climate industry.mp4",
            alt: "Climate research video"
        },
        {
            id: 2,
            src: "/videos/dna.mp4",
            alt: "Health systems video"
        },
        {
            id: 3,
            src: "/videos/windmill.mp4",
            alt: "Data analysis video"
        }
    ];

    const focusAreas = [
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "Food Security and Nutrition",
            description: "Addressing climate impacts on agricultural systems and nutritional outcomes across African communities.",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: <Droplets className="w-8 h-8" />,
            title: "Water, Sanitation, and Hygiene (WASH)",
            description: "Improving access to clean water and sanitation infrastructure resilient to climate variability.",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: <Bug className="w-8 h-8" />,
            title: "Vector-borne & Communicable Diseases",
            description: "Monitoring and controlling disease vectors affected by changing climate patterns and extreme weather events.",
            color: "from-red-500 to-pink-600"
        },
        {
            icon: <Wind className="w-8 h-8" />,
            title: "Air Quality",
            description: "Assessing air pollution impacts and developing strategies for cleaner air in urban and rural settings.",
            color: "from-gray-500 to-slate-600"
        },
        {
            icon: <Sun className="w-8 h-8" />,
            title: "Urban Heat & Occupational Health",
            description: "Protecting workers and communities from rising temperatures and heat-related health risks.",
            color: "from-orange-500 to-red-600"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Disaster Preparedness & Response",
            description: "Building resilient health systems capable of responding to climate-related emergencies and disasters.",
            color: "from-purple-500 to-violet-600"
        },
        {
            icon: <Baby className="w-8 h-8" />,
            title: "SRMNCAH",
            description: "Safeguarding Sexual, Reproductive, Maternal, Newborn, Child and Adolescent health in changing climates.",
            color: "from-pink-500 to-rose-600"
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Mental Health",
            description: "Understanding and addressing the psychological impacts of climate change on African populations.",
            color: "from-indigo-500 to-blue-600"
        },
        {
            icon: <Scale className="w-8 h-8" />,
            title: "Ethical Frameworks",
            description: "Developing ethical guidelines for climate and health research that respects community values and rights.",
            color: "from-teal-500 to-green-600"
        }
    ];

    const keyFacts = [
        "Africa experiences the most severe climate-related health impacts globally",
        "Climate change increases water-borne and vector-borne diseases",
        "Many African health systems need strengthened climate resilience",
        "Better data sharing enables more effective interventions"
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
                    {/* Video Background */}
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
                                Climate & Health Research Hub
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                                Pioneering Climate-Health Research Across Africa
                            </h1>
                            <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                                Advancing scientific understanding and building resilient health systems through innovative research, data sharing, and collaborative solutions for Africa's climate challenges.
                            </p>
                            <nav className="text-lg flex items-center">
                                <span className="text-gray-300">Home</span>
                                <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                                <span className="text-[#0e8601] font-semibold">Research and Innovation</span>
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

                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge className="mb-6 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20 text-sm px-4 py-2">
                                    Why This Matters
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-8 leading-tight">
                                    Understanding Africa's Climate-Health Challenge
                                </h2>

                                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                    <p>
                                        Africa faces unprecedented climate challenges that directly impact millions of lives. From extreme weather events to shifting disease patterns, our continent needs comprehensive research to build effective solutions.
                                    </p>
                                    <p>
                                        CAPCHA centralizes research efforts across Africa, creating a unified platform where data becomes actionable intelligence for healthier, more resilient communities.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold text-[#021d49] mb-6 flex items-center gap-3">
                                        <Globe className="w-8 h-8 text-[#0e8601]" />
                                        Key Facts
                                    </h3>
                                    <div className="space-y-4">
                                        {keyFacts.map((fact, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-700 leading-relaxed">{fact}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#021d49] to-[#0e8601] p-8 rounded-2xl text-white">
                                    <h4 className="text-xl font-bold mb-3">Our Impact</h4>
                                    <p className="text-blue-100 mb-4">
                                        Through collaborative research and data sharing, we're building the foundation for climate-resilient health systems across Africa.
                                    </p>
                                    <div className="flex items-center text-sm text-blue-200">
                                        <Users className="w-4 h-4 mr-2" />
                                        Join our growing network of researchers
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
                                Research Focus
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                Our Focus Areas
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive research across critical domains affecting climate and health outcomes in Africa
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    </div>
                </section>
            </div>
            <Footer />

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
        </>
    );
};

export default ResearchPage;