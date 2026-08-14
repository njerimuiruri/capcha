'use client'
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md disabled:opacity-40 transition-shadow"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`w-10 h-10 rounded-full font-semibold text-sm transition-colors shadow-sm hover:shadow-md ${
                        currentPage === i + 1
                            ? 'bg-[#021d49] text-white'
                            : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
                    }`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md disabled:opacity-40 transition-shadow"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
