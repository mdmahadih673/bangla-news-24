import React from "react";
import { NewsItem } from "./HomePage";
import Link from "next/link";

const MostReadPage = ({ news }: { news: NewsItem[] }) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-slate-950/5 transition hover:shadow-lg sm:p-6">

            {/* Title */}
            <h1 className="mb-4 border-b border-gray-200 pb-3 text-xl font-bold text-gray-800">
                সর্বাধিক পঠিত
            </h1>

            {/* News List */}
            <ol className="space-y-5">
                {news
                    .filter((item) => item.id !== undefined && item.id !== null)
                    .slice(0, 10)
                    .map((item, index) => (
                        <li
                            key={`${item.id}-${index}`}
                            className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                        >
                            <Link
                                href={`/newsDetails/${encodeURIComponent(String(item.id))}?from=%2F`}
                                className="group flex gap-3"
                            >
                            {/* Number */}
                            <span className="min-w-6 text-xl font-bold text-red-500">
                                {index + 1}
                            </span>

                            {/* Title */}
                            <p className="text-base font-medium leading-7 text-gray-800 transition group-hover:text-red-600">
                                {item.title}
                            </p>
                            </Link>
                        </li>
                ))}
            </ol>

        </div>
    );
};

export default MostReadPage;