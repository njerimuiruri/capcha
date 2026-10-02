'use client'
import React from 'react';
import { Search, X, Tag, ArrowDownUp } from 'lucide-react';

export const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'title',  label: 'Title A–Z' },
];

// Sticky search / type / topic / sort bar shared by the Learning Curve and
// Publications grids. Sits directly under the fixed navbar (~125px tall).
export default function DocumentFilterBar({
    searchTerm, onSearchChange, searchPlaceholder = 'Search...',
    types, activeType, onTypeChange,
    tags, activeTag, onTagChange,
    sort, onSortChange,
}) {
    const selectClass = 'appearance-none pl-8 pr-8 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30 cursor-pointer';
    const chevron = (
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className="sticky top-[125px] z-20 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
                <div className="flex flex-col md:flex-row gap-2.5">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={e => onSearchChange(e.target.value)}
                            className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0e8601]/30"
                        />
                        {searchTerm && (
                            <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Clear search">
                                <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2.5">
                        {tags && (
                            <div className="relative flex-1 md:flex-none md:w-52">
                                <Tag className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <select value={activeTag} onChange={e => onTagChange(e.target.value)} className={`${selectClass} w-full`} aria-label="Filter by topic">
                                    <option value="">All topics</option>
                                    {tags.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {chevron}
                            </div>
                        )}
                        <div className="relative flex-1 md:flex-none md:w-44">
                            <ArrowDownUp className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <select value={sort} onChange={e => onSortChange(e.target.value)} className={`${selectClass} w-full`} aria-label="Sort">
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                            {chevron}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-1 px-1 [scrollbar-width:none]">
                    {types.map(t => {
                        const Icon = t.icon;
                        const active = activeType === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => onTypeChange(t.id)}
                                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${active
                                    ? `${t.color ?? 'bg-[#021d49]'} text-white shadow-sm`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {Icon && <Icon className="w-3.5 h-3.5" />}
                                {t.label}
                                <span className={`px-1.5 rounded-full text-[10px] font-bold ${active ? 'bg-white/25 text-white' : 'bg-white text-gray-500'}`}>
                                    {t.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// `items` must already be ordered newest first.
export function sortItems(items, sort, getTitle) {
    if (sort === 'oldest') return [...items].reverse();
    if (sort === 'title') return [...items].sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
    return items;
}
