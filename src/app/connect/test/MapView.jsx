'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import {
  ExternalLink, X, MapPin, Users, Globe, Building2,
  ChevronDown, ChevronUp, Banknote,
} from 'lucide-react';
import rawData from '../../../../data/climate_change_health_organizations.json';

// ─── Country coordinates ──────────────────────────────────────────────────────
const COUNTRY_COORDS = {
  Kenya:                           [ -0.0236,  37.9062],
  Uganda:                          [  1.3733,  32.2903],
  Ethiopia:                        [  9.1450,  40.4897],
  Tanzania:                        [ -6.3690,  34.8888],
  Rwanda:                          [ -1.9403,  29.8739],
  Burundi:                         [ -3.3731,  29.9189],
  Somalia:                         [  5.1521,  46.1996],
  Eritrea:                         [ 15.1794,  39.7823],
  Djibouti:                        [ 11.8251,  42.5903],
  'South Sudan':                   [  6.8770,  31.3070],
  Sudan:                           [ 12.8628,  30.2176],
  Nigeria:                         [  9.0820,   8.6753],
  Ghana:                           [  7.9465,  -1.0232],
  Senegal:                         [ 14.4974, -14.4524],
  Mali:                            [ 17.5707,  -3.9962],
  'Burkina Faso':                  [ 12.3641,  -1.5197],
  Niger:                           [ 17.6078,   8.0817],
  Guinea:                          [  9.9456, -11.2372],
  'Sierra Leone':                  [  8.4606, -11.7799],
  Liberia:                         [  6.4281,  -9.4295],
  "Côte d'Ivoire":                 [  7.5400,  -5.5471],
  'Ivory Coast':                   [  7.5400,  -5.5471],
  Togo:                            [  8.6195,   0.8248],
  Benin:                           [  9.3077,   2.3158],
  Gambia:                          [ 13.4432, -15.3101],
  Mauritania:                      [ 21.0079, -10.9408],
  Cameroon:                        [  3.8480,  11.5021],
  'Democratic Republic of Congo':  [ -4.0383,  21.7587],
  DRC:                             [ -4.0383,  21.7587],
  'Republic of Congo':             [ -0.2280,  15.8277],
  'Central African Republic':      [  6.6111,  20.9394],
  Chad:                            [ 15.4542,  18.7322],
  Gabon:                           [ -0.8037,  11.6094],
  'South Africa':                  [-30.5595,  22.9375],
  Mozambique:                      [-18.6657,  35.5296],
  Zambia:                          [-13.1339,  27.8493],
  Malawi:                          [-13.2543,  34.3015],
  Zimbabwe:                        [-19.0154,  29.1549],
  Angola:                          [-11.2027,  17.8739],
  Botswana:                        [-22.3285,  24.6849],
  Namibia:                         [-22.9576,  18.4904],
  Eswatini:                        [-26.5225,  31.4659],
  Lesotho:                         [-29.6100,  28.2336],
  Madagascar:                      [-18.7669,  46.8691],
  Egypt:                           [ 26.8206,  30.8025],
  Libya:                           [ 26.3351,  17.2283],
  Tunisia:                         [ 33.8869,   9.5375],
  Algeria:                         [ 28.0339,   1.6596],
  Morocco:                         [ 31.7917,  -7.0926],
  Lebanon:                         [ 33.8547,  35.8623],
  Jordan:                          [ 30.5852,  36.2384],
  Barbados:                        [ 13.1939, -59.5432],
  Bhutan:                          [ 27.5142,  90.4336],
  China:                           [ 35.8617, 104.1954],
  Fiji:                            [-17.7134, 178.0650],
  Uzbekistan:                      [ 41.3775,  64.5853],
  'Africa (General)':              [  5.0000,  20.0000],
  Global:                          [ 20.0000,   0.0000],
};

const SCOPE_COLORS = {
  Africa:            { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  National:          { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  Regional:          { bg: '#ffedd5', text: '#9a3412', border: '#fdba74' },
  Global:            { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  'Arabian Nations': { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseLocations(str) {
  if (!str) return [];
  const lower = str.toLowerCase().trim();
  if (lower.includes('all african') || lower === 'african countries') return ['Africa (General)'];
  if (lower === 'global') return ['Global'];
  return str
    .replace(/but works[^,]+(in)/gi, ',')
    .split(/,|\band\b/gi)
    .map(s => s.trim())
    .filter(s => s.length > 1);
}

function findCoordKey(name) {
  const n = name.trim().toLowerCase();
  for (const key of Object.keys(COUNTRY_COORDS)) {
    if (key.toLowerCase() === n) return key;
  }
  for (const key of Object.keys(COUNTRY_COORDS)) {
    const k = key.toLowerCase();
    if (n.includes(k) || k.includes(n)) return key;
  }
  return null;
}

function buildCountryMap(data) {
  const map = {};
  data.forEach(entry => {
    if (!entry.project_location) return;
    parseLocations(entry.project_location).forEach(loc => {
      const key = findCoordKey(loc);
      if (!key) return;
      if (!map[key]) map[key] = [];
      map[key].push(entry);
    });
  });
  return map;
}

// ─── Icon factories ───────────────────────────────────────────────────────────
function createClusterIcon(count) {
  const size = count >= 15 ? 54 : count >= 8 ? 48 : 42;
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:#021d49;
      border:3px solid white;
      border-radius:10px;
      display:flex;align-items:center;justify-content:center;
      color:white;font-weight:800;font-size:${size >= 48 ? 15 : 13}px;
      box-shadow:0 4px 16px rgba(2,29,73,0.4);
      cursor:pointer;
    ">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createMarkerIcon(count, isSelected) {
  const size = 38;
  const bg   = isSelected ? '#ff9500' : '#0e8601';
  const shadow = isSelected
    ? '0 0 0 3px rgba(255,149,0,0.3), 0 4px 18px rgba(255,149,0,0.5)'
    : '0 4px 14px rgba(14,134,1,0.4)';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${bg};
      border:3px solid white;
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      color:white;font-weight:700;font-size:13px;
      box-shadow:${shadow};
      cursor:pointer;
    ">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// ─── Cluster layer ────────────────────────────────────────────────────────────
function ClusterMarkers({ countryMap, selected, onSelect }) {
  const map        = useMap();
  const groupRef   = useRef(null);
  const markersRef = useRef({});
  const prevSelRef = useRef(null);

  const handleSelect = useCallback((country, projects) => {
    onSelect(country, projects);
  }, [onSelect]);

  useEffect(() => {
    if (!map) return;
    if (groupRef.current) {
      try { map.removeLayer(groupRef.current); } catch (_) {}
      groupRef.current = null;
      markersRef.current = {};
    }

    const group = L.markerClusterGroup({
      maxClusterRadius: 55,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      spiderfyDistanceMultiplier: 3,
      disableClusteringAtZoom: 6,
      iconCreateFunction: c => createClusterIcon(c.getChildCount()),
    });

    Object.entries(countryMap).forEach(([country, projects]) => {
      const coords = COUNTRY_COORDS[country];
      if (!coords) return;
      const marker = L.marker(coords, { icon: createMarkerIcon(projects.length, false) });
      marker.bindTooltip(`<b>${country}</b><br/>${projects.length} project${projects.length !== 1 ? 's' : ''}`, {
        direction: 'top', offset: [0, -20], className: 'leaflet-clean-tooltip',
      });
      marker.on('click', () => handleSelect(country, projects));
      group.addLayer(marker);
      markersRef.current[country] = { marker, projects };
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
  }, [map, countryMap, handleSelect]);

  // Swap icon on selection change — no full rebuild
  useEffect(() => {
    const prev = prevSelRef.current;
    const curr = selected?.country ?? null;
    if (prev && markersRef.current[prev]) {
      const { marker, projects } = markersRef.current[prev];
      marker.setIcon(createMarkerIcon(projects.length, false));
    }
    if (curr && markersRef.current[curr]) {
      const { marker, projects } = markersRef.current[curr];
      marker.setIcon(createMarkerIcon(projects.length, true));
    }
    prevSelRef.current = curr;
  }, [selected]);

  return null;
}

// ─── Scope badge ──────────────────────────────────────────────────────────────
function ScopeBadge({ scope }) {
  if (!scope) return null;
  const c = SCOPE_COLORS[scope] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
      {scope}
    </span>
  );
}

// ─── Project card (grid layout) ───────────────────────────────────────────────
function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const focusLong = project.project_focus?.length > 120;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Lead org + scope */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 min-w-0">
            <Building2 size={14} className="text-[#021d49] flex-shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-[#021d49] leading-snug">
              {project.lead_organization || <span className="italic text-gray-400 font-normal">Not listed</span>}
            </p>
          </div>
          <ScopeBadge scope={project.scope} />
        </div>

        {/* Project focus */}
        {project.project_focus && (
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#0e8601] mb-1 flex items-center gap-1">
              <Globe size={10} /> Project Focus
            </p>
            <p className={`text-xs text-gray-600 leading-relaxed ${!expanded && focusLong ? 'line-clamp-3' : ''}`}>
              {project.project_focus}
            </p>
            {focusLong && (
              <button onClick={() => setExpanded(v => !v)}
                className="mt-1 flex items-center gap-0.5 text-[11px] text-[#0e8601] font-semibold hover:text-[#0a6401]">
                {expanded ? <><ChevronUp size={11} />Less</> : <><ChevronDown size={11} />More</>}
              </button>
            )}
          </div>
        )}

        {/* Partners */}
        {project.organizations?.length > 0 && (
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5 flex items-center gap-1">
              <Users size={10} /> Partners
            </p>
            <div className="flex flex-wrap gap-1">
              {project.organizations.map((org, i) => (
                <span key={i} className="text-[10px] bg-gray-50 border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded-md leading-snug">
                  {org}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="mt-auto pt-2 border-t border-gray-100 space-y-1.5">
          {project.project_location && (
            <div className="flex items-start gap-1.5 text-[11px] text-gray-500">
              <MapPin size={11} className="text-[#ff9500] flex-shrink-0 mt-0.5" />
              <span>{project.project_location}</span>
            </div>
          )}
          {project.funder && (
            <div className="flex items-start gap-1.5 text-[11px] text-gray-500">
              <Banknote size={11} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <span><span className="font-semibold text-gray-600">Funder: </span>{project.funder}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#021d49] group-hover:bg-[#033070] text-white text-xs font-bold transition-colors">
            <ExternalLink size={12} /> View Project
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main MapView ─────────────────────────────────────────────────────────────
export default function MapView() {
  const [countryMap, setCountryMap] = useState({});
  const [selected,   setSelected]   = useState(null);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
    setCountryMap(buildCountryMap(rawData));
  }, []);

  const handleSelect = useCallback((country, projects) => {
    setSelected(prev => prev?.country === country ? null : { country, projects });
  }, []);

  const totalProjects  = rawData.length;
  const totalCountries = Object.keys(countryMap).length;

  return (
    <div>
      {/* ── Map row ──────────────────────────────────────────────────────── */}
      <div className="flex gap-4" style={{ height: 'calc(100vh - 240px)', minHeight: 580 }}>

        {/* Map — shrinks when panel opens */}
        <div className="relative flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300"
             style={{ isolation: 'isolate' }}>
          <MapContainer
            center={[5, 22]}
            zoom={4}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
            <ClusterMarkers
              countryMap={countryMap}
              selected={selected}
              onSelect={handleSelect}
            />
          </MapContainer>

          {/* Floating stats */}
          <div className="absolute bottom-4 left-4 z-[999] flex gap-2 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0e8601]" />
              <span className="text-xs font-bold text-[#021d49]">{totalProjects}</span>
              <span className="text-xs text-gray-500">Projects</span>
            </div>
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-3 py-2 flex items-center gap-2">
              <MapPin size={11} className="text-[#ff9500]" />
              <span className="text-xs font-bold text-[#021d49]">{totalCountries}</span>
              <span className="text-xs text-gray-500">Countries</span>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 z-[999] bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-3 py-2 pointer-events-none">
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Legend</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] text-gray-600">
                <div className="w-4 h-4 rounded-full bg-[#0e8601] border-2 border-white shadow-sm flex-shrink-0" />
                Country marker
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600">
                <div className="w-4 h-4 rounded-[4px] bg-[#021d49] border-2 border-white shadow-sm flex-shrink-0" />
                Grouped cluster
              </div>
            </div>
          </div>

          {/* Hint */}
          {!selected && (
            <div className="absolute inset-x-0 top-4 flex justify-center z-[999] pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm rounded-full px-4 py-2 text-xs text-gray-500 font-medium">
                Click a <span className="text-[#0e8601] font-bold">green marker</span> to see projects
              </div>
            </div>
          )}
        </div>

        {/* ── Side panel ─────────────────────────────────────────────────── */}
        {selected && (
          <div className="w-[520px] flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 flex-shrink-0 border-b border-gray-100 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <MapPin size={15} className="text-[#ff9500]" />
                    <h2 className="text-base font-extrabold text-[#021d49] tracking-tight">
                      {selected.country}
                    </h2>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {selected.projects.length} project{selected.projects.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Scrollable 2-col grid */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              <div className="grid grid-cols-2 gap-3">
                {selected.projects.map((project, i) => (
                  <ProjectCard key={i} project={project} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty state panel when nothing is selected */}
        {!selected && (
          <div className="w-56 flex-shrink-0 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#0e8601]/10 flex items-center justify-center mb-3">
              <MapPin size={22} className="text-[#0e8601]" />
            </div>
            <p className="text-sm font-bold text-[#021d49] mb-1">Pick a location</p>
            <p className="text-xs text-gray-400 leading-relaxed mb-5">
              Click any marker on the map to see its projects here.
            </p>
            <div className="w-full space-y-1.5">
              {Object.entries(SCOPE_COLORS).map(([scope, c]) => (
                <div key={scope} className="flex items-center gap-2 text-[11px] text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: c.bg, border: `1.5px solid ${c.border}` }} />
                  {scope}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-300 mt-3 uppercase tracking-widest font-bold">Scope legend</p>
          </div>
        )}
      </div>

      <style>{`
        .leaflet-clean-tooltip {
          background: #021d49;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .leaflet-clean-tooltip::before { border-top-color: #021d49; }
      `}</style>
    </div>
  );
}
