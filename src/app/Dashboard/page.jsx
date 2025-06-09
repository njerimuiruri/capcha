import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BarChart3, Users, Brain, Share2 } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                    <div className="relative grid grid-cols-3 gap-6 h-[600px]">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6">
                            {/* Database Dashboard - Top Left */}
                            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex-1">
                                <CardHeader className="pb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                        <BarChart3 className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Database Dashboard
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        provides users with access to a centralized collection of data and analytics.
                                    </p>
                                    <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                        Read More
                                        <span className="text-xs">»</span>
                                    </button>
                                </CardContent>
                            </Card>

                            {/* Stakeholder Database - Bottom Left */}
                            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex-1">
                                <CardHeader className="pb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                        <Users className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Stakeholder Database
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Climate and Health Stakeholder Database
                                    </p>
                                    <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                        Read More
                                        <span className="text-xs">»</span>
                                    </button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Center Column - Globe Image */}
                        <div className="flex items-center justify-center">
                            <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center shadow-sm overflow-hidden relative">
                                <img
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Ccircle cx='200' cy='200' r='180' fill='%23e0f2fe'/%3E%3Ccircle cx='200' cy='200' r='160' fill='%23b3e5fc'/%3E%3Ccircle cx='200' cy='200' r='140' fill='%2381d4fa'/%3E%3Ctext x='200' y='220' text-anchor='middle' font-size='60' fill='%23455a64'%3E🌍%3C/text%3E%3C/svg%3E"
                                    alt="Globe representation"
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                        <p className="text-blue-700 text-xs font-medium bg-white/80 px-2 py-1 rounded">
                                            Climate & Health Global Impact
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                            {/* Knowledge Translation - Top Right */}
                            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex-1">
                                <CardHeader className="pb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                        <Brain className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Knowledge translation and policy
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        To bridge the gap between scientific research and practical application
                                    </p>
                                    <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                        Read More
                                        <span className="text-xs">»</span>
                                    </button>
                                </CardContent>
                            </Card>

                            {/* Knowledge Sharing - Bottom Right */}
                            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex-1">
                                <CardHeader className="pb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                        <Share2 className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Knowledge sharing and engagement
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Shares knowledge, best practices, and research findings related to the impacts of climate change on health
                                    </p>
                                    <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                        Read More
                                        <span className="text-xs">»</span>
                                    </button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Mobile and Tablet Layout */}
                <div className="lg:hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Database Dashboard Card */}
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Database Dashboard
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    provides users with access to a centralized collection of data and analytics.
                                </p>
                                <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                    Read More
                                    <span className="text-xs">»</span>
                                </button>
                            </CardContent>
                        </Card>

                        {/* Knowledge Translation Card */}
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <Brain className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Knowledge translation and policy
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    To bridge the gap between scientific research and practical application
                                </p>
                                <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                    Read More
                                    <span className="text-xs">»</span>
                                </button>
                            </CardContent>
                        </Card>

                        {/* Central Image */}
                        <div className="md:col-span-2">
                            <Card className="bg-white shadow-sm">
                                <CardContent className="p-0">
                                    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center rounded-lg">
                                        <div className="text-center p-6">
                                            <div className="w-24 h-24 mx-auto mb-3 bg-blue-200 rounded-full flex items-center justify-center">
                                                <div className="w-18 h-18 bg-blue-300 rounded-full flex items-center justify-center">
                                                    <div className="text-blue-700 text-lg">🌍</div>
                                                </div>
                                            </div>
                                            <p className="text-blue-700 text-sm">Climate & Health Global Impact</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stakeholder Database Card */}
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Stakeholder Database
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Climate and Health Stakeholder Database
                                </p>
                                <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                    Read More
                                    <span className="text-xs">»</span>
                                </button>
                            </CardContent>
                        </Card>

                        {/* Knowledge Sharing Card */}
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <Share2 className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Knowledge sharing and engagement
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Shares knowledge, best practices, and research findings related to the impacts of climate change on health
                                </p>
                                <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-200 flex items-center gap-1">
                                    Read More
                                    <span className="text-xs">»</span>
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;