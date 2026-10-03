import Link from 'next/link';
import { NewsItem } from './home-page/HomePage';
import Image from 'next/image';

const MainNewsPage = ({ news }: { news: NewsItem[] }) => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",

    });


    const [firstNewsItem, ...otherNewsItems] = news;

    if (!firstNewsItem) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <Link href={`/newsDetails/${encodeURIComponent(String(firstNewsItem.id))}?from=%2F`}>
                <div className="overflow-hidden  rounded-lg border cursor-pointer border-gray-200 bg-white shadow-slate-950/5 transition hover:shadow-lg sm:p-6">

                    {/* Image */}
                    {firstNewsItem.imageUrl && (
                        <div className="overflow-hidden">
                            <Image
                                src={firstNewsItem.imageUrl}
                                alt={firstNewsItem.imageAlt ?? firstNewsItem.title}
                                width={600}
                                height={350}
                                className="h-[300px] w-full object-cover transition duration-300 hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-4">

                        {/* Category */}
                        <p className="mb-2 text-xl font-medium text-red-600">
                            {firstNewsItem.category ?? "প্রধান খবর"}
                        </p>

                        {/* Title */}
                        <h2 className="text-xl font-bold leading-snug text-red-600 hover:text-red-700 md:text-2xl">
                            {firstNewsItem.title}
                        </h2>

                        {/* Description */}
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                            {firstNewsItem.description}
                        </p>

                        {/* Date */}
                        <p className="mt-3 text-xs text-gray-400">
                            {date}  | {firstNewsItem.publishedAt}
                        </p>

                    </div>
                </div>
            </Link>

            {/* Featured News */}


            {/* Other News */}
            <div className="overflow-hidden cursor-pointer rounded-lg border shadow-slate-950/5 transition hover:shadow-lg sm:p-6  border-gray-200 bg-white">

                {otherNewsItems.slice(0, 6).map((newsItem, index) => (
                    <Link
                        key={`${newsItem.id ?? newsItem.title}-${index}`}
                        href={`/newsDetails/${encodeURIComponent(String(newsItem.id))}?from=%2F`}
                    >
                        <div className="group border-b  border-gray-200 p-4 last:border-b-0 transition hover:bg-gray-50">

                            {/* Category */}
                            <p className="mb-1 text-xl font-medium text-red-600">
                                {newsItem.category ?? "খবর"}
                            </p>

                            {/* Title */}
                            <h3 className="text-base font-bold leading-6 text-gray-800 transition group-hover:text-red-600">
                                {newsItem.title}
                            </h3>

                        </div>
                    </Link>


                ))}

            </div>

        </div>
    );
};

export default MainNewsPage;