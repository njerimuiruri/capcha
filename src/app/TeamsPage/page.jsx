'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TeamsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const teamMembers = [
        {
            id: 1,
            name: "Kevin Thompson",
            position: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Isabella Woods",
            position: "Chief Marketing Officer",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Liam Stokes",
            position: "Senior Executive",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Lucy Floyd",
            position: "Accounts Manager",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 5,
            name: "Michael Chen",
            position: "Lead Developer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 6,
            name: "Sarah Johnson",
            position: "UX Designer",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face"
        }
    ];

    const itemsPerPage = {
        mobile: 1,
        tablet: 2,
        desktop: 4
    };

    const getVisibleItems = () => {
        // For mobile: show 1 item
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return teamMembers.slice(currentIndex, currentIndex + 1);
        }
        // For tablet: show 2 items
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            return teamMembers.slice(currentIndex, currentIndex + 2);
        }
        // For desktop: show 4 items
        return teamMembers.slice(currentIndex, currentIndex + 4);
    };

    const canGoNext = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return currentIndex < teamMembers.length - 1;
        }
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            return currentIndex < teamMembers.length - 2;
        }
        return currentIndex < teamMembers.length - 4;
    };

    const canGoPrev = () => {
        return currentIndex > 0;
    };

    const handleNext = () => {
        if (canGoNext()) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (canGoPrev()) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-1 bg-orange-400 rounded-full"></div>
                        <span className="text-teal-600 font-medium text-sm uppercase tracking-wide">
                            Our Volunteer
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Experts Volunteer
                    </h1>
                </div>

                {/* Team Members Grid */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        disabled={!canGoPrev()}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${canGoPrev()
                            ? 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                            : 'text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canGoNext()}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${canGoNext()
                            ? 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                            : 'text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Team Members Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                        {getVisibleItems().map((member) => (
                            <div key={member.id} className="group">
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                                    {/* Profile Image */}
                                    <div className="relative">
                                        <div className="w-full h-80 bg-gray-100">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Member Info Card - Attached to bottom */}
                                    <div className="p-6">
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {member.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm font-medium">
                                                {member.position}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-12 space-x-2">
                    {Array.from({ length: Math.ceil(teamMembers.length / 4) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index * 4)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${Math.floor(currentIndex / 4) === index
                                ? 'bg-teal-600'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>


            </div>
        </div>
    );
};

export default TeamsPage;