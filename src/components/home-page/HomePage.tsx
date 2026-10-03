import React from 'react';
import MainNewsPage from './MainNewsPage';
import MostReadPage from './MostReadPage';

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

    const mostReadItems = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const mostReadData = await mostReadItems.json();
    const mostReadList: NewsItem[] = mostReadData.data;

    return (
        <div className='container mx-auto mt-8 grid grid-cols-3 gap-4'>
            {/* {news section} */}

            <div className='col-span-2'>
                <MainNewsPage news={mainNewsList} />
            </div>

            {/* {most popular section} */}

            <div className='col-span-1'>
                <MostReadPage news={mostReadList} />
            </div>
        </div>
    );
};

export default HomePage;