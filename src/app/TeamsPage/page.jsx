'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const TeamsPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const teamMembers = [
        {
            id: 1,
            name: "Dr.Joanes Atela",
            position: "EXECUTIVE DIRECTOR",
            image: "/img/prof.jpg"
        },
        {
            id: 2,
            name: "Dr. Humphrey Agevi",
            position: "DIRECTOR- PROGRAMME DEVELOPMENT AND DELIVERY",
            image: "/img/Humphrey-Agevi.jpg"
        },
        {
            id: 3,
            name: "Ann Wanjiru Irungu",
            position: "RESEARCH ASSISTANT & CAPCHA COORDINATOR - HEALTH & CLIMATE CHANGE ",
            image: "/img/Ann-irungu.jpg"
        },
        {
            id: 4,
            name: "Dr. Isaiah Maket",
            position: "RESEARCH ASSOCIATE - CLIMATE FINANCE & GENDER AND SOCIAL INCLUSION (GESI)",
            image: "/img/Isaiah-Maket.jpeg"
        }
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, teamMembers.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
            style={{
                background: 'linear-gradient(135deg, rgba(2, 29, 73, 0.08) 0%, rgba(14, 134, 1, 0.08) 100%)',
            }}>
            <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-800/50 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-1 bg-orange-400 dark:bg-orange-500 rounded-full"></div>
                        <span className="text-teal-600 dark:text-teal-400 font-medium text-sm uppercase tracking-wide">
                            Our Team
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Experts Team
                    </h1>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {teamMembers.map((member) => (
                            <div key={member.id} className="w-full flex-shrink-0 px-4">
                                <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 max-w-md mx-auto">
                                    <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-700">
                                        <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-700">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-8 text-center">
                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                                            {member.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium leading-relaxed">
                                            {member.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50"
                        aria-label="Previous team member"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50"
                        aria-label="Next team member"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {teamMembers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                ? 'bg-teal-600 dark:bg-teal-400 scale-125'
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                            aria-label={`Go to team member ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                    >
                        {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamsPage;