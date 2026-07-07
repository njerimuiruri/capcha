'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import { Map, Network, Banknote } from 'lucide-react';
import TechnicalSupport from './TechnicalSupport';

const Spinner = ({ h = '55vh' }) => (
  <div className="flex items-center justify-center bg-gray-100 rounded-2xl" style={{ height: h }}>
    <div className="text-center text-gray-400">
      <div className="w-10 h-10 border-4 border-[#0e8601] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-sm font-medium">Loading…</p>
    </div>
  </div>
);

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => <Spinner />,
});

const FundersMap = dynamic(() => import('./FundersMap'), {
  ssr: false,
  loading: () => <Spinner h="520px" />,
});

const TABS = [
  { id: 'map',       label: 'Organizations Map', icon: Map     },
  { id: 'technical', label: 'Technical Support', icon: Network },
  { id: 'funders',   label: 'Funders',           icon: Banknote },
];

export default function TestPage() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white" style={{ paddingTop: '126px' }}>

        {/* ── Tab bar ──────────────────────────────────────────────────── */}
        <div className="border-b border-gray-100 bg-white sticky top-[126px] z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors ${
                      active
                        ? 'border-[#0e8601] text-[#0e8601]'
                        : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                    }`}>
                    <Icon size={15} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Page heading ──────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 pt-7 pb-1">
          <h1 className="text-2xl font-extrabold text-[#021d49] tracking-tight">
            {activeTab === 'map'       && 'Climate & Health Organizations Map'}
            {activeTab === 'technical' && 'Technical Support & Networks'}
            {activeTab === 'funders'   && 'Climate & Health Funders'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeTab === 'map'       && 'Click any marker on the map to explore projects at that location.'}
          {activeTab === 'technical' && 'Organizations providing non-direct funding but serving as key technical support and network partners.'}
          {activeTab === 'funders'   && 'Explore 25 climate and health funders across Africa and globally. Click a marker to view funder details and links.'}
          </p>
        </div>

        {/* ── Content ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 pt-5 pb-20">
          {activeTab === 'map'       && <MapView />}
          {activeTab === 'technical' && <TechnicalSupport />}
          {activeTab === 'funders'   && <FundersMap />}
        </div>
      </main>
      <Footer />
    </>
  );
}
