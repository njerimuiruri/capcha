'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ChevronDown, ChevronRight, Menu, X,
    Globe, BookOpen, FlaskConical, Briefcase, FileText,
    GraduationCap, ExternalLink, Database, Map, Phone, Mail,
    MapPin, Facebook, Twitter, Linkedin, Instagram, Clock,
} from 'lucide-react';

const Dot = () => <span className="w-1.5 h-1.5 rounded-full bg-[#0e8601] flex-shrink-0 mt-2" />;

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [mobileExp, setMobileExp] = useState(null);
    const [mobileActEx, setMobileActEx] = useState(null);
    const navRef = useRef(null);

    const closeAll = () => setOpenMenu(null);
    const toggle = (m) => setOpenMenu(prev => prev === m ? null : m);

    useEffect(() => {
        const handler = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) closeAll();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50" ref={navRef}>

            {/* ── Blue top contact bar ── */}
            <div className="bg-[#021d49] text-white h-9 flex items-center">
                <div className="w-full px-6 lg:px-10 xl:px-16 flex items-center justify-between">
                    <div className="flex items-center gap-5 text-[11px] text-white/80">
                        <a href="tel:+254746130873" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Phone className="w-3 h-3" /> +254746130873
                        </a>
                        <a href="mailto:info@arin-africa.org" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
                            <Mail className="w-3 h-3" /> info@arin-africa.org
                        </a>
                        <span className="hidden lg:flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            ACK Gardens House, Bishop Road, 1st Ngong Ave, Upperhill
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                        <a href="#" className="hover:text-white transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
                    </div>
                </div>
            </div>

            {/* ── Main navbar ── */}
            <nav className="bg-white border-b-2 border-[#0e8601] shadow-md">
                <div className="w-full px-6 lg:px-10 xl:px-16">
                    <div className="flex items-center justify-between h-[88px]">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                            <Image src="/img/capchalogo.jpeg" alt="CAPCHA" width={60} height={60}
                                className="object-contain rounded-lg" style={{ height: '60px', width: '60px' }} />
                            <div className="hidden sm:block">
                                <p className="text-xl xl:text-2xl font-extrabold text-[#021d49] leading-none tracking-tight">CAPCHA</p>
                                <p className="text-[9px] text-gray-400 mt-1 leading-tight max-w-[180px]">Consultative Platform On Climate And Health in Africa</p>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">

                            <Link href="/" className="px-3 py-2 text-[13px] xl:text-sm font-semibold text-[#021d49] hover:text-[#0e8601] rounded-xl hover:bg-[#0e8601]/5 transition-all">
                                Home
                            </Link>
                            <Link href="/AboutPage" className="px-3 py-2 text-[13px] xl:text-sm font-semibold text-[#021d49] hover:text-[#0e8601] rounded-xl hover:bg-[#0e8601]/5 transition-all">
                                About
                            </Link>

                            {/* CAPCHA Activities → mega menu */}
                            <button onClick={() => toggle('activities')}
                                className={`flex items-center gap-1 px-3 py-2 text-[13px] xl:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${openMenu === 'activities' ? 'text-[#0e8601] bg-[#0e8601]/8' : 'text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5'}`}>
                                CAPCHA Activities
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === 'activities' ? 'rotate-180 text-[#0e8601]' : ''}`} />
                            </button>

                            {/* Resources dropdown */}
                            <div className="relative">
                                <button onClick={() => toggle('resources')}
                                    className={`flex items-center gap-1 px-3 py-2 text-[13px] xl:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${openMenu === 'resources' ? 'text-[#0e8601] bg-[#0e8601]/8' : 'text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5'}`}>
                                    Resources
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === 'resources' ? 'rotate-180' : ''}`} />
                                </button>
                                {openMenu === 'resources' && (
                                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 overflow-hidden">
                                        {[
                                            { label: 'Publications', desc: 'Research papers & policy briefs', href: '/publications', icon: <FileText className="w-4 h-4" /> },
                                            { label: 'Learning Curve', desc: 'Blogs, articles & evidence briefs', href: '/learning-curve', icon: <BookOpen className="w-4 h-4" /> },
                                        ].map(item => (
                                            <Link key={item.href} href={item.href} onClick={closeAll}
                                                className="flex items-start gap-3 px-4 py-3 hover:bg-[#0e8601]/5 group transition-colors">
                                                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#0e8601]/10 flex items-center justify-center group-hover:bg-[#0e8601]/20 transition-colors text-[#0e8601]">
                                                    {item.icon}
                                                </span>
                                                <span>
                                                    <span className="block text-sm font-semibold text-[#021d49] group-hover:text-[#0e8601] transition-colors">{item.label}</span>
                                                    <span className="block text-xs text-gray-400 mt-0.5">{item.desc}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Data Hub dropdown */}
                            <div className="relative">
                                <button onClick={() => toggle('datahub')}
                                    className={`flex items-center gap-1 px-3 py-2 text-[13px] xl:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${openMenu === 'datahub' ? 'text-[#0e8601] bg-[#0e8601]/8' : 'text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5'}`}>
                                    Data Hub
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === 'datahub' ? 'rotate-180' : ''}`} />
                                </button>
                                {openMenu === 'datahub' && (
                                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                                        <div className="py-2">
                                            <Link href="/DatabaseDashboard" onClick={closeAll}
                                                className="flex items-start gap-3 px-4 py-3 hover:bg-[#0e8601]/5 group transition-colors">
                                                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#0e8601]/10 flex items-center justify-center group-hover:bg-[#0e8601]/20 transition-colors text-[#0e8601]">
                                                    <Database className="w-4 h-4" />
                                                </span>
                                                <span>
                                                    <span className="block text-sm font-semibold text-[#021d49] group-hover:text-[#0e8601] transition-colors">Database Dashboard</span>
                                                    <span className="block text-xs text-gray-400 mt-0.5">Available now — explore current datasets</span>
                                                </span>
                                            </Link>
                                            <div className="flex items-start gap-3 px-4 py-3 opacity-50 cursor-not-allowed">
                                                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                                    <Map className="w-4 h-4" />
                                                </span>
                                                <span>
                                                    <span className="block text-sm font-semibold text-gray-400">Data Explorer</span>
                                                    <span className="inline-block text-[10px] bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full font-bold mt-0.5">Coming Soon</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/conferences-events" className="px-3 py-2 text-[13px] xl:text-sm font-semibold text-[#021d49] hover:text-[#0e8601] rounded-xl hover:bg-[#0e8601]/5 transition-all whitespace-nowrap">
                                Conferences / Events
                            </Link>
                            <Link href="/visual-story" className="px-3 py-2 text-[13px] xl:text-sm font-semibold text-[#021d49] hover:text-[#0e8601] rounded-xl hover:bg-[#0e8601]/5 transition-all whitespace-nowrap">
                                Visual Story
                            </Link>

                            <Link href="/ContactPage"
                                className="ml-2 bg-[#0e8601] text-white px-5 py-2.5 rounded-xl hover:bg-[#0a6e01] font-bold transition-all shadow-sm text-[13px] xl:text-sm whitespace-nowrap">
                                Contact
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button onClick={() => setIsMobileOpen(v => !v)} className="lg:hidden text-[#021d49] hover:text-[#0e8601] p-2">
                            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* ══ MEGA MENU — CAPCHA Activities ══════════════════ */}
                {openMenu === 'activities' && (
                    <>
                        <div className="fixed inset-0 top-[125px] z-30" onClick={closeAll} />
                        <div className="absolute left-0 right-0 top-full z-40 bg-white border-t-2 border-[#0e8601]/20 shadow-2xl">
                            <div className="w-full px-6 lg:px-10 xl:px-16 py-8">
                                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">

                                    {/* Col 1: Research & Innovation */}
                                    <div className="px-6 first:pl-0">
                                        <Link href="/Research" onClick={closeAll}
                                            className="flex items-center gap-2 text-[11px] font-extrabold text-[#021d49] uppercase tracking-widest pb-3 mb-4 border-b-2 border-[#0e8601] hover:text-[#0e8601] transition-colors">
                                            <FlaskConical className="w-4 h-4 text-[#0e8601] flex-shrink-0" />
                                            Research &amp; Innovation
                                        </Link>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Knowledge Sharing</p>
                                        {[
                                            { label: 'Knowledge Sharing', desc: 'Transdisciplinary dialogues', href: '/knowledge-sharing' },
                                            { label: 'Spotlight Series', desc: 'Webinar archive & upcoming', href: '/spotlight-series' },
                                        ].map(item => (
                                            <Link key={item.href} href={item.href} onClick={closeAll}
                                                className="flex items-start gap-2 py-1.5 group/i">
                                                <Dot />
                                                <span>
                                                    <span className="block text-sm font-medium text-gray-700 group-hover/i:text-[#0e8601] transition-colors">{item.label}</span>
                                                    <span className="block text-xs text-gray-400">{item.desc}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Col 2: Projects */}
                                    <div className="px-6">
                                        <p className="flex items-center gap-2 text-[11px] font-extrabold text-[#021d49] uppercase tracking-widest pb-3 mb-4 border-b-2 border-[#0e8601]">
                                            <Briefcase className="w-4 h-4 text-[#0e8601] flex-shrink-0" /> Projects
                                        </p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Active Projects</p>
                                        {[
                                            { label: 'BioCam4', desc: 'Bioenergetics & climate', href: '#', ext: true },
                                            { label: 'Consultation & CoP', desc: 'Communities of practice', href: '#' },
                                            { label: 'The Heat Stakeholder Mapping', desc: 'Heat-health actor landscape', href: '#' },
                                            { label: 'MexCovid 10', desc: 'Mexico COVID-climate study', href: '#', ext: true },
                                        ].map(p => (
                                            <a key={p.label} href={p.href} target={p.ext ? '_blank' : undefined}
                                                rel={p.ext ? 'noopener noreferrer' : undefined} onClick={closeAll}
                                                className="flex items-start gap-2 py-1.5 group/i">
                                                <Dot />
                                                <span>
                                                    <span className="block text-sm font-medium text-gray-700 group-hover/i:text-[#0e8601] transition-colors">
                                                        {p.label}{p.ext && <ExternalLink className="w-3 h-3 inline ml-1 opacity-40" />}
                                                    </span>
                                                    <span className="block text-xs text-gray-400">{p.desc}</span>
                                                </span>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Col 3: Policy & Advocacy */}
                                    <div className="px-6">
                                        <Link href="/PolicyAdvocacyPage" onClick={closeAll}
                                            className="flex items-center gap-2 text-[11px] font-extrabold text-[#021d49] uppercase tracking-widest pb-3 mb-4 border-b-2 border-[#0e8601] hover:text-[#0e8601] transition-colors">
                                            <FileText className="w-4 h-4 text-[#0e8601] flex-shrink-0" /> Policy &amp; Advocacy
                                        </Link>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Knowledge Translation</p>
                                        {[
                                            { label: 'Knowledge Translation', desc: 'Science to policy', href: '/knowledge-translation' },
                                            { label: 'Learning Curve', desc: 'Blogs & articles', href: '/learning-curve' },
                                            { label: 'Publications', desc: 'Papers, briefs & reports', href: '/publications' },
                                        ].map(item => (
                                            <Link key={item.href} href={item.href} onClick={closeAll}
                                                className="flex items-start gap-2 py-1.5 group/i">
                                                <Dot />
                                                <span>
                                                    <span className="block text-sm font-medium text-gray-700 group-hover/i:text-[#0e8601] transition-colors">{item.label}</span>
                                                    <span className="block text-xs text-gray-400">{item.desc}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Col 4: Capacity + Connect */}
                                    <div className="px-6">
                                        <Link href="/CapacityEnhancementPage" onClick={closeAll}
                                            className="flex items-center gap-2 text-[11px] font-extrabold text-[#021d49] uppercase tracking-widest pb-3 mb-4 border-b-2 border-[#0e8601] hover:text-[#0e8601] transition-colors">
                                            <GraduationCap className="w-4 h-4 text-[#0e8601] flex-shrink-0" /> Capacity Building
                                        </Link>
                                        <Link href="/CapacityEnhancementPage" onClick={closeAll}
                                            className="flex items-start gap-2 py-1.5 group/i mb-5">
                                            <Dot />
                                            <span>
                                                <span className="block text-sm font-medium text-gray-700 group-hover/i:text-[#0e8601] transition-colors">Enhancement Programme</span>
                                                <span className="block text-xs text-gray-400">Training & skills</span>
                                            </span>
                                        </Link>
                                        <p className="flex items-center gap-2 text-[11px] font-extrabold text-[#021d49] uppercase tracking-widest pb-3 mb-3 border-b-2 border-[#0e8601]">
                                            <Globe className="w-4 h-4 text-[#0e8601] flex-shrink-0" /> CAPCHA Connect
                                        </p>
                                        {[
                                            { label: 'Interactive Map', desc: 'Actors across Africa', href: '/Connect' },
                                        ].map(item => (
                                            <Link key={item.href} href={item.href} onClick={closeAll}
                                                className="flex items-start gap-2 py-1.5 group/i">
                                                <Dot />
                                                <span>
                                                    <span className="block text-sm font-medium text-gray-700 group-hover/i:text-[#0e8601] transition-colors">{item.label}</span>
                                                    <span className="block text-xs text-gray-400">{item.desc}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* ── Mobile menu ── */}
                {isMobileOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
                        <div className="px-4 py-4 space-y-1">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About', href: '/AboutPage' },
                            ].map(item => (
                                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}
                                    className="block px-3 py-3 text-base font-semibold text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5 rounded-xl">
                                    {item.label}
                                </Link>
                            ))}

                            {/* Mobile Activities */}
                            <div>
                                <button onClick={() => setMobileExp(v => v === 'activities' ? null : 'activities')}
                                    className="flex items-center justify-between w-full px-3 py-3 text-base font-semibold text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5 rounded-xl">
                                    CAPCHA Activities <ChevronDown className={`w-4 h-4 transition-transform ${mobileExp === 'activities' ? 'rotate-180 text-[#0e8601]' : ''}`} />
                                </button>
                                {mobileExp === 'activities' && (
                                    <div className="ml-4 border-l-2 border-[#0e8601]/20 pl-3 mb-2 space-y-1">
                                        {[
                                            { label: 'Research & Innovation', href: '/Research', subs: [{ label: 'Knowledge Sharing', href: '/knowledge-sharing' }, { label: 'Spotlight Series', href: '/spotlight-series' }] },
                                            { label: 'Policy & Advocacy', href: '/PolicyAdvocacyPage', subs: [{ label: 'Knowledge Translation', href: '/knowledge-translation' }, { label: 'Learning Curve', href: '/learning-curve' }, { label: 'Publications', href: '/publications' }] },
                                            { label: 'Capacity Building', href: '/CapacityEnhancementPage', subs: [] },
                                            { label: 'CAPCHA Connect', href: '/Connect', subs: [{ label: 'Interactive Map', href: '/Connect' }] },
                                        ].map(item => (
                                            <div key={item.label}>
                                                <div className="flex items-center justify-between">
                                                    <Link href={item.href} onClick={() => setIsMobileOpen(false)}
                                                        className="flex-1 py-2 text-sm font-semibold text-[#021d49] hover:text-[#0e8601]">{item.label}</Link>
                                                    {item.subs.length > 0 && (
                                                        <button onClick={() => setMobileActEx(v => v === item.label ? null : item.label)} className="p-1 text-gray-400">
                                                            <ChevronRight className={`w-4 h-4 transition-transform ${mobileActEx === item.label ? 'rotate-90 text-[#0e8601]' : ''}`} />
                                                        </button>
                                                    )}
                                                </div>
                                                {mobileActEx === item.label && item.subs.map(s => (
                                                    <Link key={s.href} href={s.href} onClick={() => setIsMobileOpen(false)}
                                                        className="block pl-3 py-1.5 text-sm text-gray-600 hover:text-[#0e8601] border-l border-gray-200 ml-2">{s.label}</Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Resources */}
                            <div>
                                <button onClick={() => setMobileExp(v => v === 'resources' ? null : 'resources')}
                                    className="flex items-center justify-between w-full px-3 py-3 text-base font-semibold text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5 rounded-xl">
                                    Resources <ChevronDown className={`w-4 h-4 transition-transform ${mobileExp === 'resources' ? 'rotate-180 text-[#0e8601]' : ''}`} />
                                </button>
                                {mobileExp === 'resources' && (
                                    <div className="ml-4 border-l-2 border-[#0e8601]/20 pl-3 mb-2">
                                        {[{ label: 'Publications', href: '/publications' }, { label: 'Learning Curve', href: '/learning-curve' }].map(i => (
                                            <Link key={i.href} href={i.href} onClick={() => setIsMobileOpen(false)}
                                                className="block py-2 text-sm font-medium text-gray-600 hover:text-[#0e8601]">{i.label}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Data Hub */}
                            <div>
                                <button onClick={() => setMobileExp(v => v === 'datahub' ? null : 'datahub')}
                                    className="flex items-center justify-between w-full px-3 py-3 text-base font-semibold text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5 rounded-xl">
                                    Data Hub <ChevronDown className={`w-4 h-4 transition-transform ${mobileExp === 'datahub' ? 'rotate-180 text-[#0e8601]' : ''}`} />
                                </button>
                                {mobileExp === 'datahub' && (
                                    <div className="ml-4 border-l-2 border-[#0e8601]/20 pl-3 mb-2">
                                        <Link href="/DatabaseDashboard" onClick={() => setIsMobileOpen(false)}
                                            className="block py-2 text-sm font-medium text-gray-600 hover:text-[#0e8601]">Database Dashboard</Link>
                                        <p className="py-2 text-sm text-gray-400">Data Explorer <span className="text-[10px] bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full font-bold ml-1">Soon</span></p>
                                    </div>
                                )}
                            </div>

                            <Link href="/conferences-events" onClick={() => setIsMobileOpen(false)}
                                className="block px-3 py-3 text-base font-semibold text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5 rounded-xl">Conferences / Events</Link>
                            <Link href="/visual-story" onClick={() => setIsMobileOpen(false)}
                                className="block px-3 py-3 text-base font-semibold text-[#021d49] hover:text-[#0e8601] hover:bg-[#0e8601]/5 rounded-xl">Visual Story</Link>
                            <Link href="/ContactPage" onClick={() => setIsMobileOpen(false)}
                                className="block bg-[#0e8601] text-white px-5 py-3 rounded-xl font-bold text-center text-base">Contact</Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
