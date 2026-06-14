'use client';
import React from 'react';
import Link from 'next/link';
import { Play, ChevronRight, Sparkles } from 'lucide-react';

const VIDEOS = [
    {
        youtubeId: null,
        title: 'Spotlight Series 1 — Climate Burden in Africa',
        desc: 'Dr. Etse Yawo Dzakpa & Dr. Vijendra Ingole explore heat stress, productivity loss, and evidence-based solutions across the continent.',
        date: 'May 19, 2026',
    },
    {
        youtubeId: null,
        title: 'CAPCHA Overview — Mission & Vision',
        desc: 'An introduction to the Consultative Platform on Climate and Health in Africa and its cross-continental research agenda.',
        date: 'Coming soon',
    },
    {
        youtubeId: null,
        title: 'Spotlight Series 2 — Policy Pathways',
        desc: 'Expert dialogue on translating climate-health evidence into actionable policy at national and regional levels across Africa.',
        date: 'June 26, 2026',
    },
];

const VideoCard = ({ video }) => {
    if (video.youtubeId) {
        return (
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white group hover:shadow-lg transition-all">
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="p-4">
                    <p className="text-xs text-[#0e8601] font-bold mb-1">{video.date}</p>
                    <h3 className="text-sm font-bold text-[#021d49] leading-snug">{video.title}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white group hover:shadow-lg transition-all flex flex-col">
            {/* Placeholder thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-[#021d49] to-[#033080] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm relative z-10">
                    <Play className="w-6 h-6 text-white ml-1" />
                </div>
                <p className="text-white/60 text-xs font-medium relative z-10">Video Coming Soon</p>
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-[#0e8601] font-bold mb-1">{video.date}</p>
                <h3 className="text-sm font-bold text-[#021d49] leading-snug mb-2">{video.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{video.desc}</p>
            </div>
        </div>
    );
};

const VideoSection = () => (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-[#0e8601] text-xs font-bold uppercase tracking-widest mb-2">
                                                Watch & Learn
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#021d49]">Featured Videos</h2>
                    <p className="text-gray-400 text-sm mt-1.5">Expert conversations on climate change and health in Africa</p>
                </div>
                <Link href="/visual-story"
                    className="inline-flex items-center gap-2 text-[#021d49] hover:text-[#0e8601] font-semibold text-sm transition-colors group whitespace-nowrap">
                    View more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {/* Video grid */}
            <div className="grid md:grid-cols-3 gap-5">
                {VIDEOS.map((v, i) => <VideoCard key={i} video={v} />)}
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
                <Link href="/visual-story"
                    className="inline-flex items-center gap-2.5 bg-[#021d49] hover:bg-[#033080] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all">
                    <Play className="w-4 h-4" />
                    Explore Visual Story
                </Link>
            </div>
        </div>
    </section>
);

export default VideoSection;
