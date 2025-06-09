'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react';

const NewsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const articles = [
        {
            id: 1,
            image: "/api/placeholder/350/250",
            author: "David Warner",
            title: "Changes In Landscapes And Wildlife Community",
            date: "Mar 22, 2024"
        },
        {
            id: 2,
            image: "/api/placeholder/350/250",
            author: "Morgan Stanly",
            title: "Let's Take Care of Nature for The Sake of The Earth",
            date: "Mar 17, 2024"
        },
        {
            id: 3,
            image: "/api/placeholder/350/250",
            author: "Michel Hudson",
            title: "Increasing Risk Of Storms, Droughts and Floods",
            date: "Mar 15, 2024"
        },
        {
            id: 4,
            image: "/api/placeholder/350/250",
            author: "Sarah Johnson",
            title: "Climate Change Impact on Marine Life",
            date: "Mar 10, 2024"
        },
        {
            id: 5,
            image: "/api/placeholder/350/250",
            author: "John Smith",
            title: "Renewable Energy Solutions for Tomorrow",
            date: "Mar 8, 2024"
        },
        {
            id: 6,
            image: "/api/placeholder/350/250",
            author: "Emily Davis",
            title: "Protecting Forests for Future Generations",
            date: "Mar 5, 2024"
        }
    ];

    const articlesPerSlide = 3;
    const totalSlides = Math.ceil(articles.length / articlesPerSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };

    const getCurrentArticles = () => {
        const startIndex = currentSlide * articlesPerSlide;
        return articles.slice(startIndex, startIndex + articlesPerSlide);
    };

    return (
        <div className="bg-gray-50 py-16 px-4 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-orange-500 text-sm font-medium">Our Latest News</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                        Our Latest News & Articles
                    </h2>

                    {/* Dark mode toggle */}
                    <div className="absolute top-4 right-4">
                        <button className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                            <Moon size={20} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <ChevronLeft size={24} className="text-gray-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <ChevronRight size={24} className="text-gray-600" />
                    </button>

                    {/* Articles Container */}
                    <div className="overflow-hidden mx-16">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                                        {articles
                                            .slice(slideIndex * articlesPerSlide, (slideIndex + 1) * articlesPerSlide)
                                            .map((article) => (
                                                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                                    {/* Article Image */}
                                                    <div className="relative h-48 overflow-hidden">
                                                        <img
                                                            src={article.image}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>

                                                    {/* Article Content */}
                                                    <div className="p-6">
                                                        {/* Author Info */}
                                                        <div className="flex items-center mb-4">
                                                            {/* <img
                                                                src={article.authorImage}
                                                                alt={article.author}
                                                                className="w-10 h-10 rounded-full mr-3 border-2 border-gray-100"
                                                            /> */}
                                                            <div>
                                                                <p className="text-sm text-gray-500">Posted By</p>
                                                                <p className="text-sm font-medium text-gray-900">{article.author}</p>
                                                            </div>
                                                        </div>

                                                        {/* Article Title */}
                                                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight hover:text-teal-600 transition-colors cursor-pointer">
                                                            {article.title}
                                                        </h3>

                                                        {/* Date */}
                                                        <div className="mb-4">
                                                            <span className="text-sm text-teal-600 flex items-center">
                                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                </svg>
                                                                {article.date}
                                                            </span>
                                                        </div>

                                                        {/* Read More Button */}
                                                        <div className="mt-4">
                                                            <button className="w-full py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 bg-teal-600 text-white hover:bg-orange-500 hover:shadow-md transform hover:-translate-y-0.5">
                                                                Read More →
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 space-x-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-teal-600 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsSection;