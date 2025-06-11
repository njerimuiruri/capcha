'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Clock, Users, Mail, Phone, ChevronDown, ChevronUp, Share2, Bookmark } from 'lucide-react';
import { conferences } from '@/data/conference';
import Link from "next/link";

import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const ConferenceDetail = () => {
    const params = useParams();
    const conferenceId = parseInt(params.id);
    const [activeSection, setActiveSection] = useState('overview');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showFullAgenda, setShowFullAgenda] = useState(false);

    const conference = conferences.find(conf => conf.id === conferenceId);

    if (!conference) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Conference Not Found</h1>
                        <p className="text-gray-600 mb-8">The conference you're looking for doesn't exist.</p>
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

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: conference.title,
                text: conference.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative mt-32 bg-gradient-to-r from-[#0e8601] to-teal-700 text-white">
                    <div className="container mx-auto px-4 py-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Conference Info */}
                            <div>
                                <div className="flex items-center mb-4">
                                    <img
                                        src={conference.organizerImage}
                                        alt={conference.organizer}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="text-gray-200 text-sm">Organized by</p>
                                        <p className="font-semibold">{conference.organizer}</p>
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6">{conference.title}</h1>
                                <p className="text-xl text-gray-200 mb-8">{conference.description}</p>

                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-3 text-gray-200" />
                                        <div>
                                            <p className="text-sm text-gray-200">Date</p>
                                            <p className="font-semibold">{conference.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 mr-3 text-gray-200" />
                                        <div>
                                            <p className="text-sm text-gray-200">Time</p>
                                            <p className="font-semibold">{conference.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-3 text-gray-200" />
                                        <div>
                                            <p className="text-sm text-gray-200">Location</p>
                                            <p className="font-semibold">{conference.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <DollarSign className="w-5 h-5 mr-3 text-gray-200" />
                                        <div>
                                            <p className="text-sm text-gray-200">Price</p>
                                            <p className="font-semibold text-2xl">{conference.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                                        Register Now
                                    </button>
                                    <button
                                        onClick={handleBookmark}
                                        className={`px-4 py-3 rounded-lg border-2 border-white transition-colors ${isBookmarked
                                            ? 'bg-white text-[#0e8601]'
                                            : 'text-white hover:bg-white hover:text-[#0e8601]'
                                            }`}
                                    >
                                        <Bookmark className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="px-4 py-3 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#0e8601] transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Conference Video */}
                            <div className="relative">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                                    <iframe
                                        src={conference.videoUrl}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="container mx-auto px-4">
                        <div className="flex space-x-8 overflow-x-auto">
                            {['overview', 'agenda', 'speakers', 'registration'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={`py-4 px-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeSection === section
                                        ? 'border-[#0e8601] text-[#0e8601]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2">
                            {/* Overview Section */}
                            {activeSection === 'overview' && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">Conference Overview</h2>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {conference.description} This comprehensive event brings together industry leaders,
                                        innovators, and professionals to explore the latest trends, share insights, and
                                        build meaningful connections.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="font-semibold mb-2 text-[#0e8601]">Side Event</h3>
                                            <p className="text-gray-700 text-sm">{conference.callForSideEvent}</p>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="font-semibold mb-2 text-[#0e8601]">Call for Abstracts</h3>
                                            <p className="text-gray-700 text-sm">{conference.callForAbstract}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-4">Conference Tags</h3>
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
                                </div>
                            )}

                            {/* Agenda Section */}
                            {activeSection === 'agenda' && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-3xl font-bold">Conference Agenda</h2>
                                        <button
                                            onClick={() => setShowFullAgenda(!showFullAgenda)}
                                            className="flex items-center text-[#0e8601] hover:text-teal-700 transition-colors"
                                        >
                                            {showFullAgenda ? 'Show Less' : 'Show All'}
                                            {showFullAgenda ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {(showFullAgenda ? conference.agenda : conference.agenda.slice(0, 3)).map((item, index) => (
                                            <div key={index} className="flex items-start border-l-4 border-[#0e8601] pl-6 py-4">
                                                <div className="bg-[#0e8601] text-white px-3 py-1 rounded text-sm font-medium mr-4 min-w-fit">
                                                    {item.time}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{item.activity}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Speakers Section */}
                            {activeSection === 'speakers' && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">Featured Speakers</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {conference.speakers.map((speaker, index) => (
                                            <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                                <img
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{speaker.name}</h3>
                                                    <p className="text-gray-600 text-sm">{speaker.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Registration Section */}
                            {activeSection === 'registration' && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">Registration Information</h2>

                                    <div className="bg-gradient-to-r from-[#0e8601] to-teal-700 text-white p-6 rounded-lg mb-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-xl font-semibold">Conference Fee</h3>
                                                <p className="text-gray-200">Early bird pricing available</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-bold">{conference.price}</p>
                                                <p className="text-sm text-gray-200">per person</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h3 className="font-semibold mb-3">What's Included:</h3>
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
                                                    Meals and refreshments
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-3">Registration Process:</h3>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">1</span>
                                                    Complete registration form
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">2</span>
                                                    Make payment online
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">3</span>
                                                    Receive confirmation email
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">4</span>
                                                    Attend the conference
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors">
                                            Register Now
                                        </button>
                                        <p className="text-gray-600 text-sm mt-2">Secure payment powered by Stripe</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info Card */}
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
                                            <p className="text-sm text-gray-600">Time</p>
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
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 text-[#0e8601] mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Speakers</p>
                                            <p className="font-semibold">{conference.speakers.length} Featured</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Organizer */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Contact Organizer</h3>
                                <div className="flex items-center mb-4">
                                    <img
                                        src={conference.organizerImage}
                                        alt={conference.organizer}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold">{conference.organizer}</p>
                                        <p className="text-sm text-gray-600">Event Organizer</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-center px-4 py-2 border border-[#0e8601] text-[#0e8601] rounded-lg hover:bg-[#0e8601] hover:text-white transition-colors">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Email
                                    </button>
                                    <button className="w-full flex items-center justify-center px-4 py-2 border border-[#0e8601] text-[#0e8601] rounded-lg hover:bg-[#0e8601] hover:text-white transition-colors">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call Now
                                    </button>
                                </div>
                            </div>

                            {/* Related Conferences */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Related Conferences</h3>
                                <div className="space-y-4">
                                    {conferences
                                        .filter(conf => conf.id !== conferenceId && conf.category === conference.category)
                                        .slice(0, 2)
                                        .map((relatedConf) => (
                                            <Link
                                                key={relatedConf.id}
                                                href={`/ConferencePage/${relatedConf.id}`}
                                                className="block group"
                                            >
                                                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#0e8601] transition-colors mb-2">
                                                        {relatedConf.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mb-2">{relatedConf.date}</p>
                                                    <p className="text-sm font-semibold text-[#0e8601]">{relatedConf.price}</p>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                                <Link
                                    href="/ConferencePage"
                                    className="block text-center mt-4 text-[#0e8601] hover:text-teal-700 font-medium"
                                >
                                    View All Conferences →
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

export default ConferenceDetail;