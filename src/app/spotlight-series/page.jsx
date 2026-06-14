'use client'
import React, { useState } from 'react';
import {
    Sparkles, ChevronRight, ArrowLeft, Clock, Calendar, Users,
    Search, FileText, X, BookOpen, Video, Mic, User2, Bell, Play,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

// ─── All Sessions ─────────────────────────────────────────────────────────────
// status: 'upcoming' | 'past'
const allSessions = [

    // ── Upcoming ──────────────────────────────────────────────────────────────
    {
        id: 's3',
        seriesNumber: 3,
        status: 'upcoming',
        title: 'Topic to Be Announced',
        description: 'Details for Series No. 3 will be published soon. Stay tuned for the topic, speakers, and registration link.',
        date: 'July 31, 2026',
        people: [],
        registrationUrl: null,
        youtubeId: null,
        evidenceBriefPdf: null,
        tags: [],
    },
    {
        id: 's2',
        seriesNumber: 2,
        status: 'upcoming',
        title: 'Topic to Be Announced',
        description: 'Full session details including topic, speakers, and registration will be shared closer to the date. Mark your calendar.',
        date: 'June 26, 2026',
        people: [],
        registrationUrl: null,
        youtubeId: null,
        evidenceBriefPdf: null,
        tags: [],
    },

    // ── Past ──────────────────────────────────────────────────────────────────
    {
        id: 's1',
        seriesNumber: 1,
        status: 'past',
        title: 'Who Owns Climate-Health Data in Africa?',
        description:
            'An exploration of data sovereignty, climate-health statistics, and the SOSCHI framework for embedding official climate-health surveillance into national health systems across Africa.',
        date: 'May 19, 2026',
        youtubeId: null, // ← Replace with YouTube video ID e.g. 'dQw4w9WgXcQ'
        people: [
            {
                name: 'Dr. Etse Yawo Dzakpa',
                role: 'Speaker',
                affiliation: 'African Institute for Mathematical Sciences, Rwanda',
                bio: 'Dr. Etse Yawo Dzakpa is a researcher at the African Institute for Mathematical Sciences (AIMS) in Rwanda. His work centres on climate-health data systems, statistical methods, and embedding official climate-health surveillance into national health frameworks across Africa. He is a key contributor to the SOSCHI framework, which seeks to institutionalise climate-health data collection within African national health systems.',
                image: null,
            },
            {
                name: 'Dr. Vijendra Ingole',
                role: 'Speaker',
                affiliation: 'Office for National Statistics, United Kingdom',
                bio: 'Dr. Vijendra Ingole works at the Office for National Statistics in the United Kingdom. He brings deep expertise in environmental epidemiology, climate-sensitive disease modelling, and cross-national climate-health statistics. His research explores how national statistical systems can better integrate climate and health data to support evidence-based policy.',
                image: null,
            },
        ],
        evidenceBriefPdf: '/document/CAPCHA Evidence brief.pdf',
        tags: ['Data Sovereignty', 'Climate-Health Statistics', 'SOSCHI', 'Africa'],
    },
];

// ─── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name, image, size = 'md' }) {
    const initials = name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase();
    const cls = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-24 h-24 text-3xl' }[size];
    if (image) return <img src={image} alt={name} className={`${cls} rounded-full object-cover flex-shrink-0`} />;
    return (
        <div className={`${cls} rounded-full bg-gradient-to-br from-[#021d49] to-[#0e8601] flex items-center justify-center text-white font-bold flex-shrink-0`}>
            {initials}
        </div>
    );
}

function SeriesBadge({ n }) {
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#021d49] text-white text-xs font-bold">
            
            Series No. {n}
        </span>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const SpotlightSeriesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [personModal, setPersonModal] = useState(null);

    const upcomingSessions = allSessions
        .filter(s => s.status === 'upcoming')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    const nextSession = upcomingSessions[0] ?? null;
    const laterSessions = upcomingSessions.slice(1);

    const pastSessions = allSessions
        .filter(s => s.status === 'past')
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredPast = pastSessions.filter(w =>
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

                {/* ═══════════════════════════════════════════
                    HERO — narrow, clean white
                ═══════════════════════════════════════════ */}
                <section className="pt-24 pb-8 px-4 border-b border-gray-100 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <nav className="flex items-center gap-1.5 text-gray-400 text-xs mb-5">
                            <Link href="/" className="hover:text-[#021d49] transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/CapacityEnhancementPage" className="hover:text-[#021d49] transition-colors">Capacity Enhancement</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#021d49] font-medium">Spotlight Series</span>
                        </nav>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-1.5 text-[#0e8601] text-xs font-bold uppercase tracking-widest mb-3">
                                                                        Climate &amp; Health Spotlight Series
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-[#021d49] leading-tight">
                                    CAPCHA <span className="text-[#ff9500]">Spotlight</span> Series
                                </h1>
                                <p className="text-gray-500 text-sm mt-2.5 max-w-lg leading-relaxed">
                                    A high-impact 90-minute monthly virtual series bridging African climate-health research and real-world policy.
                                </p>
                            </div>
                            <div className="flex-shrink-0 bg-gray-50 rounded-2xl border border-gray-100 px-5 py-3 flex flex-col gap-1.5 text-xs text-gray-500">
                                <span className="flex items-center gap-2 font-semibold text-[#021d49]">
                                    <Clock className="w-3.5 h-3.5 text-[#0e8601]" />
                                    Every Last Thursday
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-[#0e8601]" />
                                    2:00 – 3:30 PM EAT · 90 Minutes
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    UPCOMING SESSIONS
                ═══════════════════════════════════════════ */}
                {upcomingSessions.length > 0 && (
                    <section className="py-14 px-4 bg-white">
                        <div className="max-w-5xl mx-auto">

                            {/* Section label */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0e8601] opacity-60" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0e8601]" />
                                    </span>
                                    <p className="text-[#0e8601] text-xs font-bold uppercase tracking-widest">Upcoming Sessions</p>
                                </div>
                                <div className="flex-1 h-px bg-gray-100" />
                                <span className="text-xs text-gray-400 font-medium">{upcomingSessions.length} scheduled</span>
                            </div>

                            <div className="space-y-4">

                                {/* ── NEXT SESSION — featured ── */}
                                {nextSession && (
                                    <div className="relative rounded-2xl border border-[#0e8601]/20 bg-gradient-to-br from-white to-[#f0faf0] overflow-hidden shadow-sm">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0e8601] rounded-l-2xl" />

                                        <div className="pl-7 pr-6 py-6 flex flex-col lg:flex-row lg:items-center gap-6">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e8601] text-white text-xs font-bold">
                                                        <span className="relative flex h-1.5 w-1.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                                                        </span>
                                                        Next Up
                                                    </span>
                                                    <SeriesBadge n={nextSession.seriesNumber} />
                                                    <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                                                        <Calendar className="w-3.5 h-3.5 text-[#0e8601]" />
                                                        {nextSession.date}
                                                    </span>
                                                </div>

                                                <h2 className="text-2xl font-extrabold text-[#021d49] mb-2 leading-snug">
                                                    {nextSession.title === 'Topic to Be Announced'
                                                        ? <span className="italic text-gray-400 font-semibold text-xl">Topic to be announced</span>
                                                        : nextSession.title
                                                    }
                                                </h2>
                                                <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{nextSession.description}</p>

                                                {nextSession.people.length > 0 ? (
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {nextSession.people.map((p, i) => (
                                                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs">
                                                                <Avatar name={p.name} image={p.image} size="sm" />
                                                                <span className="font-medium text-[#021d49]">{p.name}</span>
                                                                <span className="text-gray-300">·</span>
                                                                <span className={p.role === 'Moderator' ? 'text-[#ff9500]' : 'text-[#0e8601]'}>{p.role}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                                                        <Users className="w-3.5 h-3.5" />
                                                        Speakers to be announced
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2 lg:w-44 flex-shrink-0">
                                                {nextSession.registrationUrl ? (
                                                    <a href={nextSession.registrationUrl} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0e8601] hover:bg-[#0a6e01] text-white text-sm font-bold transition-colors shadow-sm">
                                                        <Play className="w-4 h-4" /> Register Now
                                                    </a>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-500 text-sm font-medium">
                                                        <Bell className="w-4 h-4" /> Registration soon
                                                    </div>
                                                )}
                                                <p className="text-center text-xs text-gray-400">
                                                    <Clock className="w-3 h-3 inline mr-1" />2:00 – 3:30 PM EAT
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── LATER SESSIONS — compact grid ── */}
                                {laterSessions.length > 0 && (
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {laterSessions.map(session => (
                                            <div key={session.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex gap-3 items-start hover:border-gray-200 hover:bg-white transition-all">
                                                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm flex-shrink-0">
                                                    {session.seriesNumber}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-bold text-gray-500 mb-1">Series No. {session.seriesNumber}</p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                                                        <Calendar className="w-3 h-3 text-[#0e8601]" />
                                                        {session.date}
                                                    </p>
                                                    <p className="text-xs text-gray-400 italic">Topic TBA</p>
                                                </div>
                                                <span className="flex-shrink-0 text-xs bg-orange-50 text-orange-500 border border-orange-100 px-2 py-0.5 rounded-full font-medium">
                                                    Soon
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══════════════════════════════════════════
                    PAST SESSIONS — Archive
                ═══════════════════════════════════════════ */}
                <section className="py-14 px-4 bg-gray-50">
                    <div className="max-w-5xl mx-auto">

                        {/* Header + search */}
                        <div className="flex items-center gap-3 mb-7">
                            <p className="text-[#021d49] text-xs font-bold uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                                <BookOpen className="w-3.5 h-3.5" />
                                Session Archive
                            </p>
                            <div className="flex-1 h-px bg-gray-200" />
                            <div className="relative w-full max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search sessions..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#021d49]/20 bg-white text-xs"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <X className="w-3 h-3 text-gray-400" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {filteredPast.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                                <p className="text-sm font-semibold text-gray-400">No sessions match your search</p>
                                <button onClick={() => setSearchTerm('')} className="mt-2 text-xs text-[#0e8601] hover:underline">Clear search</button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredPast.map(session => (
                                    <div key={session.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                                        {/* Meta */}
                                        <div className="p-6 pb-5">
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <SeriesBadge n={session.seriesNumber} />
                                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                                    <Calendar className="w-3.5 h-3.5 text-[#0e8601]" />
                                                    {session.date}
                                                </span>
                                                <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-medium">
                                                    Past Session
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#021d49] mb-2 leading-snug">{session.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-4">{session.description}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {session.tags.map(tag => (
                                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#0e8601]/8 text-[#0e8601] font-medium border border-[#0e8601]/15">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* YouTube embed */}
                                        <div className="px-6 pb-5">
                                            {session.youtubeId ? (
                                                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-sm">
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${session.youtubeId}?rel=0`}
                                                        title={session.title}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-gray-50 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2">
                                                    <Video className="w-8 h-8 text-gray-200" />
                                                    <p className="text-sm font-medium text-gray-400">Recording coming soon</p>
                                                    <p className="text-xs text-gray-300">Video will appear here once uploaded</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Speakers & Moderator */}
                                        {session.people.length > 0 && (
                                            <div className="border-t border-gray-50 px-6 py-5">
                                                <p className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                    <Users className="w-3.5 h-3.5 text-[#0e8601]" />
                                                    Speakers &amp; Moderator
                                                </p>
                                                <div className="grid sm:grid-cols-2 gap-2">
                                                    {session.people.map((person, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setPersonModal(person)}
                                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-[#021d49]/20 hover:bg-[#021d49]/3 text-left transition-all group cursor-pointer"
                                                        >
                                                            <Avatar name={person.name} image={person.image} size="sm" />
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-xs font-semibold text-[#021d49] truncate">{person.name}</p>
                                                                <p className={`text-xs font-medium ${person.role === 'Moderator' ? 'text-[#ff9500]' : 'text-[#0e8601]'}`}>{person.role}</p>
                                                                <p className="text-xs text-gray-400 truncate">{person.affiliation}</p>
                                                            </div>
                                                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0e8601] flex-shrink-0 transition-colors" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action footer */}
                                        <div className="border-t border-gray-50 px-6 py-4 bg-gray-50/50 flex flex-wrap gap-2">
                                            {session.evidenceBriefPdf ? (
                                                <a href={session.evidenceBriefPdf} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#021d49] hover:bg-[#033080] text-white text-sm font-semibold transition-colors">
                                                    <FileText className="w-4 h-4" />
                                                    Review Evidence Brief
                                                </a>
                                            ) : (
                                                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-400 text-sm font-semibold cursor-not-allowed">
                                                    <FileText className="w-4 h-4" />
                                                    Evidence Brief
                                                    <span className="text-xs bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full">Soon</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    ABOUT THE SERIES
                ═══════════════════════════════════════════ */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[#0e8601] text-xs font-bold uppercase tracking-widest mb-3">About the Series</p>
                        <h2 className="text-2xl font-bold text-[#021d49] mb-4">More Than a Webinar — A Provocation</h2>
                        <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto mb-12">
                            Moving beyond traditional academic lectures, each session serves as a provocation for cross-sector dialogue — ensuring climate-health science is translated into actionable decision support, not just discussed in silos.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                            {features.map(f => (
                                <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#0e8601]/25 hover:shadow-sm transition-all">
                                    <span className="text-2xl mb-3 block">{f.icon}</span>
                                    <h3 className="font-bold text-[#021d49] mb-1.5 text-sm">{f.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SCHEDULE INFO
                ═══════════════════════════════════════════ */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
                        {[
                            { icon: <Calendar className="w-5 h-5" />, title: 'Monthly Sessions', desc: 'Every last Thursday of the month — mark your calendar and join us regularly.' },
                            { icon: <Clock className="w-5 h-5" />, title: '2:00 – 3:30 PM EAT', desc: '90 minutes of structured dialogue, live synthesis, and audience Q&A.' },
                            { icon: <Users className="w-5 h-5" />, title: 'Quarterly Cross-Hub', desc: 'Special cross-platform sessions every 3 months bringing together partner networks.' },
                        ].map(item => (
                            <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-start hover:border-[#021d49]/15 hover:shadow-sm transition-all">
                                <div className="w-9 h-9 rounded-xl bg-[#021d49] flex items-center justify-center text-white flex-shrink-0">
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

                {/* Back */}
                <div className="pb-12 text-center">
                    <Link href="/CapacityEnhancementPage"
                        className="inline-flex items-center gap-2 text-[#021d49] hover:text-[#0e8601] font-semibold transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Capacity Enhancement
                    </Link>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                PERSON BIO MODAL
            ═══════════════════════════════════════════════ */}
            {personModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setPersonModal(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex flex-col sm:flex-row">
                            {/* Left — image panel */}
                            <div className="sm:w-52 flex-shrink-0 bg-gradient-to-br from-[#021d49] to-[#0e8601] flex items-center justify-center p-10 sm:p-0 min-h-[180px]">
                                {personModal.image ? (
                                    <img src={personModal.image} alt={personModal.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-4xl font-bold">
                                        {personModal.name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Right — bio */}
                            <div className="flex-1 p-6 relative">
                                <button
                                    onClick={() => setPersonModal(null)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>

                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 ${
                                    personModal.role === 'Moderator' ? 'bg-[#ff9500]/10 text-[#ff9500]' : 'bg-[#0e8601]/10 text-[#0e8601]'
                                }`}>
                                    {personModal.role === 'Moderator' ? <Mic className="w-3 h-3" /> : <User2 className="w-3 h-3" />}
                                    {personModal.role}
                                </span>

                                <h3 className="text-xl font-bold text-[#021d49] mb-1 pr-10 leading-snug">{personModal.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">{personModal.affiliation}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{personModal.bio || 'Bio coming soon.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default SpotlightSeriesPage;
