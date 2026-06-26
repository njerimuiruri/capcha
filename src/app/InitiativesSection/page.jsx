'use client';
import React from 'react';
import Link from 'next/link';
import { Radio, Link2, BookOpen, Newspaper, ArrowRight } from 'lucide-react';

const initiatives = [
    {
        Icon: Radio,
        color: '#ff9500',
        title: 'CAPCHA Spotlight Series',
        desc: '90-minute monthly virtual sessions bridging African climate-health research and real-world policy. Every last Thursday, 2:00–3:30 PM EAT.',
        status: 'closed',
        statusLabel: 'Closed',
        href: '/spotlight-series',
    },
    {
        Icon: Link2,
        color: '#021d49',
        title: 'CAPCHA Connect',
        desc: 'A pan-African networking platform connecting climate-health researchers, policymakers, and practitioners for collaboration and mentorship.',
        status: 'closed',
        statusLabel: 'Registrations Closed',
        href: '/connect',
    },
    {
        Icon: BookOpen,
        color: '#0e8601',
        title: 'Learning Curve',
        desc: "A structured learning programme for Africa's next generation of climate-health researchers — building skills, knowledge, and networks.",
        status: 'open',
        statusLabel: 'Enrol Now',
        href: 'https://ee.kobotoolbox.org/single/5b3703edf1a128aa20c66dff2fadd84f',
        external: true,
    },
    {
        Icon: Newspaper,
        color: '#55bdd0',
        title: 'CAPCHA Monthly Digest',
        desc: 'Your curated monthly briefing on the latest climate-health research, policy updates, funding opportunities, and events from across Africa.',
        status: 'closed',
        statusLabel: 'View Archive',
        href: '/monthly-digest',
    },
];

const InitiativesSection = () => {
    return (
        <section className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-0.5 bg-[#0e8601]" />
                            <span className="text-[#0e8601] font-semibold text-xs tracking-widest uppercase">
                                Programmes
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#021d49] dark:text-white">
                            CAPCHA Initiatives
                        </h2>
                    </div>
                    <Link
                        href="/CapacityEnhancementPage"
                        className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#021d49] dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-[#0e8601] hover:text-[#0e8601] px-5 py-2.5 rounded-xl transition-all duration-200"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* 2×2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {initiatives.map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                            className="group relative flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                        >
                            {/* Faint colour wash top-right corner */}
                            <div
                                className="absolute top-0 right-0 w-28 h-28 rounded-bl-full opacity-[0.06] pointer-events-none"
                                style={{ backgroundColor: item.color }}
                            />

                            {/* Icon + status row */}
                            <div className="flex items-start justify-between mb-5">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                                    style={{ backgroundColor: `${item.color}18` }}
                                >
                                    <item.Icon className="w-5 h-5" style={{ color: item.color }} />
                                </div>

                                {item.status === 'open' ? (
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#0e8601]/10 text-[#0e8601] px-3 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0e8601] animate-pulse" />
                                        {item.statusLabel}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 px-3 py-1 rounded-full">
                                        {item.statusLabel}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-[#021d49] dark:text-white text-base leading-snug mb-2 group-hover:text-[#0e8601] dark:group-hover:text-[#55bdd0] transition-colors duration-200">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                                {item.desc}
                            </p>

                            {/* CTA row + animated fill bar */}
                            <div>
                                <div
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold mb-3"
                                    style={{ color: item.color }}
                                >
                                    Learn More
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                                <div className="h-0.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InitiativesSection;
