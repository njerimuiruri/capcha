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
    Settings,
    MapPin,
    Heart,
    Thermometer,
    BookOpen,
    CheckCircle,
    Target
} from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

const DatabaseDashboard = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const embedUrl = "https://public.tableau.com/views/HNAPS/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link&:embed=yes&:showVizHome=no&:tabs=yes&:toolbar=no";

    const videos = [
        {
            id: 1,
            src: "/videos/climate industry.mp4",
            alt: "Database analytics video"
        },
        {
            id: 2,
            src: "/videos/dna.mp4",
            alt: "Data visualization video"
        },
        {
            id: 3,
            src: "/videos/windmill.mp4",
            alt: "Climate data video"
        }
    ];

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

    const dashboardComponents = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Collection of Transdisciplinary Climate and Health initiatives in Africa",
            description: "Comprehensive mapping of cross-sector collaborative efforts addressing climate-health nexus across the African continent",
            color: "from-green-500 to-emerald-600",
            features: ["Initiative mapping", "Cross-sector analysis", "Geographic coverage", "Impact assessment"]
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Climate and Health stakeholder database",
            description: "Detailed repository of key organizations, institutions, and individuals working in climate and health sectors",
            color: "from-blue-500 to-cyan-600",
            features: ["Organization profiles", "Contact information", "Expertise areas", "Collaboration networks"]
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Climate and Health analytics and insights",
            description: "Advanced data visualization and trend analysis tools for evidence-based decision making in climate and health",
            color: "from-purple-500 to-violet-600",
            features: ["Data visualization", "Trend analysis", "Evidence synthesis", "Decision support"]
        }
    ];

    const keyBenefits = [
        "Centralized access to comprehensive data collections",
        "Advanced analytics for strategic decision-making",
        "Real-time insights for researchers and policymakers",
        "Evidence-based tools for health officials"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [videos.length]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);

        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    return (

        <>
            <Navbar />
            <div
                className="min-h-screen bg-white"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                }}
            >
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
                                Database Dashboard
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                                Climate &amp; Health Data Analytics
                            </h1>
                            <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                                Provides users with access to a centralized collection of data and analytics. The dashboards serve as a valuable tool for researchers, policymakers, health officials and other stakeholders, offering a comprehensive view of data, trends, and insights to inform decision-making and strategy development.
                            </p>
                            <nav className="text-lg flex items-center">
                                <span className="text-gray-300">Home</span>
                                <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                                <span className="text-[#0e8601] font-semibold">Database Dashboard</span>
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




                {/* Interactive Dashboard Section */}
                <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
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
                                Dive into comprehensive climate and health data with our interactive dashboard.
                                Navigate between views, filter data, and discover insights that drive informed decision-making.
                            </p>
                        </div>
                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="text-blue-800 flex items-center">
                                        <Search className="w-5 h-5 mr-2" />
                                        Navigate &amp; Explore
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-blue-700">
                                        Use the interactive interface to explore different data collections. Click on visualizations
                                        to drill down into specific initiatives and stakeholder information.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                <CardHeader>
                                    <CardTitle className="text-green-800 flex items-center">
                                        <Filter className="w-5 h-5 mr-2" />
                                        Filter &amp; Analyze
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-green-700">
                                        Apply filters to narrow down data by region, organization type, initiative focus,
                                        or specific climate and health indicators for targeted analysis.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                                <CardHeader>
                                    <CardTitle className="text-purple-800 flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        Generate Insights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-purple-700">
                                        Discover patterns and trends across transdisciplinary initiatives, stakeholder networks,
                                        and health outcomes to inform strategic decision-making.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <br />

                        {/* Dashboard Container */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Dashboard Header */}
                            <div className="bg-gradient-to-r from-[#021d49] to-[#0e8601] p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Climate &amp; Health Database Analytics
                                        </h3>
                                        <p className="text-blue-100">
                                            Comprehensive data visualization and insights platform
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
                                            <p className="text-gray-600">Preparing your comprehensive analytics experience...</p>
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
                                    title="Climate and Health Database Dashboard"
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
                                            <span>Interactive Dashboard</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Database className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>Centralized Data</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <TrendingUp className="w-4 h-4 mr-2 text-purple-500" />
                                            <span>Strategic Insights</span>
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
                <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge className="mb-6 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20 text-sm px-4 py-2">
                                    Our Platform
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-8 leading-tight">
                                    Comprehensive Data Analytics
                                </h2>

                                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                    <p>
                                        The Database Dashboard provides users with access to a centralized collection of data and analytics. These dashboards serve as a valuable tool for researchers, policymakers, health officials and other stakeholders, offering a comprehensive view of data, trends, and insights to inform decision-making and strategy development.
                                    </p>
                                    <p>
                                        Our platform integrates multiple data sources and analytical tools to provide real-time insights into climate and health initiatives across Africa, enabling evidence-based decision-making and strategic planning for improved health outcomes in the context of climate change.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold text-[#021d49] mb-6 flex items-center gap-3">
                                        <Target className="w-8 h-8 text-[#0e8601]" />
                                        Key Benefits
                                    </h3>
                                    <div className="space-y-4">
                                        {keyBenefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-700 leading-relaxed">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#021d49] to-[#0e8601] p-8 rounded-2xl text-white">
                                    <h4 className="text-xl font-bold mb-3">Data-Driven Impact</h4>
                                    <p className="text-blue-100 mb-4">
                                        Transform raw data into actionable insights that drive policy decisions and improve health outcomes across Africa&apos;s changing climate landscape.
                                    </p>
                                    <div className="flex items-center text-sm text-blue-200">
                                        <Database className="w-4 h-4 mr-2" />
                                        Connecting data with decision-making
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge className="mb-4 bg-[#0e8601]/10 text-[#0e8601] hover:bg-[#0e8601]/20">
                                Dashboard Components
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                                What&apos;s Inside the Dashboard
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                The dashboards include comprehensive data collections and analytics tools designed for climate and health research
                            </p>
                        </div>

                        <div className="space-y-12">
                            {dashboardComponents.map((component, index) => (
                                <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white hover:bg-gray-50 overflow-hidden">
                                    <div className="grid lg:grid-cols-3 gap-8 p-8">
                                        <div className="lg:col-span-2">
                                            <CardHeader className="p-0 pb-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${component.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                                                        {component.icon}
                                                    </div>
                                                    <div>
                                                        <Badge className="mb-2 bg-[#0e8601]/10 text-[#0e8601] text-xs">
                                                            Component {String.fromCharCode(65 + index)}
                                                        </Badge>
                                                        <CardTitle className="text-2xl text-[#021d49] group-hover:text-[#0e8601] transition-colors">
                                                            {component.title}
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <CardDescription className="text-gray-600 leading-relaxed text-base mb-6">
                                                    {component.description}
                                                </CardDescription>
                                            </CardContent>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-semibold text-[#021d49] mb-4 flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" />
                                                Key Features
                                            </h4>
                                            <div className="space-y-3">
                                                {component.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-[#0e8601] mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CSS Styles */}
                <style jsx>{`
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
            `}</style>
            </div>

            <Footer />

        </>
    );
};

export default DatabaseDashboard;