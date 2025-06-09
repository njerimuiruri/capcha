'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TeamsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const teamMembers = [
        {
            id: 1,
            name: "An Wanjiru Irungu",
            position: "RESEARCH ASSISTANT & CAPCHA COORDINATOR - HEALTH, CLIMATE CHANGE & ENERGY",
            image: "/img/Ann-irungu.jpg"
        },
        {
            id: 2,
            name: "Dr. Isaiah Maket",
            position: "RESEARCH ASSOCIATE - CLIMATE FINANCE & GENDER AND SOCIAL INCLUSION (GESI)",
            image: "/img/Isaiah-Maket.jpeg"
        },
        {
            id: 3,
            name: "Dr. Isaiah Maket",
            position: "RESEARCH ASSOCIATE - CLIMATE FINANCE & GENDER AND SOCIAL INCLUSION (GESI)",

            image: "/img/Isaiah-Maket.jpeg"
        },


    ];

    const itemsPerPage = {
        mobile: 1,
        tablet: 2,
        desktop: 4
    };

    const getVisibleItems = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return teamMembers.slice(currentIndex, currentIndex + 1);
        }
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            return teamMembers.slice(currentIndex, currentIndex + 2);
        }
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-1 bg-orange-400 dark:bg-orange-500 rounded-full"></div>
                        <span className="text-teal-600 dark:text-teal-400 font-medium text-sm uppercase tracking-wide">
                            Our Volunteer
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Experts Volunteer
                    </h1>
                </div>

                {/* Team Members Grid */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        disabled={!canGoPrev()}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-200 ${canGoPrev()
                            ? 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            }`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canGoNext()}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-200 ${canGoNext()
                            ? 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            }`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Team Members Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                        {getVisibleItems().map((member) => (
                            <div key={member.id} className="group">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                                    {/* Profile Image */}
                                    <div className="relative">
                                        <div className="w-full h-80 bg-gray-100 dark:bg-gray-700">
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
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {member.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
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
                                ? 'bg-teal-600 dark:bg-teal-500'
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamsPage;