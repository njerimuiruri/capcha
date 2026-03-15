'use client';

import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

/* World-atlas TopoJSON — free, no token required */
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

/* ── ISO numeric → display/lookup names ──────────────────────── */
const AFRICA_NUMERIC = {
  12:  { name: 'Algeria',                  hnap: 'Algeria',                  ndc: 'Algeria' },
  24:  { name: 'Angola',                   hnap: 'Angola',                   ndc: 'Angola' },
  204: { name: 'Benin',                    hnap: 'Benin',                    ndc: 'Benin' },
  72:  { name: 'Botswana',                 hnap: 'Botswana',                 ndc: 'Botswana' },
  854: { name: 'Burkina Faso',             hnap: 'Burkina Faso',             ndc: 'Burkina Faso' },
  108: { name: 'Burundi',                  hnap: 'Burundi',                  ndc: 'Burundi' },
  132: { name: 'Cabo Verde',               hnap: 'Cape Verde',               ndc: 'Cabo Verde' },
  120: { name: 'Cameroon',                 hnap: 'Cameroon',                 ndc: 'Cameroon' },
  140: { name: 'Central African Republic', hnap: 'Central African Republic', ndc: 'Central African Republic' },
  148: { name: 'Chad',                     hnap: 'Chad',                     ndc: 'Chad' },
  174: { name: 'Comoros',                  hnap: 'Comoros',                  ndc: 'Comoros' },
  178: { name: 'Congo',                    hnap: 'Congo',                    ndc: 'Congo' },
  180: { name: 'DR Congo',                 hnap: 'DRC',                      ndc: 'Democratic Republic of Congo' },
  384: { name: "Côte d'Ivoire",            hnap: "Cote d'Ivoire",            ndc: "Côte d'Ivoire" },
  262: { name: 'Djibouti',                 hnap: 'Djibouti',                 ndc: 'Djibouti' },
  818: { name: 'Egypt',                    hnap: 'Egypt',                    ndc: 'Egypt' },
  226: { name: 'Equatorial Guinea',        hnap: 'Equatorial Guinea',        ndc: 'Equatorial Guinea' },
  232: { name: 'Eritrea',                  hnap: 'Eritrea',                  ndc: 'Eritrea' },
  748: { name: 'Eswatini',                 hnap: 'Estawini',                 ndc: 'Eswatini' },
  231: { name: 'Ethiopia',                 hnap: 'Ethiopia',                 ndc: 'Ethiopia' },
  266: { name: 'Gabon',                    hnap: 'Gabon',                    ndc: 'Gabon' },
  270: { name: 'Gambia',                   hnap: 'Gambia',                   ndc: 'Gambia' },
  288: { name: 'Ghana',                    hnap: 'Ghana',                    ndc: 'Ghana' },
  324: { name: 'Guinea',                   hnap: 'Guinea',                   ndc: 'Guinea' },
  624: { name: 'Guinea-Bissau',            hnap: 'Guinea Bissau',            ndc: 'Guinea-Bissau' },
  404: { name: 'Kenya',                    hnap: 'Kenya',                    ndc: 'Kenya' },
  426: { name: 'Lesotho',                  hnap: 'Lesotho',                  ndc: 'Lesotho' },
  430: { name: 'Liberia',                  hnap: 'Liberia',                  ndc: 'Liberia' },
  434: { name: 'Libya',                    hnap: null,                       ndc: 'Libya' },
  450: { name: 'Madagascar',               hnap: 'Madagascar',               ndc: 'Madagascar' },
  454: { name: 'Malawi',                   hnap: 'Malawi',                   ndc: 'Malawi' },
  466: { name: 'Mali',                     hnap: 'Mali',                     ndc: 'Mali' },
  478: { name: 'Mauritania',               hnap: 'Mauritania',               ndc: 'Mauritania' },
  480: { name: 'Mauritius',                hnap: 'Mauritius',                ndc: 'Mauritius' },
  504: { name: 'Morocco',                  hnap: 'Morocco',                  ndc: 'Morocco' },
  508: { name: 'Mozambique',               hnap: 'Mozambique',               ndc: 'Mozambique' },
  516: { name: 'Namibia',                  hnap: 'Namibia',                  ndc: 'Namibia' },
  562: { name: 'Niger',                    hnap: 'Niger',                    ndc: 'Niger' },
  566: { name: 'Nigeria',                  hnap: 'Nigeria',                  ndc: 'Nigeria' },
  646: { name: 'Rwanda',                   hnap: 'Rwanda',                   ndc: 'Rwanda' },
  678: { name: 'São Tomé & Príncipe',      hnap: 'Sao Tome and Principe',    ndc: 'São Tomé and Príncipe' },
  686: { name: 'Senegal',                  hnap: 'Senegal',                  ndc: 'Senegal' },
  690: { name: 'Seychelles',               hnap: 'Seychelles',               ndc: 'Seychelles' },
  694: { name: 'Sierra Leone',             hnap: 'Sierra Leone',             ndc: 'Sierra Leone' },
  706: { name: 'Somalia',                  hnap: 'Somalia',                  ndc: 'Somalia' },
  710: { name: 'South Africa',             hnap: 'South Africa',             ndc: 'South Africa' },
  728: { name: 'South Sudan',              hnap: 'South Sudan',              ndc: 'South Sudan' },
  729: { name: 'Sudan',                    hnap: 'Sudan',                    ndc: 'Sudan' },
  834: { name: 'Tanzania',                 hnap: 'Tanzania',                 ndc: 'Tanzania' },
  768: { name: 'Togo',                     hnap: 'Togo',                     ndc: 'Togo' },
  788: { name: 'Tunisia',                  hnap: 'Tunisia',                  ndc: 'Tunisia' },
  800: { name: 'Uganda',                   hnap: 'Uganda',                   ndc: 'Uganda' },
  894: { name: 'Zambia',                   hnap: 'Zambia',                   ndc: 'Zambia' },
  716: { name: 'Zimbabwe',                 hnap: 'Zimbabwe',                 ndc: 'Zimbabwe' },
};

const AFRICA_IDS = new Set(Object.keys(AFRICA_NUMERIC).map(Number));

const HNAP_STATUS_STYLES = {
  'Implemented':        { fill: '#0e8601', badge: 'bg-green-100 text-green-700' },
  'Under Consideration':{ fill: '#f59e0b', badge: 'bg-amber-100 text-amber-700' },
  'Not Yet Decided':    { fill: '#ef4444', badge: 'bg-red-100 text-red-700' },
};

export default function AfricaMap({ hnapsData, ndcData, mapMode }) {
  const [tooltip, setTooltip] = useState(null);

  /* Build fast lookup maps */
  const hnapByName = useMemo(() => {
    const m = {};
    hnapsData.countries.forEach(c => { m[c.country] = c; });
    return m;
  }, [hnapsData]);

  const ndcByName = useMemo(() => {
    const m = {};
    ndcData.countries.forEach(c => { m[c.Country] = c; });
    return m;
  }, [ndcData]);

  function getFill(isoNum) {
    const info = AFRICA_NUMERIC[isoNum];
    if (!info) return '#e2e8f0';

    if (mapMode === 'hnap') {
      const entry = info.hnap ? hnapByName[info.hnap] : null;
      return entry ? (HNAP_STATUS_STYLES[entry.hnap_status]?.fill ?? '#94a3b8') : '#cbd5e1';
    } else {
      const entry = info.ndc ? ndcByName[info.ndc] : null;
      if (!entry) return '#cbd5e1';
      return entry.NDC_3_0_Submitted_by_Feb_10_2025 ? '#0e8601' : '#94a3b8';
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md border border-gray-200">
      {/* Ocean background */}
      <div className="w-full bg-[#dbeafe]" style={{ minHeight: 480 }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 380, center: [20, 2] }}
          style={{ width: '100%', height: 500 }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter(geo => AFRICA_IDS.has(Number(geo.id)))
                .map(geo => {
                  const isoNum = Number(geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFill(isoNum)}
                      stroke="#ffffff"
                      strokeWidth={0.6}
                      onMouseEnter={(evt) => {
                        const info = AFRICA_NUMERIC[isoNum];
                        const hnapEntry = info?.hnap ? hnapByName[info.hnap] : null;
                        const ndcEntry  = info?.ndc  ? ndcByName[info.ndc]  : null;
                        setTooltip({ info, hnapEntry, ndcEntry, x: evt.clientX, y: evt.clientY });
                      }}
                      onMouseMove={(evt) =>
                        setTooltip(t => t ? { ...t, x: evt.clientX, y: evt.clientY } : t)
                      }
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: { outline: 'none', cursor: 'pointer' },
                        hover:   { outline: 'none', filter: 'brightness(0.82)', cursor: 'pointer' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Floating tooltip (fixed so it follows mouse across scroll) */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x + 14,
            top:  tooltip.y - 110,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[210px] max-w-[280px] text-sm"
        >
          <p className="font-bold text-[#021d49] text-[15px] mb-3 border-b border-gray-100 pb-2">
            {tooltip.info?.name}
          </p>

          {/* HNAP */}
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">HNAP Status</p>
            {tooltip.hnapEntry ? (
              <>
                <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${HNAP_STATUS_STYLES[tooltip.hnapEntry.hnap_status]?.badge ?? 'bg-gray-100 text-gray-600'}`}>
                  {tooltip.hnapEntry.hnap_status}
                </span>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-snug line-clamp-3">
                  {tooltip.hnapEntry.integration_details}
                </p>
              </>
            ) : (
              <span className="text-xs text-gray-400">No HNAP data available</span>
            )}
          </div>

          {/* NDC 3.0 */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">NDC 3.0 (by Feb 2025)</p>
            {tooltip.ndcEntry ? (
              tooltip.ndcEntry.NDC_3_0_Submitted_by_Feb_10_2025 ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> Submitted
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Not Yet Submitted
                </span>
              )
            ) : (
              <span className="text-xs text-gray-400">No NDC data</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
