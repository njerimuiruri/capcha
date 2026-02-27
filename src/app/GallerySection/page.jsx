'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const GallerySection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);
    const carouselRef = useRef(null);

    const images = [
        { id: 1, src: "/img/conf1.jpg", alt: "Conference 1", title: "Opening Ceremony", category: "Conference" },
        { id: 2, src: "/img/conf2.jpg", alt: "Conference 2", title: "Keynote Session", category: "Conference" },
        { id: 3, src: "/img/conf3.jpg", alt: "Conference 3", title: "Panel Discussion", category: "Conference" },
        { id: 4, src: "/img/conf4.jpg", alt: "Conference 4", title: "Networking Event", category: "Conference" },
        { id: 5, src: "/img/conf5.jpg", alt: "Conference 5", title: "Workshop Session", category: "Conference" },
        { id: 6, src: "/img/conf6.jpg", alt: "Conference 6", title: "Innovation Talk", category: "Conference" },
        { id: 7, src: "/img/conf7.jpg", alt: "Conference 7", title: "Awards Ceremony", category: "Conference" },
        { id: 8, src: "/img/conf8.jpg", alt: "Conference 8", title: "Closing Remarks", category: "Conference" },
        { id: 9, src: "/img/conf9.jpg", alt: "Conference 9", title: "Group Photo", category: "Conference" },
        { id: 10, src: "/img/webiner.jpeg", alt: "Webinar", title: "Live Webinar", category: "Webinar" },
        { id: 11, src: "/img/chac.jpeg", alt: "CHAC Event", title: "CHAC Gathering", category: "Event" },
        {
            id: 12,
            src: "/img/image2.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        },
        {
            id: 13,
            src: "/img/con1.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        }, {
            id: 14,
            src: "/img/con2.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        }
        , {
            id: 15,
            src: "/img/con3.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        }, {
            id: 16,
            src: "/img/con4.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        }
        , {
            id: 17,
            src: "/img/con5.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        },
        {
            id: 18,
            src: "/img/con6.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        },
        {
            id: 19,
            src: "/img/con7.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        },
        {
            id: 20,
            src: "/img/con8.jpeg",
            alt: "Gallery Image 9",
            title: "Conference"
        }];

    const count = images.length;

    const goTo = useCallback((index, skipTransition = false) => {
        if (isTransitioning && !skipTransition) return;
        setIsTransitioning(true);
        setActiveIndex(((index % count) + count) % count);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [count, isTransitioning]);

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    useEffect(() => {
        if (isPlaying && !selectedImage) {
            intervalRef.current = setInterval(next, 800);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, next, selectedImage]);

    const handleMouseDown = (e) => { setIsDragging(true); setDragStart(e.clientX); };
    const handleMouseUp = (e) => {
        if (!isDragging) return;
        setIsDragging(false);
        const diff = dragStart - e.clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    };
    const handleTouchStart = (e) => { setDragStart(e.touches[0].clientX); };
    const handleTouchEnd = (e) => {
        const diff = dragStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    };

    // Inject Google Fonts on client only to avoid hydration mismatch
    useEffect(() => {
        const id = 'gallery-fonts';
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@300;400;500&display=swap';
        document.head.appendChild(link);
    }, []);
    const getRelativeIndex = (offset) => ((activeIndex + offset + count) % count);

    const cardPositions = [
        { offset: -2, scale: 0.65, translateX: '-200%', zIndex: 1, opacity: 0.3, blur: 4, rotate: -8 },
        { offset: -1, scale: 0.80, translateX: '-115%', zIndex: 2, opacity: 0.6, blur: 2, rotate: -4 },
        { offset: 0, scale: 1.00, translateX: '0%', zIndex: 10, opacity: 1.0, blur: 0, rotate: 0 },
        { offset: 1, scale: 0.80, translateX: '115%', zIndex: 2, opacity: 0.6, blur: 2, rotate: 4 },
        { offset: 2, scale: 0.65, translateX: '200%', zIndex: 1, opacity: 0.3, blur: 4, rotate: 8 },
    ];

    return (
        <>
            <style suppressHydrationWarning>{`
                .gallery-root {
                    font-family: 'Outfit', sans-serif;
                    min-height: 100vh;
                    background:white;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 1rem;
                }

                .gallery-root::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 80% 60% at 20% 10%, rgba(14,134,1,0.12) 0%, transparent 60%),
                        radial-gradient(ellipse 60% 80% at 80% 90%, rgba(2,29,73,0.4) 0%, transparent 60%),
                        radial-gradient(ellipse 40% 40% at 60% 40%, rgba(3,71,133,0.08) 0%, transparent 50%);
                    pointer-events: none;
                }

                .gallery-root::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
                    opacity: 0.4;
                    pointer-events: none;
                }

                .gallery-header {
                    text-align: center;
                    margin-bottom: 3.5rem;
                    position: relative;
                    z-index: 5;
                }

                .gallery-eyebrow {
                    font-family: 'Outfit', sans-serif;
                    font-weight: 700;
                    font-size:1rem;
                    letter-spacing: 0.4em;
                    text-transform: uppercase;
                    color: #0e8601;
                    margin-bottom: 0.75rem;
                    opacity: 0.9;
                }

                .gallery-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 300;
                    font-size: clamp(2.8rem, 6vw, 5rem);
                    line-height: 1.05;
                    color: black;
                    letter-spacing: -0.01em;
                }

                .gallery-title em {
                    font-style: italic;
                    color: #0e8601;
                }

                .gallery-title-rule {
                    width: 60px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #0e8601, transparent);
                    margin: 1.25rem auto 0;
                }

                .carousel-stage {
                    position: relative;
                    width: 100%;
                    max-width: 900px;
                    height: 520px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 5;
                    cursor: grab;
                    user-select: none;
                }

                .carousel-stage:active { cursor: grabbing; }

                .carousel-card {
                    position: absolute;
                    width: 380px;
                    height: 460px;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-origin: center center;
                    will-change: transform, opacity, filter;
                }

                @media (max-width: 640px) {
                    .carousel-card { width: 280px; height: 360px; }
                    .carousel-stage { height: 420px; }
                }

                .card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
                    transition: box-shadow 0.6s ease;
                }

                .card-inner.active {
                    box-shadow:
                        0 60px 120px rgba(0,0,0,0.8),
                        0 0 0 1px rgba(14,134,1,0.3),
                        0 0 60px rgba(14,134,1,0.15);
                }

                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
                    z-index: 2;
                    transition: opacity 0.4s;
                }

                .card-glow {
                    position: absolute;
                    inset: -2px;
                    border-radius: 22px;
                    background: linear-gradient(135deg, rgba(14,134,1,0.6), rgba(3,71,133,0.6));
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                .carousel-card.is-active .card-glow { opacity: 1; }

                .card-meta {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 1.5rem;
                    z-index: 3;
                    transform: translateY(4px);
                    transition: transform 0.4s;
                }

                .carousel-card.is-active .card-meta { transform: translateY(0); }

                .card-category {
                    font-size: 0.62rem;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    color: #0e8601;
                    font-weight: 500;
                    margin-bottom: 0.3rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .card-category::before {
                    content: '';
                    display: inline-block;
                    width: 20px;
                    height: 1px;
                    background: #0e8601;
                }

                .card-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 400;
                    font-size: 1.5rem;
                    color: #f5f0e8;
                    line-height: 1.2;
                    margin-bottom: 0.75rem;
                }

                .card-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.68rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(245,240,232,0.5);
                    cursor: pointer;
                    transition: color 0.3s;
                    border: none;
                    background: none;
                    padding: 0;
                }

                .card-cta:hover { color: #f5f0e8; }
                .card-cta::after { content: '→'; transition: transform 0.3s; }
                .card-cta:hover::after { transform: translateX(4px); }

                .counter-track {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 2.5rem;
                    position: relative;
                    z-index: 5;
                }

                .counter-num {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 300;
                    font-size: 0.9rem;
                    color: rgba(245,240,232,0.4);
                    min-width: 2rem;
                    text-align: center;
                }

                .counter-num.highlight {
                    color: #f5f0e8;
                    font-size: 1.1rem;
                }

                .progress-bar-wrap {
                    position: relative;
                    width: 140px;
                    height: 2px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 2px;
                    overflow: hidden;
                }

                .progress-bar-fill {
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    background: linear-gradient(90deg, #0e8601, #34d399);
                    border-radius: 2px;
                    transition: width 0.4s ease;
                }

                .controls-row {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-top: 2rem;
                    position: relative;
                    z-index: 5;
                }

                .ctrl-btn {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.12);
                    background: rgba(255,255,255,0.04);
                    color: rgba(245,240,232,0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.25s;
                    backdrop-filter: blur(8px);
                }

                .ctrl-btn:hover {
                    background: rgba(14,134,1,0.2);
                    border-color: rgba(14,134,1,0.5);
                    color: #f5f0e8;
                    transform: scale(1.05);
                }

                .ctrl-btn.primary {
                    width: 52px;
                    height: 52px;
                    background: rgba(14,134,1,0.15);
                    border-color: rgba(14,134,1,0.4);
                    color: #0e8601;
                }

                .ctrl-btn.primary:hover {
                    background: rgba(14,134,1,0.3);
                }

                .dots-strip {
                    display: flex;
                    gap: 0.4rem;
                    align-items: center;
                    margin-top: 1.5rem;
                    position: relative;
                    z-index: 5;
                }

                .dot {
                    height: 3px;
                    border-radius: 2px;
                    background: rgba(255,255,255,0.15);
                    transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
                    cursor: pointer;
                    border: none;
                    padding: 0;
                    width: 18px;
                }

                .dot.active {
                    width: 40px;
                    background: linear-gradient(90deg, #0e8601, #34d399);
                }

                .dot:hover:not(.active) { background: rgba(255,255,255,0.35); }

                /* Lightbox */
                .lightbox {
                    position: fixed;
                    inset: 0;
                    z-index: 100;
                    background: rgba(0,0,0,0.96);
                    backdrop-filter: blur(20px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    animation: lbIn 0.35s ease;
                }

                @keyframes lbIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }

                .lb-inner {
                    position: relative;
                    max-width: 900px;
                    width: 100%;
                    animation: lbSlide 0.4s cubic-bezier(0.4,0,0.2,1);
                }

                @keyframes lbSlide {
                    from { transform: scale(0.92) translateY(20px); opacity: 0; }
                    to   { transform: scale(1) translateY(0); opacity: 1; }
                }

                .lb-img-wrap {
                    position: relative;
                    width: 100%;
                    border-radius: 16px;
                    overflow: hidden;
                    aspect-ratio: 16/10;
                    border: 1px solid rgba(14,134,1,0.3);
                    box-shadow: 0 0 80px rgba(14,134,1,0.2);
                }

                .lb-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 0 0;
                }

                .lb-info h3 {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 400;
                    font-size: 1.4rem;
                    color: #f5f0e8;
                }

                .lb-info span {
                    font-size: 0.75rem;
                    color: rgba(245,240,232,0.35);
                    letter-spacing: 0.1em;
                }

                .lb-close {
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.15);
                    background: transparent;
                    color: rgba(245,240,232,0.6);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.25s;
                    position: absolute;
                    top: -3rem; right: 0;
                }

                .lb-close:hover {
                    background: rgba(220,38,38,0.2);
                    border-color: rgba(220,38,38,0.4);
                    color: #f5f0e8;
                }

                .lb-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 44px; height: 44px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.15);
                    background: rgba(0,0,0,0.6);
                    color: #f5f0e8;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.25s;
                    backdrop-filter: blur(8px);
                }

                .lb-nav.left  { left: -1.5rem; }
                .lb-nav.right { right: -1.5rem; }
                .lb-nav:hover { background: rgba(14,134,1,0.3); border-color: rgba(14,134,1,0.6); }
            `}</style>

            <div className="gallery-root">
                {/* Header */}
                <header className="gallery-header">
                    <p className="gallery-eyebrow">Our Moments</p>
                    <h2 className="gallery-title">
                        Visual <em>Stories</em>
                    </h2>
                    <div className="gallery-title-rule" />
                </header>

                {/* Carousel Stage */}
                <div
                    className="carousel-stage"
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {cardPositions.map(({ offset, scale, translateX, zIndex, opacity, blur, rotate }) => {
                        const imgIndex = getRelativeIndex(offset);
                        const image = images[imgIndex];
                        const isActive = offset === 0;
                        return (
                            <div
                                key={`card-${offset}`}
                                className={`carousel-card${isActive ? ' is-active' : ''}`}
                                style={{
                                    transform: `translateX(${translateX}) scale(${scale}) rotate(${rotate}deg)`,
                                    zIndex,
                                    opacity,
                                    filter: `blur(${blur}px)`,
                                    pointerEvents: isActive ? 'auto' : 'none',
                                }}
                                onClick={() => isActive && setSelectedImage(image)}
                            >

                                <div className="card-glow" />
                                <div className={`card-inner${isActive ? ' active' : ''}`}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="400px"
                                        className="object-cover"
                                        priority={isActive}
                                        style={{ transition: 'transform 0.6s ease' }}
                                    />
                                    <div className="card-overlay" />
                                    <div className="card-meta">
                                        <div className="card-category">{image.category}</div>
                                        <h3 className="card-title">{image.title}</h3>
                                        <button className="card-cta">View Full</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Counter + Progress */}
                <div className="counter-track">
                    <span className="counter-num highlight">{String(activeIndex + 1).padStart(2, '0')}</span>
                    <div className="progress-bar-wrap">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${((activeIndex + 1) / count) * 100}%` }}
                        />
                    </div>
                    <span className="counter-num">{String(count).padStart(2, '0')}</span>
                </div>

                {/* Dots */}
                <div className="dots-strip">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`dot${i === activeIndex ? ' active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Controls */}
                <div className="controls-row">
                    <button className="ctrl-btn" onClick={prev} aria-label="Previous">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="ctrl-btn primary" onClick={() => setIsPlaying(p => !p)} aria-label="Play/Pause">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button className="ctrl-btn" onClick={next} aria-label="Next">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lb-inner" onClick={e => e.stopPropagation()}>
                        <button className="lb-close" onClick={() => setSelectedImage(null)}>
                            <X size={16} />
                        </button>
                        <div className="lb-img-wrap">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                sizes="900px"
                                className="object-cover"
                                priority
                            />
                            <button className="lb-nav left" onClick={() => {
                                const i = images.findIndex(img => img.id === selectedImage.id);
                                setSelectedImage(images[(i - 1 + count) % count]);
                            }}>
                                <ChevronLeft size={18} />
                            </button>
                            <button className="lb-nav right" onClick={() => {
                                const i = images.findIndex(img => img.id === selectedImage.id);
                                setSelectedImage(images[(i + 1) % count]);
                            }}>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        <div className="lb-bar">
                            <div className="lb-info">
                                <h3>{selectedImage.title}</h3>
                                <span>{selectedImage.category} &nbsp;·&nbsp; {images.findIndex(i => i.id === selectedImage.id) + 1} / {count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GallerySection;