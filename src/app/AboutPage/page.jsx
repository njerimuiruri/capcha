'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { FileText, Download, Users, Target, Lightbulb, Globe, Leaf, Heart, Shield, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/navbar';
import StatsSection from './stats';
import CAPCHAActivities from './CAPCHAActivities';
import Footer from '@/components/Footer/footer';
import PageLoader from '@/app/PageLoader';


const FloatingElement = ({ children, delay = 0, duration = 6 }) => {
    return (
        <div
            className={`animate-pulse`}
            style={{
                animation: `float ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
            }}
        >
            {children}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(2deg); }
                    50% { transform: translateY(-15px) rotate(-1deg); }
                    75% { transform: translateY(-25px) rotate(1deg); }
                }
            `}</style>
        </div>
    );
};

const GlowingOrb = ({ size = 'w-64 h-64', color = 'bg-green-400', position, opacity = 'opacity-20' }) => (
    <div className={`absolute ${position} ${size} ${color} ${opacity} rounded-full blur-3xl animate-pulse`}></div>
);

const AboutPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 4000);
        return () => clearTimeout(timeout);
    }, []);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <PageLoader isLoading={isLoading} theme="light" />

            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">

                <div
                    className="relative mt-32 h-[350px] bg-gray-800 flex items-center justify-center pt-32"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/healthstethoscope.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>


                    <div className="text-center text-white z-10 relative">
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30 mb-6">
                                <Leaf className="h-5 w-5 text-emerald-300" />
                                <span className="text-sm font-medium">Climate Action Platform</span>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent leading-tight">
                            About CAPCHA
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Transforming Climate & Health Action Across Africa
                        </p>

                    </div>


                </div>

                <div className="container mx-auto px-4 py-20 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <Image
                                    src="/img/twohandsplant.jpg"
                                    alt="Person holding plant"
                                    width={1200}
                                    height={1800}
                                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />

                                <div className="absolute bottom-8 left-8 right-8 bg-gradient-to-br from-[#0e8601] via-emerald-700 to-teal-800 p-8 rounded-2xl text-white backdrop-blur-sm border border-white/20 shadow-2xl">
                                    <div className="text-7xl font-serif text-emerald-200 mb-4 opacity-80">&ldquo;</div>
                                    <p className="text-sm leading-relaxed font-light">
                                        Climate change is a global crisis with far-reaching implications for public health, and Africa stands out as a region particularly vulnerable to the adverse effects of extreme weather events linked to climate variability.
                                    </p>
                                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    <Heart className="h-4 w-4" />
                                    Climate Action Platform for Climate and Health in Africa
                                </div>
                                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mb-8"></div>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Protecting African
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Communities</span>
                                <br />from Climate Health Impacts
                            </h2>

                            <p className="text-gray-600 leading-relaxed text-lg">
                                This heightened susceptibility is exacerbated by an already strained healthcare system and the absence of robust early warning systems, factors partly attributed to the region's fragile socio-economic conditions. Besides, many African countries have failed to effectively adapt to climate change impacts due to lack of context-specific data to inform action.
                            </p>

                            <Card className="p-6 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-[#0e8601] to-teal-700 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <FileText className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-gray-900 text-lg">CAPCHA Concept Note</h5>
                                        <p className="text-gray-600">Download our comprehensive concept note document</p>
                                    </div>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-[#0e8601] to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6"
                                    >
                                        <a
                                            href="/document/CAPCHA-Concept-Note.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Download PDF
                                        </a>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Background Section with Organic Design */}
                <div className="relative py-20 overflow-hidden">
                    {/* Organic background shapes */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-emerald-50 to-teal-50"></div>
                    <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
                        <path d="M200,300 Q400,100 600,300 T1000,300 L1000,0 L0,0 Z" fill="url(#gradient1)" />
                        <path d="M0,700 Q200,500 400,700 T800,700 L800,1000 L0,1000 Z" fill="url(#gradient2)" />
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#0d9488" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0d9488" />
                                <stop offset="100%" stopColor="#0e8601" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="container mx-auto px-4 relative">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 mb-6">
                                    <Shield className="h-5 w-5 text-emerald-600" />
                                    <span className="text-emerald-700 font-medium">Understanding the Challenge</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Background</h2>
                                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mx-auto mb-8"></div>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Understanding the critical need for climate and health action in Africa
                                </p>
                            </div>

                            <div className="grid gap-8">
                                <Card className="p-8 bg-white/80 backdrop-blur-sm border-none shadow-2xl rounded-2xl hover:shadow-3xl transition-all duration-500">
                                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                                        <p className="text-lg leading-relaxed">
                                            While research evidence has been identified to be key in furthering sustainable development in policy documents like the 2030 United Nations Agenda and the 2063 African Union Agenda, data generated from the Global North may fail to effectively foster the much-needed transformative change in Africa. Though the data may help inform researchers, policymakers, and communities on how to address C & H issues, they may not be context-relevant, and thus the need to support and augment the capacity of African researchers to enable them to produce context-specific data for action.
                                        </p>

                                        <p className="text-lg leading-relaxed">
                                            From the policy perspective, African countries appear to have national climate change policy and national adaptation plan documents that merely alludes to C & H in barely a paragraph. Regional adaptation plans for different countries, therefore, have to be co-developed to facilitate policy interventions. Moreover, limited funding and inadequate capacity of C & H actors is also another impediment to the advancement of the climate and health agenda in Africa.
                                        </p>

                                        <p className="text-lg leading-relaxed">
                                            The noticeable absence of climate change and health courses or fellowships offered within the various African regions further makes it difficult for interested stakeholders to access such courses and enhance their capacity. This inadequacy acts as an obstacle to the effective design and implementation of research and adaptation programs. Compounding the matter is the fact that climate change and health research are often compartmentalized across various disciplines, resulting in a fragmented landscape of specialized discussions. This compartmentalization hinders efforts to synthesize key findings aimed at identifying trends and gaps in the evidence. Advancing the climate and health agenda in Africa will, therefore, depend on how well the linkages between research, policy, and capacity are strengthened in addition to tackling existing inequalities in research.
                                        </p>

                                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border-l-4 border-[#0e8601]">
                                            <p className="text-lg leading-relaxed font-medium text-gray-800">
                                                Urgent action is imperative if economies are to be decarbonized and more resilient health systems developed. This can be accomplished by providing contextualized evidence to support action, leading in climate advocacy and leadership, guiding sectors that significantly affect health through their actions, and assuming responsibility for climate resilience and the imperative to decarbonize healthcare systems. Transdisciplinary research and action agenda on climate change and health can help inform evidence given the human-environmental system problems being currently experienced by society. Considering the importance of collaboration in advancing the C & H agenda, key role players have to be identified and the process has to be intentional to guarantee that regional adaptation plans can be developed for different countries.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-20 relative">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full mb-6">
                                    <TrendingUp className="h-5 w-5" />
                                    <span className="font-medium">The CAPCHA Solution</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why A Climate & Health Platform?</h2>
                                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mx-auto mb-8"></div>
                                <p className="text-xl text-justify text-gray-600 max-w-4xl mx-auto leading-relaxed ">
                                    The transformation needed to address the health impacts of climate change in Africa will demand innovative approaches of mobilizing resources, working jointly, and applying knowledge. To efficiently address the diverse C & H challenges as well as the varied needs and interests of actors in the different sectors, research must be effectively interlinked with policymaking, planning, and action. The co-generation of data across disciplines is one approach that can foster such transformations. By providing timely and policy-relevant research, researchers can support evidence-based decision-making and effective implementation of climate and health policies.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                                {[
                                    {
                                        icon: Users,
                                        title: "Collaboration",
                                        description: "Bringing together researchers, policy-makers, and practitioners from various disciplines",
                                        gradient: "from-blue-500 to-cyan-500"
                                    },
                                    {
                                        icon: Target,
                                        title: "Evidence-Based Action",
                                        description: "Supporting evidence-based decision-making and effective policy implementation",
                                        gradient: "from-emerald-500 to-teal-500"
                                    },
                                    {
                                        icon: Lightbulb,
                                        title: "Knowledge Exchange",
                                        description: "Facilitating sharing of best practices and collaborative research development",
                                        gradient: "from-amber-500 to-orange-500"
                                    },
                                    {
                                        icon: Globe,
                                        title: "Context-Specific Solutions",
                                        description: "Generating African-led research for context-relevant climate and health action",
                                        gradient: "from-purple-500 to-pink-500"
                                    }
                                ].map((item, index) => (
                                    <FloatingElement key={index} delay={index * 0.5}>
                                        <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-none rounded-2xl h-full">
                                            <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                                <item.icon className="h-10 w-10 text-white" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-4 text-lg">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </Card>
                                    </FloatingElement>
                                ))}
                            </div>

                            <Card className="p-10 bg-gradient-to-br from-[#0e8601] via-emerald-700 to-teal-800 text-white rounded-3xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-400/20 to-transparent rounded-full blur-2xl"></div>

                                <div className="relative z-10">
                                    <div className="max-w-4xl mx-auto">
                                        <h3 className="text-3xl font-bold mb-6 text-center">Our Approach</h3>

                                        <p className="mb-8 text-lg leading-relaxed text-justify opacity-90 ">
                                            This can be achieved by creating platforms such as CAPCHA that brings together researchers, policy-makers, and practitioners from various disciplines and sectors. The platform will facilitate knowledge exchange, sharing of best practices, and collaboration on research and policy development. The platform will also be used to encourage regular communication channels such as meetings, conferences, and webinars to help foster dialogue and information sharing between different stakeholders. This will ensure that C & H stakeholders are up-to-date with the latest research, policy updates, and field experiences. Information on the connection between climate and health will equally be provided on the platform as most people view them separately. This can be done by sharing evidence of how climate change can affect the health sector, and similarly how the health sector can get prepared and minimize the negative effects of climate change.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="py-20 bg-gradient-to-br from-slate-100 via-emerald-50 to-teal-50 relative overflow-hidden">
                    <FloatingElement>
                        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"></div>
                    </FloatingElement>
                    <FloatingElement delay={2}>
                        <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-400/10 rounded-full blur-lg"></div>
                    </FloatingElement>

                    <div className="container mx-auto px-4 relative">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 mb-8">
                                <Leaf className="h-5 w-5 text-emerald-600" />
                                <span className="text-emerald-700 font-medium">Take Action Today</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                Join the Climate Action
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Movement</span>
                            </h2>

                            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                Urgent action is imperative if economies are to be decarbonized and more resilient health systems developed. This can be accomplished by providing contextualized evidence to support action, leading in climate advocacy and leadership, guiding sectors that significantly affect health through their actions, and assuming responsibility for climate resilience and the imperative to decarbonize healthcare systems.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">

                                <Link
                                    href="/ContactPage"
                                    className="bg-gradient-to-r from-[#0e8601] to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">

                                    Get Involved
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StatsSection />
            <CAPCHAActivities />
            <Footer />
        </>
    );
};

export default AboutPage;