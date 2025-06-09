import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Handshake, Users, BookOpen, ArrowRight, Lightbulb, Shield, TrendingUp } from 'lucide-react';

const CAPCHAActivities = () => {
    const activities = [
        {
            id: 1,
            title: "Research and Innovation",
            description: "Africa is among the regions that is most vulnerable to climate change impacts, yet it contributes least to global emissions. Our research focuses on developing innovative solutions.",
            icon: Brain,
            color: "bg-[#0d9488]",
            hoverColor: "hover:bg-[#0f766e]",
            textColor: "text-[#0d9488]",
            features: ["Climate Adaptation", "Innovation Labs", "Data Analysis"]
        },
        {
            id: 2,
            title: "Policy and Advocacy",
            description: "CAPCHA will serve as a unified platform to advocate for evidence-based policies that address climate challenges and promote sustainable development.",
            icon: Handshake,
            color: "bg-[#0e8601]",
            hoverColor: "hover:bg-[#166534]",
            textColor: "text-[#0e8601]",
            features: ["Policy Development", "Stakeholder Engagement", "Evidence-Based Solutions"]
        },
        {
            id: 3,
            title: "Capacity Enhancement",
            description: "Raising awareness about health risks associated with climate change and building local capacity to address emerging challenges through education and training.",
            icon: Users,
            color: "bg-[#021d49]",
            hoverColor: "hover:bg-[#1e3a8a]",
            textColor: "text-[#021d49]",
            features: ["Training Programs", "Awareness Campaigns", "Skill Development"]
        },
        {
            id: 4,
            title: "Quick Read",
            description: "Get some of our blogs and latest news to help you gather insights on climate change, health impacts, and sustainable solutions for African communities.",
            icon: BookOpen,
            color: "bg-gradient-to-r from-[#0d9488] to-[#0e8601]",
            hoverColor: "hover:from-[#0f766e] hover:to-[#166534]",
            textColor: "text-[#0d9488]",
            features: ["Latest Research", "Blog Posts", "News Updates"]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-2 text-[#021d49] border-[#021d49]">
                        Our Activities
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6">
                        CAPCHA Activities
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0d9488] to-[#0e8601] mx-auto mb-6"></div>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Empowering African communities through comprehensive climate and health initiatives
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {activities.map((activity) => {
                        const IconComponent = activity.icon;
                        return (
                            <Card
                                key={activity.id}
                                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden"
                            >
                                <CardHeader className="pb-4">
                                    <div className={`w-16 h-16 ${activity.color} ${activity.hoverColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <CardTitle className={`text-xl font-bold ${activity.textColor} mb-2 group-hover:text-[#021d49] transition-colors`}>
                                        {activity.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {activity.description}
                                    </p>

                                    <div className="space-y-2">
                                        {activity.features.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                                                <span className="text-sm text-slate-500">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className={`w-full ${activity.textColor} hover:bg-slate-50 group-hover:bg-slate-100 transition-all duration-300 mt-4`}
                                    >
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>



            </div>
        </div>
    );
};

export default CAPCHAActivities;