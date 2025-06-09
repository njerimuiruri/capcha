'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Heart, DollarSign } from 'lucide-react';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: "/img/healthstethoscope.jpg",
            alt: "Forest conservation"
        },
        {
            id: 2,
            image: "/img/twohandsplant.jpg",
            alt: "Environmental protection"
        },
        {
            id: 3,
            image: "/img/twohandsplant.jpg",
            alt: "Clean earth initiative"
        }
    ];

    const actionCards = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Become A Volunteer",
            subtitle: "Join With Us",
            link: "#volunteer"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Quick Fundraise",
            subtitle: "Help The People",
            link: "#fundraise"
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Make A Donation",
            subtitle: "Donate Us",
            link: "#donate"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="relative h-[85vh] overflow-hidden">
                {/* Background Images */}
                <div className="absolute inset-0">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                className="w-full h-full object-cover"
                            />
                            {/* Extended black gradient - covering more area to the right */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 via-black/70 via-black/50 via-black/30 to-black/10"></div>
                        </div>
                    ))}
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-[85vh] flex flex-col">
                    {/* Main Hero Content */}
                    <div className="flex-1 flex items-end pb-32">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="max-w-3xl mb-16">
                                <div className="mb-6">
                                    <span className="text-[#ff9500] font-semibold text-sm md:text-base tracking-wide uppercase hover:text-[#ffb366] transition-colors duration-300 cursor-default">
                                        We'll Save Our Planet
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up hover:scale-[1.02] transition-transform duration-500 cursor-default">
                                    Let's Start Using{' '}
                                    <span className="text-transparent bg-gradient-to-r from-[#55bdd0] to-[#0e8601] bg-clip-text hover:from-[#6bcde0] hover:to-[#1ea611] transition-all duration-500">
                                        Green Energy For A Better Planet
                                    </span>
                                </h1>

                                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up animation-delay-300 hover:text-gray-200 transition-colors duration-300 cursor-default">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin consectetur netus dui,
                                    ultrices or lectus ac egestas. Vivamus tellus vestibulum aliquet arcu a duis.
                                </p>

                                <button className="bg-[#ff9500] hover:bg-[#e6850e] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-600 hover:shadow-[#ff9500]/25">
                                    Join With us
                                </button>
                            </div>
                        </div>

                        {/* Navigation Controls - Right Side */}
                        <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6 z-20">
                            {/* Left Arrow */}
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>

                            {/* Right Arrow */}
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>

                            {/* Vertical Slide Indicators */}
                            <div className="flex flex-col space-y-3 mt-4">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-16 h-16 rounded-full border-2 overflow-hidden transition-all duration-300 ${index === currentSlide
                                            ? 'border-[#ff9500] scale-110'
                                            : 'border-white/40 hover:border-white/60 hover:scale-105'
                                            }`}
                                    >
                                        <img
                                            src={slides[index].image}
                                            alt={slides[index].alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Cards Section - Larger and with decorative elements */}
            <div className="relative z-30 -mt-24">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center">
                        <div className="relative bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full animate-slide-up">

                            {/* Enhanced Decorative Tree Image - Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-25 pointer-events-none overflow-hidden">
                                <svg viewBox="0 0 200 200" className="w-full h-full text-green-500/40">
                                    {/* Tree trunk */}
                                    <rect x="90" y="160" width="20" height="40" fill="rgb(139, 69, 19)" opacity="0.8" />
                                    {/* Tree foliage layers */}
                                    <ellipse cx="100" cy="140" rx="35" ry="25" fill="currentColor" />
                                    <ellipse cx="100" cy="120" rx="40" ry="30" fill="currentColor" />
                                    <ellipse cx="100" cy="100" rx="45" ry="35" fill="currentColor" />
                                    <ellipse cx="100" cy="80" rx="35" ry="25" fill="currentColor" />
                                    {/* Additional foliage details */}
                                    <circle cx="85" cy="110" r="15" fill="currentColor" opacity="0.7" />
                                    <circle cx="115" cy="125" r="18" fill="currentColor" opacity="0.6" />
                                    <circle cx="100" cy="95" r="12" fill="currentColor" opacity="0.8" />
                                </svg>
                            </div>

                            {/* Enhanced Decorative Elements - Top Right */}
                            <div className="absolute top-6 right-6 w-40 h-40 opacity-20 pointer-events-none">
                                <div className="w-full h-full relative">
                                    {/* Nature-inspired decorative elements */}
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-400/30 rounded-full blur-xl"></div>
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-blue-400/40 rounded-full blur-lg"></div>
                                    <div className="absolute top-8 right-8 w-8 h-8 bg-yellow-400/25 rounded-full blur-md"></div>

                                    {/* Leaf-like shapes */}
                                    <svg viewBox="0 0 100 100" className="absolute top-2 right-2 w-20 h-20 text-green-400/20">
                                        <path d="M20 50 Q30 30, 50 40 Q70 30, 80 50 Q70 70, 50 60 Q30 70, 20 50" fill="currentColor" />
                                        <path d="M10 30 Q20 10, 40 20 Q60 10, 70 30 Q60 50, 40 40 Q20 50, 10 30" fill="currentColor" opacity="0.6" />
                                    </svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 relative z-10">
                                {actionCards.map((card, index) => (
                                    <div key={index} className="relative group">
                                        {/* Vertical Divider Lines */}
                                        {index < actionCards.length - 1 && (
                                            <div className="hidden md:block absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                                        )}

                                        <div className="p-12 hover:bg-white/5 transition-all duration-300 cursor-pointer">
                                            <div className="flex flex-col items-center text-center space-y-6">
                                                <div className="w-20 h-20 bg-gradient-to-br from-[#ff9500] to-[#ff9500]/80 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                                                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                                                        {React.cloneElement(card.icon, { className: "w-10 h-10" })}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-white font-bold text-2xl mb-3 hover:text-[#ff9500] transition-colors duration-300 cursor-default">{card.title}</h3>
                                                    <div className="flex items-center justify-center space-x-2 text-[#ff9500] font-semibold text-lg hover:text-[#ffb366] transition-colors duration-300 cursor-pointer">
                                                        <span>{card.subtitle}</span>
                                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(60px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animate-slide-up {
                    animation: slide-up 1s ease-out forwards;
                    animation-delay: 1s;
                    opacity: 0;
                }
                
                .animation-delay-300 {
                    animation-delay: 0.3s;
                    opacity: 0;
                }
                
                .animation-delay-600 {
                    animation-delay: 0.6s;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default HeroSection;