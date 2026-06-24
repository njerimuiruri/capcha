'use client'
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Video, ArrowRight, Users, Search } from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const EVENTS = [
    {
        id: 5,
        category: 'Conferences',
        title: 'CAPCHA Community Engagement & Networking Event',
        description: 'A dedicated in-person gathering of CAPCHA partners, researchers, policymakers, and practitioners to share progress, strengthen cross-sector collaboration, and advance the climate-health agenda across Africa.',
        date: '2025',
        time: '',
        location: 'Nairobi, Kenya',
        image: '/img/capchaevent.jpeg',
        speakers: 0,
    },
    {
        id: 1,
        category: 'Webinars',
        title: 'Pan-African Conference on Environment, Climate Change and Health: Science to Policy — Webinar Launch',
        description: 'Official launch webinar featuring high-level panel discussions with leading experts, researchers, and policymakers addressing critical environmental and health challenges across Africa.',
        date: 'August 1, 2025',
        time: '02:00 – 04:00 PM EAT',
        location: 'Zoom (Virtual Event)',
        image: '/img/pan_african_conference_on_environment__climate_change_and_health__science_to_policy___webinar_launch_poster.jpg',
        speakers: 7,
        websiteLink: 'https://pan-africanconference.com/',
    },
    {
        id: 2,
        category: 'Conferences',
        title: 'Pan-African Conference on Environment, Climate Change and Health: Science to Policy',
        description: 'Harnessing Science, Policy, and Partnerships for Environmental Sustainability and Climate-Health Resilience. A premier conference bringing together researchers, policymakers, and practitioners across Africa.',
        date: 'October 21–24, 2025',
        time: '4 Days Conference',
        location: 'Emara Ole Sereni Convention Center – Nairobi, Kenya',
        image: '/img/conference-poster.jpg',
        speakers: 0,
        websiteLink: 'https://pan-africanconference.com/',
    },
    {
        id: 3,
        category: 'Conferences',
        title: 'ARIN 4th Annual International Conference 2024',
        description: 'Bridging Knowledge Gaps: Promoting Transdisciplinary Research for Climate and Health Resilience. Bringing together scholars, policymakers, and practitioners from across the globe.',
        date: 'November 6–8, 2024',
        time: '3 Days Virtual Event',
        location: 'Virtual Conference Platform',
        image: '/img/conf3.jpg',
        speakers: 3,
        recordingLink: '/ArinConference',
    },
    {
        id: 4,
        category: 'Webinars',
        title: 'Consultative Platform on Climate and Health in Africa (CAPCHA) Launch',
        description: 'Launch of the Consultative Platform on Climate and Health in Africa, introducing its mission to nurture transdisciplinary science-policy engagements towards resilient and low-carbon health systems.',
        date: 'August 28, 2024',
        time: '2:00 – 4:00 PM EAT',
        location: 'Live Webinar',
        image: '/img/chac.jpeg',
        speakers: 6,
        recordingLink: '/ArinConference',
    },
];

const CATEGORIES = ['All', 'Conferences', 'Webinars'];

const categoryColors = {
    Conferences: '#021d49',
    Webinars:    '#0e8601',
};

const ConferencesEventsPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        return EVENTS.filter(ev => {
            const matchCat = activeCategory === 'All' || ev.category === activeCategory;
            const q = query.toLowerCase();
            const matchSearch = !q ||
                ev.title.toLowerCase().includes(q) ||
                ev.description.toLowerCase().includes(q) ||
                ev.location.toLowerCase().includes(q) ||
                ev.date.toLowerCase().includes(q);
            return matchCat && matchSearch;
        });
    }, [activeCategory, query]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Search + category row */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#021d49] transition-colors"
                            />
                        </div>

                        {/* Category tabs */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all border ${
                                        activeCategory === cat
                                            ? 'bg-[#021d49] text-white border-[#021d49]'
                                            : 'bg-white text-[#021d49] border-gray-200 hover:border-[#021d49]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Count */}
                    <p className="text-xs text-gray-400 mb-5">
                        Showing <span className="font-semibold text-[#021d49]">{filtered.length}</span> {filtered.length === 1 ? 'event' : 'events'}
                    </p>

                    {/* Grid */}
                    {filtered.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.map(ev => (
                                <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">

                                    {/* Image */}
                                    <div className="relative h-48 w-full flex-shrink-0">
                                        <Image
                                            src={ev.image}
                                            alt={ev.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                        <span
                                            className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                                            style={{ backgroundColor: categoryColors[ev.category] || '#021d49' }}
                                        >
                                            {ev.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-[#021d49] text-sm leading-snug mb-2 line-clamp-2">{ev.title}</h3>
                                            <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{ev.description}</p>

                                            <div className="space-y-1.5 mb-4">
                                                <p className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <Calendar className="w-3.5 h-3.5 text-[#0e8601] flex-shrink-0" />
                                                    {ev.date}{ev.time ? ` · ${ev.time}` : ''}
                                                </p>
                                                <p className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <MapPin className="w-3.5 h-3.5 text-[#0e8601] flex-shrink-0" />
                                                    {ev.location}
                                                </p>
                                                {ev.speakers > 0 && (
                                                    <p className="flex items-center gap-1.5 text-xs text-gray-400">
                                                        <Users className="w-3.5 h-3.5 text-[#0e8601] flex-shrink-0" />
                                                        {ev.speakers} Speakers
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {ev.recordingLink && (
                                                <Link href={ev.recordingLink}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#021d49] text-white px-3 py-2 rounded-full hover:bg-[#033080] transition-colors">
                                                    <Video className="w-3.5 h-3.5" />
                                                    Watch Recording
                                                </Link>
                                            )}
                                            {ev.websiteLink && (
                                                <a href={ev.websiteLink} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold border border-gray-200 text-[#021d49] px-3 py-2 rounded-full hover:border-[#021d49] transition-colors">
                                                    Visit Website <ArrowRight className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="font-semibold">No events found</p>
                            <p className="text-sm mt-1">Try a different search term or category</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ConferencesEventsPage;
