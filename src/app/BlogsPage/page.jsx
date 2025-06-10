'use client';
import React, { useState } from 'react';
import { Search, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { blogPosts, recentPosts, popularTags } from '@/data/blogs';
import Link from "next/link";

import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const postsPerPage = 6;

    const filteredPosts = blogPosts.filter(post => {
        const matchesTag = selectedTag === 'all' || post.category === selectedTag;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTag && matchesSearch;
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleReadMore = (postId) => {
        router.push(`/BlogsPage/${postId}`);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div
                    className="relative mt-32 h-[350px] bg-gray-800 flex items-center justify-center pt-32"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/healthstethoscope.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Blogs</h1>
                        <nav className="text-sm">
                            <span className="text-gray-300">Home</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-[#0e8601]">Blogs</span>
                        </nav>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3">
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleTagClick('all')}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTag === 'all'
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => handleTagClick('health')}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTag === 'health'
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Health
                                    </button>
                                    <button
                                        onClick={() => handleTagClick('climate')}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTag === 'climate'
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Climate
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {currentPosts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                            ? 'bg-[#0e8601] text-white rounded-lg overflow-hidden'
                                            : 'bg-white rounded-lg overflow-hidden shadow-md hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={post.authorImage}
                                                    alt={post.author}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <p className={`text-sm ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        Posted By
                                                    </p>
                                                    <p className={`font-semibold ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-white'
                                                        : 'text-gray-900'
                                                        }`}>
                                                        {post.author}
                                                    </p>
                                                </div>
                                            </div>

                                            <h3 onClick={() => handleReadMore(post.id)} className={`text-xl font-bold mb-3 group-hover:text-[#0e8601] transition-colors ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                                ? 'text-white group-hover:text-gray-200'
                                                : 'text-gray-900'
                                                }`}>
                                                {post.title}
                                            </h3>

                                            <p className={`text-sm mb-4 ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                                ? 'text-gray-200'
                                                : 'text-gray-600'
                                                }`}>
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Calendar className={`w-4 h-4 mr-2 ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`} />
                                                    <span className={`text-sm ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        {post.date}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={() => handleReadMore(post.id)}
                                                    className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer ${index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                        : 'bg-[#0e8601] text-white hover:bg-teal-700'
                                                        }`}
                                                >
                                                    Read More →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-10 h-10 rounded-full font-medium transition-colors ${currentPage === i + 1
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                            } shadow-md hover:shadow-lg`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Search</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#0e8601] text-white p-2 rounded-lg hover:bg-teal-700">
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>



                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                                <div className="space-y-4">
                                    {recentPosts.map((post) => (
                                        <div key={post.id} className="flex items-start space-x-3 group cursor-pointer">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-16 h-12 rounded object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#0e8601] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="bg-gray-900 text-white rounded-lg p-8 mb-8 relative overflow-hidden"
                                style={{
                                    backgroundImage: "url('/api/placeholder/400/300')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="absolute inset-0 bg-black opacity-60"></div>
                                <div className="relative z-10 text-center">
                                    <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
                                    <Link
                                        href="/ContactPage"
                                        className="bg-[#0e8601] text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                                    >
                                        Contact Us
                                    </Link>

                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-teal-100 hover:text-teal-700 cursor-pointer transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;