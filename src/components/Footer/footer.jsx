'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    MapPin,
    Mail,
    Phone,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowUp
} from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#021d49] dark:bg-[#0e8601] text-white relative">
            <Button
                onClick={scrollToTop}
                className="absolute -top-6 right-8 bg-orange-500 hover:bg-orange-600 rounded-full p-3 shadow-lg"
                size="icon"
            >
                <ArrowUp className="h-5 w-5" />
            </Button>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-center space-x-3">

                            <h2 className="text-2xl font-bold">
                                Consultative Platform On{' '}
                                <span className="bg-[#0e8601] text-white px-1 rounded">Climate</span> and{' '}
                                <span className="bg-[#0e8601] text-white px-1 rounded">Health</span> In
                                Africa (CAPCHA)
                            </h2>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                            Building a tras-discipliary community of practice towards enhanced decision support environment on C & H research and policy in Africa
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 mt-6">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 flex-1"
                            />
                            <Button className="bg-[#0e8601] hover:bg-[#0e8601] px-6">
                                Subscribe Now
                            </Button>
                        </div>
                    </div>

                    {/* Explore Section */}
                    {/* <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Explore</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Fundraise For Health
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Shelter For Refuge
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Adopt Orphan Child
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Education For Poor
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Clean Water Project
                                </a>
                            </li>
                        </ul>
                    </div> */}

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Other Pages</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Our Team
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Recent Events
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Make Donation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                                    Get In Touch
                                </a>
                            </li> */}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Official Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Location</p>
                                    <p className="text-sm text-gray-300">ACK Gardens House,Bishop Road, 1St Ngong Ave, Upperhill, Nairobi. P.O Box 53358 – 00200. Nairobi, Kenya</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Mail className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a
                                        href="mailto:info@arin-africa.org"
                                        className="text-sm text-gray-300 "
                                    >
                                        info@arin-africa.org
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Phone className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <a
                                        href="tel:+254746130873"
                                        className="text-sm text-gray-300 "
                                    >
                                        +254746130873
                                    </a>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400 dark:text-white">
                            © CAPCHA is proudly owned by{' '}
                            <span className="text-teal-400">Arin</span>
                        </p>

                        <div className="flex space-x-3">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="bg-[#0e8601] dark:bg-white hover:bg-[#0e8601]  dark:text-black text-white rounded-full h-10 w-10"
                            >
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <a
                                href="https://x.com/arin_africa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#0e8601] dark:bg-white hover:bg-[#0e8601] text-white dark:text-black rounded-full h-10 w-10 flex items-center justify-center"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="bg-[#0e8601] dark:bg-white hover:bg-[#0e8601]  dark:text-black text-white rounded-full h-10 w-10"
                            >
                                <Instagram className="h-4 w-4" />
                            </Button>

                            <a
                                href="https://www.linkedin.com/company/arin-africa/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#0e8601] dark:bg-white hover:bg-[#0e8601] dark:text-black  text-white rounded-full h-10 w-10 flex items-center justify-center"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;