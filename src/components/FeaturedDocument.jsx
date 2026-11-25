import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { featuredDocument as doc } from '@/data/featured';

// Highlighted document panel — full-width on the home page, and at the top of
// the Publications page (`compact`, without the key figures).
export default function FeaturedDocument({ compact = false }) {
    const Heading = compact ? 'h2' : 'h3';
    return (
        <article className="overflow-hidden rounded-3xl shadow-xl grid md:grid-cols-[minmax(0,260px)_1fr] lg:grid-cols-[minmax(0,320px)_1fr]">
            <a
                href={doc.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${doc.title} (PDF)`}
                className="group flex items-center justify-center bg-[#dfeef3] px-8 py-8 md:py-10"
            >
                <Image
                    src={doc.cover}
                    alt={`Cover of ${doc.title}`}
                    width={doc.coverWidth}
                    height={doc.coverHeight}
                    sizes="(min-width: 768px) 260px, 180px"
                    className={`h-auto w-44 md:w-full shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 ${compact ? 'md:max-w-[180px]' : 'md:max-w-[250px]'}`}
                />
            </a>

            <div className={`flex flex-col justify-center bg-[#021d49] ${compact ? 'p-6 md:p-8' : 'p-6 md:p-10'}`}>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#ff9500] text-[#021d49] text-xs font-bold">New</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                        {doc.series} {doc.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                        <FileText className="w-3.5 h-3.5" /> Policy brief, {doc.pages} pages
                    </span>
                </div>

                <Heading className={`font-extrabold text-white leading-tight ${compact ? 'text-2xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}>
                    {doc.title}
                </Heading>
                <p className="mt-3 max-w-2xl text-white/80 leading-relaxed">{doc.summary}</p>

                {compact ? (
                    <ol className="mt-5 space-y-2 max-w-2xl">
                        {doc.priorities.map((p, i) => (
                            <li key={p.stat} className="flex gap-3 text-sm text-white/90 leading-snug">
                                <span className="font-bold text-[#ffb44d]">{i + 1}</span>
                                {p.title}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <ol className="mt-7 grid gap-5 sm:grid-cols-3">
                        {doc.priorities.map((p) => (
                            <li key={p.stat} className="border-t-2 border-[#55bdd0] pt-4">
                                <p className="text-3xl font-extrabold text-white">{p.stat}</p>
                                <p className="mt-1 text-xs text-white/70 leading-snug">{p.statLabel}</p>
                                <p className="mt-3 text-sm font-semibold text-white leading-snug">{p.title}</p>
                            </li>
                        ))}
                    </ol>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                        href={doc.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff9500] hover:bg-[#ffa92e] text-[#021d49] text-sm font-bold transition-colors"
                    >
                        Read the brief (PDF) <FileText className="w-4 h-4" />
                    </a>
                    <a
                        href={doc.pdf}
                        download
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
                    >
                        Download <Download className="w-4 h-4" />
                    </a>
                    <Link
                        href={doc.articleHref}
                        className="inline-flex items-center gap-2 px-2 py-3 text-white text-sm font-semibold underline-offset-4 hover:underline"
                    >
                        Read the article <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <p className="mt-6 max-w-2xl text-xs text-white/60 leading-relaxed">{doc.partners}</p>
            </div>
        </article>
    );
}
