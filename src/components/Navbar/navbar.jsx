'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-[#021d49] dark:bg-[#0d9488] text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-base">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5" />
                                <a href="tel:+254746130873" >
                                    +254746130873
                                </a>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5" />
                                <a href="mailto:info@arin-africa.org">
                                    info@arin-africa.org
                                </a>
                            </div>

                            <div className="hidden lg:flex items-center space-x-2">
                                <MapPin className="h-5 w-5" />
                                <span>ACK Gardens House,Bishop Road, 1St Ngong Ave, Upperhill
                                </span>
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

            <nav className="bg-white dark:bg-gray-900  shadow-lg border-b-2 border-[#0e8601]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-28">
                        <div className="flex items-center">
                            <Link href="/">
                                <Image
                                    src="/img/capchalogo.jpeg"
                                    alt="Company Logo"
                                    width={60}
                                    height={60}
                                    className="h-15 w-15 cursor-pointer"
                                />
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
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

                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-1 text-[#021d49] dark:text-white hover:text-[#0e8601] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                                >
                                    <span>Capcha Components</span>
                                    {isDropdownOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                        <div className="py-2">
                                            <Link
                                                href="/Research"
                                                className="block px-5 py-3 text-[#021d49] hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Research and Innovation
                                            </Link>
                                            <Link
                                                href="/PolicyAdvocacyPage"
                                                className="block px-5 py-3 text-[#021d49] hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Policy and Advocacy
                                            </Link>
                                            <Link
                                                href="/CapacityEnhancementPage"
                                                className="block px-5 py-3 text-[#021d49] hover:bg-[#0e8601] hover:bg-opacity-10 hover:text-[#0e8601] transition-colors duration-200 text-base"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Capacity Building
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
                                href="/ArinConferece"
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

                        <div className="lg:hidden">
                            <button className="text-[#021d49] hover:text-[#0e8601] transition-colors duration-200">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {isDropdownOpen && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                    />
                )}
            </nav>
        </div>
    );
};

export default Navbar;