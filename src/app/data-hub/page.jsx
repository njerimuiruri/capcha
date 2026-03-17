'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Globe, Building2, Landmark, Network, ArrowRight, MapPin, DollarSign, Users, Wifi } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
} from 'recharts';

import orgsData from '../../../data/climate_change_health_organizations.json';
import fundersData from '../../../data/climate_health_funders_africa.json';

/* ── Animated counter ─────────────────────────────────────────── */
function AnimatedCounter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <span>{count}</span>;
}

/* ── Main page ────────────────────────────────────────────────── */
const hnapData = [
  { name: 'Implemented', value: 6, fill: '#0e8601' },
  { name: 'Under Consideration', value: 36, fill: '#f59e0b' },
  { name: 'Not Yet Decided', value: 11, fill: '#ef4444' },
];

const ndcData = [
  { name: 'Submitted', value: 3, fill: '#0e8601' },
  { name: 'Not Submitted', value: 50, fill: '#cbd5e1' },
];

const navSections = [
  {
    href: '/data-hub/countries',
    icon: Globe,
    title: 'Countries & Policy',
    description:
      'Interactive map and tables showing HNAP adoption status and NDC 3.0 submissions across 54 African nations.',
    color: '#0e8601',
    bg: '#0e860112',
    stats: [
      { value: 53, label: 'Countries Tracked' },
      { value: 6, label: 'HNAPs Implemented' },
      { value: 3, label: 'NDC 3.0 Submitted' },
    ],
  },
  {
    href: '/data-hub/organizations',
    icon: Building2,
    title: 'Organizations',
    description:
      'Browse climate and health organizations operating across Africa at national, regional, and global scopes.',
    color: '#021d49',
    bg: '#021d4912',
    stats: [
      { value: orgsData.organizations.length, label: 'Organizations' },
      { value: 4, label: 'Scope Levels' },
    ],
  },
  {
    href: '/data-hub/funders',
    icon: Landmark,
    title: 'Funders',
    description:
      'Discover funders supporting climate-health initiatives with grants, loans, investments, and technical assistance.',
    color: '#ff9500',
    bg: '#ff950012',
    stats: [
      { value: fundersData.data.length, label: 'Total Funders' },
      { value: 6, label: 'Funding Types' },
    ],
  },
  {
    href: '/data-hub/networks',
    icon: Network,
    title: 'Technical Networks',
    description:
      'Explore technical support networks providing research, capacity building, and policy guidance across Africa.',
    color: '#55bdd0',
    bg: '#55bdd012',
    stats: [
      { value: 6, label: 'Networks' },
      { value: 7, label: 'Support Types' },
    ],
  },
];

export default function DataHubPage() {
  return (
    <div className="pb-20">

      {/* ── Page Header ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-2 bg-[#0e8601]/10 text-[#0e8601] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#0e8601]/20">
            <span className="w-2 h-2 bg-[#0e8601] rounded-full animate-pulse" />
            Live Data Platform
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#021d49] leading-tight">
          Data Hub Overview
        </h1>
        <p className="text-gray-500 mt-2 text-base max-w-2xl">
          A unified platform tracking climate change and health data across Africa —
          covering countries, organizations, funders, and technical networks.
        </p>
      </section>

      {/* ── Key Stats Bar ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: 53, label: 'Countries Tracked', icon: MapPin, color: '#0e8601' },
            { value: orgsData.organizations.length, label: 'Organizations', icon: Building2, color: '#021d49' },
            { value: fundersData.data.length, label: 'Funders', icon: DollarSign, color: '#ff9500' },
            { value: 6, label: 'Technical Networks', icon: Wifi, color: '#55bdd0' },
          ].map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <div className="text-2xl font-extrabold" style={{ color }}>
                  <AnimatedCounter target={value} />
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Navigation Cards ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-[#021d49]">Explore the Data</h2>
          <p className="text-gray-400 mt-1 text-sm">Click any section below to open the full page</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {navSections.map(({ href, icon: Icon, title, description, color, bg, stats }) => (
            <Link key={href} href={href} className="group block">
              <div
                className="relative bg-white rounded-2xl border-2 shadow-sm h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                style={{ borderColor: `${color}40` }}
              >
                {/* Colored top bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Icon + title row */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <h3 className="text-base font-bold text-[#021d49] leading-tight">{title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{description}</p>

                  {/* Mini stats */}
                  <div className="flex flex-wrap gap-2">
                    {stats.map(({ value, label }) => (
                      <span key={label} className="text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ color, borderColor: `${color}40`, backgroundColor: bg }}>
                        {value} {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button footer — clearly a clickable action */}
                <div
                  className="flex items-center justify-between px-6 py-3 text-white text-sm font-bold transition-opacity duration-150"
                  style={{ backgroundColor: color }}
                >
                  <span>View {title}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Platform Overview ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-[#021d49]">Platform Overview</h2>
          <p className="text-gray-400 mt-1 text-sm">At-a-glance snapshot of climate and health data across Africa</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* HNAP Status */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <Globe size={16} className="text-[#0e8601]" />
              <span className="text-sm font-bold text-[#021d49]">HNAP Status</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Health National Adaptation Plans across 53 countries</p>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={hnapData} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 40]} tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#021d49' }} width={130} />
                  <Tooltip formatter={(v) => [v, 'Countries']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={20}>
                    {hnapData.map((e) => <Cell key={e.name} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* NDC 3.0 Progress */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-[#ff9500]" />
              <span className="text-sm font-bold text-[#021d49]">NDC 3.0 Progress</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Nationally Determined Contributions submissions</p>
            <div className="h-36 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ndcData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={60}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {ndcData.map((e) => <Cell key={e.name} fill={e.fill} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [v, 'Countries']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {ndcData.map((e) => (
                <span key={e.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.fill }} />
                  {e.value} {e.name}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-[#55bdd0]" />
              <span className="text-sm font-bold text-[#021d49]">Ecosystem Summary</span>
            </div>
            <p className="text-xs text-gray-400 -mt-2">Key actors in the Africa climate-health landscape</p>
            {[
              { label: 'Organizations tracked', value: orgsData.organizations.length, color: '#021d49' },
              { label: 'Active funders', value: fundersData.data.length, color: '#ff9500' },
              { label: 'Technical networks', value: 6, color: '#55bdd0' },
              { label: 'African countries covered', value: 53, color: '#0e8601' },
              { label: 'HNAPs implemented', value: 6, color: '#0e8601' },
              { label: 'NDC 3.0 submissions', value: 3, color: '#f59e0b' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-sm font-extrabold" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
