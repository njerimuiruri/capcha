'use client'
import React from 'react';
import { ChevronRight, Play, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const GALLERY = [
    { src: '/img/conf1.jpg',   alt: 'CAPCHA Conference 1' },
    { src: '/img/conf2.jpg',   alt: 'CAPCHA Conference 2' },
    { src: '/img/conf3.jpg',   alt: 'CAPCHA Conference 3' },
    { src: '/img/conf4.jpg',   alt: 'CAPCHA Conference 4' },
    { src: '/img/conf5.jpg',   alt: 'CAPCHA Conference 5' },
    { src: '/img/conf6.jpg',   alt: 'CAPCHA Conference 6' },
    { src: '/img/conf7.jpg',   alt: 'CAPCHA Conference 7' },
    { src: '/img/conf8.jpg',   alt: 'CAPCHA Conference 8' },
    { src: '/img/conf9.jpg',   alt: 'CAPCHA Conference 9' },
    { src: '/img/webiner.jpeg', alt: 'CAPCHA Webinar' },
    { src: '/img/chac.jpeg',   alt: 'CHAC Event' },
    { src: '/img/con1-5.jpeg', alt: 'CAPCHA Consultation' },
];

const VisualStoryPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-20">

                {/* ── PHOTO GALLERY ────────────────────────────────── */}
                <section className="py-14 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                            {GALLERY.map((img, i) => (
                                <div key={i} className="break-inside-avoid rounded-xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-lg transition-all">
                                    <div className="relative w-full overflow-hidden bg-gray-100"
                                        style={{ paddingBottom: i % 3 === 0 ? '75%' : i % 3 === 1 ? '60%' : '80%' }}>
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── MAP ──────────────────────────────────────────── */}
                <section className="py-14 px-4 bg-gray-50">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm aspect-video flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#021d49] flex items-center justify-center">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <Link href="/Connect"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#021d49] hover:bg-[#033080] text-white text-sm font-semibold transition-colors">
                                Open CAPCHA Connect
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── WATCH SESSIONS ───────────────────────────────── */}
                <section className="py-14 px-4 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden bg-[#021d49] shadow-xl">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                            <div className="relative p-10 text-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-5">
                                    <Play className="w-7 h-7 text-white ml-1" />
                                </div>
                                <Link href="/spotlight-series"
                                    className="inline-flex items-center gap-2.5 bg-[#0e8601] hover:bg-[#0a6e01] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    <Sparkles className="w-4 h-4" />
                                    View Spotlight Series
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};

export default VisualStoryPage;
