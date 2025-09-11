'use client';
import React, { useEffect, useState } from 'react';
import { Leaf, Heart, Globe, Shield } from 'lucide-react';

const ICONS = [Leaf, Heart, Globe, Shield];
const ICON_COLORS = ['text-emerald-500', 'text-red-500', 'text-blue-500', 'text-teal-500'];

const PageLoader = ({ isLoading = true, theme = 'light' }) => {
    const [currentIcon, setCurrentIcon] = useState(0);
    const [dots, setDots] = useState('');

    useEffect(() => {
        if (!isLoading) return;

        const iconInterval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % ICONS.length);
        }, 800);

        const dotInterval = setInterval(() => {
            setDots((prev) => (prev === '...') ? '' : prev + '.');
        }, 500);

        return () => {
            clearInterval(iconInterval);
            clearInterval(dotInterval);
        };
    }, [isLoading]);

    if (!isLoading) return null;

    const CurrentIcon = ICONS[currentIcon];
    const currentColor = ICON_COLORS[currentIcon];

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-emerald-900'
                : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50'
                }`}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-500" />
            </div>

            <div className="text-center z-10">
                <div className="mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-lg">
                        <Leaf className="h-6 w-6 text-emerald-600" />
                        <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-lg">CAPCHA</span>
                    </div>
                </div>

                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto relative">
                        <div className="absolute inset-0 border-4 border-emerald-200 dark:border-emerald-800 rounded-full animate-spin border-t-emerald-500" />
                        <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full shadow-inner flex items-center justify-center">
                            <CurrentIcon className={`h-8 w-8 ${currentColor} animate-bounce`} />
                        </div>
                    </div>

                    <div className="absolute -top-4 -left-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-0" />
                    <div className="absolute -top-2 -right-6 w-1 h-1 bg-teal-400 rounded-full animate-ping delay-300" />
                    <div className="absolute -bottom-4 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-700" />
                    <div className="absolute -bottom-2 -left-6 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1000" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Loading<span className="inline-block w-8 text-left text-emerald-600">{dots}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm mx-auto">
                        Preparing your climate & health platform experience
                    </p>
                </div>

                <div className="mt-8 w-48 mx-auto">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" />
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-6 opacity-60">
                    {[Leaf, Heart].map((Icon, i) => (
                        <div key={i} className="flex flex-col items-center space-y-1">
                            <div className={`w-8 h-8 ${['bg-emerald-100', 'bg-red-100',][i]} dark:${['bg-emerald-900/30', 'bg-red-900/30', 'bg-blue-900/30', 'bg-teal-900/30'][i]} rounded-full flex items-center justify-center`}>
                                <Icon className={`h-4 w-4 ${ICON_COLORS[i]} dark:${ICON_COLORS[i].replace('text-', 'text-')}`} />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {['Climate', 'Health'][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-96 h-96 opacity-5">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
                            <path
                                d="M50,10 Q70,30 50,50 Q30,70 50,90"
                                stroke="currentColor"
                                strokeWidth="1"
                                fill="none"
                                className="text-emerald-600"
                            />
                            <path
                                d="M50,10 Q30,30 50,50 Q70,70 50,90"
                                stroke="currentColor"
                                strokeWidth="1"
                                fill="none"
                                className="text-teal-600"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;