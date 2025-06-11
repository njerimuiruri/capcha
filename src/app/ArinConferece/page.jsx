'use client';
import React, { useState } from 'react';
import { Search, Calendar, MapPin, DollarSign, ChevronLeft, ChevronRight, Play, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { conferences, recentConferences, popularConferenceTags } from '@/data/conference';
import Link from "next/link";

import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const ConferencePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const conferencesPerPage = 6;

    const filteredConferences = conferences.filter(conference => {
        const matchesTag = selectedTag === 'all' || conference.category === selectedTag;
        const matchesSearch = conference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conference.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTag && matchesSearch;
    });

    const totalPages = Math.ceil(filteredConferences.length / conferencesPerPage);
    const startIndex = (currentPage - 1) * conferencesPerPage;
    const currentConferences = filteredConferences.slice(startIndex, startIndex + conferencesPerPage);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleViewDetails = (conferenceId) => {
        router.push(`/ArinConferece/${conferenceId}`);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div
                    className="relative mt-32 h-[350px] bg-gray-800 flex items-center justify-center pt-32"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/conference-hero.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Conferences</h1>
                        <nav className="text-sm">
                            <span className="text-gray-300">Home</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-[#0e8601]">Conferences</span>
                        </nav>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            {/* Filter Tags */}
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
                                        onClick={() => handleTagClick('business')}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTag === 'business'
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Business
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
                                        onClick={() => handleTagClick('technology')}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTag === 'technology'
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Technology
                                    </button>
                                </div>
                            </div>

                            {/* Conference Cards */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {currentConferences.map((conference, index) => (
                                    <div
                                        key={conference.id}
                                        className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                            ? 'bg-[#0e8601] text-white rounded-lg overflow-hidden'
                                            : 'bg-white rounded-lg overflow-hidden shadow-md hover:bg-gray-50'
                                            }`}
                                    >
                                        {/* Video Thumbnail */}
                                        <div className="relative h-48 bg-gray-200">
                                            <iframe
                                                src={conference.videoUrl}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play className="w-12 h-12 text-white" />
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            {/* Organizer Info */}
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={conference.organizerImage}
                                                    alt={conference.organizer}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <p className={`text-sm ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        Organized By
                                                    </p>
                                                    <p className={`font-semibold ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-white'
                                                        : 'text-gray-900'
                                                        }`}>
                                                        {conference.organizer}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3
                                                onClick={() => handleViewDetails(conference.id)}
                                                className={`text-xl font-bold mb-3 group-hover:text-[#0e8601] transition-colors cursor-pointer ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                    ? 'text-white group-hover:text-gray-200'
                                                    : 'text-gray-900'
                                                    }`}
                                            >
                                                {conference.title}
                                            </h3>

                                            {/* Description */}
                                            <p className={`text-sm mb-4 ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                ? 'text-gray-200'
                                                : 'text-gray-600'
                                                }`}>
                                                {conference.description}
                                            </p>

                                            {/* Conference Details */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center">
                                                    <Calendar className={`w-4 h-4 mr-2 ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`} />
                                                    <span className={`text-sm ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        {conference.date} • {conference.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className={`w-4 h-4 mr-2 ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`} />
                                                    <span className={`text-sm ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        {conference.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <DollarSign className={`w-4 h-4 mr-2 ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-gray-500'
                                                        }`} />
                                                    <span className={`text-sm font-semibold ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-200'
                                                        : 'text-[#0e8601]'
                                                        }`}>
                                                        {conference.price}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex justify-between items-center">
                                                <button
                                                    onClick={() => handleViewDetails(conference.id)}
                                                    className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                        : 'bg-[#0e8601] text-white hover:bg-teal-700'
                                                        }`}
                                                >
                                                    View Details →
                                                </button>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Users className="w-4 h-4 mr-1" />
                                                    <span>{conference.speakers.length} Speakers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
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

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            {/* Search */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Search</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search conferences..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#0e8601] text-white p-2 rounded-lg hover:bg-teal-700">
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Recent Conferences */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Upcoming Conferences</h3>
                                <div className="space-y-4">
                                    {recentConferences.map((conference) => (
                                        <div key={conference.id} className="flex items-start space-x-3 group cursor-pointer">
                                            <img
                                                src={conference.image}
                                                alt={conference.title}
                                                className="w-16 h-12 rounded object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#0e8601] transition-colors line-clamp-2">
                                                    {conference.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{conference.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action */}
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
                                    <h3 className="text-2xl font-bold mb-4">Host Your Conference</h3>
                                    <Link
                                        href="/ContactPage"
                                        className="bg-[#0e8601] text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularConferenceTags.map((tag, index) => (
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

export default ConferencePage;