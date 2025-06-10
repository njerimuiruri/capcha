'use client';
import React from 'react';

const TeamsPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Dr.Joanes Atela",
            position: "EXECUTIVE DIRECTOR",
            image: "/img/prof.jpg"
        },
        {
            id: 2,
            name: "Ann Wanjiru Irungu",
            position: "RESEARCH ASSISTANT & CAPCHA COORDINATOR - HEALTH, CLIMATE CHANGE & ENERGY",
            image: "/img/Ann-irungu.jpg"
        },
        {
            id: 3,
            name: "Dr. Isaiah Maket",
            position: "RESEARCH ASSOCIATE - CLIMATE FINANCE & GENDER AND SOCIAL INCLUSION (GESI)",
            image: "/img/Isaiah-Maket.jpeg"
        }
    ];

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
            style={{
                background: 'linear-gradient(135deg, rgba(2, 29, 73, 0.08) 0%, rgba(14, 134, 1, 0.08) 100%)',
            }}>
            {/* Dark mode overlay */}
            <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-800/50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center px-8">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="group max-w-sm w-full">
                            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                                <div className="relative w-full h-80 bg-gray-100 dark:bg-gray-700">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                                        {member.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamsPage;