'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

import fundersData from '../../../../data/climate_health_funders_africa.json';

/* ── Palette ──────────────────────────────────────────────────── */
const TYPE_COLORS = [
  '#0e8601', '#021d49', '#ff9500', '#55bdd0',
  '#8b5cf6', '#ef4444', '#f59e0b', '#10b981',
];

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

/* ── Custom tooltips ──────────────────────────────────────────── */
function FundingTypeTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-sm z-50 pointer-events-none">
      <p className="font-bold text-[#021d49] text-sm mb-3 pb-2 border-b border-gray-100">
        {d.name} — {d.value} {d.value === 1 ? 'Funder' : 'Funders'}
      </p>
      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
        {(d.funders || []).map(({ name, country }) => (
          <div key={name}>
            <p className="text-xs font-semibold text-gray-700">{name}</p>
            <p className="text-[11px] text-gray-400">{country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountryTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-sm z-50 pointer-events-none">
      <p className="font-bold text-[#021d49] text-sm mb-3 pb-2 border-b border-gray-100">
        {d.fullName} — {d.count} {d.count === 1 ? 'Funder' : 'Funders'}
      </p>
      <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
        {(d.funders || []).map(({ name, type }) => (
          <div key={name}>
            <p className="text-xs font-semibold text-gray-700">{name}</p>
            <p className="text-[11px] text-gray-400">{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Compute stats ────────────────────────────────────────────── */
function computeStats(data) {
  const typeMap = {};
  const countryMap = {};
  let africaCount = 0;
  let globalCount = 0;

  data.forEach((funder) => {
    const types = (funder['Type of Funding'] || '').split(',').map((t) => t.trim()).filter(Boolean);
    types.forEach((t) => {
      if (!typeMap[t]) typeMap[t] = [];
      typeMap[t].push({ name: funder.Funder, country: funder.Country });
    });

    const country = (funder.Country || '').trim();
    if (country) {
      if (!countryMap[country]) countryMap[country] = [];
      countryMap[country].push({ name: funder.Funder, type: funder['Type of Funding'] });
    }

    if (funder.Scope === 'Africa') africaCount++;
    if (funder.Scope === 'Global') globalCount++;
  });

  const typeChart = Object.entries(typeMap)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([name, funders]) => ({ name, value: funders.length, funders }));

  const countryChart = Object.entries(countryMap)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10)
    .map(([fullName, funders]) => ({
      name: fullName.length > 25 ? fullName.slice(0, 23) + '…' : fullName,
      fullName,
      count: funders.length,
      funders,
    }));

  const uniqueTypes = Object.keys(typeMap).length;

  return { typeChart, countryChart, africaCount, globalCount, uniqueTypes };
}

/* ── Custom pie label ─────────────────────────────────────────── */
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
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

/* ── Funder card ──────────────────────────────────────────────── */
function FunderCard({ funder }) {
  const sc = SCOPE_STYLES[funder.Scope] || SCOPE_STYLES.Global;
  const types = (funder['Type of Funding'] || '').split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Name + scope */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-[#021d49] text-sm leading-snug flex-1">{funder.Funder}</h3>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
          {funder.Scope}
        </span>
      </div>

      {/* Country */}
      <p className="text-xs text-gray-500">
        <span className="font-medium text-gray-600">Country:</span> {funder.Country || 'N/A'}
      </p>

      {/* Funding type tags */}
      {types.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {types.map((type, i) => (
            <span
              key={type}
              className="inline-block text-xs font-medium rounded-full px-2.5 py-0.5 text-white"
              style={{ backgroundColor: TYPE_COLORS[i % TYPE_COLORS.length] }}
            >
              {type}
            </span>
          ))}
        </div>
      )}

      {/* Link */}
      {funder.Link && (
        <a
          href={funder.Link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e8601] hover:text-[#0a6a01] transition-colors"
        >
          Visit Website <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function FundersPage() {
  const [search, setSearch] = useState('');
  const [scopeFilter, setScopeFilter] = useState('All');

  const { typeChart, countryChart, africaCount, globalCount, uniqueTypes } = useMemo(
    () => computeStats(fundersData.data),
    []
  );

  const filtered = useMemo(() => {
    return fundersData.data.filter((f) => {
      const matchSearch =
        !search.trim() ||
        f.Funder.toLowerCase().includes(search.toLowerCase()) ||
        (f.Country || '').toLowerCase().includes(search.toLowerCase()) ||
        (f['Type of Funding'] || '').toLowerCase().includes(search.toLowerCase());
      const matchScope = scopeFilter === 'All' || f.Scope === scopeFilter;
      return matchSearch && matchScope;
    });
  }, [search, scopeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16 space-y-10">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#021d49]">Climate &amp; Health Funders in Africa</h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Discover funders supporting climate and health initiatives across Africa through grants,
          loans, technical assistance, and other financial instruments.
        </p>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard value={fundersData.data.length} label="Total Funders" color="#021d49" />
        <StatCard value={africaCount} label="Africa-focused" color="#3b82f6" />
        <StatCard value={globalCount} label="Global Scope" color="#8b5cf6" />
        <StatCard value={uniqueTypes} label="Funding Types" color="#ff9500" />
      </div>

      {/* ── Charts row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funding types donut */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">Funding Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {typeChart.map((entry, index) => (
                    <Cell key={entry.name} fill={TYPE_COLORS[index % TYPE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<FundingTypeTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => <span style={{ fontSize: 11, color: '#374151' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funders by country horizontal bar */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">Top Countries / Regions by Funder Count</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={countryChart}
                margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#374151' }} width={120} />
                <Tooltip content={<CountryTooltip />} />
                <Bar dataKey="count" fill="#ff9500" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Search + Filter ──────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search funders, country, type…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9500]/30 focus:border-[#ff9500]"
          />
        </div>
        <select
          value={scopeFilter}
          onChange={(e) => setScopeFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9500]/30 focus:border-[#ff9500] bg-white text-gray-700"
        >
          <option value="All">All Scopes</option>
          <option value="Africa">Africa</option>
          <option value="Global">Global</option>
        </select>
        <span className="text-sm text-gray-400">
          {filtered.length} of {fundersData.data.length} shown
        </span>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((funder, index) => (
            <FunderCard key={`${funder.Funder}-${index}`} funder={funder} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No funders found.</p>
          <p className="text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
