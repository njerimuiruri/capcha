'use client'
import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, ArrowLeft, ArrowRight, Clock, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const SpotlightSeriesPage = () => {
    const launchDate = new Date('2025-10-30T14:00:00');
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
        { icon: '🎯', title: 'Cross-Sector Dialogue', desc: 'Each session provokes conversation across research, policy, and practice — breaking down silos between disciplines.' },
        { icon: '🌍', title: 'African-Led Expertise', desc: 'Centring African voices, researchers, and solutions at the heart of every conversation.' },
        { icon: '🔗', title: 'Quarterly Cross-Hub Sessions', desc: 'Once per quarter, structured dialogues bridge different climate-health platforms and networks across the continent.' },
        { icon: '⚡', title: 'Science-Policy Translation', desc: 'Turning research findings into actionable decision support for policymakers and practitioners.' },
        { icon: '🤝', title: 'Community of Practice', desc: 'Building a robust continental network of climate-health professionals working together.' },
        { icon: '📋', title: 'Live Knowledge Synthesis', desc: 'Real-time synthesis of evidence and ideas — not just passive listening.' },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                {/* ── HERO ── */}
                <section className="mt-32 bg-[#021d49] py-20 px-4 relative overflow-hidden">
                    {/* Subtle dot pattern */}
                    <div className="absolute inset-0 opacity-5"
                        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    <div className="relative max-w-4xl mx-auto text-center">
                        {/* Breadcrumb */}
                        <nav className="flex items-center justify-center gap-2 text-white/50 text-sm mb-10">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href="/CapacityEnhancementPage" className="hover:text-white transition-colors">Capacity Enhancement</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Spotlight Series</span>
                        </nav>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 border border-[#0e8601] text-[#0e8601] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                            <Sparkles className="w-3.5 h-3.5" />
                            Capacity Enhancement · New Initiative
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            CAPCHA Spotlight<br />
                            <span className="text-[#ff9500]">Series</span>
                        </h1>

                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            A high-impact 90-minute monthly virtual series bridging African climate-health research and real-world policy — coming soon.
                        </p>

                        {/* Schedule pill */}
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-full">
                            <Clock className="w-4 h-4 text-[#ff9500]" />
                            Every Last Thursday &nbsp;·&nbsp; 2:00 – 3:30 PM EAT &nbsp;·&nbsp; 90 Minutes
                        </div>
                    </div>
                </section>

                {/* ── COUNTDOWN ── */}
                <section className="bg-[#021d49] border-t border-white/10 pb-16 px-4">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-6 font-medium">First Session Launching In</p>
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

                {/* ── ABOUT ── */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[#0e8601] text-sm font-bold uppercase tracking-widest mb-3">About the Series</p>
                        <h2 className="text-3xl font-bold text-[#021d49] mb-5">More Than a Webinar — A Provocation</h2>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-14">
                            Moving beyond traditional academic lectures, each session serves as a provocation for cross-sector dialogue — ensuring climate-health science is translated into actionable decision support, not just discussed in silos.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                            {features.map((f) => (
                                <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#0e8601]/30 hover:shadow-md transition-all">
                                    <span className="text-2xl mb-4 block">{f.icon}</span>
                                    <h3 className="font-bold text-[#021d49] mb-2 text-base">{f.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SCHEDULE CARDS ── */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
                        {[
                            { icon: <Calendar className="w-5 h-5" />, title: 'Monthly Sessions', desc: 'Every last Thursday of the month — mark your calendar and join us regularly.' },
                            { icon: <Clock className="w-5 h-5" />, title: '2:00 – 3:30 PM EAT', desc: '90 minutes of structured dialogue, live synthesis, and audience Q&A.' },
                            { icon: <Users className="w-5 h-5" />, title: 'Quarterly Cross-Hub', desc: 'Special cross-platform sessions every 3 months bringing together partner networks.' },
                        ].map((item) => (
                            <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-4 items-start hover:border-[#021d49]/20 hover:shadow-sm transition-all">
                                <div className="w-10 h-10 rounded-xl bg-[#021d49] flex items-center justify-center text-white flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#021d49] mb-1 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 2026 CALL FOR PRESENTERS CTA ── */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-2xl mx-auto">
                        {/* Glowing card */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff9500] via-[#e6850e] to-[#c97000]" />
                            {/* Decorative circles */}
                            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white/5 rounded-full" />

                            <div className="relative p-10 text-center">
                                {/* Pulsing badge */}
                                <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                    </span>
                                    2026 Call Now Open
                                </div>

                                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                                    Be a Presenter<br />or Moderator
                                </h2>
                                <p className="text-white/85 text-base leading-relaxed mb-8 max-w-lg mx-auto">
                                    Share your climate-health expertise with Africa's leading researchers and policymakers. Applications for the 2026 CAPCHA Spotlight Series are now open.
                                </p>

                                <a href="https://ee.kobotoolbox.org/single/b5423b283351f3f61595a92a17a66e00"
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-white text-[#c97000] hover:bg-orange-50 font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                                    <Sparkles className="w-5 h-5" />
                                    Apply Now — 2026 Call
                                    <ArrowRight className="w-5 h-5" />
                                </a>

                                <p className="text-white/60 text-xs mt-5">Takes ~5 minutes · Open to all African climate-health professionals</p>
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

export default SpotlightSeriesPage;