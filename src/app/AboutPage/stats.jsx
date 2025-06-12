import React from 'react';
import Image from 'next/image';

const StatsSection = () => {
    const statsData = [
        {
            number: "21+",
            text: "Countries that have implemented HNAPS in Africa",
            color: "text-orange-500",
            bgColor: "bg-orange-50",
            position: "top-0 left-4 md:left-8"
        },
        {
            number: "15+",
            text: "Countries that have not considered implementing HNAPS in Africa",
            color: "text-green-700",
            bgColor: "bg-green-50",
            position: "top-24 md:top-32 left-8 md:left-16"
        },
        {
            number: "17+",
            text: "Countries considering to implement HNAPS in Africa",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            position: "bottom-4 md:bottom-8 right-4 md:right-8"
        }
    ];

    return (
        <section className="relative min-h-[80vh] bg-gradient-to-br from-gray-50 to-teal-50 flex items-center overflow-hidden py-6 md:py-8">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 bg-teal-200 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-100 rounded-full blur-xl"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

                    <div className="w-full lg:w-1/2 lg:pr-8">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <Image
                                src="/img/stats.jpg"
                                alt="HNAPS Implementation in Africa - Healthcare systems strengthening"
                                width={800}
                                height={600}
                                className="relative w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                quality={85}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative min-h-[400px] lg:h-96">
                        {statsData.map((stat, index) => (
                            <div
                                key={index}
                                className={`absolute ${stat.position} z-10 group cursor-pointer animate-fade-in-up`}
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                    animationFillMode: 'both'
                                }}
                            >
                                <div className={`${stat.bgColor} backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px] md:min-w-[240px] transform hover:scale-105 hover:-translate-y-2`}>
                                    <div className="text-center">
                                        <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-2 transition-colors duration-300 group-hover:scale-110`}>
                                            {stat.number}
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                                            {stat.text}
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}></div>
                                </div>
                            </div>
                        ))}

                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 1 }}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0d9488" />
                                    <stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 60 40 Q 120 80 180 120 Q 240 160 300 280"
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5,5"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 z-20">
                <div className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] animate-float drop-shadow-lg mb-2 mr-4">
                    <Image
                        src="/img/colored-trees.png"
                        alt="Decorative tree illustration representing growth and sustainability"
                        fill
                        className="object-contain filter drop-shadow-md"
                        sizes="(max-width: 768px) 100px, 140px"
                        quality={85}
                    />
                </div>

                <div className="absolute -bottom-2 -right-2 w-[40px] h-[40px] md:w-[60px] md:h-[60px] animate-leaf-float drop-shadow-md">
                    <Image
                        src="/img/leaves.png"
                        alt="Decorative leaf illustration"
                        fill
                        className="object-contain filter drop-shadow-sm"
                        sizes="(max-width: 768px) 40px, 60px"
                        quality={85}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-8px) translateX(3px) rotate(1deg);
                    }
                    50% {
                        transform: translateY(-5px) translateX(-3px) rotate(-1deg);
                    }
                    75% {
                        transform: translateY(-10px) translateX(2px) rotate(0.5deg);
                    }
                }

                @keyframes leafFloat {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px) rotate(0deg);
                    }
                    33% {
                        transform: translateY(-3px) translateX(-2px) rotate(-2deg);
                    }
                    66% {
                        transform: translateY(-6px) translateX(1px) rotate(2deg);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-leaf-float {
                    animation: leafFloat 4s ease-in-out infinite;
                    animation-delay: 1s;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out;
                }
            `}</style>
        </section>
    );
};

export default StatsSection;