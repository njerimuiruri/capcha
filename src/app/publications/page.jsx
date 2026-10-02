'use client'
import React, { useState, useMemo } from 'react';
import { ChevronRight, BookOpen, ScrollText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import Pagination from '@/components/Pagination';
import { PublicationDocumentCard } from '@/components/LearningCurve/DocumentCard';
import DocumentFilterBar, { sortItems } from '@/components/LearningCurve/DocumentFilterBar';
import {
    publicationsByRecency as publications,
    publicationSortDate,
    PUBLICATION_CATEGORIES,
} from '@/data/publications';

const PUBS_PER_PAGE = 9;

const latestDate = Math.max(...publications.map(p => publicationSortDate(p).getTime()));
const allTags = [...new Set(publications.flatMap(p => p.tags))].sort((a, b) => a.localeCompare(b));

// Only show category tabs that actually have publications in them.
const TYPES = PUBLICATION_CATEGORIES
    .map(c => ({ ...c, count: c.id === 'all' ? publications.length : publications.filter(p => p.category === c.id).length }))
    .filter(c => c.id === 'all' || c.count > 0);

const PublicationsPage = () => {
    const [activeType, setActiveType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [sort, setSort] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        const matches = publications.filter(p =>
            (activeType === 'all' || p.category === activeType) &&
            (!activeTag || p.tags.includes(activeTag)) &&
            (!q ||
                p.title.toLowerCase().includes(q) ||
                p.abstract.toLowerCase().includes(q) ||
                p.journal.toLowerCase().includes(q) ||
                p.authors.some(a => a.toLowerCase().includes(q)) ||
                p.tags.some(t => t.toLowerCase().includes(q)))
        );
        return sortItems(matches, sort, p => p.title);
    }, [activeType, searchTerm, activeTag, sort]);

    const totalPages = Math.ceil(filtered.length / PUBS_PER_PAGE);
    const currentPubs = filtered.slice((currentPage - 1) * PUBS_PER_PAGE, currentPage * PUBS_PER_PAGE);

    // Any filter change sends you back to page 1.
    const withReset = (setter) => (value) => { setter(value); setCurrentPage(1); };
    const handleTagClick = (tag) => { setActiveTag(prev => prev === tag ? '' : tag); setCurrentPage(1); };
    const clearFilters = () => { setSearchTerm(''); setActiveType('all'); setActiveTag(''); setSort('newest'); setCurrentPage(1); };
    const hasActiveFilters = searchTerm || activeType !== 'all' || activeTag;

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-[125px]">

                {/* ── Compact header ── */}
                <header className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 pt-6 pb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                        <div>
                            <nav className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                                <Link href="/" className="hover:text-[#021d49] transition-colors">Home</Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link href="/PolicyAdvocacyPage" className="hover:text-[#021d49] transition-colors">Policy &amp; Advocacy</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-[#021d49] font-medium">Publications</span>
                            </nav>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-[#021d49]">
                                CAPCHA <span className="text-[#ff9500]">Publications</span>
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Journal articles, policy briefs, case studies and reports from CAPCHA and its research partners.
                            </p>
                        </div>
                        <Link href="/learning-curve" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#021d49] hover:text-[#0e8601] transition-colors">
                            Go to Learning Curve <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </header>

                <DocumentFilterBar
                    searchTerm={searchTerm} onSearchChange={withReset(setSearchTerm)}
                    searchPlaceholder="Search titles, authors, journals, topics..."
                    types={TYPES} activeType={activeType} onTypeChange={withReset(setActiveType)}
                    tags={allTags} activeTag={activeTag} onTagChange={withReset(setActiveTag)}
                    sort={sort} onSortChange={withReset(setSort)}
                />

                {/* ── Grid ── */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-5 text-sm text-gray-500">
                        <p>
                            Showing <strong className="text-[#021d49]">{filtered.length}</strong> of {publications.length} publication{publications.length !== 1 ? 's' : ''}
                        </p>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-xs font-semibold text-[#0e8601] hover:underline">
                                Clear filters
                            </button>
                        )}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                            <BookOpen className="w-14 h-14 mx-auto mb-4 text-gray-200" />
                            <p className="text-lg font-semibold text-gray-400">No publications match those filters</p>
                            <button onClick={clearFilters} className="mt-3 text-sm text-[#0e8601] hover:underline">View all publications</button>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentPubs.map(pub => (
                                <PublicationDocumentCard
                                    key={pub.id}
                                    pub={pub}
                                    isNew={publicationSortDate(pub).getTime() === latestDate}
                                    activeTag={activeTag}
                                    onTagClick={handleTagClick}
                                />
                            ))}
                        </div>
                    )}

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
                </section>

                {/* ── Share your research ── */}
                <section className="max-w-7xl mx-auto px-4 pb-14">
                    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-[#021d49] flex items-center justify-center flex-shrink-0">
                            <ScrollText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#021d49]">Share Your Research</h3>
                            <p className="text-sm text-gray-500">
                                Are you a CAPCHA partner with a publication to add? Get in touch to have your work listed here.
                            </p>
                        </div>
                        <Link href="/ContactPage"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#021d49] hover:bg-[#0e8601] text-white text-sm font-semibold transition-colors">
                            Get in Touch <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default PublicationsPage;
