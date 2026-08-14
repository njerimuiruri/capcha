'use client'
import React, { useState } from 'react';
import { FileText, Calendar, Users, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { publicationCategoryMap } from '@/data/publications';

export default function PublicationCard({ pub }) {
    const [expanded, setExpanded] = useState(false);
    const cat = publicationCategoryMap[pub.category];
    const CatIcon = cat?.icon;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden flex flex-col">
            {pub.image ? (
                <div className="relative h-40 w-full flex-shrink-0">
                    <Image src={pub.image} alt={pub.title} fill className="object-cover" />
                    <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold shadow-sm ${cat?.color ?? 'bg-gray-400'}`}>
                            {CatIcon && <CatIcon className="w-4 h-4" />}
                            {cat?.label ?? pub.category}
                        </span>
                    </div>
                </div>
            ) : (
                /* Coloured top bar */
                <div className={`h-1 w-full ${cat?.color ?? 'bg-gray-300'}`} />
            )}

            <div className="p-5 flex flex-col flex-1">
                {/* Category + year */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    {!pub.image && (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold ${cat?.color ?? 'bg-gray-400'}`}>
                            {CatIcon && <CatIcon className="w-4 h-4" />}
                            {cat?.label ?? pub.category}
                        </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {pub.year}
                    </span>
                    <span className="text-xs text-gray-400">{pub.volume}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#021d49] text-base leading-snug mb-2">{pub.title}</h3>

                {/* Journal */}
                <p className="text-xs text-[#0e8601] font-semibold mb-2 italic">{pub.journal}</p>

                {/* Authors */}
                <p className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 flex-shrink-0" />
                    {pub.authors.join(', ')}
                </p>

                {/* Abstract (expandable) */}
                <div className={`text-sm text-gray-500 leading-relaxed mb-3 ${!expanded ? 'line-clamp-2' : ''}`}>
                    {pub.abstract}
                </div>
                {pub.abstract.length > 120 && (
                    <button onClick={() => setExpanded(v => !v)} className="text-xs text-[#0e8601] hover:underline mb-3 self-start">
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}

                {/* Tags */}
                {pub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {pub.tags.map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{t}</span>
                        ))}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 pt-3 mt-auto border-t border-gray-50">
                    {pub.pdfUrl ? (
                        <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#021d49] hover:bg-[#033080] text-white text-xs font-semibold transition-colors">
                            <FileText className="w-3.5 h-3.5" /> Download PDF
                        </a>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed">
                            <FileText className="w-3.5 h-3.5" /> PDF coming soon
                        </span>
                    )}
                    {pub.doiUrl && (
                        <a href={pub.doiUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0e8601] text-[#0e8601] hover:bg-[#0e8601]/5 text-xs font-semibold transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" /> View DOI
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
