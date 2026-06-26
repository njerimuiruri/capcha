import React from 'react';
import { BarChart3, Users, Brain, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const components = [
    {
        num: '01',
        Icon: BarChart3,
        color: '#55bdd0',
        title: 'Database Dashboard',
        desc: 'Access a centralized collection of data and analytics on climate and health across Africa.',
        href: '/DatabaseDashboard',
    },
    {
        num: '02',
        Icon: Users,
        color: '#0e8601',
        title: 'Stakeholder Database',
        desc: "Connect with climate and health stakeholders across Africa's research and policy landscape.",
        href: '/StakeholderDatabase',
    },
    {
        num: '03',
        Icon: Brain,
        color: '#021d49',
        title: 'Knowledge Translation & Policy',
        desc: 'Bridge the gap between scientific research and practical policy application in Africa.',
        href: '/Knowledgetranslationandpolicy',
    },
    {
        num: '04',
        Icon: Share2,
        color: '#ff9500',
        title: 'Knowledge Sharing & Engagement',
        desc: 'Share best practices and research findings on the impacts of climate change on health.',
        href: '/Knowledgesharingandengagement',
    },
];

const Dashboard = () => {
    return (
        <div className="relative bg-[#f8faf8] dark:bg-gray-950 py-16 px-4 md:px-8 overflow-hidden transition-colors duration-300">

            {/* ── Background art ── */}

            {/* Subtle green dot grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #0e8601 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                    opacity: 0.04,
                }}
            />

            {/* Large blurred green orb — top left */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0e8601] rounded-full opacity-[0.08] blur-3xl pointer-events-none" />

            {/* Large blurred teal orb — bottom right */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#55bdd0] rounded-full opacity-[0.08] blur-3xl pointer-events-none" />

            {/* Concentric rings — top right decorative */}
            <div className="absolute top-10 right-10 pointer-events-none opacity-[0.07]">
                <div className="w-40 h-40 rounded-full border-2 border-[#0e8601]" />
                <div className="absolute inset-5 rounded-full border-2 border-[#55bdd0]" />
                <div className="absolute inset-10 rounded-full border-2 border-[#021d49]" />
                <div className="absolute inset-[60px] rounded-full bg-[#0e8601]" />
            </div>

            {/* Leaf SVG — bottom left */}
            <svg
                className="absolute bottom-8 left-10 pointer-events-none opacity-[0.06]"
                width="100" height="140" viewBox="0 0 100 140"
                fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M50 5 C80 20 95 55 85 85 C75 115 55 135 50 135 C45 135 25 115 15 85 C5 55 20 20 50 5Z" fill="#0e8601" />
                <path d="M50 5 L50 135" stroke="#021d49" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M50 40 Q65 55 80 60" stroke="#021d49" strokeWidth="1" strokeLinecap="round" />
                <path d="M50 65 Q35 78 18 80" stroke="#021d49" strokeWidth="1" strokeLinecap="round" />
                <path d="M50 90 Q62 100 72 108" stroke="#021d49" strokeWidth="1" strokeLinecap="round" />
            </svg>

            {/* ── Cards panel ── */}
            <div className="relative max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-md">
                    {components.map((item) => (
                        <Link
                            key={item.num}
                            href={item.href}
                            className="group bg-white dark:bg-gray-900 p-8 flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                            {/* Icon + number */}
                            <div className="flex items-start justify-between mb-8">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                    style={{ backgroundColor: `${item.color}15` }}
                                >
                                    <item.Icon className="w-6 h-6" style={{ color: item.color }} />
                                </div>
                                <span className="text-xs font-black text-gray-200 dark:text-gray-700 select-none">
                                    {item.num}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-[#021d49] dark:text-white text-base leading-snug mb-3">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-8">
                                {item.desc}
                            </p>

                            {/* Read More + animated line */}
                            <div>
                                <div
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold mb-3"
                                    style={{ color: item.color }}
                                >
                                    Read More
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
        </div>
    );
};

export default Dashboard;
