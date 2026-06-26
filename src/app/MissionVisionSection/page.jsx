import React from 'react';
import { Eye, Target } from 'lucide-react';

export default function MissionVisionSection() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-0.5 bg-[#55bdd0]" />
                        <span className="text-[#55bdd0] font-semibold text-xs tracking-widest uppercase">
                            Our Foundation
                        </span>
                        <div className="w-8 h-0.5 bg-[#55bdd0]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#021d49] dark:text-white">
                        Mission &amp; Vision
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Vision */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                        <div className="w-12 h-12 bg-[#55bdd0]/10 dark:bg-[#55bdd0]/20 rounded-xl flex items-center justify-center mb-5">
                            <Eye className="w-6 h-6 text-[#55bdd0]" />
                        </div>
                        <span className="text-[#55bdd0] text-xs font-bold uppercase tracking-widest">
                            Vision Statement
                        </span>
                        <div className="w-10 h-0.5 bg-[#55bdd0] mt-2 mb-5" />
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Building a transdisciplinary community of practice towards enhanced
                            decision support environment on C &amp; H research and policy in Africa.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                        <div className="w-12 h-12 bg-[#0e8601]/10 dark:bg-[#0e8601]/20 rounded-xl flex items-center justify-center mb-5">
                            <Target className="w-6 h-6 text-[#0e8601]" />
                        </div>
                        <span className="text-[#0e8601] text-xs font-bold uppercase tracking-widest">
                            Mission Statement
                        </span>
                        <div className="w-10 h-0.5 bg-[#0e8601] mt-2 mb-5" />
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Nurturing transdisciplinary science-policy engagements towards
                            advocating for resilient and low-carbon health systems.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
