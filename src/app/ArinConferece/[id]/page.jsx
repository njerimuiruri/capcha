'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Clock, Users, Mail, Phone, ChevronDown, ChevronUp, Share2, Bookmark, Download, FileText, ImageIcon } from 'lucide-react';
import { conferences } from '@/data/conference';
import Link from "next/link";
import Image from "next/image";

import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const ConferenceDetail = () => {
    const params = useParams();
    const conferenceId = parseInt(params.id);
    const [activeSection, setActiveSection] = useState('overview');
    const [imageError, setImageError] = useState(false);

    const conference = conferences.find(conf => conf.id === conferenceId);

    if (!conference) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Conference Not Found</h1>
                        <p className="text-gray-600 mb-8">The conference you&apos;re looking for doesn&apos;t exist.</p>
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
            alert('Link copied to clipboard!');
        }
    };

    const handleConceptNoteDownload = () => {
        if (conference.conceptNoteUrl) {
            const link = document.createElement('a');
            link.href = conference.conceptNoteUrl;
            link.download = `${conference.title}-concept-note.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const getConferenceImage = () => {
        if (conference.heroImage && !imageError) {
            return conference.heroImage;
        }

        const categoryImages = {
            climate: '/img/climate-conference-hero.jpg',
            research: '/img/research-conference-hero.jpg',
            health: '/img/health-conference-hero.jpg',
            environment: '/img/environment-conference-hero.jpg'
        };

        return categoryImages[conference.category] || '/img/default-conference-hero.jpg';
    };

    const getCategoryGradient = () => {
        const gradients = {
            climate: 'from-blue-600 to-green-600',
            research: 'from-purple-600 to-blue-600',
            health: 'from-red-500 to-pink-600',
            environment: 'from-green-600 to-emerald-600'
        };

        return gradients[conference.category] || 'from-[#0e8601] to-teal-700';
    };

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
                            <div className={`w-full h-full bg-gradient-to-r ${getCategoryGradient()}`} />
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

                                <h1 className="text-4xl md:text-5xl font-bold mb-6">{conference.title}</h1>
                                <p className="text-xl text-gray-200 mb-8">{conference.description}</p>

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

                            <div className="relative">
                                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm">
                                    {conference.videoUrl ? (
                                        <iframe
                                            src={conference.videoUrl}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="container mx-auto px-4">
                        <div className="flex space-x-8 overflow-x-auto">
                            {['overview', 'registration'].map((section) => (
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
                            {/* Temporarily commented out until we have complete information */}
                            {/* 
                            {['agenda', 'speakers'].map((section) => (
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
                            */}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {activeSection === 'overview' && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">Conference Overview</h2>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {conference.description} This comprehensive event brings together industry leaders,
                                        innovators, and professionals to explore the latest trends, share insights, and
                                        build meaningful connections.
                                    </p>

                                    {(conference.callForSideEvent || conference.callForAbstract) && (
                                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                                            {conference.callForSideEvent && (
                                                <div className="bg-gray-50 p-6 rounded-lg">
                                                    <h3 className="font-semibold mb-2 text-[#0e8601]">Special Sessions</h3>
                                                    <p className="text-gray-700 text-sm">{conference.callForSideEvent}</p>
                                                </div>
                                            )}
                                            {conference.callForAbstract && (
                                                <div className="bg-gray-50 p-6 rounded-lg">
                                                    <h3 className="font-semibold mb-2 text-[#0e8601]">Abstract Submissions</h3>
                                                    <p className="text-gray-700 text-sm">{conference.callForAbstract}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {conference.tags && conference.tags.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-4">Conference Topics</h3>
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
                                            <h3 className="text-xl font-semibold mb-4">Partners & Collaborators</h3>
                                            <div className="grid md:grid-cols-2 gap-2">
                                                {conference.partners.map((partner, index) => (
                                                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                                                        <div className="w-2 h-2 bg-[#0e8601] rounded-full mr-3"></div>
                                                        <span className="text-sm text-gray-700">{partner}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* 
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
                            */}

                            {/* COMMENTED OUT - Speakers section until we have complete information */}
                            {/* 
                            {activeSection === 'speakers' && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">Featured Speakers</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {conference.speakers.map((speaker, index) => (
                                            <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    width={64}
                                                    height={64}
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
                            */}
                            {activeSection === 'registration' && (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-3xl font-bold mb-6">Registration Information</h2>

                                    {conference.price && (
                                        <div className="bg-gradient-to-r from-[#0e8601] to-teal-700 text-white p-6 rounded-lg mb-6">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold">Conference Fee</h3>
                                                    <p className="text-gray-200">Registration required</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-3xl font-bold">{conference.price}</p>
                                                    <p className="text-sm text-gray-200">per person</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h3 className="font-semibold mb-3">What&apos;s Included:</h3>
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
                                            <h3 className="font-semibold mb-3">Registration Process:</h3>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">1</span>
                                                    Complete registration form
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="w-6 h-6 bg-[#0e8601] text-white rounded-full text-xs flex items-center justify-center mr-3">2</span>
                                                    Submit required information
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

                                    {conference.eventStatus === 'completed' && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                            <h3 className="font-semibold text-blue-800 mb-2">Past Event</h3>
                                            <p className="text-blue-700 text-sm">
                                                This conference has already taken place.
                                                {conference.recordingsAvailable && ' Recordings and materials may be available.'}
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
                                </div>
                            </div>

                            {/* Concept Note Download Card */}
                            {conference.conceptNoteUrl && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-4">Conference Documents</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                                            <FileText className="w-8 h-8 text-[#0e8601] mr-3" />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">Concept Note</p>
                                                <p className="text-sm text-gray-600">PDF Document</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleConceptNoteDownload}
                                            className="w-full flex items-center justify-center px-4 py-3 bg-[#0e8601] text-white rounded-lg hover:bg-teal-700 transition-colors"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Concept Note
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Contact Organizer */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">Contact Organizer</h3>
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={conference.organizerImage}
                                        alt={conference.organizer}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{conference.organizer}</p>
                                        <p className="text-sm text-gray-600">Event Organizer</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <a href="mailto:info@arin-africa.org" className="block">
                                        <button className="w-full flex items-center justify-center px-4 py-2 border border-[#0e8601] text-[#0e8601] rounded-lg hover:bg-[#0e8601] hover:text-white transition-colors">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Send Email
                                        </button>
                                    </a>
                                    <a href="tel:+254746130873" className="block">
                                        <button className="w-full flex items-center justify-center px-4 py-2 border border-[#0e8601] text-[#0e8601] rounded-lg hover:bg-[#0e8601] hover:text-white transition-colors">
                                            <Phone className="w-4 h-4 mr-2" />
                                            Call Now
                                        </button>
                                    </a>
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
                                                href={`/ArinConference/${relatedConf.id}`}
                                                className="block group"
                                            >
                                                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#0e8601] transition-colors mb-2">
                                                        {relatedConf.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mb-2">{relatedConf.date}</p>
                                                    {relatedConf.price && (
                                                        <p className="text-sm font-semibold text-[#0e8601]">{relatedConf.price}</p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                                <Link
                                    href="/ArinConference"
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