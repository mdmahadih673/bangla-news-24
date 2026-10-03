import React from 'react';
import MainNewsPage from './MainNewsPage';
import MostReadPage from './MostReadPage';
import NewsCardPage from './NewsCardPage';

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
    const newsItems = await fetch("https://news-api-v2.vercel.app/api/news/sections");
    const newsData = await newsItems.json();
    const newsList: NewsItem[] = newsData.data;
    const mainNewsList = newsList[0]?.articles ?? [];
    const otherNewsList = newsList.slice(1);


    const mostReadItems = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const mostReadData = await mostReadItems.json();
    const mostReadList: NewsItem[] = mostReadData.data;

    return (
        <div className='container mx-auto mt-8 grid grid-cols-3 gap-4'>
            {/* {news section} */}

            <div className='col-span-2'>
                <MainNewsPage news={mainNewsList} />
                <div className="mt-4 space-y-4">
                    {otherNewsList.map((section, index) => (
                        <div key={section.id ?? `${section.title ?? "section"}-${index}`} className=" mb-4">
                            <h2 className="mb-2 border-b-3 w-full border-red-500  text-lg font-bold text-gray-800">{section.title}</h2>
                            <div className="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-3">

                                {
                                    section.articles?.map((newsItem) => <NewsCardPage key={newsItem.id ?? newsItem.title} news={newsItem} />)
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* {most popular section} */}

            <div className='col-span-1'>
                <MostReadPage news={mostReadList} />
            </div>

        </div>
    );
};

export default HomePage;

