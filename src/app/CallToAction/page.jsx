import React from 'react';

const CallToAction = () => {
    return (
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg width="1920" height="600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#98FB98;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="100%" height="60%" fill="url(#skyGradient)"/>
              <rect y="60%" width="100%" height="40%" fill="#90EE90"/>
              <!-- Clouds -->
              <ellipse cx="300" cy="120" rx="80" ry="40" fill="white" opacity="0.7"/>
              <ellipse cx="800" cy="100" rx="100" ry="50" fill="white" opacity="0.6"/>
              <ellipse cx="1400" cy="150" rx="90" ry="45" fill="white" opacity="0.5"/>
              <!-- People silhouettes -->
              <ellipse cx="600" cy="360" rx="20" ry="40" fill="#333" opacity="0.8"/>
              <ellipse cx="700" cy="370" rx="18" ry="35" fill="#333" opacity="0.7"/>
            </svg>
          `)}`
                }}
            />

            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, 
            rgba(2, 29, 73, 0.85) 0%, 
            rgba(2, 29, 73, 0.7) 50%, 
            rgba(14, 134, 1, 0.7) 100%)`
                }}
            />

            <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center">



                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white">
                        <span className="block">
                            Components Of{' '}
                            <span
                                className="relative bg-gradient-to-r from-blue-300 via-white to-green-300 bg-clip-text text-transparent font-extrabold"
                                style={{
                                    textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
                                }}
                            >
                                CAPCHA
                            </span>
                        </span>
                    </h1>

                </div>
            </div>

            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-white/20 animate-pulse"></div>
            <div className="absolute bottom-6 left-6 h-1.5 w-1.5 rounded-full bg-green-300/40 animate-pulse delay-500"></div>
            <div className="absolute top-8 left-1/4 h-1 w-1 rounded-full bg-blue-300/30 animate-pulse delay-1000"></div>
        </div>
    );
};

export default CallToAction;