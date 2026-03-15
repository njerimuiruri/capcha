'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

import orgsData from '../../../../data/climate_change_health_organizations.json';

/* ── Scope badge colors ───────────────────────────────────────── */
const SCOPE_STYLES = {
  Africa:   { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200',   dot: '#3b82f6' },
  Global:   { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', dot: '#8b5cf6' },
  National: { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200',  dot: '#0e8601' },
  Regional: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', dot: '#ff9500' },
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
function ScopeTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-sm z-50 pointer-events-none">
      <p className="font-bold text-sm mb-3 pb-2 border-b border-gray-100" style={{ color: SCOPE_COLORS[d.name] || '#021d49' }}>
        {d.name} — {d.value} {d.value === 1 ? 'Organization' : 'Organizations'}
      </p>
      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
        {(d.orgs || []).map(({ name, location }) => (
          <div key={name}>
            <p className="text-xs font-semibold text-gray-700">{name}</p>
            {location && <p className="text-[11px] text-gray-400">{location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function FunderTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-sm z-50 pointer-events-none">
      <p className="font-bold text-[#021d49] text-sm mb-3 pb-2 border-b border-gray-100">
        {d.fullName} — funds {d.count} {d.count === 1 ? 'org' : 'orgs'}
      </p>
      <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
        {(d.orgs || []).map(({ name, location }) => (
          <div key={name}>
            <p className="text-xs font-semibold text-gray-700">{name}</p>
            {location && <p className="text-[11px] text-gray-400">{location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Compute stats ────────────────────────────────────────────── */
function computeStats(orgs) {
  const scopeMap = { Africa: [], Global: [], National: [], Regional: [] };
  const funderMap = {};

  orgs.forEach((org) => {
    if (scopeMap[org.scope] !== undefined) {
      scopeMap[org.scope].push({ name: org.organization, location: org.project_location });
    }
    (org.funder || []).forEach((f) => {
      const key = f.trim();
      if (!key) return;
      if (!funderMap[key]) funderMap[key] = [];
      funderMap[key].push({ name: org.organization, location: org.project_location });
    });
  });

  const scopeCounts = Object.fromEntries(Object.entries(scopeMap).map(([k, v]) => [k, v.length]));

  const scopeChart = Object.entries(scopeMap).map(([name, orgList]) => ({
    name,
    value: orgList.length,
    orgs: orgList,
  }));

  const topFunders = Object.entries(funderMap)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10)
    .map(([fullName, orgList]) => ({
      name: fullName.length > 30 ? fullName.slice(0, 28) + '…' : fullName,
      fullName,
      count: orgList.length,
      orgs: orgList,
    }));

  return { scopeCounts, scopeChart, topFunders };
}

const SCOPE_COLORS = {
  Africa: '#3b82f6',
  Global: '#8b5cf6',
  National: '#0e8601',
  Regional: '#ff9500',
};

/* ── Organization card ────────────────────────────────────────── */
function OrgCard({ org }) {
  const sc = SCOPE_STYLES[org.scope] || SCOPE_STYLES.Global;
  const funders = org.funder || [];
  const shownFunders = funders.slice(0, 3);
  const extraFunders = funders.length - 3;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Name + scope */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-[#021d49] text-sm leading-snug flex-1">{org.organization}</h3>
        <span className={`shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sc.dot }} />
          {org.scope}
        </span>
      </div>

      {/* Location */}
      {org.project_location && (
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-600">Location:</span> {org.project_location}
        </p>
      )}

      {/* Projects count */}
      {org.projects_and_thematic_focus?.length > 0 && (
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-600">Focus areas:</span>{' '}
          {org.projects_and_thematic_focus.length} project{org.projects_and_thematic_focus.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Funders */}
      {funders.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {shownFunders.map((f) => (
            <span key={f} className="inline-block text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5">
              {f}
            </span>
          ))}
          {extraFunders > 0 && (
            <span className="inline-block text-xs bg-gray-100 text-gray-400 rounded px-2 py-0.5">
              +{extraFunders} more
            </span>
          )}
        </div>
      )}

      {/* Link */}
      {org.link && (
        <a
          href={org.link}
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
export default function OrganizationsPage() {
  const [search, setSearch] = useState('');
  const [scopeFilter, setScopeFilter] = useState('All');

  const { scopeCounts, scopeChart, topFunders } = useMemo(
    () => computeStats(orgsData.organizations),
    []
  );

  const filtered = useMemo(() => {
    return orgsData.organizations.filter((org) => {
      const matchSearch =
        !search.trim() ||
        org.organization.toLowerCase().includes(search.toLowerCase()) ||
        (org.project_location || '').toLowerCase().includes(search.toLowerCase()) ||
        (org.funder || []).some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchScope = scopeFilter === 'All' || org.scope === scopeFilter;
      return matchSearch && matchScope;
    });
  }, [search, scopeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16 space-y-10">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#021d49]">Climate &amp; Health Organizations</h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Browse organizations working at the intersection of climate change and health across Africa and globally.
        </p>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard value={orgsData.organizations.length} label="Total Organizations" color="#021d49" />
        <StatCard value={scopeCounts.Africa || 0} label="Africa-focused" color="#3b82f6" />
        <StatCard value={scopeCounts.Global || 0} label="Global Scope" color="#8b5cf6" />
        <StatCard value={(scopeCounts.National || 0) + (scopeCounts.Regional || 0)} label="National / Regional" color="#0e8601" />
      </div>

      {/* ── Charts row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scope bar chart */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">Organizations by Geographic Scope</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scopeChart} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#374151' }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<ScopeTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {scopeChart.map((entry) => (
                    <Cell key={entry.name} fill={SCOPE_COLORS[entry.name] || '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top funders horizontal bar */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#021d49] mb-4">Top 10 Funders (by # of Orgs Supported)</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topFunders}
                margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#374151' }} width={130} />
                <Tooltip content={<FunderTooltip />} />
                <Bar dataKey="count" fill="#0e8601" radius={[0, 6, 6, 0]} barSize={14} />
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
            placeholder="Search organizations, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 focus:border-[#0e8601]"
          />
        </div>
        <select
          value={scopeFilter}
          onChange={(e) => setScopeFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 focus:border-[#0e8601] bg-white text-gray-700"
        >
          <option value="All">All Scopes</option>
          <option value="Africa">Africa</option>
          <option value="Global">Global</option>
          <option value="National">National</option>
          <option value="Regional">Regional</option>
        </select>
        <span className="text-sm text-gray-400 ml-1">
          {filtered.length} of {orgsData.organizations.length} shown
        </span>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((org) => (
            <OrgCard key={org.organization} org={org} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No organizations found.</p>
          <p className="text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
