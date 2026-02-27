'use client'
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Monitor,
    Calendar,
    Clock,
    Users,
    Play,
    ArrowRight,
    Globe,
    ChevronRight,
    Search,
    Filter
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

// Sample webinar data — replace images/videos with real assets
const webinars = [
    {
        id: 1,
        slug: 'climate-health-nexus-africa',
        title: 'The Climate-Health Nexus in Africa: Understanding the Risks',
        description:
            'An in-depth exploration of how rising temperatures, extreme weather events, and shifting disease vectors are reshaping public health across Sub-Saharan Africa. Experts from across the continent share research findings and policy implications.',
        date: 'March 15, 2024',
        duration: '90 minutes',
        speakers: ['Dr. Amina Osei', 'Prof. James Kariuki', 'Dr. Fatima Diallo'],
        category: 'Research',
        poster: '/images/webinar1-poster.jpg',   // replace with real image path
        video: '/videos/webinar1.mp4',            // replace with real video path
        tags: ['Climate Change', 'Public Health', 'Africa'],
        attendees: 320,
        status: 'Recorded',
    },
    {
        id: 2,
        slug: 'vector-borne-diseases-climate',
        title: 'Vector-Borne Diseases and Climate Variability: New Frontiers',
        description:
            'This webinar examines the relationship between climate variability and the spread of vector-borne diseases such as malaria and dengue. Leading epidemiologists present cutting-edge modelling tools and community-level adaptation strategies.',
        date: 'May 8, 2024',
        duration: '75 minutes',
        speakers: ['Dr. Kwame Asante', 'Dr. Ngozi Adeyemi'],
        category: 'Epidemiology',
        poster: '/images/webinar2-poster.jpg',
        video: '/videos/webinar2.mp4',
        tags: ['Malaria', 'Dengue', 'Epidemiology', 'Modelling'],
        attendees: 275,
        status: 'Recorded',
    },
];

const categoryColors = {
    Research: 'from-indigo-500 to-blue-600',
    Epidemiology: 'from-teal-500 to-green-600',
    Policy: 'from-orange-500 to-red-600',
};

const WebinarsPage = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...Array.from(new Set(webinars.map((w) => w.category)))];

    const filtered = webinars.filter((w) => {
        const matchesSearch =
            w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || w.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                {/* Hero */}
                <section className="relative mt-32 py-24 px-4 bg-gradient-to-br from-[#021d49] via-[#03337a] to-[#0e8601] overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px),
                                             radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }}
                    />
                    <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                        <Badge className="mb-6 bg-white/10 text-white border-white/20 text-sm px-4 py-2">
                            <Monitor className="w-4 h-4 mr-2 inline" />
                            Capacity Enhancement · Webinars
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            CAPCHA Webinar Series
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                            Expert-led online sessions exploring the intersections of climate change and public health across Africa. Watch recordings or register for upcoming events.
                        </p>
                        {/* Breadcrumb */}
                        <nav className="flex items-center justify-center gap-2 text-blue-200 text-sm">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href="/CapacityEnhancementPage" className="hover:text-white transition-colors">Capacity Enhancement</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white font-medium">Webinars</span>
                        </nav>
                    </div>
                </section>

                {/* Stats bar */}


                {/* Filters */}
                <section className="py-10 px-4 bg-gray-50 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search webinars..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0e8601]/40 focus:border-[#0e8601] transition"
                            />
                        </div>

                        {/* Category tabs */}
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                        ? 'bg-[#0e8601] text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Webinar Cards */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        {filtered.length === 0 ? (
                            <div className="text-center py-24 text-gray-400">
                                <Monitor className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                <p className="text-xl">No webinars found matching your search.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-10">
                                {filtered.map((webinar) => (
                                    <WebinarCard key={webinar.id} webinar={webinar} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

const WebinarCard = ({ webinar }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={`/Webinars/${webinar.slug}`}>
            <Card
                className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white rounded-2xl"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Poster / Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#021d49] to-[#0e8601]">
                    {webinar.poster ? (
                        <img
                            src={webinar.poster}
                            alt={webinar.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    ) : null}

                    {/* Overlay play button */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                            <Play className="w-7 h-7 text-[#021d49] ml-1" />
                        </div>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${webinar.status === 'Recorded'
                            ? 'bg-[#0e8601] text-white'
                            : 'bg-orange-500 text-white'
                            }`}>
                            {webinar.status}
                        </span>
                    </div>

                    {/* Category */}
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                            {webinar.category}
                        </span>
                    </div>
                </div>

                <CardContent className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {webinar.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-[#0e8601] bg-[#0e8601]/10 px-2 py-1 rounded-md font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-[#021d49] mb-3 group-hover:text-[#0e8601] transition-colors leading-snug">
                        {webinar.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {webinar.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-5">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#0e8601]" />
                            {webinar.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#0e8601]" />
                            {webinar.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-[#0e8601]" />
                            {webinar.attendees} attendees
                        </span>
                    </div>

                    {/* Speakers */}
                    <div className="flex items-center gap-2 mb-5">
                        <div className="flex -space-x-2">
                            {webinar.speakers.slice(0, 3).map((speaker, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#021d49] to-[#0e8601] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                    {speaker.charAt(speaker.lastIndexOf(' ') + 1)}
                                </div>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">
                            {webinar.speakers.slice(0, 2).join(', ')}
                            {webinar.speakers.length > 2 && ` +${webinar.speakers.length - 2} more`}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-sm font-semibold text-[#0e8601]">
                            {webinar.status === 'Recorded' ? 'Watch Recording' : 'Register Now'}
                        </span>
                        <ArrowRight className="w-5 h-5 text-[#0e8601] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default WebinarsPage;