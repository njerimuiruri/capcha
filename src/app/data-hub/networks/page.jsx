'use client';

import { useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

import networksData from '../../../../data/Technical_Support_Networks.json';

/* ── Support type colors ─────────────────────────────────────── */
const SUPPORT_TYPES_ALL = [
  'Research', 'Capacity Building', 'Policy Guidance', 'Policy Support',
  'Technical Support', 'Advocacy', 'Data & Forecasting', 'Technical Assistance',
];

const SUPPORT_COLORS = [
  '#0e8601', '#021d49', '#ff9500', '#55bdd0',
  '#8b5cf6', '#ef4444', '#f59e0b', '#10b981',
];

const TYPE_COLOR_MAP = {};
SUPPORT_TYPES_ALL.forEach((t, i) => {
  TYPE_COLOR_MAP[t] = SUPPORT_COLORS[i % SUPPORT_COLORS.length];
});

/* ── Scope styles ────────────────────────────────────────────── */
const SCOPE_STYLES = {
  Africa: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  Global: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
};

/* ── Stat card ────────────────────────────────────────────────── */
function StatCard({ value, label, color = '#021d49' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center">
      <span className="text-3xl font-extrabold" style={{ color }}>{value}</span>
      <span className="mt-1 text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
  );
}

/* ── Custom tooltip for pie ───────────────────────────────────── */
function SupportTypeTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-xs z-50 pointer-events-none">
      <p className="font-bold text-[#021d49] text-sm mb-3 pb-2 border-b border-gray-100">
        {d.name} — {d.value} {d.value === 1 ? 'Organization' : 'Organizations'}
      </p>
      <div className="space-y-2">
        {(d.orgs || []).map(({ name, region }) => (
          <div key={name}>
            <p className="text-xs font-semibold text-gray-700">{name}</p>
            <p className="text-[11px] text-gray-400">{region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Compute stats ────────────────────────────────────────────── */
function computeStats(orgs) {
  const typeMap = {};
  let africaCount = 0;
  let globalCount = 0;

  orgs.forEach((org) => {
    if (org.scope === 'Africa') africaCount++;
    if (org.scope === 'Global') globalCount++;

    (org.type_of_support || []).forEach((t) => {
      if (!typeMap[t]) typeMap[t] = [];
      typeMap[t].push({ name: org.organization, region: org.country_or_region });
    });
  });

  const typeChart = Object.entries(typeMap)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([name, orgList]) => ({ name, value: orgList.length, orgs: orgList }));

  // Stacked bar: each org is a row, each support type is a boolean column
  const allSupportTypes = [...new Set(orgs.flatMap((o) => o.type_of_support || []))];

  const stackedData = orgs.map((org) => {
    const row = { org: org.organization.length > 25 ? org.organization.slice(0, 23) + '…' : org.organization };
    allSupportTypes.forEach((t) => {
      row[t] = (org.type_of_support || []).includes(t) ? 1 : 0;
    });
    return row;
  });

  return { typeChart, stackedData, allSupportTypes, africaCount, globalCount };
}

/* ── Custom pie label ─────────────────────────────────────────── */
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* ── Network card ─────────────────────────────────────────────── */
function NetworkCard({ org }) {
  const sc = SCOPE_STYLES[org.scope] || SCOPE_STYLES.Global;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Name + scope */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-[#021d49] text-sm leading-snug flex-1">{org.organization}</h3>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
          {org.scope}
        </span>
      </div>

      {/* Country / region */}
      <p className="text-xs text-gray-500">
        <span className="font-medium text-gray-600">Region:</span> {org.country_or_region}
      </p>

      {/* Support type tags */}
      {(org.type_of_support || []).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {org.type_of_support.map((type) => (
            <span
              key={type}
              className="inline-block text-xs font-medium rounded-full px-2.5 py-0.5 text-white"
              style={{ backgroundColor: TYPE_COLOR_MAP[type] || '#94a3b8' }}
            >
              {type}
            </span>
          ))}
        </div>
      )}

      {/* Link */}
      {org.url && (
        <a
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e8601] hover:text-[#0a6a01] transition-colors"
        >
          {org.link_label || 'Visit Website'} <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}

/* ── Custom tooltip for stacked bar ──────────────────────────── */
function CustomStackedTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const activeTypes = payload.filter((p) => p.value > 0).map((p) => p.dataKey);
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-3 text-sm max-w-xs">
      <p className="font-bold text-[#021d49] mb-2">{label}</p>
      <div className="flex flex-wrap gap-1">
        {activeTypes.map((t) => (
          <span
            key={t}
            className="text-xs text-white rounded-full px-2 py-0.5"
            style={{ backgroundColor: TYPE_COLOR_MAP[t] || '#94a3b8' }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function NetworksPage() {
  const { typeChart, stackedData, allSupportTypes, africaCount, globalCount } = useMemo(
    () => computeStats(networksData.organizations),
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16 space-y-10">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#021d49]">Technical Support &amp; Networks</h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Explore technical support networks providing research, capacity building, policy guidance,
          and other services to strengthen climate and health action across Africa.
        </p>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard value={networksData.organizations.length} label="Total Networks" color="#021d49" />
        <StatCard value={africaCount} label="Africa-based" color="#3b82f6" />
        <StatCard value={globalCount} label="Global Scope" color="#8b5cf6" />
      </div>

      {/* ── Charts row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support types donut */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">Types of Support Provided</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeChart}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {typeChart.map((entry) => (
                    <Cell key={entry.name} fill={TYPE_COLOR_MAP[entry.name] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip content={<SupportTypeTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => <span style={{ fontSize: 11, color: '#374151' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stacked bar: org vs support types */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">Support Provided per Organization</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={stackedData}
                margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) => (v === 1 ? '1' : v === 0 ? '' : v)}
                  domain={[0, allSupportTypes.length]}
                />
                <YAxis type="category" dataKey="org" tick={{ fontSize: 10, fill: '#374151' }} width={130} />
                <Tooltip content={<CustomStackedTooltip />} />
                {allSupportTypes.map((type) => (
                  <Bar
                    key={type}
                    dataKey={type}
                    stackId="support"
                    fill={TYPE_COLOR_MAP[type] || '#94a3b8'}
                    barSize={20}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Each colored segment represents one type of support provided
          </p>
        </div>
      </div>

      {/* ── Legend for support types ─────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#021d49] mb-3">Support Type Legend</h3>
        <div className="flex flex-wrap gap-2">
          {allSupportTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white rounded-full px-3 py-1"
              style={{ backgroundColor: TYPE_COLOR_MAP[type] || '#94a3b8' }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* ── Network cards ────────────────────────────────────────── */}
      <div>
        <h2 className="text-xl font-bold text-[#021d49] mb-5">All Technical Support Networks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {networksData.organizations.map((org) => (
            <NetworkCard key={org.organization} org={org} />
          ))}
        </div>
      </div>
    </div>
  );
}
