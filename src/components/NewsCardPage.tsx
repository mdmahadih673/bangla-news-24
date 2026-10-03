import React from "react";
import { NewsItem } from "./home-page/HomePage";
import Image from "next/image";

const NewsCardPage = ({ news }: { news: NewsItem }) => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-md">

            {/* Image */}
            {news.imageUrl && (
                <div className="overflow-hidden">
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt ?? news.title}
                        width={600}
                        height={400}
                        className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-3">

                {/* Category */}
                <p className="mb-2 text-sm font-medium text-red-600">
                    {news.category ?? "প্রধান খবর"}
                </p>

                {/* Title */}
                <h2 className="line-clamp-3 text-lg font-bold leading-7  transition hover:text-red-700">
                    {news.title}
                </h2>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-600">
                    {news.description}
                </p>

                {/* Date */}
                <p className="mt-3 text-[11px] text-gray-400">
                    {date} | {news.publishedAt}
                </p>

            </div>
        </div>
    );
};

export default NewsCardPage;