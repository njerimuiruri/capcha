'use client';
import React from 'react';
import Image from 'next/image';
import { Leaf, Globe, Award, Users, Heart, Brain, Network, Target } from 'lucide-react';

const AboutSection = () => {
    return (
        <div className="relative bg-white dark:bg-gray-900 py-24 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="relative">
                        <div className="relative space-y-4">
                            <div className="ml-auto w-4/5">
                                <div className="rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl">
                                    <Image
                                        src="/img/health1.jpg"
                                        alt="Conference presentation with speakers at panel"
                                        width={600}
                                        height={320}
                                        className="w-full h-80 object-cover"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl overflow-hidden shadow-lg dark:shadow-xl">
                                    <Image
                                        src="/img/twohandsplant.jpg"
                                        alt="Meeting room with people around table"
                                        width={300}
                                        height={240}
                                        className="w-full h-60 object-cover"
                                    />
                                </div>

                                <div className="rounded-xl overflow-hidden shadow-lg dark:shadow-xl">
                                    <Image
                                        src="/img/twohandsplant.jpg"
                                        alt="Field researchers working outdoors in grassland"
                                        width={300}
                                        height={240}
                                        className="w-full h-60 object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-gradient-to-r from-[#021d49]/10 via-[#55bdd0]/10 to-[#0e8601]/10 dark:from-[#021d49]/20 dark:via-[#55bdd0]/20 dark:to-[#0e8601]/20 p-6 rounded-xl border-l-4 border-[#0e8601] shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 dark:bg-gray-800/50">
                            <h3 className="text-xl font-semibold text-[#021d49] dark:text-[#55bdd0] mb-3 flex items-center transition-colors duration-300">
                                <Network className="w-5 h-5 mr-2 text-[#0e8601] dark:text-[#55bdd0]" />
                                Platform Networks
                            </h3>
                            <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                <p className="leading-relaxed">
                                    This can be achieved by <strong className="text-[#021d49] dark:text-[#55bdd0]">creating platforms and networks that bring together
                                        researchers, policy-makers, and practitioners from various disciplines and sectors.</strong> Such platforms
                                    facilitate knowledge exchange, sharing of best practices, and collaboration on research and policy development.
                                </p>
                                <p className="leading-relaxed">
                                    The platforms can also be used to encourage <strong className="text-[#021d49] dark:text-[#55bdd0]">regular communication channels
                                        such as meetings, conferences, and webinars</strong> to help foster dialogue and information sharing between
                                    different stakeholders. This ensures that C & H stakeholders are up-to-date with the latest research,
                                    policy updates, and field experiences.
                                </p>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#55bdd0]/20 to-transparent rounded-full blur-xl dark:from-[#55bdd0]/30"></div>
                        <div className="absolute bottom-8 -left-4 w-16 h-16 bg-gradient-to-br from-[#0e8601]/30 to-transparent rounded-full blur-lg dark:from-[#0e8601]/40"></div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <span className="text-[#55bdd0] dark:text-[#55bdd0] font-semibold text-sm md:text-base tracking-wide uppercase">
                                Rationale
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#021d49] dark:text-white mt-4 leading-tight transition-colors duration-300">
                                Why{' '}
                                <span className="text-transparent bg-gradient-to-r from-[#55bdd0] to-[#0e8601] bg-clip-text">
                                    Climate & Health
                                </span>{' '}
                                Platform
                            </h2>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gradient-to-r from-[#021d49]/10 to-[#55bdd0]/10 dark:from-[#021d49]/20 dark:to-[#55bdd0]/20 p-6 rounded-xl border-l-4 border-[#021d49] dark:border-[#55bdd0] shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 dark:bg-gray-800/50">
                                <h3 className="text-xl font-semibold text-[#021d49] dark:text-[#55bdd0] mb-3 flex items-center transition-colors duration-300">
                                    <Target className="w-5 h-5 mr-2 text-[#021d49] dark:text-[#55bdd0]" />
                                    The Transformation Needed
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    The transformation needed to address the health impacts of climate change in Africa will demand
                                    <strong className="text-[#021d49] dark:text-[#55bdd0]"> innovative approaches of mobilizing resources, working jointly, and applying knowledge.</strong>
                                    To efficiently address the diverse C & H challenges as well as the varied needs and interests of
                                    actors in the different sectors, research must be effectively interlinked with policymaking, planning, and action.
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-[#55bdd0]/10 to-[#0e8601]/10 dark:from-[#55bdd0]/20 dark:to-[#0e8601]/20 p-6 rounded-xl border-l-4 border-[#55bdd0] shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 dark:bg-gray-800/50">
                                <h3 className="text-xl font-semibold text-[#021d49] dark:text-white mb-3 flex items-center transition-colors duration-300">
                                    <Brain className="w-5 h-5 mr-2 text-[#55bdd0]" />
                                    Co-generation Approach
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                    <strong className="text-[#021d49] dark:text-[#55bdd0]">The co-generation of data across disciplines</strong> is one approach that can foster
                                    such transformations. By providing timely and policy-relevant research, researchers can support
                                    evidence-based decision-making and effective implementation of climate and health policies.
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-[#0e8601]/10 via-[#55bdd0]/5 to-[#021d49]/10 dark:from-[#0e8601]/20 dark:via-[#55bdd0]/10 dark:to-[#021d49]/20 p-6 rounded-xl border-l-4 border-[#0e8601] shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 dark:bg-gray-800/50">
                                <h3 className="text-xl font-semibold text-[#021d49] dark:text-white mb-3 flex items-center transition-colors duration-300">
                                    <Heart className="w-5 h-5 mr-2 text-[#0e8601]" />
                                    Connecting Climate and Health
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <strong className="text-[#021d49] dark:text-[#55bdd0]">Information on the connection between climate and health will equally be provided
                                        on the platform</strong> as most people view them separately. This can be done by sharing evidence of how
                                    climate change can affect the health sector, and similarly how the health sector can get prepared and
                                    minimize the negative effects of climate change.
                                </p>
                            </div>

                            <div className="flex justify-start mt-4">
                                <button className="bg-gradient-to-r from-[#55bdd0] to-[#0e8601] hover:from-[#4aa5b8] hover:to-[#0c7501] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
                                    <Globe className="w-5 h-5 mr-2" />
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-2 h-2 bg-[#55bdd0] dark:bg-[#55bdd0]/80 rounded-full opacity-40 dark:opacity-60"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-[#0e8601] dark:bg-[#0e8601]/80 rounded-full opacity-30 dark:opacity-50"></div>
                <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-[#021d49] dark:bg-white rounded-full opacity-50 dark:opacity-70"></div>
                <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-[#55bdd0] dark:bg-[#55bdd0]/80 rounded-full opacity-35 dark:opacity-55"></div>
            </div>
        </div>

    );
};

export default AboutSection;