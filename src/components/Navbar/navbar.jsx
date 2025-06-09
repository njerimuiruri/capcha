'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-[#021d49] text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-base">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5" />
                                <span>+666-999-888</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5" />
                                <span>info@capcha.com</span>
                            </div>
                            <div className="hidden lg:flex items-center space-x-2">
                                <MapPin className="h-5 w-5" />
                                <span>2767 Sunrise Street, NY 1002, USA</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">

                            <div className="flex items-center space-x-3">
                                <a href="#" className="hover:text-[#55bdd0] transition-colors duration-200">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-[#55bdd0] transition-colors duration-200">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-[#55bdd0] transition-colors duration-200">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a href="#" className="hover:text-[#55bdd0] transition-colors duration-200">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="bg-white shadow-lg border-b-2 border-[#55bdd0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-28">
                        <div className="flex items-center">
                            <Image
                                src="/img/capchalogo.jpeg"
                                alt="Company Logo"
                                width={60}
                                height={60}
                                className="h-15 w-15"
                            />
                        </div>

                        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
                            <a
                                href="#home"
                                className="text-[#021d49] hover:text-[#55bdd0] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                Home
                            </a>

                            <a
                                href="#about"
                                className="text-[#021d49] hover:text-[#55bdd0] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                About
                            </a>

                            {/* Dropdown Menu */}
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-1 text-[#021d49] hover:text-[#55bdd0] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                                >
                                    <span>Capcha Components</span>
                                    {isDropdownOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </button>

                                {/* Dropdown Content */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                        <div className="py-2">
                                            <a
                                                href="#research"
                                                className="block px-5 py-3 text-[#021d49] hover:bg-[#55bdd0] hover:bg-opacity-10 hover:text-[#55bdd0] transition-colors duration-200 text-base"
                                            >
                                                Research and Innovation
                                            </a>
                                            <a
                                                href="#policy"
                                                className="block px-5 py-3 text-[#021d49] hover:bg-[#55bdd0] hover:bg-opacity-10 hover:text-[#55bdd0] transition-colors duration-200 text-base"
                                            >
                                                Policy and Advocacy
                                            </a>
                                            <a
                                                href="#capacity"
                                                className="block px-5 py-3 text-[#021d49] hover:bg-[#55bdd0] hover:bg-opacity-10 hover:text-[#55bdd0] transition-colors duration-200 text-base"
                                            >
                                                Capacity Building
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <a
                                href="#blogs"
                                className="text-[#021d49] hover:text-[#55bdd0] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                Blogs
                            </a>

                            <a
                                href="#conference"
                                className="text-[#021d49] hover:text-[#55bdd0] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                Arin Conference
                            </a>

                            <a
                                href="#news"
                                className="text-[#021d49] hover:text-[#55bdd0] font-medium transition-colors duration-200 text-lg whitespace-nowrap"
                            >
                                News
                            </a>

                            <a
                                href="#contact"
                                className="bg-[#0e8601] text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 font-medium transition-all duration-200 shadow-md hover:shadow-lg text-lg whitespace-nowrap"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Mobile Menu Button - Made bigger */}
                        <div className="lg:hidden">
                            <button className="text-[#021d49] hover:text-[#55bdd0] transition-colors duration-200">
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