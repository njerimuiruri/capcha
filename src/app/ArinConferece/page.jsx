'use client';
import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, DollarSign, ChevronLeft, ChevronRight, Play, Users, Download, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { conferences, recentConferences, popularConferenceTags } from '@/data/conference';
import Link from "next/link";
import Image from 'next/image';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import PageLoader from '@/app/PageLoader';

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

    const handleDownloadConceptNote = (conceptNoteUrl, title) => {
        console.log(`Downloading concept note for: ${title}`);
        alert(`Concept note download started for: ${title}`);
    };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 4000);
        return () => clearTimeout(timeout);
    }, []);

    const [scrollY, setScrollY] = useState(0);

    return (
        <>
            <PageLoader isLoading={isLoading} theme="light" />

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">ARIN Conferences</h1>
                        <nav className="text-sm">
                            <span className="text-gray-300">Home</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-[#0e8601]">Conferences</span>
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
                                        onClick={() => handleTagClick('climate')}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTag === 'climate'
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Climate & Environment
                                    </button>
                                    <button
                                        onClick={() => handleTagClick('research')}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTag === 'research'
                                            ? 'bg-[#0e8601] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Research
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
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {currentConferences.map((conference, index) => (
                                    <div
                                        key={conference.id}
                                        className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                            ? 'bg-[#0e8601] text-white rounded-lg overflow-hidden'
                                            : 'bg-white rounded-lg overflow-hidden shadow-md hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="relative h-48 bg-gray-200">
                                            {conference.eventStatus === 'completed' && conference.recordingsAvailable ? (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                                    <div className="text-center text-white">
                                                        <Video className="w-12 h-12 mx-auto mb-2" />
                                                        <p className="text-sm font-medium">Recordings Available</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <iframe
                                                    src={conference.videoUrl}
                                                    className="w-full h-full"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            )}
                                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play className="w-12 h-12 text-white" />
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            {conference.eventStatus === 'completed' && (
                                                <div className="mb-3">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                        Past Event
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center mb-4">
                                                <Image
                                                    src={conference.organizerImage}
                                                    alt={conference.organizer}
                                                    width={40}
                                                    height={40}
                                                    className="w-10 h-10 rounded-full mr-3 object-cover"
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
                                                {conference.description.length > 150
                                                    ? `${conference.description.substring(0, 150)}...`
                                                    : conference.description}
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

                                            </div>

                                            {conference.partners && (
                                                <div className="mb-4">
                                                    <p className={`text-xs mb-2 ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        Key Partners:
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {conference.partners.slice(0, 3).map((partner, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`px-2 py-1 text-xs rounded ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                                    ? 'bg-white bg-opacity-20 text-white'
                                                                    : 'bg-gray-100 text-gray-600'
                                                                    }`}
                                                            >
                                                                {partner.length > 15 ? `${partner.substring(0, 15)}...` : partner}
                                                            </span>
                                                        ))}
                                                        {conference.partners.length > 3 && (
                                                            <span className={`px-2 py-1 text-xs rounded ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                                ? 'bg-white bg-opacity-20 text-white'
                                                                : 'bg-gray-100 text-gray-600'
                                                                }`}>
                                                                +{conference.partners.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewDetails(conference.id)}
                                                        className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                            : 'bg-[#0e8601] text-white hover:bg-teal-700'
                                                            }`}
                                                    >
                                                        View Details →
                                                    </button>

                                                    {conference.conceptNoteUrl && (
                                                        <button
                                                            onClick={() => handleDownloadConceptNote(conference.conceptNoteUrl, conference.title)}
                                                            className={`px-3 py-2 rounded text-sm font-medium transition-colors border ${conference.featured && index === 0 && currentPage === 1 && selectedTag === 'all'
                                                                ? 'border-white text-white hover:bg-white hover:text-[#0e8601]'
                                                                : 'border-[#0e8601] text-[#0e8601] hover:bg-[#0e8601] hover:text-white'
                                                                }`}
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>

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

                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Search</h3>
                                <div className="relative">

                                    <input
                                        type="text"
                                        placeholder="Search conferences..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e8601] focus:border-transparent"
                                    />
                                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularConferenceTags.map((tag, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleTagClick(tag.toLowerCase())}
                                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[#0e8601] hover:text-white transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Recent Conferences</h3>
                                <div className="space-y-4">
                                    {recentConferences.map((conf, index) => (
                                        <Link
                                            key={index}
                                            href={`/ArinConferece/${conf.id}`}
                                            className="block group"
                                        >
                                            <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#0e8601] to-teal-700 rounded-lg flex items-center justify-center mr-4">
                                                    <Calendar className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#0e8601] transition-colors">
                                                        {conf.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{conf.date}</p>
                                                    <p className="text-sm font-semibold text-[#0e8601]">{conf.price}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/ConferencePage"
                                    className="block text-center mt-4 text-[#0e8601] hover:text-teal-700 font-medium"
                                >
                                    View All →
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

export default ConferencePage;