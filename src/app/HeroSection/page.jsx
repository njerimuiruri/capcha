'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Heart, Sparkles, Newspaper, Link2, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeNew, setActiveNew] = useState(0);

    const slides = [
        { id: 1, video: "/videos/vegetation1.mp4", alt: "Health research video" },
        { id: 2, video: "/videos/plantation2.mp4", alt: "Climate change video" },
        { id: 3, video: "/videos/flowingwater.mp4", alt: "African health initiatives video" },
        { id: 4, video: "/videos/healthvideo.mp4", alt: "Environmental health video" }
    ];

    const actionCards = [
        { icon: <Users className="w-8 h-8" />, title: "Research and Innovation", href: "/Research" },
        { icon: <Heart className="w-8 h-8" />, title: "Policy and Advocacy", href: "/PolicyAdvocacyPage" },
        { icon: <Heart className="w-8 h-8" />, title: "Capacity Enhancement", href: "/CapacityEnhancementPage" }
    ];

    const newInitiatives = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            tag: "OPEN · 2026 Call",
            title: "CAPCHA Spotlight Series",
            desc: "90-minute monthly virtual sessions bridging African climate-health research and real-world policy. Every last Thursday, 2:00–3:30 PM EAT.",
            href: "/spotlight-series",
            applyHref: "https://ee.kobotoolbox.org/single/b5423b283351f3f61595a92a17a66e00",
            applyLabel: "Apply as Presenter / Moderator →",
            accentBg: "bg-[#ff9500]",
            accentHover: "hover:bg-[#e6850e]",
            tagBg: "bg-[#ff9500]/10 text-[#c97000]",
            topBar: "bg-[#ff9500]",
            cardBorder: "border-[#ff9500]/40",
            iconRing: "ring-[#ff9500]/20",
        },
        {
            icon: <Link2 className="w-6 h-6" />,
            tag: "OPEN · Join Now",
            title: "CAPCHA Connect",
            desc: "A pan-African networking platform connecting climate-health researchers, policymakers, and practitioners for collaboration and mentorship.",
            href: "/connect",
            applyHref: "https://ee.kobotoolbox.org/single/81f9beab8ea9a72662b5c429f732f7f3",
            applyLabel: "Register for CAPCHA Connect →",
            accentBg: "bg-[#021d49]",
            accentHover: "hover:bg-[#03337a]",
            tagBg: "bg-[#021d49]/10 text-[#021d49]",
            topBar: "bg-[#021d49]",
            cardBorder: "border-[#021d49]/30",
            iconRing: "ring-[#021d49]/15",
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            tag: "OPEN · Enrol Now",
            title: "Learning Curve",
            desc: "A structured learning programme for Africa's next generation of climate-health researchers — building skills, knowledge, and networks.",
            href: "https://ee.kobotoolbox.org/single/5b3703edf1a128aa20c66dff2fadd84f",
            applyHref: "https://ee.kobotoolbox.org/single/5b3703edf1a128aa20c66dff2fadd84f",
            applyLabel: "Enrol in Learning Curve →",
            accentBg: "bg-[#0e8601]",
            accentHover: "hover:bg-[#0a6e01]",
            tagBg: "bg-[#0e8601]/10 text-[#0a6e01]",
            topBar: "bg-[#0e8601]",
            cardBorder: "border-[#0e8601]/30",
            iconRing: "ring-[#0e8601]/20",
        },
        {
            icon: <Newspaper className="w-6 h-6" />,
            tag: "NEW · Monthly Publication",
            title: "CAPCHA Monthly Digest",
            desc: "Your curated monthly briefing on the latest climate-health research, policy updates, funding opportunities, and events from across Africa.",
            href: "/monthly-digest",
            applyHref: null,
            applyLabel: null,
            accentBg: "bg-[#55bdd0]",
            accentHover: "hover:bg-[#3aaecc]",
            tagBg: "bg-[#55bdd0]/10 text-[#2090a8]",
            topBar: "bg-[#55bdd0]",
            cardBorder: "border-[#55bdd0]/20",
            iconRing: "ring-[#55bdd0]/20",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Auto-rotate the new initiatives cards
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNew((prev) => (prev + 1) % newInitiatives.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    const goToSlide = (index) => setCurrentSlide(index);

    return (
        <div className="relative">
            {/* ── VIDEO HERO ─────────────────────────────────────────── */}
            <div className="relative h-[95vh] overflow-hidden">
                <div className="absolute inset-0">
                    {slides.map((slide, index) => (
                        <div key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                            <video src={slide.video} autoPlay muted loop playsInline
                                className="w-full h-full object-cover"
                                style={{ display: index === currentSlide ? 'block' : 'none' }}>
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
                        </div>
                    ))}
                </div>

                <div className="relative z-10 h-[95vh] flex flex-col">
                    <div className="flex-1 flex items-end pb-32">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="max-w-3xl mb-16">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up hover:scale-[1.02] transition-transform duration-500 cursor-default drop-shadow-lg">
                                    Consultative Platform On{' '}
                                    <span className="text-transparent bg-gradient-to-r from-[#55bdd0] to-[#0e8601] bg-clip-text drop-shadow-lg">
                                        Climate And Health in Africa
                                    </span>
                                </h1>
                                <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up animation-delay-300 hover:text-gray-100 transition-colors duration-300 cursor-default drop-shadow-md">
                                    Building a transdisciplinary community of practice towards enhanced decision support environment on Climate and Health (C & H) research and policy in Africa
                                </p>
                                <Link href="/ContactPage"
                                    className="bg-[#ff9500] hover:bg-[#e6850e] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-600 hover:shadow-[#ff9500]/25">
                                    Join us
                                </Link>
                            </div>
                        </div>

                        {/* Slide nav */}
                        <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6 z-20">
                            <button onClick={prevSlide}
                                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <button onClick={nextSlide}
                                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                            <div className="flex flex-col space-y-3 mt-4">
                                {slides.map((slide, index) => (
                                    <button key={index} onClick={() => goToSlide(index)}
                                        className={`w-16 h-16 rounded-full border-2 overflow-hidden transition-all duration-300 relative ${index === currentSlide ? 'border-[#ff9500] scale-110' : 'border-white/40 hover:border-white/60 hover:scale-105'}`}>
                                        <video src={slide.video} muted className="w-full h-full object-cover" style={{ pointerEvents: 'none' }} />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── OPEN CALLS ANNOUNCEMENT STRIP ─────────────────────── */}
            <div className="relative z-40 bg-gradient-to-r from-[#021d49] via-[#0e4a8c] to-[#021d49] border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9500] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff9500]"></span>
                        </span>
                        <span className="text-white font-bold text-xs uppercase tracking-widest">Applications Now Open</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <a href="https://ee.kobotoolbox.org/single/b5423b283351f3f61595a92a17a66e00"
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-[#ff9500] hover:bg-[#e6850e] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                            <Sparkles className="w-3 h-3" /> Spotlight Series 2026
                        </a>
                        <a href="https://ee.kobotoolbox.org/single/81f9beab8ea9a72662b5c429f732f7f3"
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 transition-colors">
                            <Link2 className="w-3 h-3" /> CAPCHA Connect
                        </a>
                        <a href="https://ee.kobotoolbox.org/single/5b3703edf1a128aa20c66dff2fadd84f"
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-[#0e8601] hover:bg-[#0a6e01] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                            <BookOpen className="w-3 h-3" /> Learning Curve
                        </a>
                    </div>
                </div>
            </div>

            {/* ── CAPCHA ACTIVITIES ──────────────────────────────────── */}
            <div className="relative z-30 -mt-24">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center">
                        <div className="relative bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full animate-slide-up">
                            <div className="text-center pt-8 pb-4">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    <span className="text-transparent bg-gradient-to-r from-[#55bdd0] to-[#0e8601] bg-clip-text">
                                        CAPCHA Activities
                                    </span>
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#55bdd0] to-[#0e8601] mx-auto rounded-full"></div>
                            </div>

                            {/* Decorative blobs */}
                            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-25 pointer-events-none overflow-hidden">
                                <svg viewBox="0 0 200 200" className="w-full h-full text-green-500/40">
                                    <rect x="90" y="160" width="20" height="40" fill="rgb(139, 69, 19)" opacity="0.8" />
                                    <ellipse cx="100" cy="140" rx="35" ry="25" fill="currentColor" />
                                    <ellipse cx="100" cy="120" rx="40" ry="30" fill="currentColor" />
                                    <ellipse cx="100" cy="100" rx="45" ry="35" fill="currentColor" />
                                    <ellipse cx="100" cy="80" rx="35" ry="25" fill="currentColor" />
                                </svg>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 relative z-10">
                                {actionCards.map((card, index) => (
                                    <div key={index} className="relative group">
                                        {index < actionCards.length - 1 && (
                                            <div className="hidden md:block absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                                        )}
                                        <Link href={card.href} className="block">
                                            <div className="p-12 hover:bg-white/5 transition-all duration-300 cursor-pointer">
                                                <div className="flex flex-col items-center text-center space-y-6">
                                                    <div className="w-20 h-20 bg-gradient-to-br from-[#ff9500] to-[#ff9500]/80 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                        {React.cloneElement(card.icon, { className: "w-10 h-10" })}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-[#ff9500] transition-colors duration-300">{card.title}</h3>
                                                        <div className="flex items-center justify-center space-x-2 text-[#ff9500] font-semibold text-lg group-hover:text-[#ffb366] transition-colors duration-300">
                                                            <span>Learn More</span>
                                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── NEW INITIATIVES SECTION ────────────────────────────── */}
            <div className="bg-white py-20 px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            {/* Blinking NEW badge */}
                            <div className="inline-flex items-center gap-2 bg-[#0e8601]/10 border border-[#0e8601]/30 text-[#0e8601] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#0e8601] animate-pulse inline-block"></span>
                                Just Added
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#021d49] leading-tight">
                                New CAPCHA Initiatives
                            </h2>
                            <p className="text-gray-500 mt-3 max-w-xl leading-relaxed">
                                Expanding how we connect, inform, and empower Africa's climate-health community — three new programmes launching soon.
                            </p>
                        </div>
                        <Link href="/CapacityEnhancementPage"
                            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#021d49] border border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601] px-5 py-2.5 rounded-xl transition-all duration-200">
                            View All Programmes <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Cards grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newInitiatives.map((item, index) => (
                            <div key={index}
                                className={`group bg-white rounded-2xl border-2 ${item.cardBorder} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden`}>

                                {/* Solid top colour bar */}
                                <div className={`h-2 w-full ${item.topBar}`} />

                                <div className="p-6 flex flex-col flex-1">
                                    {/* Tag pill */}
                                    <span className={`inline-flex items-center gap-1.5 self-start text-xs font-bold px-3 py-1 rounded-full mb-4 ${item.tagBg}`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                        {item.tag}
                                    </span>

                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-xl ${item.accentBg} ring-4 ${item.iconRing} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {item.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[16px] font-bold text-[#021d49] mb-2 leading-snug">{item.title}</h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{item.desc}</p>

                                    {/* Apply CTA — prominent if open call */}
                                    {item.applyHref && (
                                        <a href={item.applyHref} target="_blank" rel="noopener noreferrer"
                                            className={`inline-flex items-center justify-center gap-2 text-sm font-bold text-white py-2.5 px-4 rounded-xl transition-colors duration-200 mb-2 ${item.accentBg} ${item.accentHover}`}>
                                            {item.applyLabel}
                                        </a>
                                    )}

                                    {/* Learn More secondary link */}
                                    {!item.applyHref && (
                                        <Link href={item.href}
                                            className={`inline-flex items-center justify-center gap-2 text-sm font-semibold text-white py-2.5 px-5 rounded-xl transition-colors duration-200 ${item.accentBg} ${item.accentHover}`}>
                                            Learn More
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    )}
                                    {item.applyHref && (
                                        <Link href={item.href}
                                            className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-gray-400 hover:text-[#021d49] py-1 transition-colors duration-200">
                                            Learn more <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dot indicators for mobile auto-rotate feel */}
                    <div className="flex justify-center gap-2 mt-8 md:hidden">
                        {newInitiatives.map((_, i) => (
                            <button key={i} onClick={() => setActiveNew(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeNew === i ? 'bg-[#0e8601] w-6' : 'bg-gray-300'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(60px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                .animate-slide-up { animation: slide-up 1s ease-out forwards; animation-delay: 1s; opacity: 0; }
                .animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
                .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
            `}</style>
        </div>
    );
};

export default HeroSection;