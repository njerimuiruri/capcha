'use client';
import React, { useState } from 'react';
import { Search, Calendar, User, ChevronLeft, ChevronRight, BookOpen, FileText, X, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { blogPosts, popularTags } from '@/data/blogs';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const CATEGORIES = [
    { value: 'all',     label: 'All Publications' },
    { value: 'climate', label: 'Climate' },
    { value: 'health',  label: 'Health' },
];

const LearningCurvePage = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const postsPerPage = 6;

    const filtered = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesCategory && matchesSearch && matchesTag;
    });

    const totalPages = Math.ceil(filtered.length / postsPerPage);
    const currentPosts = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

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
                            {currentPosts.length === 0 ? (
                                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                                    <p className="text-xl font-semibold text-gray-400">No publications found</p>
                                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                                    <button onClick={clearFilters} className="mt-4 text-sm text-[#0e8601] hover:underline">Clear all filters</button>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {currentPosts.map(post => (
                                        <article
                                            key={post.id}
                                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0e8601]/20 transition-all duration-200 overflow-hidden group"
                                        >
                                            <div className="flex flex-col sm:flex-row">
                                                {/* Thumbnail */}
                                                <div className="relative sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                                                    {post.featuredImage ? (
                                                        <Image
                                                            src={post.featuredImage}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-[#021d49] to-[#0e8601] flex items-center justify-center">
                                                            <FileText className="w-10 h-10 text-white/40" />
                                                        </div>
                                                    )}
                                                    {/* Category badge */}
                                                    <div className="absolute top-2 left-2">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm ${post.category === 'climate' ? 'bg-blue-600' : 'bg-[#0e8601]'}`}>
                                                            {post.category === 'climate' ? 'Climate' : 'Health'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 flex flex-col flex-1">
                                                    {/* Meta */}
                                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />{post.date}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-3.5 h-3.5" />{post.author}
                                                        </span>
                                                        {post.readTime && (
                                                            <span>{post.readTime}</span>
                                                        )}
                                                    </div>

                                                    <h3
                                                        className="text-base font-bold text-[#021d49] group-hover:text-[#0e8601] transition-colors mb-2 leading-snug cursor-pointer"
                                                        onClick={() => router.push(`/BlogsPage/${post.id}`)}
                                                    >
                                                        {post.title}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                                        {post.tags.slice(0, 3).map(tag => (
                                                            <button
                                                                key={tag}
                                                                onClick={() => handleTagClick(tag)}
                                                                className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${selectedTag === tag
                                                                    ? 'bg-[#0e8601] text-white border-[#0e8601]'
                                                                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601]'
                                                                }`}
                                                            >
                                                                {tag}
                                                            </button>
                                                        ))}
                                                        {post.tags.length > 3 && (
                                                            <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 border border-gray-200">
                                                                +{post.tags.length - 3}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* CTA */}
                                                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                                                        <button
                                                            onClick={() => router.push(`/BlogsPage/${post.id}`)}
                                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#021d49] hover:bg-[#0e8601] text-white text-sm font-semibold transition-colors"
                                                        >
                                                            Read More
                                                            <ChevronRight className="w-3.5 h-3.5" />
                                                        </button>
                                                        {post.pdfLink && (
                                                            <a
                                                                href={post.pdfLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601] text-gray-600 text-sm font-semibold transition-colors"
                                                            >
                                                                <FileText className="w-3.5 h-3.5" />
                                                                PDF
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-full bg-white shadow hover:shadow-md disabled:opacity-40 transition-shadow"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-10 h-10 rounded-full font-semibold text-sm transition-colors shadow hover:shadow-md ${currentPage === i + 1
                                                ? 'bg-[#021d49] text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-full bg-white shadow hover:shadow-md disabled:opacity-40 transition-shadow"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
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
