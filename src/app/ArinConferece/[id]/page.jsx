'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Clock, Users, Mail, Phone, ChevronDown, ChevronUp, Share2, Bookmark, Download, FileText, ImageIcon, Play } from 'lucide-react';
import { conferences } from '@/data/conference';
import Link from "next/link";
import Image from "next/image";

import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const ConferenceDetail = () => {
    const params = useParams();
    const conferenceId = parseInt(params.id);
    const [activeSection, setActiveSection] = useState("overview");
    const [imageError, setImageError] = useState(false);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    const conference = conferences.find((conf) => conf.id === conferenceId);

    if (!conference) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Conference Not Found
                        </h1>
                        <p className="text-gray-600 mb-8">
                            The conference you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <Link
                            href="/ConferencePage"
                            className="bg-[#0e8601] text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            Back to Conferences
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: conference.title,
                text: conference.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const handleConceptNoteDownload = () => {
        if (conference.conceptNoteUrl) {
            try {
                const link = document.createElement("a");
                link.href = conference.conceptNoteUrl;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                const filename =
                    conference.conceptNoteUrl.split("/").pop() ||
                    `${conference.title
                        .replace(/[^a-z0-9]/gi, "_")
                        .toLowerCase()}_concept_note.pdf`;

                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Download failed:", error);
                window.open(conference.conceptNoteUrl, "_blank");
            }
        } else {
            alert("Concept note is not available for download.");
        }
    };

    const getConferenceImage = () => {
        if (conference.heroImage && !imageError) {
            return conference.heroImage;
        }

        const categoryImages = {
            climate: "/img/climate-conference-hero.jpg",
            research: "/img/research-conference-hero.jpg",
            health: "/img/health-conference-hero.jpg",
            environment: "/img/environment-conference-hero.jpg",
        };

        return (
            categoryImages[conference.category] || "/img/default-conference-hero.jpg"
        );
    };

    const getCategoryGradient = () => {
        const gradients = {
            climate: "from-blue-600 to-green-600",
            research: "from-purple-600 to-blue-600",
            health: "from-red-500 to-pink-600",
            environment: "from-green-600 to-emerald-600",
        };

        return gradients[conference.category] || "from-[#0e8601] to-teal-700";
    };

    // Function to convert YouTube URL to embed format
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;

        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }

        return null;
    };

    // Get available videos for this conference
    const getConferenceVideos = () => {
        if (!conference.videos) return [];
        return conference.videos.filter(
            (video) => video !== null && video !== undefined
        );
    };

    const conferenceVideos = getConferenceVideos();
    const hasVideos = conferenceVideos.length > 0;

    // Get the active video
    const activeVideo = hasVideos ? conferenceVideos[activeVideoIndex] : null;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div className="relative mt-32 min-h-[600px] bg-gradient-to-r from-black/70 to-black/50 text-white overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {conference.heroImage ? (
                            <Image
                                src={getConferenceImage()}
                                alt={conference.title}
                                fill
                                className="object-cover"
                                onError={() => setImageError(true)}
                                priority
                            />
                        ) : (
                            <div
                                className={`w-full h-full bg-gradient-to-r ${getCategoryGradient()}`}
                            />
                        )}
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 py-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={conference.organizerImage}
                                        alt={conference.organizer}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full mr-4 object-cover bg-white"
                                    />
                                    <div>
                                        <p className="text-gray-200 text-sm">Organized by</p>
                                        <p className="font-semibold">{conference.organizer}</p>
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    {conference.title}
                                </h1>
                                <p className="text-xl text-gray-200 mb-8">
                                    {conference.description}
                                </p>

                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Calendar className="w-5 h-5 mr-3 text-gray-200" />
                                        <div>
                                            <p className="text-sm text-gray-200">Date</p>
                                            <p className="font-semibold">{conference.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Clock className="w-5 h-5 mr-3 text-gray-200" />
                                        <div>
                                            <p className="text-sm text-gray-200">Time</p>
                                            <p className="font-semibold">{conference.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 md:col-span-2">
                                        <MapPin className="w-5 h-5 mr-3 text-gray-200" />
                                        <div>
                                            <p className="text-sm text-gray-200">Location</p>
                                            <p className="font-semibold">{conference.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {conference.conceptNoteUrl && (
                                        <button
                                            onClick={handleConceptNoteDownload}
                                            className="bg-white text-[#0e8601] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            Download Concept Note
                                        </button>
                                    )}

                                    <button
                                        onClick={handleShare}
                                        className="px-4 py-3 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#0e8601] transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Video Section */}
                            <div className="relative">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm">
                                    {hasVideos && activeVideo ? (
                                        <iframe
                                            src={getYouTubeEmbedUrl(activeVideo.url)}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            title={activeVideo.title || `${conference.title} Video`}
                                        ></iframe>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white">
                                            <div className="text-center">
                                                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                                <p>Conference Media Coming Soon</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Video Navigation */}
                                {hasVideos && conferenceVideos.length > 1 && (
                                    <div className="mt-4 flex gap-2 overflow-x-auto">
                                        {conferenceVideos.map((video, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveVideoIndex(index)}
                                                className={`min-w-0 flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeVideoIndex === index
                                                    ? "bg-white text-[#0e8601]"
                                                    : "bg-white/20 text-white hover:bg-white/30"
                                                    }`}
                                            >
                                                <Play className="w-4 h-4 inline mr-1" />
                                                <span className="truncate max-w-[120px]">
                                                    {video.title || `Video ${index + 1}`}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Active Video Info */}
                                {hasVideos && activeVideo && activeVideo.description && (
                                    <div className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <p className="text-sm text-gray-200">
                                            {activeVideo.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Navigation Tabs */}
                <div className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="container mx-auto px-4">
                        <div className="flex space-x-8 overflow-x-auto">
                            {["overview", "videos", "registration"].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={`py-4 px-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeSection === section
                                        ? "border-[#0e8601] text-[#0e8601]"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                    {section === "videos" && hasVideos && (
                                        <span className="ml-1 bg-[#0e8601] text-white text-xs px-2 py-1 rounded-full">
                                            {conferenceVideos.length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {activeSection === "overview" && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">
                                        Conference Overview
                                    </h2>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {conference.description} This comprehensive event brings
                                        together industry leaders, innovators, and professionals to
                                        explore the latest trends, share insights, and build
                                        meaningful connections.
                                    </p>

                                    {(conference.callForSideEvent ||
                                        conference.callForAbstract) && (
                                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                {conference.callForSideEvent && (
                                                    <div className="bg-gray-50 p-6 rounded-lg">
                                                        <h3 className="font-semibold mb-2 text-[#0e8601]">
                                                            Special Sessions
                                                        </h3>
                                                        <p className="text-gray-700 text-sm">
                                                            {conference.callForSideEvent}
                                                        </p>
                                                    </div>
                                                )}
                                                {conference.callForAbstract && (
                                                    <div className="bg-gray-50 p-6 rounded-lg">
                                                        <h3 className="font-semibold mb-2 text-[#0e8601]">
                                                            Abstract Submissions
                                                        </h3>
                                                        <p className="text-gray-700 text-sm">
                                                            {conference.callForAbstract}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    {conference.tags && conference.tags.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-4">
                                                Conference Topics
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {conference.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-[#0e8601] text-white text-sm rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {conference.partners && conference.partners.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-4">
                                                Partners & Collaborators
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-2">
                                                {conference.partners.map((partner, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center p-2 bg-gray-50 rounded"
                                                    >
                                                        <div className="w-2 h-2 bg-[#0e8601] rounded-full mr-3"></div>
                                                        <span className="text-sm text-gray-700">
                                                            {partner}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Videos Section */}
                            {activeSection === "videos" && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">Conference Videos</h2>

                                    {hasVideos ? (
                                        <div className="space-y-6">
                                            {/* Main Video Player */}
                                            <div className="aspect-video rounded-lg overflow-hidden bg-black">
                                                <iframe
                                                    src={getYouTubeEmbedUrl(activeVideo.url)}
                                                    className="w-full h-full"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    title={
                                                        activeVideo.title || `${conference.title} Video`
                                                    }
                                                ></iframe>
                                            </div>

                                            {/* Video Info */}
                                            <div className="bg-gray-50 p-6 rounded-lg">
                                                <h3 className="text-xl font-semibold text-[#0e8601] mb-2 break-words">
                                                    {activeVideo.title ||
                                                        `Conference Video ${activeVideoIndex + 1}`}
                                                </h3>
                                                {activeVideo.description && (
                                                    <p className="text-gray-700 break-words">
                                                        {activeVideo.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Video Playlist */}
                                            {conferenceVideos.length > 1 && (
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">
                                                        Video Playlist
                                                    </h3>
                                                    <div className="grid gap-4">
                                                        {conferenceVideos.map((video, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => setActiveVideoIndex(index)}
                                                                className={`flex items-start p-4 rounded-lg cursor-pointer transition-colors ${activeVideoIndex === index
                                                                    ? "bg-[#0e8601] text-white"
                                                                    : "bg-gray-50 hover:bg-gray-100"
                                                                    }`}
                                                            >
                                                                <div
                                                                    className={`w-12 h-8 rounded flex items-center justify-center mr-4 flex-shrink-0 ${activeVideoIndex === index
                                                                        ? "bg-white/20"
                                                                        : "bg-[#0e8601]"
                                                                        }`}
                                                                >
                                                                    <Play
                                                                        className={`w-4 h-4 ${activeVideoIndex === index
                                                                            ? "text-white"
                                                                            : "text-white"
                                                                            }`}
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="font-medium break-words">
                                                                        {video.title || `Video ${index + 1}`}
                                                                    </h4>
                                                                    {video.description && (
                                                                        <p
                                                                            className={`text-sm mt-1 break-words ${activeVideoIndex === index
                                                                                ? "text-gray-200"
                                                                                : "text-gray-600"
                                                                                }`}
                                                                        >
                                                                            {video.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                                No Videos Available
                                            </h3>
                                            <p className="text-gray-500">
                                                Conference videos will be available after the event or
                                                may be coming soon.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeSection === "registration" && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">
                                        Registration Information
                                    </h2>

                                    {conference.price && (
                                        <div className="bg-gradient-to-r from-[#0e8601] to-teal-700 text-white p-6 rounded-lg mb-6">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold">
                                                        Conference Fee
                                                    </h3>
                                                    <p className="text-gray-200">Registration required</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-3xl font-bold">
                                                        {conference.price}
                                                    </p>
                                                    <p className="text-sm text-gray-200">per person</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h3 className="font-semibold mb-3">
                                                What&apos;s Included:
                                            </h3>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-center">
                                                    <span className="w-2 h-2 bg-[#0e8601] rounded-full mr-3"></span>
                                                    All conference sessions
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-2 h-2 bg-[#0e8601] rounded-full mr-3"></span>
                                                    Networking opportunities
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-2 h-2 bg-[#0e8601] rounded-full mr-3"></span>
                                                    Conference materials
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-2 h-2 bg-[#0e8601] rounded-full mr-3"></span>
                                                    Digital resources
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-3">
                                                Registration Process:
                                            </h3>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">
                                                        1
                                                    </span>
                                                    Complete registration form
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">
                                                        2
                                                    </span>
                                                    Submit required information
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">
                                                        3
                                                    </span>
                                                    Receive confirmation email
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">
                                                        4
                                                    </span>
                                                    Attend the conference
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {conference.registrationUrl && (
                                        <div className="text-center">
                                            <Link
                                                href={conference.registrationUrl}
                                                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors inline-block"
                                            >
                                                Register Now
                                            </Link>
                                        </div>
                                    )}

                                    {conference.eventStatus === "completed" && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                            <h3 className="font-semibold text-blue-800 mb-2">
                                                Past Event
                                            </h3>
                                            <p className="text-blue-700 text-sm">
                                                This conference has already taken place.
                                                {conference.recordingsAvailable &&
                                                    " Recordings and materials may be available."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 text-[#0e8601] mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Date</p>
                                            <p className="font-semibold">{conference.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-[#0e8601] mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Duration</p>
                                            <p className="font-semibold">{conference.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 text-[#0e8601] mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Venue</p>
                                            <p className="font-semibold">{conference.location}</p>
                                        </div>
                                    </div>
                                    {hasVideos && (
                                        <div className="flex items-center">
                                            <Play className="w-5 h-5 text-[#0e8601] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Videos Available
                                                </p>
                                                <p className="font-semibold">
                                                    {conferenceVideos.length} Video
                                                    {conferenceVideos.length !== 1 ? "s" : ""}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Video Quick Access */}
                            {hasVideos && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-4">Conference Videos</h3>
                                    <div className="space-y-3">
                                        {conferenceVideos.slice(0, 3).map((video, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setActiveVideoIndex(index);
                                                    setActiveSection("videos");
                                                }}
                                                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-start">
                                                    <div className="w-8 h-6 bg-[#0e8601] rounded flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                                        <Play className="w-3 h-3 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm break-words leading-tight">
                                                            {video.title || `Video ${index + 1}`}
                                                        </p>
                                                        {video.description && (
                                                            <p className="text-xs text-gray-600 mt-1 break-words line-clamp-2">
                                                                {video.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                        {conferenceVideos.length > 3 && (
                                            <button
                                                onClick={() => setActiveSection("videos")}
                                                className="w-full text-center mt-2 text-[#0e8601] hover:text-teal-700 font-medium text-sm"
                                            >
                                                View All {conferenceVideos.length} Videos →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Concept Note Download Card */}
                            {conference.conceptNoteUrl && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-4">
                                        Conference Documents
                                    </h3>
                                    <div className="space-y-3">
                                        <div
                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={handleConceptNoteDownload}
                                        >
                                            <FileText className="w-5 h-5 text-[#0e8601] mr-3" />
                                            <div>
                                                <p className="font-medium text-sm">Concept Note</p>
                                                <p className="text-xs text-gray-600">PDF Document</p>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-400 ml-auto" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                <div className="space-y-3">
                                    {conference.contactEmail && (
                                        <div className="flex items-center">
                                            <Mail className="w-5 h-5 text-[#0e8601] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-600">Email</p>
                                                <a
                                                    href={`mailto:${conference.contactEmail}`}
                                                    className="font-semibold text-[#0e8601] hover:underline"
                                                >
                                                    {conference.contactEmail}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {conference.contactPhone && (
                                        <div className="flex items-center">
                                            <Phone className="w-5 h-5 text-[#0e8601] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-600">Phone</p>
                                                <a
                                                    href={`tel:${conference.contactPhone}`}
                                                    className="font-semibold text-[#0e8601] hover:underline"
                                                >
                                                    {conference.contactPhone}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 text-[#0e8601] mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Organizer</p>
                                            <p className="font-semibold">{conference.organizer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Registration CTA */}
                            {conference.registrationUrl &&
                                conference.eventStatus !== "completed" && (
                                    <div className="bg-gradient-to-r from-[#0e8601] to-teal-700 text-white rounded-lg p-6 text-center">
                                        <h3 className="text-xl font-bold mb-2">Ready to Join?</h3>
                                        <p className="text-gray-200 mb-4">
                                            Secure your spot at this exciting conference
                                        </p>
                                        <Link
                                            href={conference.registrationUrl}
                                            className="bg-white text-[#0e8601] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                                        >
                                            Register Now
                                        </Link>
                                    </div>
                                )}

                            {/* Share Options */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">
                                    Share This Conference
                                </h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={handleShare}
                                        className="w-full flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <Share2 className="w-5 h-5 text-[#0e8601] mr-3" />
                                        <span className="font-medium">Share Conference</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Related Conferences
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {conferences
                                .filter(
                                    (conf) =>
                                        conf.id !== conferenceId &&
                                        conf.category === conference.category
                                )
                                .slice(0, 3)
                                .map((relatedConf) => (
                                    <Link
                                        key={relatedConf.id}
                                        href={`/ConferencePage/${relatedConf.id}`}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <div className="relative h-48">
                                            <Image
                                                src={
                                                    relatedConf.heroImage ||
                                                    "/img/default-conference-hero.jpg"
                                                }
                                                alt={relatedConf.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40"></div>
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <h3 className="font-semibold text-lg mb-1">
                                                    {relatedConf.title}
                                                </h3>
                                                <p className="text-sm text-gray-200">
                                                    {relatedConf.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-gray-600 text-sm mb-2">
                                                {relatedConf.description}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span>{relatedConf.location}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ConferenceDetail;