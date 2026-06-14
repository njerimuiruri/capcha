'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Calendar, Brain, Lightbulb, ArrowRight, CheckCircle, Network, BookOpen, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import Link from 'next/link';

const engagementApproaches = [
    {
        icon: <Network className="w-8 h-8" />,
        title: "Online Transdisciplinary Facilitations",
        description: "A platform for engagements with different transdisciplinary stakeholders through online facilitations to promote connections and collaborations among experts in climate science, public health, policy, and other relevant fields.",
        color: "from-blue-500 to-cyan-600",
        features: ["Virtual collaboration spaces", "Expert networking", "Cross-sector partnerships", "Real-time knowledge exchange"],
    },
    {
        icon: <MessageCircle className="w-8 h-8" />,
        title: "Bi-monthly Climate and Health Dialogues",
        description: "Regular dialogues fostering continuous engagement and knowledge sharing on findings related to the impacts of climate change on health while building sustainable transdisciplinary collaboration networks.",
        color: "from-green-500 to-emerald-600",
        features: ["Regular expert discussions", "Policy maker engagement", "Research updates", "Best practice sharing"],
    },
    {
        icon: <Calendar className="w-8 h-8" />,
        title: "Bi-annual Conference on Climate and Health",
        description: "Comprehensive conferences bringing together diverse stakeholders to share research findings, discuss policy implications, and foster deeper transdisciplinary collaboration on climate and health issues.",
        color: "from-purple-500 to-violet-600",
        features: ["Research presentations", "Policy workshops", "Networking sessions", "Collaborative planning"],
    },
];

const stakeholderGroups = [
    "Climate Scientists", "Public Health Experts", "Policy Makers",
    "Healthcare Practitioners", "Community Leaders", "Academic Researchers",
];

const KnowledgeSharingPage = () => {
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
                            <Link href="/Research" className="hover:text-white">Research &amp; Innovation</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#0e8601] font-medium">Knowledge Sharing</span>
                        </nav>
                        <Badge className="mb-5 bg-[#0e8601]/20 text-white border-[#0e8601] text-sm px-4 py-2">
                            Knowledge Sharing &amp; Engagement
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                            Fostering Transdisciplinary<br />Collaboration
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                            Working on findings related to the impacts of climate change on health while fostering collaboration among experts in climate science, public health, policy, and other relevant fields.
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
                            <Badge className="mb-5 bg-[#0e8601]/10 text-[#0e8601]">Our Approach</Badge>
                            <h2 className="text-4xl font-bold text-[#021d49] mb-6">Building Bridges Across Disciplines</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                Climate change and health challenges require collaborative solutions that span multiple disciplines and sectors. Our knowledge sharing initiatives create meaningful connections between experts across fields.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Through structured dialogues, conferences, and online facilitations, we foster the transdisciplinary collaboration needed to address Africa&apos;s most pressing climate-health challenges.
                            </p>
                        </div>
                        <div className="space-y-5">
                            <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-100">
                                <h3 className="text-xl font-bold text-[#021d49] mb-5 flex items-center gap-3">
                                    <Users className="w-6 h-6 text-[#0e8601]" /> Stakeholder Groups
                                </h3>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {stakeholderGroups.map(g => (
                                        <div key={g} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-[#0e8601] flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{g}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-[#021d49] to-[#0e8601] p-7 rounded-2xl text-white">
                                <h4 className="text-lg font-bold mb-2">Collaborative Impact</h4>
                                <p className="text-blue-100 text-sm leading-relaxed mb-3">
                                    By bringing together diverse expertise, we create comprehensive solutions that address climate-health challenges from multiple perspectives.
                                </p>
                                <div className="flex items-center text-xs text-blue-200 gap-2">
                                    <Lightbulb className="w-4 h-4" /> Innovation through collaboration
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Approaches */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-14">
                            <Badge className="mb-3 bg-[#0e8601]/10 text-[#0e8601]">Engagement Methods</Badge>
                            <h2 className="text-4xl font-bold text-[#021d49] mb-4">Our Engagement Approaches</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Three key strategies for fostering transdisciplinary collaboration and knowledge sharing</p>
                        </div>
                        <div className="space-y-8">
                            {engagementApproaches.map((a, i) => (
                                <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                                    <div className="grid lg:grid-cols-3 gap-6 p-7">
                                        <div className="lg:col-span-2">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white`}>
                                                    {a.icon}
                                                </div>
                                                <div>
                                                    <Badge className="mb-1 bg-[#0e8601]/10 text-[#0e8601] text-xs">Approach {i + 1}</Badge>
                                                    <CardTitle className="text-xl text-[#021d49]">{a.title}</CardTitle>
                                                </div>
                                            </div>
                                            <CardDescription className="text-gray-600 text-base leading-relaxed">{a.description}</CardDescription>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-5">
                                            <h4 className="font-semibold text-[#021d49] mb-3 text-sm flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" /> Key Features
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

export default KnowledgeSharingPage;
