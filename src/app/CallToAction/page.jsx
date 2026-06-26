import React from 'react';

const CallToAction = () => {
    return (
        <div className="relative bg-[#021d49] py-12 overflow-hidden">

            {/* ── Decorative background ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                {/* Large blurred green circle – top right */}
                <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] bg-[#0e8601] rounded-full opacity-[0.12] blur-3xl" />
                {/* Large blurred teal circle – bottom left */}
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#55bdd0] rounded-full opacity-[0.12] blur-3xl" />
                {/* Vertical accent lines */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#55bdd0]/20 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#0e8601]/20 to-transparent" />
                {/* Small floating dots */}
                <div className="absolute top-1/4 left-[15%] w-3 h-3 bg-[#0e8601] rounded-full opacity-40" />
                <div className="absolute top-3/4 right-[18%] w-2 h-2 bg-[#55bdd0] rounded-full opacity-50" />
                <div className="absolute top-1/2 left-[40%] w-1.5 h-1.5 bg-[#ff9500] rounded-full opacity-30" />
                <div className="absolute top-[20%] right-[35%] w-2 h-2 bg-[#0e8601] rounded-full opacity-25" />
            </div>

            {/* ── Content ── */}
            <div className="relative container mx-auto px-6 lg:px-12 text-center">

                {/* Pill label */}
                <div className="inline-flex items-center gap-2 bg-[#0e8601]/20 border border-[#0e8601]/40 text-[#55bdd0] text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0e8601] animate-pulse" />
                    Our Platform
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Components of{' '}
                    <span className="text-transparent bg-gradient-to-r from-[#55bdd0] to-[#0e8601] bg-clip-text">
                        CAPCHA
                    </span>
                </h2>

                <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed mb-10">
                    Explore the key pillars that drive our climate-health mission across Africa.
                </p>

                {/* Decorative accent bar */}
                <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-0.5 bg-[#55bdd0] rounded-full" />
                    <div className="w-2.5 h-2.5 bg-[#0e8601] rounded-full" />
                    <div className="w-16 h-0.5 bg-[#0e8601] rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
