'use client'
import React, { useState, useEffect } from 'react';
import { Newspaper, ChevronRight, Bell, ArrowLeft, Clock, Globe, TrendingUp, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const MonthlyDigestPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const launchDate = new Date('2025-11-01T00:00:00');
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

    const sections = [
        { icon: '🔬', title: 'Research Highlights', desc: 'Curated summaries of the latest climate-health studies, papers, and findings from African and global institutions.' },
        { icon: '📜', title: 'Policy Updates', desc: 'Key developments in climate and health policy across Africa — frameworks, decisions, and calls to action.' },
        { icon: '💰', title: 'Funding Opportunities', desc: 'Grants, fellowships, and calls for proposals relevant to climate-health researchers and practitioners.' },
        { icon: '📅', title: 'Upcoming Events', desc: 'Conferences, webinars, workshops, and training opportunities in the climate-health space.' },
        { icon: '🌟', title: 'Community Spotlight', desc: 'Featuring the work of African researchers, institutions, and initiatives making impact on the continent.' },
        { icon: '📊', title: 'Data & Tools', desc: 'New datasets, tools, and resources to support climate-health research and decision-making.' },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                {/* ── HERO ── */}
                <section className="mt-32 bg-[#021d49] py-20 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5"
                        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    <div className="relative max-w-4xl mx-auto text-center">
                        {/* Breadcrumb */}
                        <nav className="flex items-center justify-center gap-2 text-white/50 text-sm mb-10">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href="/CapacityEnhancementPage" className="hover:text-white transition-colors">Capacity Enhancement</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Monthly Digest</span>
                        </nav>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 border border-[#0e8601] text-[#0e8601] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                            <Newspaper className="w-3.5 h-3.5" />
                            Capacity Enhancement · New Initiative
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            CAPCHA Monthly<br />
                            <span className="text-[#0e8601]">Digest</span>
                        </h1>

                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Your curated monthly briefing on the latest climate-health research, policy updates, and opportunities from across Africa — coming soon.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-full">
                            <Mail className="w-4 h-4 text-[#0e8601]" />
                            Delivered Monthly &nbsp;·&nbsp; Free &nbsp;·&nbsp; Direct to Your Inbox
                        </div>
                    </div>
                </section>

                {/* ── COUNTDOWN ── */}
                <section className="bg-[#021d49] border-t border-white/10 pb-16 px-4">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-6 font-medium">First Issue Launching In</p>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Minutes', value: timeLeft.minutes },
                                { label: 'Seconds', value: timeLeft.seconds },
                            ].map((u) => (
                                <div key={u.label} className="bg-white/5 border border-white/10 rounded-2xl py-6 text-center">
                                    <p className="text-4xl md:text-5xl font-extrabold text-[#0e8601] tabular-nums">
                                        {String(u.value).padStart(2, '0')}
                                    </p>
                                    <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{u.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHAT'S INSIDE ── */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[#0e8601] text-sm font-bold uppercase tracking-widest mb-3">What's Inside</p>
                        <h2 className="text-3xl font-bold text-[#021d49] mb-5">Everything You Need, Once a Month</h2>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-14">
                            The CAPCHA Monthly Digest synthesises the most important developments in climate and health so you stay informed without the noise.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                            {sections.map((s) => (
                                <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#0e8601]/30 hover:shadow-md transition-all">
                                    <span className="text-2xl mb-4 block">{s.icon}</span>
                                    <h3 className="font-bold text-[#021d49] mb-2 text-base">{s.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY SUBSCRIBE ── */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
                        {[
                            { icon: <Clock className="w-5 h-5" />, title: 'Save Time', desc: "We do the reading so you don't have to — only the most relevant updates, curated." },
                            { icon: <Globe className="w-5 h-5" />, title: 'Pan-African Coverage', desc: 'Research, policy, and events from across the entire African continent in one place.' },
                            { icon: <TrendingUp className="w-5 h-5" />, title: 'Stay Ahead', desc: 'Funding deadlines, calls for papers, and opportunities before they close.' },
                        ].map((item) => (
                            <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-4 items-start hover:border-[#0e8601]/20 hover:shadow-sm transition-all">
                                <div className="w-10 h-10 rounded-xl bg-[#0e8601] flex items-center justify-center text-white flex-shrink-0">
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

                {/* ── SUBSCRIBE FORM ── */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#0e8601]/10 flex items-center justify-center mx-auto mb-6">
                            <Newspaper className="w-7 h-7 text-[#0e8601]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#021d49] mb-3">Subscribe to the Digest</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">Join the list and receive the very first issue as soon as it's published.</p>

                        {submitted ? (
                            <div className="bg-[#0e8601]/5 border border-[#0e8601]/20 rounded-2xl py-8 px-8">
                                <CheckCircle className="w-10 h-10 text-[#0e8601] mx-auto mb-3" />
                                <p className="text-[#021d49] font-bold text-lg">Subscribed!</p>
                                <p className="text-gray-500 text-sm mt-2">You'll receive the first issue of the CAPCHA Monthly Digest as soon as it launches.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                                <input type="email" required placeholder="Enter your email address" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 focus:border-[#0e8601] transition text-sm" />
                                <button type="submit"
                                    className="bg-[#0e8601] hover:bg-[#0a6e01] text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                                    <Mail className="w-4 h-4" /> Subscribe Free
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

export default MonthlyDigestPage;