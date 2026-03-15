'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
    ChevronDown, ChevronUp, Phone, Mail, MapPin,
    Facebook, Twitter, Linkedin, Instagram, Menu, X,
    Globe, Building2, Landmark, Network, LayoutDashboard,
} from 'lucide-react';

const DATA_HUB_LINKS = [
    { label: 'Overview',           href: '/data-hub',                icon: LayoutDashboard, desc: 'Key stats & navigation'           },
    { label: 'Countries & Policy', href: '/data-hub/countries',      icon: Globe,           desc: 'Africa map · HNAP · NDC status'   },
    { label: 'Organizations',      href: '/data-hub/organizations',  icon: Building2,       desc: '24 climate-health organizations'  },
    { label: 'Funders',            href: '/data-hub/funders',        icon: Landmark,        desc: '25 funders & financing types'     },
    { label: 'Networks',           href: '/data-hub/networks',       icon: Network,         desc: '6 technical support networks'     },
];

const Navbar = () => {
    const [isActivitiesDropdownOpen,  setIsActivitiesDropdownOpen]  = useState(false);
    const [isComponentsDropdownOpen,  setIsComponentsDropdownOpen]  = useState(false);
    const [isDataHubDropdownOpen,     setIsDataHubDropdownOpen]     = useState(false);
    const [isMobileMenuOpen,          setIsMobileMenuOpen]          = useState(false);
    const [isMobileDataHubOpen,       setIsMobileDataHubOpen]       = useState(false);

    const activitiesRef = useRef(null);
    const componentsRef = useRef(null);
    const dataHubRef    = useRef(null);

    const closeAllDropdowns = () => {
        setIsActivitiesDropdownOpen(false);
        setIsComponentsDropdownOpen(false);
        setIsDataHubDropdownOpen(false);
    };

    const toggleActivitiesDropdown = () => {
        setIsActivitiesDropdownOpen(v => !v);
        setIsComponentsDropdownOpen(false);
        setIsDataHubDropdownOpen(false);
    };

    const toggleComponentsDropdown = () => {
        setIsComponentsDropdownOpen(v => !v);
        setIsActivitiesDropdownOpen(false);
        setIsDataHubDropdownOpen(false);
    };

    const toggleDataHubDropdown = () => {
        setIsDataHubDropdownOpen(v => !v);
        setIsActivitiesDropdownOpen(false);
        setIsComponentsDropdownOpen(false);
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                activitiesRef.current && !activitiesRef.current.contains(event.target) &&
                componentsRef.current && !componentsRef.current.contains(event.target) &&
                dataHubRef.current    && !dataHubRef.current.contains(event.target)
            ) {
                closeAllDropdowns();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {/* ── Top Contact Bar ───────────────────────────────────── */}
            <div className="bg-[#021d49] dark:bg-[#0d9488] text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-base">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5" />
                                <a href="tel:+254746130873" className="hover:text-[#0e8601] transition-colors duration-200">
                                    +254746130873
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5" />
                                <a href="mailto:info@arin-africa.org" className="hover:text-[#0e8601] transition-colors duration-200">
                                    info@arin-africa.org
                                </a>
                            </div>
                            <div className="hidden lg:flex items-center space-x-2">
                                <MapPin className="h-5 w-5" />
                                <span>ACK Gardens House, Bishop Road, 1st Ngong Ave, Upperhill</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <a href="#" className="hover:text-[#0e8601] transition-colors duration-200"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-[#0e8601] transition-colors duration-200"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-[#0e8601] transition-colors duration-200"><Linkedin className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-[#0e8601] transition-colors duration-200"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Navigation ───────────────────────────────────── */}
            <nav className="bg-white dark:bg-gray-900 shadow-lg border-b-2 border-[#0e8601]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-32">

                        {/* Logo */}
                        <div className="flex items-center space-x-4 flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-4">
                                <Image
                                    src="/img/capchalogo.jpeg"
                                    alt="CAPCHA Logo"
                                    width={80}
                                    height={80}
                                    className="h-20 w-20 cursor-pointer object-contain"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-[#021d49] dark:text-white">CAPCHA</h1>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 hidden lg:block">
                                        Consultative Platform On<br />Climate And Health in Africa
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop nav links */}
                        <div className="hidden lg:flex items-center space-x-5 xl:space-x-7 ml-auto">

                            <Link href="/" className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap">
                                Home
                            </Link>

                            <Link href="/AboutPage" className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap">
                                About
                            </Link>

                            {/* Capcha Activities */}
                            <div className="relative" ref={activitiesRef}>
                                <button
                                    onClick={toggleActivitiesDropdown}
                                    className="flex items-center space-x-1 text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                                >
                                    <span>Capcha Activities</span>
                                    {isActivitiesDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {isActivitiesDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                        <div className="py-2">
                                            <Link href="/Research" className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base" onClick={closeAllDropdowns}>
                                                Research and Innovation
                                            </Link>
                                            <Link href="/PolicyAdvocacyPage" className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base" onClick={closeAllDropdowns}>
                                                Policy and Advocacy
                                            </Link>
                                            <Link href="/CapacityEnhancementPage" className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base" onClick={closeAllDropdowns}>
                                                Capacity Building
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Capcha Components */}
                            <div className="relative" ref={componentsRef}>
                                <button
                                    onClick={toggleComponentsDropdown}
                                    className="flex items-center space-x-1 text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                                >
                                    <span>Capcha Components</span>
                                    {isComponentsDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {isComponentsDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                        <div className="py-2">
                                            <Link href="/DatabaseDashboard" className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base" onClick={closeAllDropdowns}>
                                                Database Dashboard
                                            </Link>
                                            <Link href="/Connect" className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base" onClick={closeAllDropdowns}>
                                                CAPCHA Connect
                                            </Link>
                                            <Link href="/Knowledgesharingandengagement" className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base" onClick={closeAllDropdowns}>
                                                Knowledge Sharing &amp; Engagement
                                            </Link>
                                            <Link href="/Knowledgetranslationandpolicy" className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base" onClick={closeAllDropdowns}>
                                                Knowledge Translation &amp; Policy
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Data Hub dropdown (with icons) ──────────── */}
                            <div className="relative" ref={dataHubRef}>
                                <button
                                    onClick={toggleDataHubDropdown}
                                    className={`flex items-center space-x-1 font-medium transition-colors duration-200 text-lg whitespace-nowrap
                                        ${isDataHubDropdownOpen ? 'text-[#0e8601]' : 'text-[#021d49] dark:text-white hover:text-[#0e8601]'}`}
                                >
                                    <span>Data Hub</span>
                                    {isDataHubDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>

                                {isDataHubDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                        {/* Header */}
                                        <div className="px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#033080]">
                                            <p className="text-white text-sm font-semibold">Africa Climate &amp; Health Data Hub</p>
                                            <p className="text-white/60 text-xs mt-0.5">Interactive data visualizations</p>
                                        </div>
                                        {/* Links */}
                                        <div className="py-1">
                                            {DATA_HUB_LINKS.map(({ label, href, icon: Icon, desc }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    onClick={closeAllDropdowns}
                                                    className="flex items-start gap-3 px-4 py-3 hover:bg-[#0e8601]/8 group transition-colors duration-150"
                                                >
                                                    <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-[#0e8601]/10 flex items-center justify-center group-hover:bg-[#0e8601]/20 transition-colors">
                                                        <Icon className="h-4 w-4 text-[#0e8601]" />
                                                    </span>
                                                    <span>
                                                        <span className="block text-sm font-semibold text-[#021d49] dark:text-white group-hover:text-[#0e8601] transition-colors">{label}</span>
                                                        <span className="block text-xs text-gray-400 mt-0.5">{desc}</span>
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/BlogsPage" className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap">
                                Blogs
                            </Link>

                            <Link href="/ArinConference" className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap">
                                ARIN Conference
                            </Link>

                            <Link href="/ContactPage" className="bg-[#0e8601] text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 font-medium transition-all duration-200 shadow-md hover:shadow-lg text-lg whitespace-nowrap">
                                Contact
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button onClick={toggleMobileMenu} className="text-[#021d49] dark:text-white hover:text-[#0e8601] transition-colors duration-200">
                                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile Menu ───────────────────────────────────── */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <div className="px-4 py-4 space-y-4">

                            <Link href="/" className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                                Home
                            </Link>

                            <Link href="/AboutPage" className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                                About
                            </Link>

                            {/* Activities */}
                            <div className="border-l-2 border-[#0e8601] pl-4">
                                <p className="text-[#021d49] dark:text-white font-medium text-lg mb-2">Capcha Activities</p>
                                <Link href="/Research" className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1" onClick={() => setIsMobileMenuOpen(false)}>Research and Innovation</Link>
                                <Link href="/PolicyAdvocacyPage" className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1" onClick={() => setIsMobileMenuOpen(false)}>Policy and Advocacy</Link>
                                <Link href="/CapacityEnhancementPage" className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1" onClick={() => setIsMobileMenuOpen(false)}>Capacity Building</Link>
                            </div>

                            {/* Components */}
                            <div className="border-l-2 border-[#0e8601] pl-4">
                                <p className="text-[#021d49] dark:text-white font-medium text-lg mb-2">Capcha Components</p>
                                <Link href="/DatabaseDashboard" className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1" onClick={() => setIsMobileMenuOpen(false)}>Database Dashboard</Link>
                                <Link href="/KnowledgeSharing" className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1" onClick={() => setIsMobileMenuOpen(false)}>Knowledge Sharing &amp; Engagement</Link>
                                <Link href="/KnowledgeTranslation" className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1" onClick={() => setIsMobileMenuOpen(false)}>Knowledge Translation &amp; Policy</Link>
                            </div>

                            {/* ── Data Hub (mobile) ───────────────────────── */}
                            <div className="border-l-2 border-[#0e8601] pl-4">
                                <button
                                    onClick={() => setIsMobileDataHubOpen(v => !v)}
                                    className="flex items-center justify-between w-full text-[#021d49] dark:text-white font-medium text-lg mb-2"
                                >
                                    <span>Data Hub</span>
                                    {isMobileDataHubOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {isMobileDataHubOpen && (
                                    <div className="space-y-1 mt-1">
                                        {DATA_HUB_LINKS.map(({ label, href, icon: Icon }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1.5"
                                            >
                                                <Icon className="h-4 w-4 text-[#0e8601]" />
                                                {label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link href="/BlogsPage" className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                                Blogs
                            </Link>

                            <Link href="/ArinConference" className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                                ARIN Conference
                            </Link>

                            <Link href="/ContactPage" className="block bg-[#0e8601] text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 font-medium transition-all duration-200 shadow-md text-center text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
