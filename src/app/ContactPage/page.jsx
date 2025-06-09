'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToTerms: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (checked) => {
        setFormData(prev => ({
            ...prev,
            agreeToTerms: checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen">
                <div
                    className="relative mt-32 h-[350px] bg-gray-800 flex items-center justify-center pt-32"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/healthstethoscope.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
                        <nav className="text-sm">
                            <span className="text-gray-300">Home</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-green-400">Contact Us</span>
                        </nav>
                    </div>
                </div>

                <div className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <p className="text-[#0e8601] font-medium mb-2">Contact Us</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get In Touch With Us</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-xl shadow-lg p-8">
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name*"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-100 border-0 h-12 placeholder:text-gray-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email*"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-100 border-0 h-12 placeholder:text-gray-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone*"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-100 border-0 h-12 placeholder:text-gray-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="text"
                                                    name="subject"
                                                    placeholder="Subject*"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-100 border-0 h-12 placeholder:text-gray-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Textarea
                                                name="message"
                                                placeholder="Your Messages..."
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="bg-gray-100 border-0 min-h-[120px] placeholder:text-gray-500 resize-none"
                                                rows={5}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="terms"
                                                checked={formData.agreeToTerms}
                                                onCheckedChange={handleCheckboxChange}
                                            />
                                            <label htmlFor="terms" className="text-sm text-gray-600">
                                                I agree to the{' '}
                                                <span className="text-[#0e8601] underline cursor-pointer">Terms & Conditions</span>
                                                {' '}and{' '}
                                                <span className="text-[#0e8601] underline cursor-pointer">Privacy Policy</span>
                                            </label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-[#0e8601] hover:bg-teal-700 text-white h-12 text-base font-medium"
                                        >
                                            Send Message
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8 h-fit">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Our Address</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            ACK Gardens House,Bishop Road, 1St Ngong Ave, Upperhill, <br /> Nairobi. P.O Box 53358 – 00200. Nairobi, Kenya<br />

                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Email Address</h3>
                                        <div className="space-y-2">
                                            <a
                                                href="mailto:info@arin-africa.org"
                                                className="text-[#0e8601] hover:text-teal-700 cursor-pointer"
                                            >
                                                info@arin-africa.org
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                                        <div className="space-y-2">
                                            <a
                                                href="tel:+254746130873"
                                                className="text-gray-600 hover:text-teal-700 cursor-pointer"
                                            >
                                                +254746130873
                                            </a>
                                        </div>
                                    </div>


                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Follow us</h3>
                                        <div className="flex space-x-3">
                                            <a
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0e8601] hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
                                            >
                                                <Facebook size={18} />
                                            </a>
                                            <a
                                                href="https://x.com/arin_africa"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0e8601] hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
                                            >
                                                <Twitter size={18} />
                                            </a>
                                            <a
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0e8601] hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
                                            >
                                                <Instagram size={18} />
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/company/arin-africa/posts/?feedView=all"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0e8601] hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
                                            >
                                                <Linkedin size={18} />
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactPage;