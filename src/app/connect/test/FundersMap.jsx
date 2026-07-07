'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { ExternalLink, X, MapPin, Banknote, Globe, Filter, Map, LayoutGrid, BarChart2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts';
import rawData from '../../../../data/climate_health_funders_africa.json';

const funders = rawData.data;

// ─── City → coordinates ───────────────────────────────────────────────────────
const LOCATION_COORDS = {
  'Middle East and North AfricaSub-Saharan Africa': [5.0,   20.0],
  'Massachusetts, USA':                             [42.41, -71.38],
  'Washington DC, USA':                             [38.91, -77.04],
  'London,United Kingdom':                          [51.51,  -0.13],
  "Abidjan, Côte d'Ivoire":                         [ 5.36,  -4.01],
  'Republic of Korea':                              [37.57, 126.98],
  'Burkina Faso, Rwanda, Ethiopia, Madagascar, Malawi, Gambia': [2.0, 32.0],
  'Cape Town, South Africa':                        [-33.92, 18.42],
  'San Francisco, USA':                             [37.77, -122.42],
  'Addis Ababa, Ethiopia':                          [ 9.03,  38.75],
  'Helsinki, Finland':                              [60.17,  24.94],
  'Oslo, Norway':                                   [59.91,  10.75],
  'Sundbyberg, Sweden':                             [59.36,  17.97],
  'Johannesburg, South Africa':                     [-26.20, 28.05],
  'Seattle, Washington , USA':                      [47.61, -122.33],
  'Geneva, Switzerland':                            [46.20,   6.14],
  'New York':                                       [40.71, -74.01],
  'Canada':                                         [56.13, -106.35],
  'USA':                                            [38.00, -97.00],
  'Saudi Arabia':                                   [23.89,  45.08],
};

const SCOPE_STYLE = {
  Africa: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  Global: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
};

// Group funders by location key
function buildLocationMap(data, scopeFilter, typeFilter) {
  const map = {};
  data.forEach(f => {
    const loc = f.Country;
    if (!LOCATION_COORDS[loc]) return;
    if (scopeFilter && f.Scope !== scopeFilter) return;
    if (typeFilter && !f['Type of Funding'].includes(typeFilter)) return;
    if (!map[loc]) map[loc] = [];
    map[loc].push(f);
  });
  return map;
}

// ─── Icon factories ───────────────────────────────────────────────────────────
function markerColor(funders) {
  const scopes = [...new Set(funders.map(f => f.Scope))];
  if (scopes.length > 1)   return '#ff9500'; // mixed
  if (scopes[0] === 'Africa') return '#0e8601';
  return '#021d49';
}

function createMarkerIcon(funders, isSelected) {
  const count = funders.length;
  const size  = 38;
  const bg    = isSelected ? '#ff9500' : markerColor(funders);
  const shadow = isSelected
    ? '0 0 0 3px rgba(255,149,0,0.3),0 4px 18px rgba(255,149,0,0.5)'
    : '0 4px 14px rgba(0,0,0,0.2)';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${bg};border:3px solid white;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      color:white;font-weight:700;font-size:13px;
      box-shadow:${shadow};cursor:pointer;
    ">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createClusterIcon(count) {
  const size = count >= 10 ? 50 : count >= 5 ? 44 : 40;
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:#021d49;border:3px solid white;border-radius:10px;
      display:flex;align-items:center;justify-content:center;
      color:white;font-weight:800;font-size:13px;
      box-shadow:0 4px 16px rgba(2,29,73,0.4);cursor:pointer;
    ">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// ─── Cluster layer ────────────────────────────────────────────────────────────
function ClusterMarkers({ locationMap, selected, onSelect }) {
  const map        = useMap();
  const groupRef   = useRef(null);
  const markersRef = useRef({});
  const prevSelRef = useRef(null);

  const handleSelect = useCallback((loc, funders) => onSelect(loc, funders), [onSelect]);

  useEffect(() => {
    if (!map) return;
    if (groupRef.current) {
      try { map.removeLayer(groupRef.current); } catch (_) {}
      groupRef.current = null;
      markersRef.current = {};
    }

    const group = L.markerClusterGroup({
      maxClusterRadius: 50,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      spiderfyDistanceMultiplier: 3,
      disableClusteringAtZoom: 5,
      iconCreateFunction: c => createClusterIcon(c.getChildCount()),
    });

    Object.entries(locationMap).forEach(([loc, fList]) => {
      const coords = LOCATION_COORDS[loc];
      if (!coords) return;
      const marker = L.marker(coords, { icon: createMarkerIcon(fList, false) });
      const label = fList.length === 1 ? fList[0].Funder : `${fList.length} funders`;
      marker.bindTooltip(`<b>${label}</b><br/>${loc}`, {
        direction: 'top', offset: [0, -22], className: 'funder-tooltip',
      });
      marker.on('click', () => handleSelect(loc, fList));
      group.addLayer(marker);
      markersRef.current[loc] = { marker, funders: fList };
    });

    map.addLayer(group);
    groupRef.current = group;

    return () => {
      if (map && groupRef.current) {
        try { map.removeLayer(groupRef.current); } catch (_) {}
        groupRef.current = null;
        markersRef.current = {};
      }
    };
  }, [map, locationMap, handleSelect]);

  // Swap icon on selection change only
  useEffect(() => {
    const prev = prevSelRef.current;
    const curr = selected?.loc ?? null;
    if (prev && markersRef.current[prev]) {
      const { marker, funders } = markersRef.current[prev];
      marker.setIcon(createMarkerIcon(funders, false));
    }
    if (curr && markersRef.current[curr]) {
      const { marker, funders } = markersRef.current[curr];
      marker.setIcon(createMarkerIcon(funders, true));
    }
    prevSelRef.current = curr;
  }, [selected]);

  return null;
}

// ─── Funder card (side panel) ────────────────────────────────────────────────
function FunderCard({ funder }) {
  const sc = SCOPE_STYLE[funder.Scope] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  const types = funder['Type of Funding'].split(',').map(t => t.trim());

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3 hover:shadow-md transition-shadow">
      {/* Name + scope */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-[#021d49] leading-snug">{funder.Funder}</p>
        <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
          className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
          {funder.Scope}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
        <Globe size={11} />
        {funder.Country}
      </div>

      {/* Funding type chips */}
      <div className="flex flex-wrap gap-1.5">
        {types.map(t => (
          <span key={t} className="text-[11px] bg-[#0e8601]/8 text-[#0e8601] border border-[#0e8601]/20 px-2.5 py-1 rounded-lg font-medium">
            {t}
          </span>
        ))}
      </div>

      {/* Link */}
      {funder.Link && (
        <a href={funder.Link} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#021d49] font-semibold hover:text-[#0e8601] transition-colors pt-1 border-t border-gray-100">
          <ExternalLink size={11} /> Visit Website
        </a>
      )}
    </div>
  );
}

// ─── Unique funding types across all funders ─────────────────────────────────
const ALL_TYPES_RAW = [...new Set(
  funders.flatMap(f => f['Type of Funding'].split(',').map(t => t.trim()))
)].sort();

// Pre-computed chart data (not filtered, always full picture)
const barChartData = ALL_TYPES_RAW.map(t => ({
  type: t,
  count: funders.filter(f => f['Type of Funding'].includes(t)).length,
  funders: funders.filter(f => f['Type of Funding'].includes(t)).map(f => f.Funder),
})).sort((a, b) => b.count - a.count);

const pieData = [
  { name: 'Africa', value: funders.filter(f => f.Scope === 'Africa').length, fill: '#0e8601' },
  { name: 'Global', value: funders.filter(f => f.Scope === 'Global').length, fill: '#021d49' },
];

// ─── Cards view ──────────────────────────────────────────────────────────────
function CardsView({ scopeFilter, typeFilter, onTypeChange }) {
  const visible = funders.filter(f => {
    if (scopeFilter && f.Scope !== scopeFilter) return false;
    if (typeFilter  && !f['Type of Funding'].includes(typeFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400">
        Showing <span className="font-bold text-[#021d49]">{visible.length}</span> of {funders.length} funders
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map((f, i) => {
          const sc    = SCOPE_STYLE[f.Scope] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
          const types = f['Type of Funding'].split(',').map(t => t.trim());
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-3">
              {/* Name + scope */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[#021d49] leading-snug">{f.Funder}</p>
                <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                  {f.Scope}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <Globe size={11} />{f.Country}
              </div>

              {/* Funding types */}
              <div className="flex flex-wrap gap-1.5">
                {types.map(t => (
                  <button key={t}
                    onClick={() => onTypeChange(prev => prev === t ? '' : t)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      typeFilter === t
                        ? 'bg-[#0e8601] text-white border-[#0e8601]'
                        : 'bg-[#0e8601]/8 text-[#0e8601] border-[#0e8601]/20 hover:bg-[#0e8601]/15'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>

              {/* Link */}
              {f.Link && (
                <a href={f.Link} target="_blank" rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-1.5 text-xs text-[#021d49] font-semibold hover:text-[#0e8601] transition-colors pt-3 border-t border-gray-100">
                  <ExternalLink size={11} /> Visit Website
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function BarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { type, count, funders: names } = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs max-w-[220px]">
      <p className="font-bold text-[#021d49] mb-1">{type}</p>
      <p className="text-gray-400 mb-2">{count} funder{count !== 1 ? 's' : ''}</p>
      {names.map(n => (
        <p key={n} className="text-gray-600 flex items-start gap-1 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0e8601] flex-shrink-0 mt-1" />{n}
        </p>
      ))}
    </div>
  );
}

// ─── Charts view ─────────────────────────────────────────────────────────────
function ChartsView() {
  const [activeBar, setActiveBar] = useState(null);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Bar chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">Funding Type Distribution</p>
          <p className="text-xs text-gray-400 mb-5">How many funders provide each type of support</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barChartData} layout="vertical" barSize={14} margin={{ left: 8, right: 30 }}>
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickLine={false} axisLine={false} domain={[0, funders.length]} />
              <YAxis type="category" dataKey="type" width={150}
                tick={{ fontSize: 11, fill: '#374151' }} tickLine={false} axisLine={false} />
              <Tooltip content={<BarTooltip />} cursor={{ fill: '#f9fafb' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}
                onClick={d => setActiveBar(prev => prev === d.type ? null : d.type)}
                style={{ cursor: 'pointer' }}>
                {barChartData.map(d => (
                  <Cell key={d.type}
                    fill={activeBar === d.type ? '#ff9500' : '#0e8601'}
                    opacity={activeBar && activeBar !== d.type ? 0.25 : 1} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {activeBar && (
            <p className="text-xs text-center text-gray-400 mt-2">
              Showing: <span className="font-semibold text-[#021d49]">{activeBar}</span> ·{' '}
              <button onClick={() => setActiveBar(null)} className="underline hover:text-gray-600">Clear</button>
            </p>
          )}
          {!activeBar && <p className="text-[10px] text-center text-gray-300 mt-2">Click a bar to highlight</p>}
        </div>

        {/* Donut */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">Scope Breakdown</p>
          <p className="text-xs text-gray-400 mb-4">Africa-focused vs Global funders</p>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  dataKey="value" paddingAngle={4} stroke="none">
                  {pieData.map(d => <Cell key={d.name} fill={d.fill} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v} funders`, n]}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8}
                  formatter={v => <span style={{ fontSize: 12, color: '#374151' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around pt-3 border-t border-gray-100">
            {pieData.map(d => (
              <div key={d.name} className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: d.fill }}>{d.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funder list grouped by scope */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {['Africa', 'Global'].map(scope => {
          const sc = SCOPE_STYLE[scope];
          const group = funders.filter(f => f.Scope === scope);
          return (
            <div key={scope} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                  className="text-xs font-bold px-3 py-1 rounded-full">{scope}</span>
                <span className="text-xs text-gray-400">{group.length} funders</span>
              </div>
              <div className="space-y-2">
                {group.map((f, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#021d49] leading-snug truncate">{f.Funder}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{f.Country}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-[#0e8601] bg-[#0e8601]/8 border border-[#0e8601]/20 px-2 py-0.5 rounded-lg font-medium">
                        {f['Type of Funding'].split(',')[0].trim()}
                      </span>
                      {f.Link && (
                        <a href={f.Link} target="_blank" rel="noopener noreferrer"
                          className="text-gray-300 hover:text-[#0e8601] transition-colors">
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FundersMap() {
  const [view,        setView]        = useState('map');
  const [selected,    setSelected]    = useState(null);
  const [scopeFilter, setScopeFilter] = useState('');
  const [typeFilter,  setTypeFilter]  = useState('');

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);

  const locationMap = buildLocationMap(funders, scopeFilter, typeFilter);

  const handleSelect = useCallback((loc, fList) => {
    setSelected(prev => prev?.loc === loc ? null : { loc, funders: fList });
  }, []);

  const africaCount = funders.filter(f => f.Scope === 'Africa').length;
  const globalCount = funders.filter(f => f.Scope === 'Global').length;

  const scopeButtons = ['', 'Africa', 'Global'];
  const typeButtons  = ['Grants', 'Loans', 'Technical Assistance', 'Technical Support', 'Insurance', 'Investments', 'Equity'];

  return (
    <div className="space-y-4">

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Funders',  value: funders.length,  color: '#021d49' },
          { label: 'Africa-focused', value: africaCount,     color: '#0e8601' },
          { label: 'Global scope',   value: globalCount,     color: '#ff9500' },
          { label: 'Locations',      value: Object.keys(LOCATION_COORDS).length, color: '#3b82f6' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── View toggle ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { id: 'map',    label: 'Map',    Icon: Map        },
          { id: 'cards',  label: 'Cards',  Icon: LayoutGrid },
          { id: 'charts', label: 'Charts', Icon: BarChart2  },
        ].map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setView(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              view === id ? 'bg-white text-[#021d49] shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      {/* ── Filters (map + cards only) ────────────────────────────────────── */}
      {view !== 'charts' && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
            <Filter size={12} /> Filter:
          </span>
          <div className="flex gap-1.5">
            {scopeButtons.map(s => (
              <button key={s}
                onClick={() => { setScopeFilter(s); setSelected(null); }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  scopeFilter === s
                    ? 'bg-[#021d49] text-white border-[#021d49]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#021d49] hover:text-[#021d49]'
                }`}>
                {s || 'All scopes'}
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { setTypeFilter(''); setSelected(null); }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                !typeFilter ? 'bg-[#021d49] text-white border-[#021d49]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#021d49] hover:text-[#021d49]'
              }`}>
              All types
            </button>
            {typeButtons.map(t => (
              <button key={t}
                onClick={() => { setTypeFilter(prev => prev === t ? '' : t); setSelected(null); }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  typeFilter === t
                    ? 'bg-[#0e8601] text-white border-[#0e8601]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601]'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Cards view ────────────────────────────────────────────────────── */}
      {view === 'cards' && (
        <CardsView
          scopeFilter={scopeFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
        />
      )}

      {/* ── Charts view ───────────────────────────────────────────────────── */}
      {view === 'charts' && (<ChartsView />)}

      {/* ── Map + Panel ───────────────────────────────────────────────────── */}
      {view === 'map' && (
      <div className="flex gap-4" style={{ height: 'calc(100vh - 320px)', minHeight: 520 }}>

        {/* Map */}
        <div className="relative flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
             style={{ isolation: 'isolate' }}>
          <MapContainer center={[20, 10]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
            <ClusterMarkers
              locationMap={locationMap}
              selected={selected}
              onSelect={handleSelect}
            />
          </MapContainer>

          {/* Floating legend */}
          <div className="absolute bottom-4 right-4 z-[999] bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-3 py-2.5 pointer-events-none">
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Marker colour</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-3.5 h-3.5 rounded-full bg-[#0e8601] border-2 border-white shadow-sm" /> Africa scope
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-3.5 h-3.5 rounded-full bg-[#021d49] border-2 border-white shadow-sm" /> Global scope
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-3.5 h-3.5 rounded-full bg-[#ff9500] border-2 border-white shadow-sm" /> Mixed
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-3.5 h-3.5 rounded-[4px] bg-[#021d49] border-2 border-white shadow-sm" /> Cluster
              </div>
            </div>
          </div>

          {/* Hint */}
          {!selected && (
            <div className="absolute inset-x-0 top-4 flex justify-center z-[999] pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm rounded-full px-4 py-2 text-xs text-gray-500 font-medium">
                Click a marker to view funder details
              </div>
            </div>
          )}
        </div>

        {/* ── Side panel ─────────────────────────────────────────────────── */}
        {selected ? (
          <div className="w-[400px] flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex-shrink-0 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <MapPin size={14} className="text-[#ff9500]" />
                  <h2 className="text-base font-extrabold text-[#021d49] leading-tight">{selected.loc}</h2>
                </div>
                <p className="text-gray-400 text-xs">
                  {selected.funders.length} funder{selected.funders.length !== 1 ? 's' : ''} at this location
                </p>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0">
                <X size={14} />
              </button>
            </div>

            {/* Funder cards */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
              {selected.funders.map((f, i) => (
                <FunderCard key={i} funder={f} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="w-56 flex-shrink-0 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#ff9500]/10 flex items-center justify-center mb-3">
              <Banknote size={22} className="text-[#ff9500]" />
            </div>
            <p className="text-sm font-bold text-[#021d49] mb-1">Select a funder</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Click any marker to see funder details and links.
            </p>
          </div>
        )}
      </div>
      )}

      <style>{`
        .funder-tooltip {
          background:#021d49;color:white;border:none;border-radius:8px;
          padding:6px 10px;font-size:12px;box-shadow:0 4px 12px rgba(0,0,0,0.2);
        }
        .funder-tooltip::before { border-top-color:#021d49; }
      `}</style>
    </div>
  );
}
