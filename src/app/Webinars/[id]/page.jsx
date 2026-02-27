'use client'
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Calendar,
    Clock,
    Users,
    Play,
    ArrowLeft,
    ChevronRight,
    Globe,
    Share2,
    Download,
    Tag,
    Mic,
    Monitor,
    CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

// ---------------------------------------------------------------------------
// Centralised data — in production this would come from an API / CMS
// ---------------------------------------------------------------------------
const webinars = [
    {
        id: 1,
        slug: 'climate-health-nexus-africa',
        title: 'The Climate-Health Nexus in Africa: Understanding the Risks',
        description:
            'An in-depth exploration of how rising temperatures, extreme weather events, and shifting disease vectors are reshaping public health across Sub-Saharan Africa. Experts from across the continent share research findings and policy implications.',
        fullDescription: `
            Climate change is no longer a distant threat — it is reshaping the health landscape across Africa in profound and accelerating ways.
            This webinar brings together leading researchers, clinicians, and policy advocates to examine the mechanisms through which environmental change
            translates into disease burden, displacement, malnutrition, and mental health impacts.

            Participants will explore how heat stress is increasing mortality among outdoor workers, how erratic rainfall patterns are amplifying waterborne disease outbreaks,
            and how coastal flooding is disrupting health infrastructure. We also look at the growing evidence base linking air-quality deterioration to respiratory disease in
            rapidly urbanising African cities.

            The session concludes with a forward-looking discussion on what integrated climate-health surveillance systems could look like, and what policy levers are available
            to African governments to protect their populations.
        `,
        date: 'March 15, 2024',
        time: '10:00 AM – 11:30 AM WAT',
        duration: '90 minutes',
        speakers: [
            {
                name: 'Dr. Amina Osei',
                role: 'Climate Epidemiologist, University of Ghana',
                bio: 'Dr. Osei has 15 years of experience studying the health impacts of climate variability in West Africa, with a focus on malaria and heat-related illness.',
            },
            {
                name: 'Prof. James Kariuki',
                role: 'Environmental Health, University of Nairobi',
                bio: 'Prof. Kariuki leads the Climate & Health Lab at the University of Nairobi and has advised multiple national climate adaptation plans.',
            },
            {
                name: 'Dr. Fatima Diallo',
                role: 'Public Health Policy, WHO Africa Regional Office',
                bio: 'Dr. Diallo coordinates WHOs climate- health programming across the African region and has authored over 30 peer - reviewed publications.',
            },
        ],
        category: 'Research',
        poster: '/images/webinar1-poster.jpg',
        video: '/videos/webinar1.mp4',
        tags: ['Climate Change', 'Public Health', 'Africa', 'Disease Vectors'],
        attendees: 320,
        status: 'Recorded',
        keyTakeaways: [
            'Understanding the direct and indirect pathways from climate to health outcomes',
            'Evidence from Sub-Saharan Africa on heat stress, flooding, and disease burden',
            'Policy frameworks for integrating health into National Adaptation Plans',
            'Opportunities for interdisciplinary collaboration across sectors',
        ],
        resources: [
            { label: 'Slide Deck (PDF)', href: '#' },
            { label: 'Session Transcript', href: '#' },
            { label: 'Recommended Reading List', href: '#' },
        ],
    },
    {
        id: 2,
        slug: 'vector-borne-diseases-climate',
        title: 'Vector-Borne Diseases and Climate Variability: New Frontiers',
        description:
            'This webinar examines the relationship between climate variability and the spread of vector-borne diseases such as malaria and dengue. Leading epidemiologists present cutting-edge modelling tools and community-level adaptation strategies.',
        fullDescription: `
            Vector-borne diseases account for more than 17% of all infectious diseases globally, and climate variability is rapidly rewriting the map of risk.
            This webinar presents the latest modelling evidence on how changes in temperature, precipitation, and humidity are altering the geographic range and seasonal
            dynamics of Anopheles mosquitoes (malaria), Aedes species (dengue, Zika, chikungunya), and other disease vectors across Africa.

            Epidemiologists will walk participants through spatial modelling approaches that can be used at national and sub-national levels to anticipate disease hotspots
            before they emerge, enabling proactive public health response. The session also features community-level case studies from Kenya and Nigeria showing how
            integrated vector management can be adapted to changing climate conditions.

            Participants will leave with a stronger understanding of available data tools, modelling platforms, and the partnerships needed to translate climate projections
            into actionable public health interventions.
        `,
        date: 'May 8, 2024',
        time: '11:00 AM – 12:15 PM EAT',
        duration: '75 minutes',
        speakers: [
            {
                name: 'Dr. Kwame Asante',
                role: 'Malaria Researcher, KEMRI-Wellcome Trust',
                bio: 'Dr. Asante specialises in climate-driven malaria modelling and has developed predictive tools used by the Ghana Health Service.',
            },
            {
                name: 'Dr. Ngozi Adeyemi',
                role: 'Epidemiologist, Nigeria CDC',
                bio: 'Dr. Adeyemi oversees arboviral disease surveillance at the Nigeria Centre for Disease Control and is a co-lead on the Africa CDC climate-health initiative.',
            },
        ],
        category: 'Epidemiology',
        poster: '/images/webinar2-poster.jpg',
        video: '/videos/webinar2.mp4',
        tags: ['Malaria', 'Dengue', 'Epidemiology', 'Modelling', 'Vector Control'],
        attendees: 275,
        status: 'Recorded',
        keyTakeaways: [
            'How temperature and rainfall shifts are altering vector habitats across Africa',
            'Spatial modelling methods for early warning of disease hotspots',
            'Community-level integrated vector management in a changing climate',
            'Data gaps and research priorities for the next decade',
        ],
        resources: [
            { label: 'Slide Deck (PDF)', href: '#' },
            { label: 'Modelling Tool Reference Guide', href: '#' },
        ],
    },
];

// ---------------------------------------------------------------------------

const WebinarDetailPage = () => {
    const params = useParams();
    const id = params?.id;

    const webinar = webinars.find((w) => w.slug === id || String(w.id) === id) || webinars[0];
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = React.useRef(null);

    const handlePlayClick = () => {
        setIsPlaying(true);
        setTimeout(() => videoRef.current?.play(), 100);
    };

    const others = webinars.filter((w) => w.slug !== webinar.slug);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="mt-32 bg-gray-50 border-b border-gray-200 py-4 px-4">
                    <nav className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#0e8601] transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/CapacityEnhancementPage" className="hover:text-[#0e8601] transition-colors">Capacity Enhancement</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/Webinars" className="hover:text-[#0e8601] transition-colors">Webinars</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-[#021d49] font-medium truncate max-w-xs">{webinar.title}</span>
                    </nav>
                </div>

                {/* Main content */}
                <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
                    {/* Left: Video + Details */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Video player */}
                        <div className="relative rounded-2xl overflow-hidden bg-[#021d49] shadow-2xl aspect-video">
                            {!isPlaying ? (
                                <>
                                    {/* Poster */}
                                    {webinar.poster ? (
                                        <img
                                            src={webinar.poster}
                                            alt={webinar.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#021d49] to-[#0e8601] flex items-center justify-center">
                                            <Monitor className="w-24 h-24 text-white/20" />
                                        </div>
                                    )}

                                    {/* Play overlay */}
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                                        <button
                                            onClick={handlePlayClick}
                                            className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200 mb-4"
                                        >
                                            <Play className="w-9 h-9 text-[#021d49] ml-1" />
                                        </button>
                                        <span className="text-white font-semibold text-lg">Watch Recording</span>
                                        <span className="text-white/60 text-sm mt-1">{webinar.duration}</span>
                                    </div>
                                </>
                            ) : (
                                <video
                                    ref={videoRef}
                                    src={webinar.video}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-cover"
                                    poster={webinar.poster}
                                />
                            )}
                        </div>

                        {/* Title + Meta */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge className="bg-[#0e8601]/10 text-[#0e8601] border-0">{webinar.category}</Badge>
                                <Badge className="bg-[#021d49]/10 text-[#021d49] border-0">{webinar.status}</Badge>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-[#021d49] leading-tight mb-4">
                                {webinar.title}
                            </h1>

                            <div className="flex flex-wrap gap-5 text-sm text-gray-500 mb-6">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#0e8601]" />{webinar.date}</span>
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#0e8601]" />{webinar.time}</span>
                                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#0e8601]" />{webinar.attendees} attendees</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {webinar.tags.map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                        <Tag className="w-3 h-3" />{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* About */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#021d49] mb-4">About This Webinar</h2>
                            <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                {webinar.fullDescription.trim()}
                            </div>
                        </div>

                        {/* Key Takeaways */}
                        <div className="bg-gradient-to-br from-[#021d49] to-[#03337a] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <CheckCircle className="w-7 h-7 text-[#4ade80]" />
                                Key Takeaways
                            </h2>
                            <ul className="space-y-4">
                                {webinar.keyTakeaways.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-[#0e8601] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <span className="text-blue-100 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Speakers */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#021d49] mb-6 flex items-center gap-3">
                                <Mic className="w-7 h-7 text-[#0e8601]" />
                                Speakers
                            </h2>
                            <div className="space-y-5">
                                {webinar.speakers.map((speaker, i) => (
                                    <div key={i} className="flex gap-5 p-5 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#021d49] to-[#0e8601] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                            {speaker.name.charAt(speaker.name.lastIndexOf(' ') + 1)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#021d49] text-lg">{speaker.name}</p>
                                            <p className="text-[#0e8601] text-sm font-medium mb-2">{speaker.role}</p>
                                            <p className="text-gray-600 text-sm leading-relaxed">{speaker.bio}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <div className="space-y-8">
                        {/* Action card */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sticky top-24">
                            <h3 className="font-bold text-[#021d49] text-lg mb-4">Session Resources</h3>
                            <div className="space-y-3 mb-6">
                                {webinar.resources.map((r, i) => (
                                    <a key={i} href={r.href}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#0e8601]/5 hover:text-[#0e8601] transition-colors text-sm font-medium text-gray-700 group">
                                        <Download className="w-4 h-4 text-gray-400 group-hover:text-[#0e8601] transition-colors" />
                                        {r.label}
                                    </a>
                                ))}
                            </div>

                            <button className="w-full bg-[#021d49] hover:bg-[#03337a] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mb-3">
                                <Share2 className="w-4 h-4" />
                                Share This Webinar
                            </button>

                            <Link href="/Webinars"
                                className="w-full border border-gray-200 hover:border-[#0e8601] text-gray-700 hover:text-[#0e8601] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-sm">
                                <ArrowLeft className="w-4 h-4" />
                                Back to All Webinars
                            </Link>
                        </div>

                        {/* Other webinars */}
                        {others.length > 0 && (
                            <div>
                                <h3 className="font-bold text-[#021d49] text-lg mb-4">More Webinars</h3>
                                <div className="space-y-4">
                                    {others.map((w) => (
                                        <Link key={w.id} href={`/Webinars/${w.slug}`}>
                                            <div className="flex gap-3 p-4 rounded-xl border border-gray-100 hover:shadow-md hover:border-[#0e8601]/30 transition-all group cursor-pointer">
                                                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#021d49] to-[#0e8601]">
                                                    {w.poster && (
                                                        <img src={w.poster} alt={w.title} className="w-full h-full object-cover"
                                                            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-[#021d49] group-hover:text-[#0e8601] transition-colors line-clamp-2 leading-snug">
                                                        {w.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">{w.date}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WebinarDetailPage;