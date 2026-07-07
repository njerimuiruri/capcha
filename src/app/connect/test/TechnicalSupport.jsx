'use client';

import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts';
import { ExternalLink, Globe, Building2, LayoutGrid, Table2, Filter } from 'lucide-react';
import rawData from '../../../../data/Technical_Support_Networks.json';

const orgs   = rawData.organizations;
const COLORS  = ['#0e8601', '#021d49', '#ff9500', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];

const SCOPE_STYLE = {
  Africa: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  Global: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
};

// Collect all unique support types
const ALL_TYPES = [...new Set(orgs.flatMap(o => o.type_of_support))].sort();

// Bar chart data — frequency of each support type
const barData = ALL_TYPES.map(t => ({
  type: t,
  count: orgs.filter(o => o.type_of_support.includes(t)).length,
})).sort((a, b) => b.count - a.count);

// Donut data
const pieData = [
  { name: 'Africa', value: orgs.filter(o => o.scope === 'Africa').length, fill: '#0e8601' },
  { name: 'Global', value: orgs.filter(o => o.scope === 'Global').length, fill: '#021d49' },
];

// ─── Support chip ─────────────────────────────────────────────────────────────
function TypeChip({ label, active, onClick, colorIndex }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 ${
        active
          ? 'bg-[#021d49] text-white border-[#021d49] shadow-sm'
          : 'bg-white text-gray-500 border-gray-200 hover:border-[#021d49] hover:text-[#021d49]'
      }`}>
      {label}
    </button>
  );
}

// ─── Org card ─────────────────────────────────────────────────────────────────
function OrgCard({ org, activeType, onTypeClick }) {
  const sc = SCOPE_STYLE[org.scope] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  const dimmed = activeType && !org.type_of_support.includes(activeType);
  const url = org.url;

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 p-5 transition-all duration-200 ${
      dimmed ? 'opacity-30 scale-[0.98]' : 'hover:shadow-md hover:-translate-y-0.5'
    }`}>
      {/* Name + scope */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <Building2 size={14} className="text-[#021d49] flex-shrink-0 mt-0.5" />
          <p className="text-sm font-bold text-[#021d49] leading-snug">{org.organization}</p>
        </div>
        <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
          className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
          {org.scope}
        </span>
      </div>

      {/* Region */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
        <Globe size={11} />
        {org.country_or_region}
      </div>

      {/* Support type chips */}
      <div className="flex flex-wrap gap-1.5">
        {org.type_of_support.map((t, i) => (
          <button
            key={t}
            onClick={() => onTypeClick(t)}
            className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all duration-150 ${
              activeType === t
                ? 'bg-[#0e8601] text-white border-[#0e8601]'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601]'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Link — clickable if URL exists, labelled reference if not */}
      <div className="mt-auto pt-2 border-t border-gray-100">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#021d49] font-semibold hover:text-[#0e8601] transition-colors">
            <ExternalLink size={11} />
            {org.link_label || 'Visit Website'}
          </a>
        ) : org.link_label ? (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ExternalLink size={11} className="flex-shrink-0" />
            <span>{org.link_label}</span>
            <span className="ml-1 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">no direct URL</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ─── Matrix view ──────────────────────────────────────────────────────────────
function MatrixView({ activeType, onTypeClick }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-gray-400 w-56">
              Organization
            </th>
            {ALL_TYPES.map(t => (
              <th key={t} className="px-3 py-3 min-w-[110px]">
                <button
                  onClick={() => onTypeClick(t)}
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-lg transition-all ${
                    activeType === t
                      ? 'bg-[#021d49] text-white'
                      : 'text-gray-400 hover:text-[#021d49]'
                  }`}>
                  {t}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orgs.map((org, ri) => {
            const dimmed = activeType && !org.type_of_support.includes(activeType);
            return (
              <tr key={org.organization}
                className={`border-b border-gray-50 last:border-0 transition-opacity ${dimmed ? 'opacity-25' : ''}`}>
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-[#021d49] text-xs leading-snug">{org.organization}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{org.country_or_region}</p>
                </td>
                {ALL_TYPES.map(t => {
                  const has = org.type_of_support.includes(t);
                  return (
                    <td key={t} className="px-3 py-3.5 text-center">
                      {has ? (
                        <div className="w-6 h-6 rounded-full bg-[#0e8601]/15 border border-[#0e8601]/30 flex items-center justify-center mx-auto">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#0e8601]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200 mx-auto" />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Custom tooltip for bar chart ─────────────────────────────────────────────
function CustomBarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { type, count } = payload[0].payload;
  const matching = orgs.filter(o => o.type_of_support.includes(type)).map(o => o.organization);
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs max-w-[220px]">
      <p className="font-bold text-[#021d49] mb-1">{type}</p>
      <p className="text-gray-500 mb-2">{count} organisation{count !== 1 ? 's' : ''}</p>
      {matching.map(n => (
        <p key={n} className="text-gray-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0e8601] flex-shrink-0 inline-block" />{n}
        </p>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TechnicalSupport() {
  const [view,       setView]       = useState('cards'); // 'cards' | 'matrix'
  const [activeType, setActiveType] = useState(null);

  const toggleType = (t) => setActiveType(prev => prev === t ? null : t);

  const filteredOrgs = useMemo(() =>
    activeType ? orgs.filter(o => o.type_of_support.includes(activeType)) : orgs,
  [activeType]);

  return (
    <div className="space-y-6">

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Organizations', value: orgs.length, color: '#021d49' },
          { label: 'Support Types',  value: ALL_TYPES.length, color: '#0e8601' },
          { label: 'Africa-focused', value: orgs.filter(o => o.scope === 'Africa').length, color: '#ff9500' },
          { label: 'Global scope',   value: orgs.filter(o => o.scope === 'Global').length, color: '#3b82f6' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filter + view toggle ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mr-1">
            <Filter size={12} /> Filter:
          </span>
          <TypeChip label="All" active={!activeType} onClick={() => setActiveType(null)} />
          {ALL_TYPES.map((t, i) => (
            <TypeChip key={t} label={t} active={activeType === t} onClick={() => toggleType(t)} colorIndex={i} />
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button onClick={() => setView('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'cards' ? 'bg-white text-[#021d49] shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}>
            <LayoutGrid size={13} /> Cards
          </button>
          <button onClick={() => setView('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'matrix' ? 'bg-white text-[#021d49] shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}>
            <Table2 size={13} /> Matrix
          </button>
        </div>
      </div>

      {/* Active filter banner */}
      {activeType && (
        <div className="flex items-center gap-2 bg-[#021d49]/5 border border-[#021d49]/10 rounded-xl px-4 py-2.5 text-sm">
          <span className="text-[#021d49] font-semibold">Showing:</span>
          <span className="text-gray-600">{activeType}</span>
          <span className="text-gray-400 text-xs">·</span>
          <span className="text-gray-500 text-xs">{filteredOrgs.length} organisation{filteredOrgs.length !== 1 ? 's' : ''} match</span>
          <button onClick={() => setActiveType(null)}
            className="ml-auto text-xs text-gray-400 hover:text-gray-600 underline">Clear</button>
        </div>
      )}

      {/* ── Cards / Matrix ────────────────────────────────────────────────── */}
      {view === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orgs.map(org => (
            <OrgCard key={org.organization} org={org} activeType={activeType} onTypeClick={toggleType} />
          ))}
        </div>
      ) : (
        <MatrixView activeType={activeType} onTypeClick={toggleType} />
      )}

      {/* ── Charts ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">

        {/* Bar chart — support type frequency */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-4">
            Support Type Frequency
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} layout="vertical" barSize={12} margin={{ left: 8, right: 24 }}>
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickLine={false} axisLine={false} domain={[0, orgs.length]} />
              <YAxis type="category" dataKey="type" width={140}
                tick={{ fontSize: 11, fill: '#374151' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}
                onClick={d => toggleType(d.type)} style={{ cursor: 'pointer' }}>
                {barData.map((entry, i) => (
                  <Cell key={entry.type}
                    fill={activeType === entry.type ? '#ff9500' : '#0e8601'}
                    opacity={activeType && activeType !== entry.type ? 0.25 : 1} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 mt-2 text-center">Click a bar to filter cards above</p>
        </div>

        {/* Donut — scope breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-4">
            Scope Breakdown
          </p>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={80}
                  dataKey="value" paddingAngle={4} stroke="none">
                  {pieData.map(d => <Cell key={d.name} fill={d.fill} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v} orgs`, n]}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8}
                  formatter={v => <span style={{ fontSize: 12, color: '#374151' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-2">
            {pieData.map(d => (
              <div key={d.name} className="text-center">
                <p className="text-xl font-extrabold" style={{ color: d.fill }}>{d.value}</p>
                <p className="text-[10px] text-gray-400">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
