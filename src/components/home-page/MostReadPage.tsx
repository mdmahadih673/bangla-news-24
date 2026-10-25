import React from "react";
import { NewsItem } from "./HomePage";
import Link from "next/link";

const MostReadPage = ({ news }: { news: NewsItem[] }) => {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 border-b border-stone-200 pb-3 text-xl font-black text-stone-900">
        সর্বাধিক পঠিত
      </h2>
      <ol className="space-y-4">
        {news
          .filter((item) => item.id !== undefined && item.id !== null)
          .slice(0, 10)
          .map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className="border-b border-stone-100 pb-4 last:border-0 last:pb-0"
            >
              <Link
                href={`/newsDetails/${encodeURIComponent(String(item.id))}?from=%2F`}
                className="group flex gap-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#b42318] text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="text-base font-medium leading-7 text-stone-800 transition group-hover:text-[#b42318]">
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
