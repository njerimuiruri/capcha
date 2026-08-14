'use client'
import React from 'react';
import { Calendar, User, FileText, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Shared card format for anything in the Learning Curve document list —
// blog posts and publications alike render through this so the feed
// looks like one consistent list rather than mixed card styles.
export default function DocumentCard({
    image,
    categoryLabel,
    categoryColorClass = 'bg-[#0e8601]',
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
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0e8601]/20 transition-all duration-200 overflow-hidden group">
            <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                <div className="relative sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#021d49] to-[#0e8601] flex items-center justify-center">
                            <FileText className="w-10 h-10 text-white/40" />
                        </div>
                    )}
                    {categoryLabel && (
                        <div className="absolute top-2 left-2">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm ${categoryColorClass}`}>
                                {categoryLabel}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2 flex-wrap">
                        {date && (
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />{date}
                            </span>
                        )}
                        {author && (
                            <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />{author}
                            </span>
                        )}
                        {readTime && <span>{readTime}</span>}
                    </div>

                    <h3
                        className={`text-base font-bold text-[#021d49] group-hover:text-[#0e8601] transition-colors mb-2 leading-snug ${onTitleClick ? 'cursor-pointer' : ''}`}
                        onClick={onTitleClick}
                    >
                        {title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-2">
                        {excerpt}
                    </p>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {tags.slice(0, 3).map(tag => (
                                onTagClick ? (
                                    <button
                                        key={tag}
                                        onClick={() => onTagClick(tag)}
                                        className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${activeTag === tag
                                            ? 'bg-[#0e8601] text-white border-[#0e8601]'
                                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601]'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ) : (
                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200 font-medium">
                                        {tag}
                                    </span>
                                )
                            ))}
                            {tags.length > 3 && (
                                <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 border border-gray-200">
                                    +{tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                        {primary && (
                            primary.disabled ? (
                                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-gray-400 text-sm font-semibold cursor-not-allowed">
                                    {primary.icon} {primary.label}
                                </span>
                            ) : primary.href ? (
                                <a
                                    href={primary.href}
                                    target={primary.external ? '_blank' : undefined}
                                    rel={primary.external ? 'noopener noreferrer' : undefined}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#021d49] hover:bg-[#0e8601] text-white text-sm font-semibold transition-colors"
                                >
                                    {primary.label}
                                    {primary.icon ?? <ChevronRight className="w-3.5 h-3.5" />}
                                </a>
                            ) : (
                                <button
                                    onClick={primary.onClick}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#021d49] hover:bg-[#0e8601] text-white text-sm font-semibold transition-colors"
                                >
                                    {primary.label}
                                    {primary.icon ?? <ChevronRight className="w-3.5 h-3.5" />}
                                </button>
                            )
                        )}
                        {secondary && (
                            <a
                                href={secondary.href}
                                target={secondary.external ? '_blank' : undefined}
                                rel={secondary.external ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 hover:border-[#0e8601] hover:text-[#0e8601] text-gray-600 text-sm font-semibold transition-colors"
                            >
                                {secondary.icon}
                                {secondary.label}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
