'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogs';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

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
                            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/20"></div>
                        </div>
                    ))}
                </div>

                <div className="relative z-10 h-[95vh] flex flex-col" style={{paddingTop: '9rem', paddingBottom: '7rem'}}>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up hover:scale-[1.02] transition-transform duration-500 cursor-default" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                                    Consultative Platform On{' '}
                                    <span className="text-transparent bg-gradient-to-r from-[#55bdd0] to-[#0e8601] bg-clip-text" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }}>
                                        Climate And Health in Africa
                                    </span>
                                </h1>
                                <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up animation-delay-300 hover:text-gray-100 transition-colors duration-300 cursor-default drop-shadow-md">
                                    Building a transdisciplinary community of practice towards enhanced decision support environment on Climate and Health (C & H) research and policy in Africa
                                </p>
                                {/* <Link href="/ContactPage"
                                    className="bg-[#ff9500] hover:bg-[#e6850e] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-600 hover:shadow-[#ff9500]/25">
                                    Join us
                                </Link> */}

                                {/* Latest article teaser */}
                                <Link href={`/BlogsPage/${blogPosts[blogPosts.length - 1].id}`}
                                    className="group mt-6 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3.5 hover:bg-white/15 transition-all duration-300 max-w-sm animate-fade-in-up"
                                    style={{ animationDelay: '0.9s', opacity: 0 }}>
                                    <span className="w-1 h-10 bg-[#ff9500] rounded-full flex-shrink-0" />
                                    <div className="min-w-0">
                                        <span className="text-[#ff9500] text-[10px] font-bold uppercase tracking-widest block mb-0.5">Latest Article</span>
                                        <p className="text-white text-sm font-semibold line-clamp-1 leading-snug">{blogPosts[blogPosts.length - 1].title}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#ff9500] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                                </Link>

                                {/* Upcoming Event teaser */}
                                <Link href="/conferences-events"
                                    className="group mt-3 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 max-w-sm animate-fade-in-up"
                                    style={{ animationDelay: '1.1s', opacity: 0 }}>
                                    <div className="relative w-16 h-12 flex-shrink-0">
                                        <Image src="/img/capchaevent.jpeg" alt="CAPCHA Event" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                                    </div>
                                    <div className="min-w-0 py-2">
                                        <span className="text-[#ff9500] text-[10px] font-bold uppercase tracking-widest block mb-0.5">Upcoming Event</span>
                                        <p className="text-white text-sm font-semibold line-clamp-1 leading-snug">Pan-African Conference · Oct 2025</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#ff9500] group-hover:translate-x-1 transition-all flex-shrink-0 mr-4" />
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