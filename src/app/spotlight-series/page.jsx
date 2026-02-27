'use client'
import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, Bell, ArrowLeft, Clock, Calendar, Users, Globe, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const SpotlightSeriesPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
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

    const handleNotify = (e) => { e.preventDefault(); if (email) setSubmitted(true); };

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

                {/* ── NOTIFY FORM ── */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#ff9500]/10 flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-7 h-7 text-[#ff9500]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#021d49] mb-3">Be the First to Join</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">Register your interest and we'll send you the invite for the first session.</p>

                        {submitted ? (
                            <div className="bg-[#0e8601]/5 border border-[#0e8601]/20 rounded-2xl py-8 px-8">
                                <CheckCircle className="w-10 h-10 text-[#0e8601] mx-auto mb-3" />
                                <p className="text-[#021d49] font-bold text-lg">You're on the list!</p>
                                <p className="text-gray-500 text-sm mt-2">We'll send you the invite when the first session is scheduled.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                                <input type="email" required placeholder="Enter your email address" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 focus:border-[#0e8601] transition text-sm" />
                                <button type="submit"
                                    className="bg-[#ff9500] hover:bg-[#e6850e] text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                                    <Bell className="w-4 h-4" /> Notify Me
                                </button>
                            </form>
                        )}
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