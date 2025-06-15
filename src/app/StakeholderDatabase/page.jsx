'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Database,
    BarChart3,
    TrendingUp,
    Users,
    Globe,
    Shield,
    Search,
    Filter,
    Download,
    Eye,
    ArrowRight,
    Activity,
    PieChart,
    LineChart,
    Settings
} from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const StakeholderDatabase = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    const videos = [
        {
            id: 1,
            src: "/videos/climate industry.mp4",
            alt: "Policy implementation video"
        },
        {
            id: 2,
            src: "/videos/dna.mp4",
            alt: "Research translation video"
        },
        {
            id: 3,
            src: "/videos/windmill.mp4",
            alt: "Evidence synthesis video"
        }
    ];

    const embedUrl = "https://public.tableau.com/views/ClimateandHealthStakeholderdatabaseanalysis/Sheet5?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link&:embed=yes&:showVizHome=no&:tabs=yes&:toolbar=no";

    const handleLoad = () => {
        setLoading(false);
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        return false;
    };

    const handleKeyDown = (e) => {
        if (
            (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 's')) ||
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'u')
        ) {
            e.preventDefault();
            return false;
        }
    };

    const handleDragStart = (e) => {
        e.preventDefault();
        return false;
    };

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);

        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [videos.length]);

    return (

        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                <section className="relative mt-32 h-[600px] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        {videos.map((video, index) => (
                            <div
                                key={video.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <video
                                    src={video.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    style={{ display: index === currentVideoIndex ? 'block' : 'none' }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 via-black/20 to-black/10"></div>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 text-left text-white px-8 max-w-7xl mx-auto w-full">
                        <div className="max-w-3xl">
                            <Badge className="mb-6 bg-[#0e8601]/20 text-white border-[#0e8601] text-sm px-4 py-2">
                                Knowledge Sharing & Engagement
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                                Fostering Transdisciplinary Collaboration
                            </h1>
                            <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                                Working on findings related to the impacts of climate change on health while fostering transdisciplinary collaboration among experts in climate science, public health, policy, and other relevant fields.
                            </p>
                            <nav className="text-lg flex items-center">
                                <span className="text-gray-300">Home</span>
                                <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                                <span className="text-[#0e8601] font-semibold">Knowledge Sharing and Engagement</span>
                            </nav>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 flex space-x-2">
                        {videos.map((_, index) => (
                            <div key={index} className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className={`w-full h-full bg-[#0e8601] rounded-full transition-all duration-300 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-40'
                                        }`}
                                    style={{
                                        animation: index === currentVideoIndex ? 'fillIndicator 5s linear infinite' : 'none'
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Dashboard Section */}
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="mb-4 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Interactive Analytics
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                Explore the Data
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Dive into comprehensive climate and health stakeholder data with our interactive dashboard.
                                Navigate between tabs, filter data, and discover insights that matter.
                            </p>
                        </div>
                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="text-blue-800 flex items-center">
                                        <Search className="w-5 h-5 mr-2" />
                                        How to Navigate
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-blue-700">
                                        Use the tabs at the top to switch between different views. Click on data points to drill down into specific details.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                <CardHeader>
                                    <CardTitle className="text-green-800 flex items-center">
                                        <Filter className="w-5 h-5 mr-2" />
                                        Filter & Analyze
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-green-700">
                                        Use the filter options to narrow down data by country, organization type, or specific health indicators.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                                <CardHeader>
                                    <CardTitle className="text-purple-800 flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        Discover Insights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-purple-700">
                                        Hover over charts and graphs to reveal detailed information and trends across different time periods.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <br />

                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-[#021d49] to-[#0e8601] p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Climate & Health Stakeholder Analysis
                                        </h3>
                                        <p className="text-blue-100">
                                            Real-time data visualization and analytics platform
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4 text-white">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm">Live Data</span>
                                        </div>
                                        <Shield className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative" style={{ height: '900px' }}>
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 z-10">
                                        <div className="text-center">
                                            <div className="relative mb-8">
                                                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-[#0e8601] mx-auto"></div>
                                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-blue-400 mx-auto"></div>
                                            </div>
                                            <h4 className="text-xl font-semibold text-[#021d49] mb-2">Loading Dashboard</h4>
                                            <p className="text-gray-600">Preparing your interactive analytics experience...</p>
                                            <div className="mt-4 flex justify-center space-x-2">
                                                <div className="w-2 h-2 bg-[#0e8601] rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-[#0e8601] rounded-full animate-bounce delay-100"></div>
                                                <div className="w-2 h-2 bg-[#0e8601] rounded-full animate-bounce delay-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <iframe
                                    src={embedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: 'none',
                                        pointerEvents: 'auto'
                                    }}
                                    onLoad={handleLoad}
                                    title="Climate and Health Stakeholder Database Analysis"
                                    allowFullScreen={false}
                                    onContextMenu={handleContextMenu}
                                    sandbox="allow-scripts allow-same-origin allow-popups"
                                />
                            </div>

                            <div className="bg-gray-50 p-6 border-t">
                                <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Eye className="w-4 h-4 mr-2 text-[#0e8601]" />
                                            <span>Fully Interactive Dashboard</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <PieChart className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>Real-time Analytics</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <LineChart className="w-4 h-4 mr-2 text-purple-500" />
                                            <span>Multi-dimensional Data</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-red-600 font-medium flex items-center">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Protected Content - Unauthorized copying prohibited
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

                {/* CSS Styles */}
                <style jsx>{`
                * {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                
                iframe {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                
                ::selection {
                    background: transparent;
                }
                
                ::-moz-selection {
                    background: transparent;
                }
                
                * {
                    -webkit-user-drag: none;
                    -khtml-user-drag: none;
                    -moz-user-drag: none;
                    -o-user-drag: none;
                    user-drag: none;
                }
                
                @media print {
                    body { display: none !important; }
                }

                @keyframes fillIndicator {
                    from {
                        transform: scaleX(0);
                        transform-origin: left;
                    }
                    to {
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                }
            `}</style>
            </div>

            <Footer />

        </>
    );
};

export default StakeholderDatabase;