'use client';
import { useState, useEffect } from 'react';
import { X, Sparkles, Link2, BookOpen, ArrowRight, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

const CALLS = [
  {
    Icon: Sparkles,
    tag: 'Deadline Passed',
    title: 'Spotlight Series',
    sub: 'Call for Presenters & Moderators',
    href: null,
    btnLabel: 'Closed',
    gradient: 'from-[#ff9500] to-[#c97000]',
    btnBg: 'bg-gray-400 cursor-not-allowed',
    border: 'border-[#ff9500]/30',
    text: 'text-gray-400',
    dot: 'bg-gray-400',
    disabled: true,
  },
  {
    Icon: Link2,
    tag: 'Registration Open',
    title: 'CAPCHA Connect',
    sub: 'Pan-African Community Platform',
    href: 'https://ee.kobotoolbox.org/single/81f9beab8ea9a72662b5c429f732f7f3',
    btnLabel: 'Register Now',
    gradient: 'from-[#021d49] to-[#03337a]',
    btnBg: 'bg-[#021d49] hover:bg-[#03337a]',
    border: 'border-[#021d49]/25',
    text: 'text-[#021d49]',
    dot: 'bg-[#021d49]',
  },
  {
    Icon: BookOpen,
    tag: 'Deadline Extended — 25 Apr',
    title: 'Learning Curve',
    sub: 'Structured Learning Programme',
    href: 'https://ee.kobotoolbox.org/single/5b3703edf1a128aa20c66dff2fadd84f',
    btnLabel: 'Enrol Now',
    gradient: 'from-[#0e8601] to-[#0a6e01]',
    btnBg: 'bg-[#0e8601] hover:bg-[#0a6e01]',
    border: 'border-[#0e8601]/25',
    text: 'text-[#0e8601]',
    dot: 'bg-[#0e8601]',
  },
];

export default function OpenCallsWidget() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  /* Show popup once per session */
  useEffect(() => {
    const seen = sessionStorage.getItem('capcha_calls_seen');
    if (!seen) {
      const t = setTimeout(() => {
        setPopupOpen(true);
        sessionStorage.setItem('capcha_calls_seen', '1');
      }, 800);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════
          FULL-SCREEN POPUP  (first visit, 0.8s delay)
      ════════════════════════════════════════════════ */}
      {popupOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setPopupOpen(false)}
          />

          {/* Modal card */}
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            {/* Rainbow top bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#ff9500] via-[#021d49] to-[#0e8601]" />

            {/* Close button */}
            <button
              onClick={() => setPopupOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div className="p-8 pt-7">
              {/* Header */}
              <div className="text-center mb-7">
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  2 Applications Currently Open
                </div>
                <h2 className="text-2xl font-extrabold text-[#021d49] leading-tight">
                  Don&apos;t Miss These<br />CAPCHA Open Calls!
                </h2>
                <p className="text-gray-400 text-sm mt-2">Apply, register, or enrol — directly below.</p>
              </div>

              {/* Call cards */}
              <div className="space-y-3 mb-7">
                {CALLS.map(({ tag, title, sub, href, btnLabel, border, text, dot, btnBg, disabled }) => (
                  <div
                    key={title}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${border} ${!disabled ? 'hover:shadow-md' : 'opacity-70'} transition-all duration-200`}
                  >
                    {/* Left */}
                    <div className="flex-1 min-w-0">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${text} mb-0.5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dot} ${!disabled ? 'animate-pulse' : ''}`} />
                        {tag}
                      </span>
                      <p className="font-extrabold text-[#021d49] text-sm leading-tight">{title}</p>
                      <p className="text-gray-400 text-xs">{sub}</p>
                    </div>
                    {/* CTA */}
                    {disabled ? (
                      <span className={`flex-shrink-0 inline-flex items-center gap-1.5 text-white font-bold text-xs px-4 py-2.5 rounded-xl ${btnBg}`}>
                        {btnLabel}
                      </span>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-shrink-0 inline-flex items-center gap-1.5 text-white font-bold text-xs px-4 py-2.5 rounded-xl ${btnBg} transition-colors`}
                      >
                        {btnLabel} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setPopupOpen(false)}
                className="w-full text-gray-400 hover:text-gray-600 text-xs font-medium transition-colors py-1"
              >
                Close — I&apos;ll come back later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════
          FLOATING ACTION BUTTON  (always visible)
      ════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-[99998] flex flex-col items-end gap-2">

        {/* Expanded panel */}
        {fabOpen && (
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden"
            style={{ animation: 'slideUp 0.25s ease-out both' }}
          >
            {/* Panel header */}
            <div className="bg-gradient-to-r from-[#021d49] to-[#0e4a8c] px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9500] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9500]" />
                </span>
                <span className="text-white font-bold text-xs uppercase tracking-wider">Applications Open</span>
              </div>
              <button onClick={() => setFabOpen(false)}>
                <X className="w-4 h-4 text-white/70 hover:text-white" />
              </button>
            </div>

            {/* Links */}
            <div className="p-3 space-y-2">
              {CALLS.map(({ title, sub, href, btnLabel, btnBg, dot, disabled }) => (
                disabled ? (
                  <div
                    key={title}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl opacity-60 cursor-not-allowed"
                  >
                    <span className={`w-2 h-2 rounded-full ${dot} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#021d49] font-bold text-xs leading-tight">{title}</p>
                      <p className="text-gray-400 text-[11px] truncate">{sub}</p>
                    </div>
                    <span className={`text-white text-[10px] font-bold px-2.5 py-1 rounded-lg ${btnBg} flex-shrink-0`}>
                      {btnLabel}
                    </span>
                  </div>
                ) : (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className={`w-2 h-2 rounded-full ${dot} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#021d49] font-bold text-xs leading-tight">{title}</p>
                      <p className="text-gray-400 text-[11px] truncate">{sub}</p>
                    </div>
                    <span className={`text-white text-[10px] font-bold px-2.5 py-1 rounded-lg ${btnBg} flex-shrink-0 transition-colors`}>
                      {btnLabel}
                    </span>
                  </a>
                )
              ))}
            </div>

            <div className="px-4 pb-3">
              <a
                href="https://capcha.org"
                onClick={() => setFabOpen(false)}
                className="block text-center text-gray-400 hover:text-gray-600 text-[11px] font-medium transition-colors py-1"
              >
                <ExternalLink className="w-3 h-3 inline mr-1" />
                View all CAPCHA programmes
              </a>
            </div>
          </div>
        )}

        {/* FAB button */}
        <button
          onClick={() => setFabOpen((v) => !v)}
          className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#ff9500] to-[#e6850e] hover:from-[#e6850e] hover:to-[#cc7400] text-white font-bold px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {/* Outer pulse ring */}
          <span className="absolute -inset-1 rounded-2xl bg-[#ff9500]/40 animate-ping" />
          <span className="relative flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span className="text-sm">Apply Now — 2 Calls Open</span>
            {fabOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
}
