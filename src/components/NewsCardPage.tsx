import React from "react";
import { NewsItem } from "./home-page/HomePage";
import Image from "next/image";
import Link from "next/link";

const NewsCardPage = ({
  news,
  returnTo,
}: {
  news: NewsItem;
  returnTo: string;
}) => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <Link
      href={`/newsDetails/${encodeURIComponent(String(news.id))}?from=${encodeURIComponent(returnTo)}`}
      className="group overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {news.imageUrl && (
        <div className="overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt ?? news.title}
            width={600}
            height={400}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-4">
        <p className="mb-2 text-xs font-bold tracking-wide text-[#b42318]">
          {news.category ?? "প্রধান খবর"}
        </p>
        <h2 className="line-clamp-3 text-lg font-bold leading-7 text-stone-900 transition group-hover:text-[#b42318]">
          {news.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
          {news.description}
        </p>
        <p className="mt-3 text-[11px] text-stone-400">
          {date}
          {news.publishedAt ? ` | ${news.publishedAt}` : ""}
        </p>
      </div>
    </Link>
  );
};

export default NewsCardPage;
