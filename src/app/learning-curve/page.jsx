'use client';
import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, FileText, X, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { blogPosts, popularTags } from '@/data/blogs';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import Pagination from '@/components/Pagination';
import DocumentCard from '@/components/LearningCurve/DocumentCard';
import { publicationsByRecency, publicationCategoryMap } from '@/data/publications';

const CATEGORIES = [
    { value: 'all',     label: 'All Publications' },
    { value: 'climate', label: 'Climate' },
    { value: 'health',  label: 'Health' },
];

const blogPostsByRecency = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

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
const uniquePublicationsByRecency = publicationsByRecency.filter(p => !isAlreadyListedAsBlogPost(p));

// One continuous, dated feed — blog posts and publication documents interleaved
// by recency rather than shown as two separate lists/sections.
const combinedItems = [
    ...blogPostsByRecency.map(post => ({
        kind: 'blog',
        id: `blog-${post.id}`,
        sortDate: new Date(post.date),
        category: post.category,
        searchText: `${post.title} ${post.excerpt}`.toLowerCase(),
        tags: post.tags,
        data: post,
    })),
    ...uniquePublicationsByRecency.map(pub => ({
        kind: 'publication',
        id: `pub-${pub.id}`,
        sortDate: new Date(pub.year, 0, 1),
        category: null, // publications aren't classified as climate/health
        searchText: `${pub.title} ${pub.abstract} ${pub.authors.join(' ')} ${pub.tags.join(' ')}`.toLowerCase(),
        tags: pub.tags,
        data: pub,
    })),
].sort((a, b) => b.sortDate - a.sortDate);

const LearningCurvePage = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const postsPerPage = 6;

    const filtered = combinedItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const q = searchTerm.toLowerCase();
        const matchesSearch = !q || item.searchText.includes(q);
        const matchesTag = !selectedTag || item.tags.includes(selectedTag);
        return matchesCategory && matchesSearch && matchesTag;
    });

    const totalPages = Math.ceil(filtered.length / postsPerPage);
    const currentItems = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const handleCategoryChange = (cat) => { setSelectedCategory(cat); setCurrentPage(1); };
    const handleTagClick = (tag) => {
        setSelectedTag(prev => prev === tag ? '' : tag);
        setCurrentPage(1);
    };
    const clearFilters = () => { setSearchTerm(''); setSelectedCategory('all'); setSelectedTag(''); setCurrentPage(1); };

    const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedTag;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* ── HERO ── */}
                <section className="pt-24 pb-8 px-4 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto">
                        <nav className="flex items-center gap-1.5 text-gray-400 text-xs mb-5">
                            <Link href="/" className="hover:text-[#021d49] transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/PolicyAdvocacyPage" className="hover:text-[#021d49] transition-colors">Policy &amp; Advocacy</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#021d49] font-medium">Learning Curve</span>
                        </nav>
                        <div className="inline-flex items-center gap-2 bg-[#0e8601]/10 text-[#0e8601] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                            <BookOpen className="w-3.5 h-3.5" />
                            Knowledge Translation &amp; Policy
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#021d49] mb-3">Learning Curve</h1>
                        <p className="text-gray-500 text-lg max-w-2xl">
                            Publications, evidence briefs, policy notes &amp; articles from CAPCHA
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ── Main content ── */}
                        <div className="lg:w-2/3">
                            {/* Search + category bar */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search publications..."
                                        value={searchTerm}
                                        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 text-sm"
                                    />
                                    {searchTerm && (
                                        <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.value}
                                            onClick={() => handleCategoryChange(cat.value)}
                                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === cat.value
                                                ? 'bg-[#021d49] text-white shadow-sm'
                                                : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#021d49] hover:text-[#021d49]'
                                            }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Active filters strip */}
                            {hasActiveFilters && (
                                <div className="flex items-center gap-2 flex-wrap mb-4">
                                    <span className="text-xs text-gray-500 font-medium">Active filters:</span>
                                    {searchTerm && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#021d49]/10 text-[#021d49] text-xs font-semibold">
                                            "{searchTerm}"
                                            <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }}><X className="w-3 h-3" /></button>
                                        </span>
                                    )}
                                    {selectedTag && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0e8601]/10 text-[#0e8601] text-xs font-semibold">
                                            <Tag className="w-3 h-3" />{selectedTag}
                                            <button onClick={() => { setSelectedTag(''); setCurrentPage(1); }}><X className="w-3 h-3" /></button>
                                        </span>
                                    )}
                                    <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-red-500 transition-colors underline">
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Result count */}
                            <p className="text-sm text-gray-500 mb-5">
                                Showing <strong className="text-gray-800">{filtered.length}</strong> publication{filtered.length !== 1 ? 's' : ''}
                            </p>

                            {/* Cards */}
                            {currentItems.length === 0 ? (
                                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                                    <p className="text-xl font-semibold text-gray-400">No publications found</p>
                                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                                    <button onClick={clearFilters} className="mt-4 text-sm text-[#0e8601] hover:underline">Clear all filters</button>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {currentItems.map(item => item.kind === 'blog' ? (
                                        <DocumentCard
                                            key={item.id}
                                            image={item.data.featuredImage}
                                            categoryLabel={item.data.category === 'climate' ? 'Climate' : 'Health'}
                                            categoryColorClass={item.data.category === 'climate' ? 'bg-blue-600' : 'bg-[#0e8601]'}
                                            date={item.data.date}
                                            author={item.data.author}
                                            readTime={item.data.readTime}
                                            title={item.data.title}
                                            onTitleClick={() => router.push(`/BlogsPage/${item.data.id}`)}
                                            excerpt={item.data.excerpt}
                                            tags={item.data.tags}
                                            activeTag={selectedTag}
                                            onTagClick={handleTagClick}
                                            primary={{ label: 'Read More', onClick: () => router.push(`/BlogsPage/${item.data.id}`) }}
                                            secondary={item.data.pdfLink ? { label: 'PDF', href: item.data.pdfLink, external: true, icon: <FileText className="w-3.5 h-3.5" /> } : null}
                                        />
                                    ) : (
                                        <DocumentCard
                                            key={item.id}
                                            image={item.data.image}
                                            categoryLabel={publicationCategoryMap[item.data.category]?.label}
                                            categoryColorClass={publicationCategoryMap[item.data.category]?.color}
                                            date={item.data.year}
                                            author={item.data.authors.join(', ')}
                                            title={item.data.title}
                                            excerpt={item.data.abstract}
                                            tags={item.data.tags}
                                            activeTag={selectedTag}
                                            onTagClick={handleTagClick}
                                            primary={item.data.pdfUrl
                                                ? { label: 'Download PDF', href: item.data.pdfUrl, external: true, icon: <FileText className="w-3.5 h-3.5" /> }
                                                : { label: 'PDF coming soon', disabled: true, icon: <FileText className="w-3.5 h-3.5" /> }}
                                        />
                                    ))}
                                </div>
                            )}

                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </div>

                        {/* ── Sidebar ── */}
                        <div className="lg:w-1/3 space-y-6">
                            {/* About Learning Curve */}
                            <div className="bg-gradient-to-br from-[#021d49] to-[#033080] rounded-2xl p-6 text-white">
                                <BookOpen className="w-8 h-8 text-blue-300 mb-3" />
                                <h3 className="font-bold text-lg mb-2">About Learning Curve</h3>
                                <p className="text-blue-200 text-sm leading-relaxed">
                                    A curated space for CAPCHA's evidence briefs, technical reports, policy notes, and research articles on climate change and health in Africa.
                                </p>
                            </div>

                            {/* Filter by tag */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-bold text-[#021d49] mb-4 text-base">Browse by Topic</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${selectedTag === tag
                                                ? 'bg-[#0e8601] text-white border-[#0e8601]'
                                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-[#0e8601] hover:text-white hover:border-[#0e8601]'
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Featured post */}
                            {blogPosts.filter(p => p.featured)[0] && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="font-bold text-[#021d49] mb-4 text-base">Featured Publication</h3>
                                    {(() => {
                                        const featured = blogPosts.filter(p => p.featured)[0];
                                        return (
                                            <div
                                                className="cursor-pointer group"
                                                onClick={() => router.push(`/BlogsPage/${featured.id}`)}
                                            >
                                                {featured.featuredImage && (
                                                    <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                                                        <Image src={featured.featuredImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                                    </div>
                                                )}
                                                <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-bold text-white mb-2 ${featured.category === 'climate' ? 'bg-blue-600' : 'bg-[#0e8601]'}`}>
                                                    {featured.category === 'climate' ? 'Climate' : 'Health'}
                                                </span>
                                                <h4 className="text-sm font-bold text-[#021d49] group-hover:text-[#0e8601] transition-colors leading-snug mb-1">
                                                    {featured.title}
                                                </h4>
                                                <p className="text-xs text-gray-400">{featured.date}</p>
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}

                            {/* Link to Spotlight Series */}
                            <div className="bg-gradient-to-br from-[#ff9500] to-[#c97000] rounded-2xl p-6 text-white">
                                <BookOpen className="w-8 h-8 text-orange-200 mb-3" />
                                <h4 className="font-bold text-lg mb-2">Spotlight Series</h4>
                                <p className="text-orange-100 text-sm mb-4 leading-relaxed">
                                    Watch recordings and read evidence briefs from our monthly webinar series.
                                </p>
                                <Link
                                    href="/spotlight-series"
                                    className="block w-full py-2.5 bg-white text-[#c97000] rounded-xl font-semibold text-sm hover:bg-orange-50 transition-colors text-center"
                                >
                                    View Archive
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LearningCurvePage;
