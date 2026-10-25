import React from "react";
import MainNewsPage from "../MainNewsPage";
import MostReadPage from "./MostReadPage";
import NewsCardPage from "../NewsCardPage";

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
    <div className="container mx-auto mt-8 mb-12 grid grid-cols-1 gap-6 px-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <MainNewsPage news={mainNewsList} />
        <div className="mt-8 space-y-8">
          {otherNewsList.map((section, index) => (
            <section
              key={section.id ?? `${section.title ?? "section"}-${index}`}
            >
              <h2 className="mb-4 border-b-2 border-[#b42318] pb-2 text-xl font-black text-stone-900">
                {section.title}
              </h2>
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
        <div className="lg:sticky lg:top-16">
          <MostReadPage news={mostReadList} />
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
