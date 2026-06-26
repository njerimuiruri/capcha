'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Brain, Network, Target, Heart, ArrowRight } from 'lucide-react';

const points = [
    {
        num: '01',
        accentClass: 'bg-[#021d49]',
        iconColor: '#021d49',
        Icon: Target,
        title: 'The Transformation Needed',
        text: 'The transformation needed to address the health impacts of climate change in Africa will demand innovative approaches of mobilizing resources, working jointly, and applying knowledge. Research must be effectively interlinked with policymaking, planning, and action.',
    },
    {
        num: '02',
        accentClass: 'bg-[#55bdd0]',
        iconColor: '#55bdd0',
        Icon: Brain,
        title: 'Co-generation Approach',
        text: 'The co-generation of data across disciplines is one approach that can foster such transformations. By providing timely and policy-relevant research, researchers can support evidence-based decision-making and effective implementation of climate and health policies.',
    },
    {
        num: '03',
        accentClass: 'bg-[#0e8601]',
        iconColor: '#0e8601',
        Icon: Heart,
        title: 'Connecting Climate and Health',
        text: 'Information on the connection between climate and health will be provided on the platform, as most people view them separately. We share evidence of how climate change affects the health sector and how the health sector can prepare and minimise negative effects.',
    },
    {
        num: '04',
        accentClass: 'bg-[#ff9500]',
        iconColor: '#ff9500',
        Icon: Network,
        title: 'Platform Networks',
        text: 'By creating platforms and networks that bring together researchers, policy-makers, and practitioners from various disciplines and sectors, we facilitate knowledge exchange, sharing of best practices, and collaboration on research and policy development.',
    },
];

const AboutSection = () => {
    return (
        <section className="bg-white dark:bg-gray-900 py-20 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-12">

                {/* ── Section header ── */}
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-0.5 bg-[#55bdd0]" />
                        <span className="text-[#55bdd0] font-semibold text-xs tracking-widest uppercase">
                            Rationale
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#021d49] dark:text-white leading-tight">
                        Why{' '}
                        <span className="text-transparent bg-gradient-to-r from-[#55bdd0] to-[#0e8601] bg-clip-text">
                            Climate &amp; Health
                        </span>{' '}
                        Platform
                    </h2>
                </div>

                {/* ── Two-column body ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: numbered list */}
                    <div>
                        {points.map((point, i) => (
                            <div
                                key={i}
                                className="group flex gap-5 py-7 border-b border-gray-100 dark:border-gray-800 last:border-0"
                            >
                                {/* Large faded number */}
                                <div className="flex-shrink-0 w-9 text-right pt-0.5">
                                    <span className="text-2xl font-black text-gray-100 dark:text-gray-700 leading-none select-none">
                                        {point.num}
                                    </span>
                                </div>

                                {/* Thin colour bar + content */}
                                <div className="flex gap-4 flex-1 min-w-0">
                                    <div className={`flex-shrink-0 w-0.5 self-stretch ${point.accentClass} rounded-full`} />
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <point.Icon
                                                className="w-4 h-4 flex-shrink-0"
                                                style={{ color: point.iconColor }}
                                            />
                                            <h3 className="font-bold text-[#021d49] dark:text-white text-base">
                                                {point.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                                            {point.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8">
                            <Link
                                href="/AboutPage"
                                className="inline-flex items-center gap-2 bg-[#021d49] hover:bg-[#032d6e] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
                            >
                                <Globe className="w-4 h-4" />
                                Learn More
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: images */}
                    <div className="space-y-4 lg:sticky lg:top-28">
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/img/health1.jpg"
                                alt="Conference presentation with speakers at panel"
                                width={600}
                                height={380}
                                className="w-full h-80 object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden shadow-md">
                                <Image
                                    src="/img/health2.jpg"
                                    alt="Meeting room with people around table"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-md">
                                <Image
                                    src="/img/health3.jpg"
                                    alt="Field researchers working outdoors in grassland"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
