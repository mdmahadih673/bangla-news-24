import React from "react";
import { NewsItem } from "./HomePage";

const MostReadPage = ({ news }: { news: NewsItem[] }) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-slate-950/5 transition hover:shadow-lg sm:p-6">

            {/* Title */}
            <h1 className="mb-4 border-b border-gray-200 pb-3 text-xl font-bold text-gray-800">
                সর্বাধিক পঠিত
            </h1>

            {/* News List */}
            <ul className="space-y-6">
                {news.slice(0, 10).map((item, index) => (
                    <li
                        key={`${item.title}-${index}`}
                        className="group flex gap-3"
                    >
                        {/* Number */}
                        <span className="min-w-[24px] text-xl font-normal text-red-500">
                            {index + 1}
                        </span>

                        {/* Title */}
                        <p className="cursor-pointer text-xl leading-6 text-gray-800 transition group-hover:text-red-600">
                            {item.title}
                        </p>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default MostReadPage;