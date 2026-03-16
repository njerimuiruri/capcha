'use client'
import React, { useState, useEffect } from 'react';
import { Link2, ChevronRight, ArrowLeft, Users, Globe, MessageSquare, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const CAPCHAConnectPage = () => {
    const launchDate = new Date('2025-12-01T00:00:00');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = launchDate - new Date();
            if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff / 3600000) % 24),
                minutes: Math.floor((diff / 60000) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const features = [
        { icon: <Users className="w-5 h-5" />, title: 'Researcher Profiles', desc: 'Build your professional profile and showcase your climate-health work to the continental community.' },
        { icon: <Globe className="w-5 h-5" />, title: 'Cross-Border Collaboration', desc: 'Find and connect with researchers working on overlapping themes across different African nations.' },
        { icon: <MessageSquare className="w-5 h-5" />, title: 'Knowledge Exchange', desc: 'Share insights, ask questions, and discuss emerging issues in dedicated topic forums.' },
        { icon: <Star className="w-5 h-5" />, title: 'Mentorship Matching', desc: 'Early-career researchers matched with experienced mentors in their specific area of interest.' },
        { icon: <BookOpen className="w-5 h-5" />, title: 'Resource Library', desc: 'Access shared tools, datasets, templates, and reading lists curated by the community.' },
        { icon: <Link2 className="w-5 h-5" />, title: 'Project Matchmaking', desc: 'Post collaboration opportunities and find partners for grant applications and joint research.' },
    ];

    const whoItFor = [
        { emoji: '🔬', label: 'Researchers' },
        { emoji: '🏛️', label: 'Policymakers' },
        { emoji: '🏥', label: 'Health Practitioners' },
        { emoji: '🌱', label: 'Early-Career Scientists' },
        { emoji: '📊', label: 'Data Scientists' },
        { emoji: '🤝', label: 'NGO Professionals' },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                {/* ── HERO ── */}
                <section className="mt-32 bg-[#021d49] py-20 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5"
                        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    {/* Subtle floating country flags — decorative only */}
                    <span className="absolute top-16 left-10 text-2xl opacity-20 hidden md:block select-none">🇳🇬</span>
                    <span className="absolute top-28 right-16 text-2xl opacity-20 hidden md:block select-none">🇰🇪</span>
                    <span className="absolute bottom-16 left-24 text-2xl opacity-20 hidden md:block select-none">🇬🇭</span>
                    <span className="absolute bottom-10 right-10 text-2xl opacity-20 hidden md:block select-none">🇿🇦</span>
                    <span className="absolute top-1/2 left-6 text-2xl opacity-15 hidden md:block select-none">🇪🇹</span>
                    <span className="absolute top-1/3 right-6 text-2xl opacity-15 hidden md:block select-none">🇹🇿</span>

                    <div className="relative max-w-4xl mx-auto text-center">
                        {/* Breadcrumb */}
                        <nav className="flex items-center justify-center gap-2 text-white/50 text-sm mb-10">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href="/CapacityEnhancementPage" className="hover:text-white transition-colors">Capacity Enhancement</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">CAPCHA Connect</span>
                        </nav>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 border border-[#ff9500] text-[#ff9500] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                            <Link2 className="w-3.5 h-3.5" />
                            Capacity Enhancement · Community Platform
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            CAPCHA<br />
                            <span className="text-[#ff9500]">Connect</span>
                        </h1>

                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            A pan-African networking platform connecting climate-health researchers, policymakers, and practitioners for collaboration, mentorship, and knowledge exchange — coming soon.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-full">
                            <Users className="w-4 h-4 text-[#ff9500]" />
                            Researchers &nbsp;·&nbsp; Policymakers &nbsp;·&nbsp; Practitioners &nbsp;·&nbsp; Students
                        </div>
                    </div>
                </section>

                {/* ── COUNTDOWN ── */}
                <section className="bg-[#021d49] border-t border-white/10 pb-16 px-4">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-6 font-medium">Platform Launching In</p>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Minutes', value: timeLeft.minutes },
                                { label: 'Seconds', value: timeLeft.seconds },
                            ].map((u) => (
                                <div key={u.label} className="bg-white/5 border border-white/10 rounded-2xl py-6 text-center">
                                    <p className="text-4xl md:text-5xl font-extrabold text-[#ff9500] tabular-nums">
                                        {String(u.value).padStart(2, '0')}
                                    </p>
                                    <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{u.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FEATURES ── */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[#0e8601] text-sm font-bold uppercase tracking-widest mb-3">Platform Features</p>
                        <h2 className="text-3xl font-bold text-[#021d49] mb-5">Built for Africa's Climate-Health Community</h2>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-14">
                            CAPCHA Connect goes beyond a directory — it's a dynamic space where Africa's climate-health ecosystem collaborates, learns, and grows together.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                            {features.map((f) => (
                                <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#021d49]/20 hover:shadow-md transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-[#021d49] flex items-center justify-center text-white mb-4">
                                        {f.icon}
                                    </div>
                                    <h3 className="font-bold text-[#021d49] mb-2 text-base">{f.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHO IT'S FOR ── */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[#0e8601] text-sm font-bold uppercase tracking-widest mb-3">Who It's For</p>
                        <h2 className="text-3xl font-bold text-[#021d49] mb-10">Everyone Working on Climate & Health in Africa</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {whoItFor.map((w) => (
                                <div key={w.label} className="flex items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#021d49]/20 hover:shadow-sm transition-all">
                                    <span className="text-2xl">{w.emoji}</span>
                                    <span className="font-semibold text-[#021d49] text-sm">{w.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── REGISTER CTA ── */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#021d49] via-[#03337a] to-[#021d49]" />
                            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white/5 rounded-full" />

                            <div className="relative p-10 text-center">
                                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9500] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9500]"></span>
                                    </span>
                                    Registration Now Open
                                </div>

                                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                                    Join CAPCHA Connect
                                </h2>
                                <p className="text-white/80 text-base leading-relaxed mb-8 max-w-lg mx-auto">
                                    Be among the first members of Africa's premier climate-health networking platform. Register now to secure your place in the community.
                                </p>

                                <a href="https://ee.kobotoolbox.org/single/81f9beab8ea9a72662b5c429f732f7f3"
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-[#ff9500] hover:bg-[#e6850e] text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                                    <Link2 className="w-5 h-5" />
                                    Register for CAPCHA Connect
                                    <Users className="w-5 h-5" />
                                </a>

                                <p className="text-white/50 text-xs mt-5">Free to join · Open to all African climate-health professionals</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── BACK ── */}
                <div className="pb-12 text-center">
                    <Link href="/CapacityEnhancementPage" className="inline-flex items-center gap-2 text-[#021d49] hover:text-[#0e8601] font-semibold transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Capacity Enhancement
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CAPCHAConnectPage;