"use client"
import { useState, useEffect } from "react"
import {
    Search, Calendar, MapPin, ChevronLeft, ChevronRight,
    Users, Download, Video, ExternalLink, Clock, Monitor,
    GraduationCap, Bell, ArrowRight, Globe, Play, X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { conferences, recentConferences, popularConferenceTags } from "@/data/conference"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar/navbar"
import Footer from "@/components/Footer/footer"

// ─── Webinar data ────────────────────────────────────────────────────────────
const webinars = [
    {
        id: "w1",
        type: "webinar",
        title: "The Climate-Health Nexus in Africa: Understanding the Risks",
        description: "An in-depth exploration of how rising temperatures, extreme weather events, and shifting disease vectors are reshaping public health across Sub-Saharan Africa.",
        date: "Coming Soon",
        time: "TBA",
        location: "Online (Zoom)",
        category: "research",
        organizer: "CAPCHA",
        organizerImage: "/placeholder.svg",
        speakers: ["Dr. Amina Osei", "Prof. James Kariuki", "Dr. Fatima Diallo"],
        eventStatus: "upcoming",
        tags: ["Climate Change", "Public Health", "Africa"],
        comingSoon: true,
    },
    {
        id: "w2",
        type: "webinar",
        title: "Vector-Borne Diseases and Climate Variability: New Frontiers",
        description: "Leading epidemiologists present cutting-edge modelling tools and community-level adaptation strategies for malaria, dengue and other vector-borne diseases.",
        date: "Coming Soon",
        time: "TBA",
        location: "Online (Zoom)",
        category: "climate",
        organizer: "CAPCHA",
        organizerImage: "/placeholder.svg",
        speakers: ["Dr. Kwame Asante", "Dr. Ngozi Adeyemi"],
        eventStatus: "upcoming",
        tags: ["Malaria", "Dengue", "Epidemiology"],
        comingSoon: true,
    },
]
// ─────────────────────────────────────────────────────────────────────────────

const EventsPage = () => {
    const router = useRouter()

    // ── Active top-level section: "conferences" | "webinars" ──
    const [activeSection, setActiveSection] = useState("conferences")

    // ── Conference state ──
    const [confSearch, setConfSearch] = useState("")
    const [confCategory, setConfCategory] = useState("all")
    const [confPage, setConfPage] = useState(1)
    const confsPerPage = 6

    // ── Webinar state ──
    const [webSearch, setWebSearch] = useState("")
    const [webPage, setWebPage] = useState(1)
    const webinarsPerPage = 6

    const isUpcoming = (event) =>
        event.eventStatus === "upcoming" || new Date(event.date?.split(" - ")?.[0]) > new Date()

    // ── Filtered conferences ──
    const filteredConfs = conferences.filter((c) => {
        const matchesCat = confCategory === "all" || c.category === confCategory
        const matchesSearch =
            c.title.toLowerCase().includes(confSearch.toLowerCase()) ||
            c.description.toLowerCase().includes(confSearch.toLowerCase())
        return matchesCat && matchesSearch
    })
    const confTotalPages = Math.ceil(filteredConfs.length / confsPerPage)
    const currentConfs = filteredConfs.slice((confPage - 1) * confsPerPage, confPage * confsPerPage)

    // ── Filtered webinars ──
    const filteredWebinars = webinars.filter((w) =>
        w.title.toLowerCase().includes(webSearch.toLowerCase()) ||
        w.description.toLowerCase().includes(webSearch.toLowerCase())
    )
    const webTotalPages = Math.ceil(filteredWebinars.length / webinarsPerPage)
    const currentWebinars = filteredWebinars.slice((webPage - 1) * webinarsPerPage, webPage * webinarsPerPage)

    const getFirstVideo = (event) => {
        if (!event.videos || !Array.isArray(event.videos)) return null
        return event.videos.find((v) => v !== null)
    }

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null
        const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        const match = url.match(regex)
        return match ? `https://www.youtube.com/embed/${match[1]}` : null
    }

    const handleDownloadConceptNote = async (url, title) => {
        if (!url) { alert("No concept note available."); return }
        try {
            const link = document.createElement("a")
            link.href = url
            link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}_Concept_Note.pdf`
            if (url.startsWith("http")) {
                const res = await fetch(url)
                link.href = window.URL.createObjectURL(await res.blob())
            }
            document.body.appendChild(link); link.click(); document.body.removeChild(link)
        } catch { alert("Download failed. Please try again.") }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* ── HERO ─────────────────────────────────────────────────── */}
                <div
                    className="relative mt-32 h-[320px] flex items-center justify-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(2,29,73,0.75), rgba(2,29,73,0.85)), url('/img/healthstethoscope.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="text-center text-white px-4">
                        <p className="text-[#4ade80] text-sm font-semibold uppercase tracking-widest mb-3">ARIN · CAPCHA</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Events</h1>
                        <p className="text-blue-200 text-lg max-w-lg mx-auto">
                            Conferences and webinars on climate, health, and Africa's future
                        </p>
                        <nav className="text-sm mt-5 text-blue-300">
                            <span>Home</span>
                            <span className="mx-2">/</span>
                            <span className="text-white font-medium">Events</span>
                        </nav>
                    </div>
                </div>

                {/* ── SECTION SWITCHER ─────────────────────────────────────── */}
                {/* Big, obvious two-option toggle so users always know where they are */}
                <div className="bg-white border-b-2 border-gray-100 shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex">
                            {/* Conferences tab */}
                            <button
                                onClick={() => setActiveSection("conferences")}
                                className={`flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-2 px-8 py-5 text-base font-bold border-b-4 transition-all duration-200 ${activeSection === "conferences"
                                    ? "border-[#0e8601] text-[#0e8601] bg-[#0e8601]/5"
                                    : "border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <GraduationCap className={`w-6 h-6 ${activeSection === "conferences" ? "text-[#0e8601]" : "text-gray-400"}`} />
                                <span>Conferences</span>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${activeSection === "conferences" ? "bg-[#0e8601] text-white" : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {conferences.length}
                                </span>
                            </button>

                            {/* Divider */}
                            <div className="w-px bg-gray-200 my-3" />

                            {/* Webinars tab */}
                            <button
                                onClick={() => setActiveSection("webinars")}
                                className={`flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-2 px-8 py-5 text-base font-bold border-b-4 transition-all duration-200 ${activeSection === "webinars"
                                    ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                                    : "border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <Monitor className={`w-6 h-6 ${activeSection === "webinars" ? "text-indigo-600" : "text-gray-400"}`} />
                                <span>Webinars</span>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${activeSection === "webinars" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {webinars.length}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── CONTEXT BANNER — tells user exactly what section they're in ── */}
                {activeSection === "conferences" ? (
                    <div className="bg-gradient-to-r from-[#021d49] to-[#03337a] py-5 px-4">
                        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-none">ARIN Conferences</p>
                                    <p className="text-blue-300 text-sm mt-0.5">In-person and hybrid academic conferences across Africa</p>
                                </div>
                            </div>
                            <div className="flex gap-6 text-center">
                                <div>
                                    <p className="text-2xl font-extrabold text-[#4ade80]">{conferences.filter(c => isUpcoming(c)).length}</p>
                                    <p className="text-blue-300 text-xs">Upcoming</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-[#4ade80]">{conferences.filter(c => !isUpcoming(c)).length}</p>
                                    <p className="text-blue-300 text-xs">Past Events</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-[#4ade80]">{conferences.length}</p>
                                    <p className="text-blue-300 text-xs">Total</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 py-5 px-4">
                        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Monitor className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-none">CAPCHA Webinar Series</p>
                                    <p className="text-indigo-300 text-sm mt-0.5">Online expert sessions on climate and health — coming soon</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-full text-sm font-semibold">
                                    🚀 Launching Soon
                                </span>
                                <Link href="/CapacityEnhancementPage/webinars"
                                    className="px-4 py-2 bg-white text-indigo-700 rounded-full text-sm font-bold hover:bg-indigo-50 transition-colors flex items-center gap-1.5">
                                    <Bell className="w-4 h-4" /> Get Notified
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                <div className="container mx-auto px-4 py-10">

                    {/* ═══════════════════════════════════════════════════════
                        CONFERENCES SECTION
                    ═══════════════════════════════════════════════════════ */}
                    {activeSection === "conferences" && (
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* Main */}
                            <div className="lg:w-2/3">
                                {/* Search + Category row */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search conferences..."
                                            value={confSearch}
                                            onChange={(e) => { setConfSearch(e.target.value); setConfPage(1) }}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e8601] bg-white text-sm"
                                        />
                                        {confSearch && (
                                            <button onClick={() => setConfSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {["all", "climate", "research", "business"].map((cat) => (
                                            <button key={cat} onClick={() => { setConfCategory(cat); setConfPage(1) }}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${confCategory === cat
                                                    ? "bg-[#0e8601] text-white shadow-sm"
                                                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#0e8601] hover:text-[#0e8601]"
                                                    }`}>
                                                {cat === "all" ? "All" : cat === "climate" ? "Climate & Environment" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Result count */}
                                <p className="text-sm text-gray-500 mb-5">
                                    Showing <strong className="text-gray-800">{filteredConfs.length}</strong> conference{filteredConfs.length !== 1 ? "s" : ""}
                                </p>

                                {/* Cards */}
                                {currentConfs.length === 0 ? (
                                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                                        <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                                        <p className="text-xl font-semibold text-gray-400">No conferences found</p>
                                        <p className="text-gray-400 text-sm mt-2">Try a different search or category</p>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                                        {currentConfs.map((conf) => {
                                            const upcoming = isUpcoming(conf)
                                            const firstVideo = getFirstVideo(conf)
                                            const embedUrl = firstVideo ? getYouTubeEmbedUrl(firstVideo.url) : null

                                            return (
                                                <div key={conf.id}
                                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#0e8601]/20 transition-all duration-300 overflow-hidden group flex flex-col">

                                                    {/* Thumbnail */}
                                                    <div className="relative h-44 bg-gray-100 flex-shrink-0">
                                                        {upcoming && conf.conferenceImage ? (
                                                            <>
                                                                <Image src={conf.conferenceImage || "/placeholder.svg"} alt={conf.title} fill className="object-cover" />
                                                                <div className="absolute inset-0 bg-black/10" />
                                                            </>
                                                        ) : conf.eventStatus === "completed" && conf.recordingsAvailable ? (
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                                                                <div className="text-center text-white">
                                                                    <Video className="w-10 h-10 mx-auto mb-2" />
                                                                    <p className="text-sm font-semibold">Recording Available</p>
                                                                </div>
                                                            </div>
                                                        ) : embedUrl ? (
                                                            <iframe src={embedUrl} className="w-full h-full" frameBorder="0" allowFullScreen title={conf.title} />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-[#021d49] to-[#03337a] flex items-center justify-center">
                                                                <GraduationCap className="w-12 h-12 text-white/30" />
                                                            </div>
                                                        )}

                                                        {/* Status pill */}
                                                        <div className="absolute top-3 left-3">
                                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${upcoming ? "bg-[#0e8601] text-white" : "bg-gray-700 text-white"
                                                                }`}>
                                                                {upcoming ? <><Clock className="w-3 h-3" /> Upcoming</> : "Past Event"}
                                                            </span>
                                                        </div>

                                                        {/* External link */}
                                                        {upcoming && conf.websiteUrl && (
                                                            <a href={conf.websiteUrl} target="_blank" rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow">
                                                                <ExternalLink className="w-4 h-4 text-gray-600" />
                                                            </a>
                                                        )}
                                                    </div>

                                                    {/* Body */}
                                                    <div className="p-5 flex flex-col flex-1">
                                                        <h3 className="text-base font-bold text-[#021d49] group-hover:text-[#0e8601] transition-colors mb-3 leading-snug cursor-pointer"
                                                            onClick={() => router.push(`/ArinConference/${conf.id}`)}>
                                                            {conf.title}
                                                        </h3>

                                                        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                                                            {conf.description.length > 120 ? conf.description.substring(0, 120) + "…" : conf.description}
                                                        </p>

                                                        {/* Date & location */}
                                                        <div className="space-y-1.5 mb-4">
                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                <Calendar className="w-4 h-4 text-[#0e8601] flex-shrink-0" />
                                                                <span>{conf.date}{conf.time ? ` · ${conf.time}` : ""}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                <MapPin className="w-4 h-4 text-[#0e8601] flex-shrink-0" />
                                                                <span>{conf.location}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                <Users className="w-4 h-4 text-[#0e8601] flex-shrink-0" />
                                                                <span>{conf.speakers?.length ?? 0} Speakers</span>
                                                            </div>
                                                        </div>

                                                        {/* CTA */}
                                                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                                                            <button onClick={() => router.push(`/ArinConference/${conf.id}`)}
                                                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#021d49] hover:bg-[#0e8601] text-white text-sm font-semibold transition-colors">
                                                                {upcoming ? "Register Now" : "View Details"}
                                                                <ArrowRight className="w-4 h-4" />
                                                            </button>
                                                            {conf.conceptNoteUrl && (
                                                                <button onClick={() => handleDownloadConceptNote(conf.conceptNoteUrl, conf.title)}
                                                                    title="Download Concept Note"
                                                                    className="w-10 h-10 rounded-xl border border-gray-200 hover:border-[#0e8601] hover:bg-[#0e8601]/5 flex items-center justify-center transition-colors">
                                                                    <Download className="w-4 h-4 text-gray-500" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {/* Pagination */}
                                {confTotalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => setConfPage(p => Math.max(1, p - 1))} disabled={confPage === 1}
                                            className="p-2 rounded-full bg-white shadow hover:shadow-md disabled:opacity-40">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        {[...Array(confTotalPages)].map((_, i) => (
                                            <button key={i} onClick={() => setConfPage(i + 1)}
                                                className={`w-10 h-10 rounded-full font-semibold text-sm transition-colors shadow hover:shadow-md ${confPage === i + 1 ? "bg-[#0e8601] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                                    }`}>{i + 1}</button>
                                        ))}
                                        <button onClick={() => setConfPage(p => Math.min(confTotalPages, p + 1))} disabled={confPage === confTotalPages}
                                            className="p-2 rounded-full bg-white shadow hover:shadow-md disabled:opacity-40">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:w-1/3 space-y-6">
                                {/* Popular Tags */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="font-bold text-[#021d49] mb-4 text-lg">Browse by Topic</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {popularConferenceTags.map((tag, i) => (
                                            <button key={i} onClick={() => { setConfCategory(tag.toLowerCase()); setConfPage(1) }}
                                                className="px-3 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-[#0e8601] hover:text-white hover:border-[#0e8601] transition-colors">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="font-bold text-[#021d49] mb-4 text-lg">Recent Conferences</h3>
                                    <div className="space-y-3">
                                        {recentConferences.map((conf, i) => (
                                            <Link key={i} href={`/ArinConference/${conf.id}`} className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#0e8601]/30 hover:bg-gray-50 transition-all group">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0e8601] to-teal-700 flex items-center justify-center flex-shrink-0">
                                                    <Calendar className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-sm text-gray-800 group-hover:text-[#0e8601] transition-colors truncate">{conf.title}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{conf.date}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Switch to webinars promo */}
                                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white">
                                    <Monitor className="w-8 h-8 text-indigo-300 mb-3" />
                                    <h4 className="font-bold text-lg mb-2">Also Check Out Our Webinars</h4>
                                    <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
                                        Online expert sessions on climate and health — coming soon.
                                    </p>
                                    <button onClick={() => setActiveSection("webinars")}
                                        className="w-full py-2.5 bg-white text-indigo-700 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                                        View Webinars <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* ═══════════════════════════════════════════════════════
                        WEBINARS SECTION
                    ═══════════════════════════════════════════════════════ */}
                    {activeSection === "webinars" && (
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* Main */}
                            <div className="lg:w-2/3">
                                {/* Search */}
                                <div className="relative mb-8">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="text" placeholder="Search webinars..."
                                        value={webSearch}
                                        onChange={(e) => { setWebSearch(e.target.value); setWebPage(1) }}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm" />
                                </div>

                                {/* Coming Soon callout — prominent */}
                                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                                        <Monitor className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-indigo-800 text-lg">Webinar Series Launching Soon!</p>
                                        <p className="text-indigo-600 text-sm mt-1">
                                            Our CAPCHA webinar series is being curated. Register your interest to be notified when sessions go live.
                                        </p>
                                    </div>
                                    <Link href="/CapacityEnhancementPage/webinars"
                                        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
                                        <Bell className="w-4 h-4" /> Get Notified
                                    </Link>
                                </div>

                                {/* Webinar cards */}
                                <p className="text-sm text-gray-500 mb-5">
                                    Showing <strong className="text-gray-800">{filteredWebinars.length}</strong> upcoming webinar{filteredWebinars.length !== 1 ? "s" : ""}
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-10">
                                    {currentWebinars.map((webinar) => (
                                        <div key={webinar.id}
                                            className="bg-white rounded-2xl shadow-sm border border-indigo-100 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 overflow-hidden flex flex-col">

                                            {/* Thumbnail */}
                                            <div className="relative h-44 bg-gradient-to-br from-[#021d49] via-indigo-900 to-indigo-700 flex flex-col items-center justify-center">
                                                <Monitor className="w-12 h-12 text-white/30 mb-2" />
                                                <p className="text-white font-bold text-base">Online Webinar</p>
                                                <span className="mt-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold">
                                                    🚀 Coming Soon
                                                </span>
                                            </div>

                                            {/* Body */}
                                            <div className="p-5 flex flex-col flex-1">
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {webinar.tags.map((tag) => (
                                                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <h3 className="text-base font-bold text-[#021d49] mb-3 leading-snug flex-1">
                                                    {webinar.title}
                                                </h3>

                                                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                                    {webinar.description.length > 120 ? webinar.description.substring(0, 120) + "…" : webinar.description}
                                                </p>

                                                {/* Details */}
                                                <div className="space-y-1.5 mb-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                                        <span>Date: <strong className="text-gray-700">To Be Announced</strong></span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Globe className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                                        <span>{webinar.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Users className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                                        <span>{webinar.speakers.length} Confirmed Speakers</span>
                                                    </div>
                                                </div>

                                                {/* Speakers preview */}
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="flex -space-x-2">
                                                        {webinar.speakers.slice(0, 3).map((s, i) => (
                                                            <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                                                {s.charAt(s.lastIndexOf(" ") + 1)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-gray-400">{webinar.speakers.slice(0, 2).join(", ")}{webinar.speakers.length > 2 ? ` +${webinar.speakers.length - 2}` : ""}</span>
                                                </div>

                                                {/* CTA */}
                                                <div className="pt-3 border-t border-gray-100">
                                                    <Link href="/CapacityEnhancementPage/webinars"
                                                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
                                                        <Bell className="w-4 h-4" /> Notify Me When Live
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {webTotalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => setWebPage(p => Math.max(1, p - 1))} disabled={webPage === 1}
                                            className="p-2 rounded-full bg-white shadow hover:shadow-md disabled:opacity-40">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        {[...Array(webTotalPages)].map((_, i) => (
                                            <button key={i} onClick={() => setWebPage(i + 1)}
                                                className={`w-10 h-10 rounded-full font-semibold text-sm shadow hover:shadow-md transition-colors ${webPage === i + 1 ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
                                                    }`}>{i + 1}</button>
                                        ))}
                                        <button onClick={() => setWebPage(p => Math.min(webTotalPages, p + 1))} disabled={webPage === webTotalPages}
                                            className="p-2 rounded-full bg-white shadow hover:shadow-md disabled:opacity-40">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:w-1/3 space-y-6">
                                {/* What to expect */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="font-bold text-[#021d49] mb-4 text-lg">What Are Webinars?</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                        Online expert-led sessions where researchers, clinicians and policy makers share the latest findings on climate and health — accessible from anywhere across Africa.
                                    </p>
                                    <div className="space-y-3">
                                        {[
                                            { icon: <Globe className="w-4 h-4" />, text: "Fully online — join from anywhere" },
                                            { icon: <Clock className="w-4 h-4" />, text: "60–90 minute sessions with live Q&A" },
                                            { icon: <Play className="w-4 h-4" />, text: "Recordings available after each session" },
                                            { icon: <Users className="w-4 h-4" />, text: "Pan-African expert speakers" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                                    {item.icon}
                                                </div>
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Topics */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="font-bold text-[#021d49] mb-4 text-lg">Upcoming Topics</h3>
                                    <div className="space-y-2">
                                        {["Heat Stress & Health", "Vector-Borne Diseases", "Water Security", "Health System Resilience", "Food Systems & Nutrition", "Air Quality"].map((topic) => (
                                            <div key={topic} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                                                <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                                                <span className="text-sm text-gray-600">{topic}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Switch to conferences promo */}
                                <div className="bg-gradient-to-br from-[#021d49] to-[#03337a] rounded-2xl p-6 text-white">
                                    <GraduationCap className="w-8 h-8 text-blue-300 mb-3" />
                                    <h4 className="font-bold text-lg mb-2">Looking for Conferences?</h4>
                                    <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                                        Browse our in-person and hybrid academic conferences from across Africa.
                                    </p>
                                    <button onClick={() => setActiveSection("conferences")}
                                        className="w-full py-2.5 bg-white text-[#021d49] rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                        View Conferences <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default EventsPage