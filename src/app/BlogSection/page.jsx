'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import Image from 'next/image';
const BlogSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const articles = [
        {
            id: 1,
            image: "/img/twohandsplant.jpg",
            author: "Admin",
            title: "Technical Report: Building Effective Communities of Practice...",
            date: "August 28 2024"
        },
        {
            id: 2,
            image: "/img/twohandsplant.jpg",
            author: "Admin",
            title: "Policy Brief: Opportunities for Enhancing Transdisciplinary Research ...",
            date: "August 28 2024"
        },
        {
            id: 3,
            image: "/img/twohandsplant.jpg",
            author: "Michel Hudson",
            title: "Increasing Risk Of Storms, Droughts and Floods",
            date: "August 28 2024"
        },
        {
            id: 4,
            image: "/img/twohandsplant.jpg",
            author: "Ann Irungu, Emily Bolo, Florence Onyango",
            title: "Climate Change and Health: Bridging the Attribution ...",
            date: "August 26, 2024"
        },
        {
            id: 5,
            image: "/img/twohandsplant.jpg",
            author: "John Smith",
            title: "Renewable Energy Solutions for Tomorrow",
            date: "Mar 8, 2024"
        },
        {
            id: 6,
            image: "/img/twohandsplant.jpg",
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
        <div className="bg-gray-50  dark:bg-gray-900 py-16 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-[#0e8601] text-sm font-medium">Our Latest News</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                        Our Latest News & Articles
                    </h2>

                    <div className="absolute top-4 right-4">
                        <button className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                            <Moon size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative">
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
                                                    <div className="relative h-48 overflow-hidden">
                                                        <Image
                                                            src={article.image}
                                                            alt={article.title}
                                                            fill
                                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>

                                                    <div className="p-6">
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

                                                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight hover:text-[#0e8601] transition-colors cursor-pointer">
                                                            {article.title}
                                                        </h3>

                                                        <div className="mb-4">
                                                            <span className="text-sm text-[#0e8601] flex items-center">
                                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                </svg>
                                                                {article.date}
                                                            </span>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button className="w-full py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 bg-[#0e8601] text-white hover:bg-[#0e8601] hover:shadow-md transform hover:-translate-y-0.5">
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

                <div className="flex justify-center mt-8 space-x-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-[#0e8601] scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSection;