'use client';
import React, { useState, useMemo } from 'react';
import { ChevronRight, BookOpen, FileText, PenLine, PlayCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { blogPosts } from '@/data/blogs';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import Pagination from '@/components/Pagination';
import DocumentCard, { PublicationDocumentCard } from '@/components/LearningCurve/DocumentCard';
import DocumentFilterBar, { sortItems } from '@/components/LearningCurve/DocumentFilterBar';
import { publicationsByRecency, publicationSortDate, PUBLICATION_CATEGORIES } from '@/data/publications';

const ITEMS_PER_PAGE = 9;

// A publication is the same document as a blog post when one title contains
// the other (e.g. the SOSCHI evidence brief is posted both as a blog write-up
// and as a formal publication) — skip it here so it isn't listed twice.
const normalizeTitle = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const isAlreadyListedAsBlogPost = (pub) => {
    const pubTitle = normalizeTitle(pub.title);
    return blogPosts.some(post => {
        const postTitle = normalizeTitle(post.title);
        return postTitle.includes(pubTitle) || pubTitle.includes(postTitle);
    });
};

// One continuous feed — blog posts and publication documents interleaved,
// newest first. Sorting is stable, so equal dates keep their incoming order.
const combinedItems = [
    ...blogPosts.map(post => ({
        kind: 'blog',
        id: `blog-${post.id}`,
        type: 'article',
        sortDate: new Date(post.date),
        title: post.title,
        searchText: `${post.title} ${post.excerpt} ${post.author} ${post.tags.join(' ')}`.toLowerCase(),
        tags: post.tags,
        data: post,
    })),
    ...publicationsByRecency.filter(p => !isAlreadyListedAsBlogPost(p)).map(pub => ({
        kind: 'publication',
        id: `pub-${pub.id}`,
        type: pub.category,
        sortDate: publicationSortDate(pub),
        title: pub.title,
        searchText: `${pub.title} ${pub.abstract} ${pub.authors.join(' ')} ${pub.tags.join(' ')}`.toLowerCase(),
        tags: pub.tags,
        data: pub,
    })),
].sort((a, b) => b.sortDate - a.sortDate);

const latestDate = Math.max(...combinedItems.map(i => i.sortDate.getTime()));
const allTags = [...new Set(combinedItems.flatMap(i => i.tags))].sort((a, b) => a.localeCompare(b));

const countOf = (type) => combinedItems.filter(i => i.type === type).length;
const TYPES = [
    { id: 'all', label: 'All', icon: BookOpen, color: 'bg-[#021d49]', count: combinedItems.length },
    { id: 'article', label: 'Articles', icon: PenLine, color: 'bg-[#0e8601]', count: countOf('article') },
    ...PUBLICATION_CATEGORIES
        .filter(c => c.id !== 'all' && countOf(c.id) > 0)
        .map(c => ({ ...c, count: countOf(c.id) })),
];

const LearningCurvePage = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeType, setActiveType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [sort, setSort] = useState('newest');

    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        const matches = combinedItems.filter(item =>
            (activeType === 'all' || item.type === activeType) &&
            (!q || item.searchText.includes(q)) &&
            (!activeTag || item.tags.includes(activeTag))
        );
        return sortItems(matches, sort, i => i.title);
    }, [activeType, searchTerm, activeTag, sort]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const currentItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
                                <span className="text-[#021d49] font-medium">Learning Curve</span>
                            </nav>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-[#021d49]">
                                Learning <span className="text-[#0e8601]">Curve</span>
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Articles, evidence briefs, case studies &amp; policy notes on climate and health in Africa.
                            </p>
                        </div>
                        <Link href="/publications" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#021d49] hover:text-[#0e8601] transition-colors">
                            Browse all publications <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </header>

                <DocumentFilterBar
                    searchTerm={searchTerm} onSearchChange={withReset(setSearchTerm)}
                    searchPlaceholder="Search titles, authors, topics..."
                    types={TYPES} activeType={activeType} onTypeChange={withReset(setActiveType)}
                    tags={allTags} activeTag={activeTag} onTagChange={withReset(setActiveTag)}
                    sort={sort} onSortChange={withReset(setSort)}
                />

                {/* ── Grid ── */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-5 text-sm text-gray-500">
                        <p>
                            Showing <strong className="text-[#021d49]">{filtered.length}</strong> of {combinedItems.length} item{combinedItems.length !== 1 ? 's' : ''}
                        </p>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-xs font-semibold text-[#0e8601] hover:underline">
                                Clear filters
                            </button>
                        )}
                    </div>

                    {currentItems.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                            <BookOpen className="w-14 h-14 mx-auto mb-4 text-gray-200" />
                            <p className="text-lg font-semibold text-gray-400">Nothing matches those filters</p>
                            <button onClick={clearFilters} className="mt-3 text-sm text-[#0e8601] hover:underline">Clear all filters</button>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map(item => {
                                const isNew = item.sortDate.getTime() === latestDate;
                                if (item.kind === 'publication') {
                                    return (
                                        <PublicationDocumentCard
                                            key={item.id}
                                            pub={item.data}
                                            isNew={isNew}
                                            activeTag={activeTag}
                                            onTagClick={handleTagClick}
                                        />
                                    );
                                }
                                const post = item.data;
                                const open = () => router.push(`/BlogsPage/${post.id}`);
                                return (
                                    <DocumentCard
                                        key={item.id}
                                        image={post.featuredImage}
                                        categoryLabel={post.category === 'climate' ? 'Climate' : 'Health'}
                                        categoryColorClass={post.category === 'climate' ? 'bg-blue-600' : 'bg-[#0e8601]'}
                                        isNew={isNew}
                                        date={post.date}
                                        author={post.author}
                                        readTime={post.readTime}
                                        title={post.title}
                                        onTitleClick={open}
                                        excerpt={post.excerpt}
                                        tags={post.tags}
                                        activeTag={activeTag}
                                        onTagClick={handleTagClick}
                                        primary={{ label: 'Read More', onClick: open }}
                                        secondary={post.pdfLink ? { label: 'PDF', href: post.pdfLink, external: true, icon: <FileText className="w-3.5 h-3.5" /> } : null}
                                    />
                                );
                            })}
                        </div>
                    )}

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
                </section>

                {/* ── Spotlight Series strip ── */}
                <section className="max-w-7xl mx-auto px-4 pb-14">
                    <div className="rounded-2xl bg-gradient-to-r from-[#021d49] to-[#033080] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 text-white">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <PlayCircle className="w-6 h-6 text-[#ff9500]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">Spotlight Series</h3>
                            <p className="text-blue-200 text-sm">Watch recordings and read evidence briefs from our monthly webinar series.</p>
                        </div>
                        <Link href="/spotlight-series" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff9500] hover:bg-[#e68600] text-white text-sm font-semibold transition-colors">
                            View Archive <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default LearningCurvePage;
