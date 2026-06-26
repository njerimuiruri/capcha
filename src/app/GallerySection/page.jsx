'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PREVIEW_IMAGES = [
    { src: '/img/conf1.jpg',  alt: 'Opening Ceremony',  label: 'Conference' },
    { src: '/img/conf2.jpg',  alt: 'Keynote Session',   label: 'Conference' },
    { src: '/img/conf3.jpg',  alt: 'Panel Discussion',  label: 'Conference' },
    { src: '/img/conf4.jpg',  alt: 'Networking Event',  label: 'Conference' },
    { src: '/img/conf5.jpg',  alt: 'Workshop Session',  label: 'Conference' },
];

const GallerySection = () => (
    <section className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                    <p className="text-[#0e8601] text-xs font-bold uppercase tracking-widest mb-2">Our Moments</p>
                    <h2 className="text-3xl font-extrabold text-[#021d49]">Visual Stories</h2>
                    <p className="text-gray-400 text-sm mt-1.5">A glimpse into CAPCHA events, conferences, and community gatherings</p>
                </div>
                <Link
                    href="/visual-story"
                    className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#021d49] border border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601] px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap"
                >
                    See More <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* 5-photo editorial grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-[480px]">
                {/* Large featured photo — spans 2 rows */}
                <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden group">
                    <Image
                        src={PREVIEW_IMAGES[0].src}
                        alt={PREVIEW_IMAGES[0].alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                        {PREVIEW_IMAGES[0].label}
                    </span>
                </div>

                {/* Top-right two */}
                {PREVIEW_IMAGES.slice(1, 3).map((img, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden group">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                            {img.label}
                        </span>
                    </div>
                ))}

                {/* Bottom-right two */}
                {PREVIEW_IMAGES.slice(3, 5).map((img, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden group">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                            {img.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* See More button — centred below grid */}
            <div className="text-center mt-8">
                <Link
                    href="/visual-story"
                    className="inline-flex items-center gap-2.5 bg-[#021d49] hover:bg-[#033080] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all"
                >
                    See All Visual Stories
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    </section>
);

export default GallerySection;
