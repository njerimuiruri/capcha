'use client'
import React from 'react';
import { Calendar, User, Clock, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { publicationCategoryMap, publicationDisplayDate } from '@/data/publications';

// Shared grid card for the Learning Curve and Publications pages — blog posts
// and publications alike render through this so both grids look the same.
export default function DocumentCard({
    image,
    categoryLabel,
    categoryColorClass = 'bg-[#0e8601]',
    isNew = false,
    date,
    author,
    readTime,
    title,
    onTitleClick,
    excerpt,
    tags = [],
    activeTag,
    onTagClick,
    primary,
    secondary,
}) {
    return (
        <article className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#0e8601]/20 transition-all duration-300 overflow-hidden flex flex-col">
            {/* Cover */}
            <div
                className={`relative h-48 flex-shrink-0 overflow-hidden ${onTitleClick ? 'cursor-pointer' : ''}`}
                onClick={onTitleClick}
            >
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#021d49] via-[#033080] to-[#0e8601] flex items-center justify-center">
                        <FileText className="w-12 h-12 text-white/30" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    {categoryLabel && (
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm ${categoryColorClass}`}>
                            {categoryLabel}
                        </span>
                    )}
                    {isNew && (
                        <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ff9500] text-white shadow-sm">
                            <Sparkles className="w-3 h-3" /> New
                        </span>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5 flex-wrap">
                    {date && (
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />{date}
                        </span>
                    )}
                    {readTime && (
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />{readTime}
                        </span>
                    )}
                </div>

                <h3
                    className={`text-[15px] font-bold text-[#021d49] group-hover:text-[#0e8601] transition-colors leading-snug mb-2 line-clamp-3 ${onTitleClick ? 'cursor-pointer' : ''}`}
                    onClick={onTitleClick}
                    title={title}
                >
                    {title}
                </h3>

                {author && (
                    <p className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                        <User className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{author}</span>
                    </p>
                )}

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                    {excerpt}
                </p>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.slice(0, 3).map(tag => (
                            onTagClick ? (
                                <button
                                    key={tag}
                                    onClick={() => onTagClick(tag)}
                                    className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium transition-colors ${activeTag === tag
                                        ? 'bg-[#0e8601] text-white border-[#0e8601]'
                                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601]'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ) : (
                                <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200 font-medium">
                                    {tag}
                                </span>
                            )
                        ))}
                        {tags.length > 3 && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full text-gray-400">+{tags.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-gray-100">
                    {primary && <CardAction action={primary} variant="primary" />}
                    {secondary && <CardAction action={secondary} variant="secondary" />}
                </div>
            </div>
        </article>
    );
}

function CardAction({ action, variant }) {
    const base = 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors';
    if (action.disabled) {
        return (
            <span className={`${base} bg-gray-100 text-gray-400 cursor-not-allowed`}>
                {action.icon} {action.label}
            </span>
        );
    }
    const style = variant === 'primary'
        ? 'bg-[#021d49] hover:bg-[#0e8601] text-white'
        : 'border border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601] text-gray-600';
    const content = (
        <>
            {variant === 'secondary' && action.icon}
            {action.label}
            {variant === 'primary' && (action.icon ?? <ArrowUpRight className="w-3.5 h-3.5" />)}
        </>
    );
    return action.href ? (
        <a
            href={action.href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
            className={`${base} ${style}`}
        >
            {content}
        </a>
    ) : (
        <button onClick={action.onClick} className={`${base} ${style}`}>{content}</button>
    );
}

// A publication rendered as a DocumentCard.
export function PublicationDocumentCard({ pub, ...rest }) {
    const cat = publicationCategoryMap[pub.category];
    return (
        <DocumentCard
            image={pub.image}
            categoryLabel={cat?.label}
            categoryColorClass={cat?.color}
            date={publicationDisplayDate(pub)}
            author={pub.authors.join(', ')}
            title={pub.title}
            onTitleClick={pub.pdfUrl ? () => window.open(pub.pdfUrl, '_blank', 'noopener,noreferrer') : undefined}
            excerpt={pub.abstract}
            tags={pub.tags}
            primary={pub.pdfUrl
                ? { label: 'Read PDF', href: pub.pdfUrl, external: true, icon: <FileText className="w-3.5 h-3.5" /> }
                : { label: 'PDF coming soon', disabled: true, icon: <FileText className="w-3.5 h-3.5" /> }}
            secondary={pub.doiUrl ? { label: 'DOI', href: pub.doiUrl, external: true, icon: <ArrowUpRight className="w-3.5 h-3.5" /> } : null}
            {...rest}
        />
    );
}
