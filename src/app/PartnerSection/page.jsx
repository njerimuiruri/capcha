'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const PartnerSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const partners = [
        {
            id: 1,
            name: "ARIN",
            logo: "/img/Arin.png",
            description: "Africa Research Impact Network"
        },
        {
            id: 2,
            name: "Africa Climate & Health Alliance",
            logo: "/img/acha.webp",
            description: "Africa Research Impact Network"
        },
        // {
        //     id: 2,
        //     name: "World Bank",
        //     logo: "/img/partners/worldbank-logo.png",
        //     description: "International Financial Institution"
        // },
        // {
        //     id: 3,
        //     name: "USAID",
        //     logo: "/img/partners/usaid-logo.png",
        //     description: "United States Agency for International Development"
        // },
        // {
        //     id: 4,
        //     name: "WHO",
        //     logo: "/img/partners/who-logo.png",
        //     description: "World Health Organization"
        // },
        // {
        //     id: 5,
        //     name: "UNDP",
        //     logo: "/img/partners/undp-logo.png",
        //     description: "United Nations Development Programme"
        // },
        // {
        //     id: 6,
        //     name: "African Union",
        //     logo: "/img/partners/au-logo.png",
        //     description: "Continental Union of African States"
        // },
        // {
        //     id: 7,
        //     name: "EU",
        //     logo: "/img/partners/eu-logo.png",
        //     description: "European Union"
        // },
        // {
        //     id: 8,
        //     name: "Climate Fund",
        //     logo: "/img/partners/climate-fund-logo.png",
        //     description: "Green Climate Fund Initiative"
        // },
        // {
        //     id: 9,
        //     name: "CGIAR",
        //     logo: "/img/partners/cgiar-logo.png",
        //     description: "Global Research Partnership"
        // }
    ];

    const totalSlides = Math.ceil(partners.length / 3);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative"
            style={{
                backgroundImage: 'url("/img/background.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-1 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                        <span className="text-orange-600 dark:text-orange-400 font-medium text-sm uppercase tracking-wide">
                            Our Partners
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Trusted Partners
                    </h2>

                </div>

                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                            const slidePartners = partners.slice(slideIndex * 3, slideIndex * 3 + 3);
                            return (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                                        {slidePartners.map((partner) => (
                                            <div key={partner.id} className="group">
                                                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col items-center justify-center text-center hover:scale-105">
                                                    <div className="w-58 h-58 mb-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                                                        <Image
                                                            src={partner.logo}
                                                            alt={`${partner.name} logo`}
                                                            fill

                                                            className="object-contain"

                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="hidden w-full h-full items-center justify-center text-2xl font-bold text-gray-400 dark:text-gray-500">
                                                            {partner.name.charAt(0)}
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                        {partner.name}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                                        {partner.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 z-10"
                        aria-label="Previous partners"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 z-10"
                        aria-label="Next partners"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center mt-12 space-x-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                ? 'bg-teal-600 dark:bg-teal-400 scale-125'
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                            aria-label={`Go to partners group ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg className={`w-4 h-4 ${isAutoPlaying ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                        <svg className={`w-4 h-4 ${isAutoPlaying ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PartnerSection;