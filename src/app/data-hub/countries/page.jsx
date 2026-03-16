'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Search, CheckCircle2, Minus } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

import hnapsData from '../../../../data/HNAPs_Africa.json';
import ndcData from '../../../../data/NDC_3_0_Africa.json';

const AfricaMap = dynamic(() => import('./AfricaMap'), { ssr: false });

/* ── Constants ────────────────────────────────────────────────── */
const HNAP_PIE_DATA = [
  { name: 'Implemented', value: 6, color: '#0e8601' },
  { name: 'Under Consideration', value: 36, color: '#f59e0b' },
  { name: 'Not Yet Decided', value: 11, color: '#ef4444' },
];

const NDC_BAR_DATA = [
  { version: 'NDC 1.0', Submitted: 54, 'Not Submitted': 0 },
  { version: 'NDC 2.0', Submitted: 54, 'Not Submitted': 0 },
  { version: 'NDC 3.0', Submitted: 3, 'Not Submitted': 51 },
];

/* ── Multi-Pie chart data ──────────────────────────────────────── */
const STATUS_COLORS = {
  Completed:  '#4a7c59',
  Started:    '#a8d5a2',
  'Not Yet':  '#f5e167',
  Unknown:    '#9ca3af',
};

const MULTI_PIE_DATA = [
  {
    title: 'HNAP Status',
    subtitle: '53 countries',
    data: [
      { name: 'Completed',  value: 6  },
      { name: 'Started',    value: 36 },
      { name: 'Not Yet',    value: 11 },
    ],
  },
  {
    title: 'NDC 1.0',
    subtitle: '54 countries',
    data: [
      { name: 'Completed',  value: 54 },
    ],
  },
  {
    title: 'NDC 2.0',
    subtitle: '54 countries',
    data: [
      { name: 'Completed',  value: 54 },
    ],
  },
  {
    title: 'NDC 3.0',
    subtitle: '54 countries',
    data: [
      { name: 'Completed',  value: 3  },
      { name: 'Not Yet',    value: 51 },
    ],
  },
];

/* ── Custom outer label (count + %) ───────────────────────────── */
const RADIAN = Math.PI / 180;
function OuterLabel({ cx, cy, midAngle, outerRadius, value, percent }) {
  if (!value) return null;
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const sx  = cx + (outerRadius + 6)  * cos;
  const sy  = cy + (outerRadius + 6)  * sin;
  const mx  = cx + (outerRadius + 22) * cos;
  const my  = cy + (outerRadius + 22) * sin;
  const ex  = mx + (cos >= 0 ? 1 : -1) * 14;
  const ey  = my;
  const anchor = cos >= 0 ? 'start' : 'end';
  const tx  = ex + (cos >= 0 ? 3 : -3);
  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#bbb" fill="none" strokeWidth={1} />
      <circle cx={ex} cy={ey} r={2} fill="#bbb" />
      <text x={tx} y={ey - 3}  textAnchor={anchor} fontSize={11} fontWeight={700} fill="#222">
        {value}
      </text>
      <text x={tx} y={ey + 11} textAnchor={anchor} fontSize={10} fill="#555">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
}

/* ── Single small pie ─────────────────────────────────────────── */
function SmallPie({ title, subtitle, data }) {
  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 200, height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 24, right: 36, bottom: 24, left: 36 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={62}
              dataKey="value"
              labelLine={false}
              label={OuterLabel}
              isAnimationActive
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#ccc'} stroke="white" strokeWidth={1} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v, n) => [`${v} countries`, n]}
              contentStyle={{ borderRadius: 8, fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-sm font-bold text-[#021d49]">{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

const HNAP_STATUS_COLORS = {
  'Implemented': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  'Under Consideration': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  'Not Yet Decided': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
};

/* ── Stat card ────────────────────────────────────────────────── */
function StatCard({ value, label, color = '#0e8601' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center">
      <span className="text-3xl font-extrabold" style={{ color }}>{value}</span>
      <span className="mt-1 text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
  );
}

/* ── Custom pie label ─────────────────────────────────────────── */
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* ── Build merged table data ──────────────────────────────────── */
function buildTableData() {
  const ndcMap = {};
  ndcData.countries.forEach((c) => { ndcMap[c.Country] = c; });

  // Use HNAP as primary list (53 countries)
  return hnapsData.countries.map((h) => {
    // Try to find matching NDC entry by fuzzy country name
    const ndcMatch = ndcData.countries.find(
      (n) =>
        n.Country.toLowerCase() === h.country.toLowerCase() ||
        n.Country.toLowerCase().includes(h.country.toLowerCase()) ||
        h.country.toLowerCase().includes(n.Country.toLowerCase())
    );
    return {
      country: h.country,
      hnap_status: h.hnap_status,
      integration_details: h.integration_details,
      source_url: h.source_url,
      ndc_3_0: ndcMatch ? ndcMatch.NDC_3_0_Submitted_by_Feb_10_2025 : null,
    };
  });
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function CountriesPage() {
  const [mapMode, setMapMode] = useState('hnap');
  const [search, setSearch] = useState('');

  const tableData = useMemo(() => buildTableData(), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return tableData;
    const q = search.toLowerCase();
    return tableData.filter(
      (r) =>
        r.country.toLowerCase().includes(q) ||
        r.hnap_status.toLowerCase().includes(q)
    );
  }, [search, tableData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16 space-y-10">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#021d49]">Countries &amp; Climate Policy</h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Visualise HNAP implementation status and NDC 3.0 submission progress across 54 African countries.
        </p>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard value={53} label="Countries" color="#021d49" />
        <StatCard value={6} label="HNAP Implemented" color="#0e8601" />
        <StatCard value={36} label="Under Consideration" color="#f59e0b" />
        <StatCard value={11} label="Not Yet Decided" color="#ef4444" />
        <StatCard value={3} label="NDC 3.0 Submitted" color="#55bdd0" />
      </div>

      {/* ── Map section ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        {/* Mode toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <h2 className="text-xl font-bold text-[#021d49]">Interactive Africa Map</h2>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setMapMode('hnap')}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                mapMode === 'hnap'
                  ? 'bg-[#021d49] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              HNAP Status
            </button>
            <button
              onClick={() => setMapMode('ndc')}
              className={`px-4 py-2 text-sm font-semibold transition-colors border-l border-gray-200 ${
                mapMode === 'ndc'
                  ? 'bg-[#021d49] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              NDC 3.0 Status
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-5">
          {mapMode === 'hnap' ? (
            <>
              <LegendDot color="#0e8601" label="Implemented" />
              <LegendDot color="#f59e0b" label="Under Consideration" />
              <LegendDot color="#ef4444" label="Not Yet Decided" />
            </>
          ) : (
            <>
              <LegendDot color="#0e8601" label="NDC 3.0 Submitted" />
              <LegendDot color="#94a3b8" label="Not Yet Submitted" />
            </>
          )}
        </div>

        <AfricaMap hnapsData={hnapsData} ndcData={ndcData} mapMode={mapMode} />
      </div>

      {/* ── Multi-Pie overview ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-[#021d49] mb-1">Policy Status Overview</h3>
        <p className="text-xs text-gray-400 mb-6">Breakdown of HNAP implementation and NDC submission progress across African countries</p>

        {/* Pie row */}
        <div className="flex flex-wrap justify-around gap-6">
          {MULTI_PIE_DATA.map((d) => (
            <SmallPie key={d.title} title={d.title} subtitle={d.subtitle} data={d.data} />
          ))}
        </div>

        {/* Shared legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
          {Object.entries(STATUS_COLORS).map(([name, color]) => (
            <span key={name} className="inline-flex items-center gap-2 text-xs text-gray-600">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Charts row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HNAP Donut */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">HNAP Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HNAP_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {HNAP_PIE_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value + ' countries', name]}
                  contentStyle={{ borderRadius: 8, fontSize: 12 }}
                />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => <span style={{ fontSize: 12, color: '#374151' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NDC Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">NDC Submission Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={NDC_BAR_DATA}
                margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="version" tick={{ fontSize: 12, fill: '#374151' }} />
                <YAxis domain={[0, 60]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value, name) => [value + ' countries', name]}
                  contentStyle={{ borderRadius: 8, fontSize: 12 }}
                />
                <Legend
                  iconType="square"
                  iconSize={10}
                  formatter={(value) => <span style={{ fontSize: 12, color: '#374151' }}>{value}</span>}
                />
                <Bar dataKey="Submitted" stackId="a" fill="#0e8601" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Not Submitted" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Countries Table ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <h3 className="text-lg font-bold text-[#021d49]">Countries Data Table</h3>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search country or status…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 focus:border-[#0e8601]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Country</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">HNAP Status</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">NDC 3.0</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((row) => {
                const sc = HNAP_STATUS_COLORS[row.hnap_status] || {};
                return (
                  <tr key={row.country} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-[#021d49]">{row.country}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                        {row.hnap_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.ndc_3_0 === null ? (
                        <span className="text-gray-300">—</span>
                      ) : row.ndc_3_0 ? (
                        <CheckCircle2 size={18} className="text-[#0e8601] inline-block" />
                      ) : (
                        <Minus size={18} className="text-gray-300 inline-block" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs hidden md:table-cell max-w-xs">
                      <span className="line-clamp-2">{row.integration_details}</span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">No countries match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Showing {filtered.length} of {tableData.length} countries</p>
      </div>
    </div>
  );
}

/* ── Legend dot helper ────────────────────────────────────────── */
function LegendDot({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
