import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MissionVisionSection() {
    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 hover:shadow-lg transition-shadow duration-300" style={{ borderColor: '#0e8601' }}>
                    <CardHeader className="text-center pb-4" style={{ backgroundColor: '#021d49' }}>
                        <CardTitle className="text-2xl font-bold text-white tracking-wide">
                            VISION STATEMENT
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-lg leading-relaxed text-gray-700 text-center">
                            Building a transdisciplinary community of practice towards enhanced decision support environment on C & H research and policy in Africa
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow duration-300" style={{ borderColor: '#021d49' }}>
                    <CardHeader className="text-center pb-4" style={{ backgroundColor: '#0e8601' }}>
                        <CardTitle className="text-2xl font-bold text-white tracking-wide">
                            MISSION STATEMENT
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-lg leading-relaxed text-gray-700 text-center">
                            Nurturing transdisciplinary science-policy engagements towards advocating for resilient and low-carbon health systems.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}