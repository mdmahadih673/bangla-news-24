import React from "react";
import MainNewsPage from "../MainNewsPage";
import MostReadPage from "./MostReadPage";
import NewsCardPage from "../NewsCardPage";
import SurprisePick from "./SurprisePick";

export interface NewsItem {
  id?: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  publishedAt?: string;
  articles?: NewsItem[];
  category?: string;
  imageAlt?: string;
}

const HomePage = async () => {
  const newsItems = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
  );
  const newsData = await newsItems.json();
  const newsList: NewsItem[] = newsData.data;
  const mainNewsList = newsList[0]?.articles ?? [];
  const otherNewsList = newsList.slice(1);

  const mostReadItems = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read",
  );
  const mostReadData = await mostReadItems.json();
  const mostReadList: NewsItem[] = mostReadData.data;

  return (
    <div className="container mx-auto mt-7 mb-16 px-4">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <p className="mb-1 text-xs font-bold tracking-[0.22em] text-[#b42318]">আজকের বাংলাদেশ · বিশ্বের খবর</p>
          <h1 className="text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">সর্বশেষ সংবাদ</h1>
        </div>
        <p className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-600 shadow-sm">সত্য · দ্রুত · নির্ভরযোগ্য</p>
      </div>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <MainNewsPage news={mainNewsList} />
        <div className="mt-8 space-y-8">
          {otherNewsList.map((section, index) => (
            <section
              key={section.id ?? `${section.title ?? "section"}-${index}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="h-7 w-1 rounded-full bg-[#b42318]" />
                <h2 className="text-xl font-black text-stone-900">{section.title}</h2>
                <span className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.articles?.map((newsItem) => (
                  <NewsCardPage
                    key={newsItem.id ?? newsItem.title}
                    news={newsItem}
                    returnTo="/"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <aside className="lg:col-span-1">
        <div className="space-y-5 lg:sticky lg:top-16">
          <MostReadPage news={mostReadList} />
          <SurprisePick />
        </div>
      </aside>
    </div>
    </div>
  );
};

export default HomePage;
