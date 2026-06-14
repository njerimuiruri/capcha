'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Globe, DollarSign, Target, Lightbulb, ArrowRight, CheckCircle, BookOpen, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import Link from 'next/link';

const implementationApproaches = [
    {
        icon: <FileText className="w-8 h-8" />,
        title: "Evidence Synthesis and State of Evidence Reports",
        description: "Evidence synthesis from discussions on status, gaps and opportunities in Transdisciplinary Research on Climate and Health leading to the publishing of state of evidence reports.",
        color: "from-blue-500 to-cyan-600",
        features: ["Status assessment", "Gap identification", "Opportunity mapping", "Evidence compilation"],
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "Africa Position Outlooks and Position Papers",
        description: "Outlooks that can inform Africa's position on Transdisciplinary research and interventions on climate and health leading to the publishing of position papers.",
        color: "from-green-500 to-emerald-600",
        features: ["Continental perspective", "Research priorities", "Intervention strategies", "Policy recommendations"],
    },
    {
        icon: <DollarSign className="w-8 h-8" />,
        title: "Mini-grants for Transdisciplinary Research",
        description: "Facilitation of Mini-grants to transdisciplinary climate and health research in Africa.",
        color: "from-purple-500 to-violet-600",
        features: ["Research funding", "Capacity building", "Innovation support", "Cross-sector projects"],
    },
];

const keyBenefits = [
    "Bridge gap between research and application",
    "Enable evidence-based decision-making",
    "Protect and improve public health",
    "Inform health policies and practices",
];

const KnowledgeTranslationPage = () => {
    const [videoIdx, setVideoIdx] = useState(0);
    const videos = [
        { src: "/videos/climate industry.mp4" },
        { src: "/videos/dna.mp4" },
        { src: "/videos/windmill.mp4" },
    ];

    useEffect(() => {
        const t = setInterval(() => setVideoIdx(i => (i + 1) % videos.length), 5000);
        return () => clearInterval(t);
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                {/* Hero */}
                <section className="relative mt-24 h-[520px] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        {videos.map((v, i) => (
                            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === videoIdx ? 'opacity-100' : 'opacity-0'}`}>
                                <video src={v.src} autoPlay muted loop playsInline className="w-full h-full object-cover"
                                    style={{ display: i === videoIdx ? 'block' : 'none' }} />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                            </div>
                        ))}
                    </div>
                    <div className="relative z-10 px-8 max-w-7xl mx-auto w-full">
                        <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-6">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/PolicyAdvocacyPage" className="hover:text-white">Policy &amp; Advocacy</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#0e8601] font-medium">Knowledge Translation</span>
                        </nav>
                        <Badge className="mb-5 bg-[#0e8601]/20 text-white border-[#0e8601] text-sm px-4 py-2">
                            Knowledge Translation &amp; Policy
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                            Bridging Science<br />and Policy
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                            To bridge the gap between scientific research and practical application, providing a dynamic and responsive interface between science and policy for evidence-based decision-making.
                        </p>
                    </div>
                    <div className="absolute bottom-6 left-8 flex gap-2">
                        {videos.map((_, i) => (
                            <div key={i} className="w-10 h-1 bg-white/30 rounded-full overflow-hidden">
                                <div className={`h-full bg-[#0e8601] rounded-full ${i === videoIdx ? 'opacity-100' : 'opacity-40'}`} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Intro */}
                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <Badge className="mb-5 bg-[#0e8601]/10 text-[#0e8601]">Our Mission</Badge>
                            <h2 className="text-4xl font-bold text-[#021d49] mb-6">From Research to Action</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                The platform provides a dynamic and responsive interface between science and policy, ensuring that the latest research informs practical actions and strategies.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                This process is crucial for enabling evidence-based decision-making that can protect and improve public health in the context of climate change.
                            </p>
                        </div>
                        <div className="space-y-5">
                            <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-100">
                                <h3 className="text-xl font-bold text-[#021d49] mb-5 flex items-center gap-3">
                                    <Target className="w-6 h-6 text-[#0e8601]" /> Key Benefits
                                </h3>
                                <div className="space-y-3">
                                    {keyBenefits.map(b => (
                                        <div key={b} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700">{b}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-[#021d49] to-[#0e8601] p-7 rounded-2xl text-white">
                                <h4 className="text-lg font-bold mb-2">Policy Impact</h4>
                                <p className="text-blue-100 text-sm leading-relaxed mb-3">
                                    Transforming research findings into actionable policies that protect and improve public health across Africa&apos;s changing climate landscape.
                                </p>
                                <div className="flex items-center text-xs text-blue-200 gap-2">
                                    <Lightbulb className="w-4 h-4" /> Connecting science with implementation
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Approaches */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-14">
                            <Badge className="mb-3 bg-[#0e8601]/10 text-[#0e8601]">Implementation Strategy</Badge>
                            <h2 className="text-4xl font-bold text-[#021d49] mb-4">How We Bridge the Gap</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Three key approaches that ensure research findings inform policy and practice</p>
                        </div>
                        <div className="space-y-8">
                            {implementationApproaches.map((a, i) => (
                                <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                                    <div className="grid lg:grid-cols-3 gap-6 p-7">
                                        <div className="lg:col-span-2">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white`}>
                                                    {a.icon}
                                                </div>
                                                <div>
                                                    <Badge className="mb-1 bg-[#0e8601]/10 text-[#0e8601] text-xs">Approach {String.fromCharCode(65 + i)}</Badge>
                                                    <CardTitle className="text-xl text-[#021d49]">{a.title}</CardTitle>
                                                </div>
                                            </div>
                                            <CardDescription className="text-gray-600 text-base leading-relaxed">{a.description}</CardDescription>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-5">
                                            <h4 className="font-semibold text-[#021d49] mb-3 text-sm flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" /> Key Components
                                            </h4>
                                            <div className="space-y-2.5">
                                                {a.features.map(f => (
                                                    <div key={f} className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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

export default KnowledgeTranslationPage;
