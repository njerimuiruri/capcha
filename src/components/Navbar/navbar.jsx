'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isActivitiesDropdownOpen, setIsActivitiesDropdownOpen] = useState(false);
    const [isComponentsDropdownOpen, setIsComponentsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const activitiesRef = useRef(null);
    const componentsRef = useRef(null);

    const toggleActivitiesDropdown = () => {
        setIsActivitiesDropdownOpen(!isActivitiesDropdownOpen);
        setIsComponentsDropdownOpen(false); // Close other dropdown
    };

    const toggleComponentsDropdown = () => {
        setIsComponentsDropdownOpen(!isComponentsDropdownOpen);
        setIsActivitiesDropdownOpen(false); // Close other dropdown
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeAllDropdowns = () => {
        setIsActivitiesDropdownOpen(false);
        setIsComponentsDropdownOpen(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                activitiesRef.current &&
                !activitiesRef.current.contains(event.target) &&
                componentsRef.current &&
                !componentsRef.current.contains(event.target)
            ) {
                closeAllDropdowns();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {/* Top Contact Bar */}
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

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <a href="#" className="hover:text-[#0e8601] transition-colors duration-200">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-[#0e8601] transition-colors duration-200">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-[#0e8601] transition-colors duration-200">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-[#0e8601] transition-colors duration-200">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white dark:bg-gray-900 shadow-lg border-b-2 border-[#0e8601]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-32">
                        {/* Logo Section */}
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
                                    <h1 className="text-2xl lg:text-3xl font-bold text-[#021d49] dark:text-white">
                                        CAPCHA
                                    </h1>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 hidden lg:block">
                                        Consultative Platform On
                                        <br />
                                        Climate And Health in Africa
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-auto">
                            <Link
                                href="/"
                                className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                Home
                            </Link>

                            <Link
                                href="/AboutPage"
                                className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                About
                            </Link>

                            <div className="relative" ref={activitiesRef}>
                                <button
                                    onClick={toggleActivitiesDropdown}
                                    className="flex items-center space-x-1 text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                                >
                                    <span>Capcha Activities</span>
                                    {isActivitiesDropdownOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </button>

                                {isActivitiesDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                        <div className="py-2">
                                            <Link
                                                href="/Research"
                                                className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={closeAllDropdowns}
                                            >
                                                Research and Innovation
                                            </Link>
                                            <Link
                                                href="/PolicyAdvocacyPage"
                                                className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={closeAllDropdowns}
                                            >
                                                Policy and Advocacy
                                            </Link>
                                            <Link
                                                href="/CapacityEnhancementPage"
                                                className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={closeAllDropdowns}
                                            >
                                                Capacity Building
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CAPCHA Components Dropdown */}
                            <div className="relative" ref={componentsRef}>
                                <button
                                    onClick={toggleComponentsDropdown}
                                    className="flex items-center space-x-1 text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                                >
                                    <span>Capcha Components</span>
                                    {isComponentsDropdownOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </button>

                                {isComponentsDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                        <div className="py-2">
                                            <Link
                                                href="/DatabaseDashboard"
                                                className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={closeAllDropdowns}
                                            >
                                                Database Dashboard
                                            </Link>

                                            <Link
                                                href="/StakeholderDatabase"
                                                className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={closeAllDropdowns}
                                            >
                                                Stakeholder Database
                                            </Link>
                                            <Link
                                                href="/Knowledgesharingandengagement"
                                                className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={closeAllDropdowns}
                                            >
                                                Knowledge Sharing & Engagement
                                            </Link>
                                            <Link
                                                href="/Knowledgetranslationandpolicy"
                                                className="block px-5 py-3 text-[#021d49] dark:text-white hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={closeAllDropdowns}
                                            >
                                                Knowledge Translation & Policy
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/BlogsPage"
                                className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                Blogs
                            </Link>

                            <Link
                                href="/ArinConference"
                                className="text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                ARIN Conference
                            </Link>

                            <Link
                                href="/ContactPage"
                                className="bg-[#0e8601] text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 font-medium transition-all duration-200 shadow-md hover:shadow-lg text-lg whitespace-nowrap"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="text-[#021d49] dark:text-white hover:text-[#0e8601] transition-colors duration-200"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-8 w-8" />
                                ) : (
                                    <Menu className="h-8 w-8" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <div className="px-4 py-4 space-y-4">
                            <Link
                                href="/"
                                className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            <Link
                                href="/AboutPage"
                                className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>

                            <div className="border-l-2 border-[#0e8601] pl-4">
                                <p className="text-[#021d49] dark:text-white font-medium text-lg mb-2">Capcha Activities</p>
                                <Link
                                    href="/Research"
                                    className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Research and Innovation
                                </Link>
                                <Link
                                    href="/PolicyAdvocacyPage"
                                    className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Policy and Advocacy
                                </Link>
                                <Link
                                    href="/CapacityEnhancementPage"
                                    className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Capacity Building
                                </Link>
                            </div>

                            <div className="border-l-2 border-[#0e8601] pl-4">
                                <p className="text-[#021d49] dark:text-white font-medium text-lg mb-2">Capcha Components</p>
                                <Link
                                    href="/DatabaseDashboard"
                                    className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Database Dashboard
                                </Link>
                                <Link
                                    href="/KnowledgeSharing"
                                    className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Knowledge Sharing & Engagement
                                </Link>
                                <Link
                                    href="/KnowledgeTranslation"
                                    className="block text-gray-600 dark:text-gray-300 hover:text-[#0e8601] transition-colors duration-200 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Knowledge Translation & Policy
                                </Link>
                            </div>

                            <Link
                                href="/BlogsPage"
                                className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Blogs
                            </Link>

                            <Link
                                href="/ArinConference"
                                className="block text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                ARIN Conference
                            </Link>

                            <Link
                                href="/ContactPage"
                                className="block bg-[#0e8601] text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 font-medium transition-all duration-200 shadow-md text-center text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
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