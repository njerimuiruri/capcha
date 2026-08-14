'use client'
import React, { useState, useMemo, useEffect } from 'react';
import {
    ChevronRight, Search, X, BookOpen,
    ArrowLeft, ScrollText, Filter,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import Pagination from '@/components/Pagination';
import PublicationCard from '@/components/Publications/PublicationCard';
import { publicationsByRecency as publications, PUBLICATION_CATEGORIES as CATEGORIES } from '@/data/publications';

const PUBS_PER_PAGE = 9;

// ─── Page ─────────────────────────────────────────────────────────────────────
const PublicationsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    useEffect(() => { setCurrentPage(1); }, [activeCategory, searchTerm]);

    const totalPages = Math.ceil(filtered.length / PUBS_PER_PAGE);
    const currentPubs = filtered.slice((currentPage - 1) * PUBS_PER_PAGE, currentPage * PUBS_PER_PAGE);

    const countFor = (id) => id === 'all'
        ? publications.length
        : publications.filter(p => p.category === id).length;

    const categoryMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                {/* ── HERO ─────────────────────────────────────────── */}
                <section className="pt-24 pb-8 px-4 border-b border-gray-100 bg-white">
                    <div className="max-w-6xl mx-auto">
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
                <section className="sticky top-[125px] z-10 bg-white border-b border-gray-100 px-4 py-4 shadow-sm">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

                        {/* Category tabs */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                            activeCategory === cat.id
                                                ? `${cat.color} text-white shadow-sm`
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {cat.label}
                                        <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                                            activeCategory === cat.id ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            {countFor(cat.id)}
                                        </span>
                                    </button>
                                );
                            })}
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
                    <div className="max-w-6xl mx-auto">

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
                            <>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {currentPubs.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
                                </div>
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            </>
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
