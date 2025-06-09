'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/navbar';
import StatsSection from './stats';
import CAPCHAActivities from './CAPCHAActivities';
import Footer from '@/components/Footer/footer';


const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                <div
                    className="relative mt-32 h-[350px] bg-gray-800 flex items-center justify-center pt-32"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/healthstethoscope.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                        <nav className="text-sm">
                            <span className="text-gray-300">Home</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-green-400">About Us</span>
                        </nav>

                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-lg">
                                <Image
                                    src="/img/twohandsplant.jpg"
                                    alt="Person holding plant"
                                    width={1200}
                                    height={1800}
                                    className="w-full h-[500px] object-cover"
                                />

                                <div className="absolute bottom-8 left-8 right-8 bg-[#0e8601] p-6 rounded-lg text-white">
                                    <div className="text-6xl font-serif text-teal-300 mb-2">"</div>
                                    <p className="text-sm leading-relaxed">
                                        Climate change is a global crisis with far-reaching implications for public health, and Africa stands out as a region particularly vulnerable to the adverse effects of extreme weather events linked to climate variability. This heightened susceptibility is exacerbated by an already strained healthcare system and the absence of robust early warning systems, factors partly attributed to the region's fragile socio-economic conditions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[#0e8601] font-medium mb-2">A Little Introduction</p>
                                <div className="w-12 h-1 bg-orange-400 mb-6"></div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Protect Our Earth Against Climate Change
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Background of CAPCHA</h4>

                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Despite being a region that is most susceptible to the health effects of climate change and variability, many African countries have failed to effectively adapt to climate change impacts due to lack of context-specific data to inform action. Advancing the climate and health agenda in Africa will, therefore, depend on how well the linkages between research, policy, and society are strengthened in addition to tackling existing inequalities in research.
                                    </p>

                                    <Card className="p-4 bg-teal-50 border-teal-200">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-8 w-8 text-[#0e8601]" />
                                            <div className="flex-1">
                                                <h5 className="font-semibold text-gray-900">CAPCHA Concept Note</h5>
                                                <p className="text-sm text-gray-600">Download our comprehensive concept note document</p>
                                            </div>
                                            <Button
                                                asChild
                                                className="bg-[#0e8601] hover:bg-teal-700 text-white"
                                            >
                                                <a
                                                    href="/document/CAPCHA-Concept-Note.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download PDF
                                                </a>
                                            </Button>

                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <StatsSection />
            <CAPCHAActivities />
            <Footer />
        </>
    );
};

export default AboutPage;