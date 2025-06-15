'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 6;

    const images = [
        {
            id: 1,
            src: "/img/conf1.jpg",
            alt: "Gallery Image 1",
            title: "Conference"
        },
        {
            id: 2,
            src: "/img/conf2.jpg",
            alt: "Gallery Image 2",
            title: "Conference"
        },
        {
            id: 3,
            src: "/img/conf3.jpg",
            alt: "Gallery Image 3",
            title: "Conference"
        },
        {
            id: 4,
            src: "/img/conf4.jpg",
            alt: "Gallery Image 4",
            title: "Conference"
        },
        {
            id: 5,
            src: "/img/conf5.jpg",
            alt: "Gallery Image 5",
            title: "Conference"
        },
        {
            id: 6,
            src: "/img/conf6.jpg",
            alt: "Gallery Image 6",
            title: "Conference"
        },
        {
            id: 7,
            src: "/img/conf7.jpg",
            alt: "Gallery Image 7",
            title: "Conference"
        },
        {
            id: 8,
            src: "/img/conf8.jpg",
            alt: "Gallery Image 8",
            title: "Conference"
        },
        {
            id: 9,
            src: "/img/conf9.jpg",
            alt: "Gallery Image 9",
            title: "Conference"
        }
    ];

    const totalPages = Math.ceil(images.length / imagesPerPage);
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const currentImages = images.slice(startIndex, endIndex);

    const openModal = (image, index) => {
        const actualIndex = startIndex + index;
        setSelectedImage(image);
        setCurrentIndex(actualIndex);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        const newIndex = direction === 'next'
            ? (currentIndex + 1) % images.length
            : (currentIndex - 1 + images.length) % images.length;

        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 dark:from-[#021d49] dark:via-[#034785] dark:to-[#0e8601] p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 bg-gradient-to-r from-[#021d49] to-[#0e8601] dark:from-white dark:to-green-200 bg-clip-text text-transparent">
                        Gallery Showcase
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-blue-100 max-w-2xl mx-auto">
                        Explore our stunning collection of images. Click on any image to view it in full detail.
                    </p>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Showing {startIndex + 1}-{Math.min(endIndex, images.length)} of {images.length} images
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 hover:border-[#0e8601]/50 dark:hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#0e8601]/20 dark:hover:shadow-green-500/20 cursor-pointer"
                            onClick={() => openModal(image, index)}
                        >
                            <div className="aspect-square overflow-hidden relative">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority={index < 3} // Prioritize first 3 images for faster loading
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-semibold text-lg mb-2">{image.title}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-200 text-sm">Click to view</span>
                                        <ZoomIn className="w-5 h-5 text-green-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-gray-300/30 dark:via-white/20 to-transparent skew-x-12"></div>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${currentPage === 1
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                                    : 'bg-white/80 dark:bg-white/10 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 hover:bg-[#0e8601]/10 dark:hover:bg-green-400/10 hover:border-[#0e8601]/50 dark:hover:border-green-400/50'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Previous</span>
                            </button>

                            <div className="flex items-center space-x-1">
                                {getPageNumbers().map((page, index) => (
                                    <React.Fragment key={index}>
                                        {page === '...' ? (
                                            <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                                        ) : (
                                            <button
                                                onClick={() => goToPage(page)}
                                                className={`px-3 py-2 rounded-lg border transition-all duration-200 min-w-[40px] ${currentPage === page
                                                    ? 'bg-[#0e8601] dark:bg-green-400 text-white border-[#0e8601] dark:border-green-400 shadow-lg'
                                                    : 'bg-white/80 dark:bg-white/10 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 hover:bg-[#0e8601]/10 dark:hover:bg-green-400/10 hover:border-[#0e8601]/50 dark:hover:border-green-400/50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${currentPage === totalPages
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                                    : 'bg-white/80 dark:bg-white/10 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 hover:bg-[#0e8601]/10 dark:hover:bg-green-400/10 hover:border-[#0e8601]/50 dark:hover:border-green-400/50'
                                    }`}
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {totalPages > 5 && (
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Quick jump:</span>
                                <button
                                    onClick={() => goToPage(1)}
                                    className="text-[#0e8601] dark:text-green-400 hover:underline"
                                >
                                    First
                                </button>
                                <span className="text-gray-300 dark:text-gray-600">|</span>
                                <button
                                    onClick={() => goToPage(totalPages)}
                                    className="text-[#0e8601] dark:text-green-400 hover:underline"
                                >
                                    Last
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                        <div className="relative max-w-4xl max-h-[90vh] w-full">
                            <button
                                onClick={closeModal}
                                className="absolute -top-12 right-0 z-10 p-2 rounded-full bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <button
                                onClick={() => navigateImage('prev')}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors duration-200"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={() => navigateImage('next')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors duration-200"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-[#021d49]/20 dark:to-[#0e8601]/20 backdrop-blur-sm border border-gray-300 dark:border-white/30 p-2">
                                <div className="relative w-full" style={{ height: '80vh' }}>
                                    <Image
                                        src={selectedImage.src}
                                        alt={selectedImage.alt}
                                        fill
                                        sizes="100vw"
                                        className="object-contain rounded-xl"
                                        priority
                                    />
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-white/20">
                                    <h3 className="text-gray-800 dark:text-white font-semibold text-xl mb-1">{selectedImage.title}</h3>
                                    <p className="text-gray-600 dark:text-blue-200 text-sm">Image {currentIndex + 1} of {images.length}</p>
                                </div>
                            </div>

                            <div className="flex justify-center mt-4 space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            setSelectedImage(images[index]);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                                            ? 'bg-[#0e8601] dark:bg-green-400 w-6'
                                            : 'bg-gray-400 dark:bg-white/40 hover:bg-gray-600 dark:hover:bg-white/60'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GallerySection;