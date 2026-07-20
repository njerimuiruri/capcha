'use client'
import React, { useState, useMemo } from 'react';
import {
    ChevronRight, Search, X, FileText, BookOpen, ScrollText,
    Newspaper, GraduationCap, ExternalLink, Calendar, Users,
    ArrowLeft, Sparkles, Filter,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

// ─── Publication data ──────────────────────────────────────────────────────────
// Add real publications here. categories: 'journal' | 'policy' | 'working' | 'report' | 'conference'
const publications = [
    // ── Journal Articles ──────────────────────────────────────────────────────
    {
        id: 'j1',
        category: 'journal',
        title: 'Climate-Health Data Sovereignty in Sub-Saharan Africa: A Framework Analysis',
        authors: ['Dr. Etse Yawo Dzakpa', 'Dr. Vijendra Ingole'],
        year: 2026,
        journal: 'Climate and Health Research',
        volume: 'Vol. 3, No. 1',
        tags: ['Data Sovereignty', 'Climate-Health', 'Africa', 'SOSCHI'],
        abstract: 'This paper examines the conceptual and operational dimensions of climate-health data sovereignty in sub-Saharan Africa, introducing the SOSCHI framework as a tool for embedding climate-health surveillance into national health information systems.',
        pdfUrl: null,
        doiUrl: null,
    },
    // ── Policy Briefs ─────────────────────────────────────────────────────────
    {
        id: 'p1',
        category: 'policy',
        title: 'Who Owns the Data That Could Save African Lives?',
        authors: ['CAPCHA Research Team'],
        year: 2026,
        journal: 'CAPCHA Evidence Brief',
        volume: 'Issue 1',
        tags: ['Data Governance', 'Policy', 'Africa'],
        abstract: 'This evidence brief explores questions of data ownership and governance in climate-health contexts across Africa, drawing on the findings of the first CAPCHA Spotlight Series session.',
        pdfUrl: '/document/CAPCHA Evidence brief.pdf',
        doiUrl: null,
    },
     {
        id: 'p2',
        category: 'policy',
        title: 'When Evidence Exists but Policy Doesn’t Move.',
        authors: ['CAPCHA Research Team'],
        year: 2026,
        journal: 'CAPCHA Evidence Brief',
        volume: 'Issue 2',
        tags: ['Data Governance', 'Policy', 'Africa'],
        // abstract: 'This evidence brief explores questions of data ownership and governance in climate-health contexts across Africa, drawing on the findings of the first CAPCHA Spotlight Series session.',
abstract:'Africa  has  no  shortage  of  climate–health  evidence.  Research  institutions, practitioners, and regional initiatives continue to generate knowledge that can inform policy, while continental bodies are strengthening climate and health  action.  Yet  despite  this  growing  evidence  base,  policy  uptake  and implementation remain slow. The challenge is no longer producing more evidence, but understanding why existing evidence so often fails to reach and  influence  policy  and  decision-making.  The  bottleneck  lies  in governance:  the  systems,  institutions,  and  processes  that  determine  how evidence moves into decisions, financing, and implementation.'
        ,pdfUrl: '/document/CAPCHAEvidencebriefNo.2.pdf',
        doiUrl: null,
    },
    {
        id: 'p3',
        category: 'policy',
        title: 'Financing Climate Health Without the Traditional Donor Funding',
        authors: ['CAPCHA Research Team'],
        year: 2026,
        journal: 'CAPCHA Evidence Brief',
        volume: 'Issue 3',
        tags: ['Data Governance', 'Policy', 'Africa'],
        // abstract: 'This evidence brief explores questions of data ownership and governance in climate-health contexts across Africa, drawing on the findings of the first CAPCHA Spotlight Series session.',
       abstract:'Climate  change  is  increasingly  straining  Africas  health  systems,  yet financing  for  climate-health  action  remains  heavily  dependent  on traditional donors. As climate shocks disrupt health services, infrastructure, and supply chains, there is an urgent need to explore sustainable, locally driven financing mechanisms that can strengthen health system resilience beyond conventional donor funding.'
      ,  pdfUrl: '/document/CAPCHAEvidencebriefNo.2.pdf',
        doiUrl: null,
    },
    
    // ── Working Papers ────────────────────────────────────────────────────────
    {
        id: 'w1',
        category: 'working',
        title: 'Integrating Climate and Health Surveillance: Lessons from the SOSCHI Pilot',
        authors: ['CAPCHA Research Consortium'],
        year: 2025,
        journal: 'CAPCHA Working Paper Series',
        volume: 'WP-2025-01',
        tags: ['Surveillance', 'SOSCHI', 'Health Systems'],
        abstract: 'A working paper documenting early findings from the SOSCHI pilot programme, examining how climate-health surveillance can be embedded within existing national health information architectures.',
        pdfUrl: null,
        doiUrl: null,
    },
    // ── Reports ───────────────────────────────────────────────────────────────
    {
        id: 'r1',
        category: 'report',
        title: 'CAPCHA Annual Report 2025',
        authors: ['CAPCHA Secretariat'],
        year: 2025,
        journal: 'Annual Report',
        volume: '2025',
        tags: ['Annual Report', 'CAPCHA', 'Progress'],
        abstract: 'The 2025 CAPCHA Annual Report documents the platform\'s activities, partnerships, and outputs across research, capacity enhancement, and policy advocacy activities over the past year.',
        pdfUrl: null,
        doiUrl: null,
    },
    // ── Conference Papers ─────────────────────────────────────────────────────
    {
        id: 'c1',
        category: 'conference',
        title: 'Climate-Sensitive Disease Burden in East Africa: Emerging Evidence',
        authors: ['Dr. Vijendra Ingole', 'CAPCHA Research Team'],
        year: 2025,
        journal: 'Proceedings of the African Climate-Health Conference',
        volume: 'ACHC 2025',
        tags: ['Disease Burden', 'East Africa', 'Climate Change'],
        abstract: 'Conference paper presenting emerging evidence on the shifting burden of climate-sensitive diseases across East Africa, with implications for health system preparedness and national adaptation plans.',
        pdfUrl: null,
        doiUrl: null,
    },
];

// ─── Categories config ────────────────────────────────────────────────────────
const CATEGORIES = [
    { id: 'all',        label: 'All Publications', icon: <BookOpen className="w-4 h-4" />,     color: 'bg-[#021d49]' },
    { id: 'journal',    label: 'Journal Articles', icon: <GraduationCap className="w-4 h-4" />, color: 'bg-[#0e8601]' },
    { id: 'policy',     label: 'Policy Briefs',    icon: <ScrollText className="w-4 h-4" />,    color: 'bg-[#ff9500]' },
    { id: 'working',    label: 'Working Papers',   icon: <FileText className="w-4 h-4" />,      color: 'bg-indigo-600' },
    { id: 'report',     label: 'Reports',          icon: <Newspaper className="w-4 h-4" />,     color: 'bg-rose-600'  },
    { id: 'conference', label: 'Conference Papers',icon: <Users className="w-4 h-4" />,         color: 'bg-teal-600'  },
];

const categoryMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

// ─── Publication card ─────────────────────────────────────────────────────────
function PubCard({ pub }) {
    const [expanded, setExpanded] = useState(false);
    const cat = categoryMap[pub.category];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden">
            {/* Coloured top bar */}
            <div className={`h-1 w-full ${cat?.color ?? 'bg-gray-300'}`} />

            <div className="p-5">
                {/* Category + year */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold ${cat?.color ?? 'bg-gray-400'}`}>
                        {cat?.icon}
                        {cat?.label ?? pub.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {pub.year}
                    </span>
                    <span className="text-xs text-gray-400">{pub.volume}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#021d49] text-base leading-snug mb-2">{pub.title}</h3>

                {/* Journal */}
                <p className="text-xs text-[#0e8601] font-semibold mb-2 italic">{pub.journal}</p>

                {/* Authors */}
                <p className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 flex-shrink-0" />
                    {pub.authors.join(', ')}
                </p>

                {/* Abstract (expandable) */}
                <div className={`text-sm text-gray-500 leading-relaxed mb-3 ${!expanded ? 'line-clamp-2' : ''}`}>
                    {pub.abstract}
                </div>
                {pub.abstract.length > 120 && (
                    <button onClick={() => setExpanded(v => !v)} className="text-xs text-[#0e8601] hover:underline mb-3">
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}

                {/* Tags */}
                {pub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {pub.tags.map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{t}</span>
                        ))}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-50">
                    {pub.pdfUrl ? (
                        <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#021d49] hover:bg-[#033080] text-white text-xs font-semibold transition-colors">
                            <FileText className="w-3.5 h-3.5" /> Download PDF
                        </a>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed">
                            <FileText className="w-3.5 h-3.5" /> PDF coming soon
                        </span>
                    )}
                    {pub.doiUrl && (
                        <a href={pub.doiUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0e8601] text-[#0e8601] hover:bg-[#0e8601]/5 text-xs font-semibold transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" /> View DOI
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const PublicationsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = useMemo(() => {
        return publications.filter(p => {
            const matchesCat = activeCategory === 'all' || p.category === activeCategory;
            const q = searchTerm.toLowerCase();
            const matchesSearch = !q ||
                p.title.toLowerCase().includes(q) ||
                p.abstract.toLowerCase().includes(q) ||
                p.authors.some(a => a.toLowerCase().includes(q)) ||
                p.tags.some(t => t.toLowerCase().includes(q)) ||
                p.journal.toLowerCase().includes(q);
            return matchesCat && matchesSearch;
        });
    }, [activeCategory, searchTerm]);

    const countFor = (id) => id === 'all'
        ? publications.length
        : publications.filter(p => p.category === id).length;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                {/* ── HERO ─────────────────────────────────────────── */}
                <section className="pt-24 pb-8 px-4 border-b border-gray-100 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <nav className="flex items-center gap-1.5 text-gray-400 text-xs mb-5">
                            <Link href="/" className="hover:text-[#021d49] transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/PolicyAdvocacyPage" className="hover:text-[#021d49] transition-colors">Policy &amp; Advocacy</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#021d49] font-medium">Publications</span>
                        </nav>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-1.5 text-[#0e8601] text-xs font-bold uppercase tracking-widest mb-3">
                                                                        Knowledge Translation &amp; Policy
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-[#021d49] leading-tight">
                                    CAPCHA <span className="text-[#ff9500]">Publications</span>
                                </h1>
                                <p className="text-gray-500 text-sm mt-2.5 max-w-lg leading-relaxed">
                                    Peer-reviewed articles, evidence briefs, working papers, and reports from the CAPCHA platform and its research partners.
                                </p>
                            </div>

                            {/* Stats pill */}
                            <div className="flex-shrink-0 bg-gray-50 rounded-2xl border border-gray-100 px-5 py-3 flex flex-col gap-1.5 text-xs text-gray-500">
                                <span className="font-semibold text-[#021d49] text-base">{publications.length} publications</span>
                                <span className="text-gray-400">across {CATEGORIES.length - 1} categories</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FILTERS ──────────────────────────────────────── */}
                <section className="sticky top-[calc(theme(spacing.20)+theme(spacing.28))] z-10 bg-white border-b border-gray-100 px-4 py-4 shadow-sm">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

                        {/* Category tabs */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                        activeCategory === cat.id
                                            ? `${cat.color} text-white shadow-sm`
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat.icon}
                                    {cat.label}
                                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                                        activeCategory === cat.id ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        {countFor(cat.id)}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full sm:w-64 flex-shrink-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search publications..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 bg-white text-xs"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <X className="w-3 h-3 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── PUBLICATION GRID ─────────────────────────────── */}
                <section className="py-10 px-4 bg-gray-50 min-h-[400px]">
                    <div className="max-w-5xl mx-auto">

                        {/* Active filter summary */}
                        {(searchTerm || activeCategory !== 'all') && (
                            <div className="flex items-center gap-2 mb-5 text-xs text-gray-500">
                                <Filter className="w-3.5 h-3.5" />
                                Showing <strong className="text-[#021d49]">{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''}
                                {activeCategory !== 'all' && (
                                    <span>in <strong className="text-[#0e8601]">{categoryMap[activeCategory]?.label}</strong></span>
                                )}
                                {searchTerm && (
                                    <span>for "<strong>{searchTerm}</strong>"</span>
                                )}
                                <button onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
                                    className="ml-1 text-[#0e8601] hover:underline font-medium">
                                    Clear all
                                </button>
                            </div>
                        )}

                        {filtered.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                                <p className="font-semibold text-gray-400 mb-1">No publications found</p>
                                <p className="text-xs text-gray-300">Try adjusting your search or category filter</p>
                                <button onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
                                    className="mt-4 text-sm text-[#0e8601] hover:underline">
                                    View all publications
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-5">
                                {filtered.map(pub => <PubCard key={pub.id} pub={pub} />)}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── SUBMIT A PUBLICATION CTA ─────────────────────── */}
                <section className="py-14 px-4 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <div className="rounded-2xl border border-[#021d49]/10 bg-[#021d49]/3 p-8 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#021d49] flex items-center justify-center flex-shrink-0">
                                <ScrollText className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold text-[#021d49] mb-1">Share Your Research</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Are you a CAPCHA partner with a publication to add? Get in touch with the team to have your work listed here.
                                </p>
                            </div>
                            <Link href="/ContactPage"
                                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#021d49] hover:bg-[#033080] text-white text-sm font-semibold transition-colors">
                                Get in Touch
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Back */}
                <div className="pb-12 text-center">
                    <Link href="/PolicyAdvocacyPage"
                        className="inline-flex items-center gap-2 text-[#021d49] hover:text-[#0e8601] font-semibold transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Policy &amp; Advocacy
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PublicationsPage;
