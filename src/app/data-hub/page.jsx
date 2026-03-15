'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Globe, Building2, Landmark, Network } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

import hnapsData from '../../../data/HNAPs_Africa.json';
import ndcData from '../../../data/NDC_3_0_Africa.json';
import orgsData from '../../../data/climate_change_health_organizations.json';
import fundersData from '../../../data/climate_health_funders_africa.json';
import networksData from '../../../data/Technical_Support_Networks.json';

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

/* ── Stat card ────────────────────────────────────────────────── */
function StatCard({ value, label, suffix = '' }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <span className="text-4xl font-extrabold text-[#0e8601]">
        <AnimatedCounter target={value} />
        {suffix}
      </span>
      <span className="mt-2 text-sm font-medium text-[#021d49] uppercase tracking-wide">{label}</span>
    </div>
  );
}

/* ── Explore card ─────────────────────────────────────────────── */
function ExploreCard({ href, icon: Icon, title, description, color }) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-7 h-full flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon size={28} style={{ color }} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#021d49] mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
        <span className="text-sm font-semibold mt-auto" style={{ color }}>
          Explore →
        </span>
      </div>
    </Link>
  );
}

/* ── Main page ────────────────────────────────────────────────── */
const hnapChartData = [
  { name: 'Implemented', value: 6, fill: '#0e8601' },
  { name: 'Under Consideration', value: 36, fill: '#f59e0b' },
  { name: 'Not Yet Decided', value: 11, fill: '#ef4444' },
];

export default function DataHubPage() {
  return (
    <div className="pb-16">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #021d49 0%, #033080 50%, #021d49 100%)',
        }}
      >
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: '#0e8601', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: '#55bdd0', transform: 'translate(-20%, 20%)' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-[#0e8601] rounded-full animate-pulse" />
            Live Data Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
            Africa Climate &amp; Health<br />
            <span className="text-[#55bdd0]">Data Hub</span>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Explore interactive data on climate change and health across 54 African countries —
            from health adaptation plans to organizations, funders, and support networks.
          </p>
        </div>
      </section>

      {/* ── Key Statistics ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard value={orgsData.organizations.length} label="Organizations" />
          <StatCard value={fundersData.data.length} label="Funders" />
          <StatCard value={53} label="Countries Tracked" />
          <StatCard value={6} label="HNAPs Implemented" />
          <StatCard value={3} label="NDC 3.0 Submitted" />
        </div>
      </section>

      {/* ── Explore the Data ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-[#021d49]">Explore the Data</h2>
          <p className="text-gray-500 mt-1 text-sm">Navigate to detailed views for each dataset</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExploreCard
            href="/data-hub/countries"
            icon={Globe}
            title="Countries & Policy"
            description="Interactive map and tables for HNAP status and NDC submissions across 54 African nations."
            color="#0e8601"
          />
          <ExploreCard
            href="/data-hub/organizations"
            icon={Building2}
            title="Organizations"
            description="Browse 24 climate and health organizations operating across Africa at national, regional, and global scopes."
            color="#021d49"
          />
          <ExploreCard
            href="/data-hub/funders"
            icon={Landmark}
            title="Funders"
            description="Discover 25 funders supporting climate-health initiatives with grants, loans, investments, and technical assistance."
            color="#ff9500"
          />
          <ExploreCard
            href="/data-hub/networks"
            icon={Network}
            title="Technical Networks"
            description="Explore 6 technical support networks providing research, capacity building, and policy guidance."
            color="#55bdd0"
          />
        </div>
      </section>

      {/* ── HNAP Quick Overview ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <h2 className="text-2xl font-extrabold text-[#021d49] mb-2">
            HNAP Implementation Overview
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-2xl">
            Health National Adaptation Plans (HNAPs) help countries address climate-related health
            risks. Below is the current status of HNAP adoption across 53 tracked African countries.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
              <span className="w-3 h-3 rounded-full bg-[#0e8601]" />
              6 Implemented
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-200">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              36 Under Consideration
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-semibold border border-red-200">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              11 Not Yet Decided
            </span>
          </div>

          {/* Recharts horizontal bar */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={hnapChartData}
                margin={{ top: 0, right: 40, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 40]} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#021d49' }} width={140} />
                <Tooltip
                  formatter={(value) => [value, 'Countries']}
                  contentStyle={{ borderRadius: 8, fontSize: 13 }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                  {hnapChartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
