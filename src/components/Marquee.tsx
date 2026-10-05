import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface NewsItem {
    id?: string | number;
    title: string;
    description?: string;
    image?: string;
    url?: string;
    publishedAt?: string;
}

const Marquee = async () => {
    const newsItems = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
    const newsData = await newsItems.json();
    const newsList: NewsItem[] = Array.isArray(newsData?.data) ? newsData.data : [];

    return (
        <div className=" bg-red-600 sticky top-0 text-white font-semibold">
            <div className="flex items-center container mx-auto">
                <Link href={'/'}>
                    <div className="py-2 px-5 font-extrabold bg-red-800 text-sm sm:text-base">
                        সর্বশেষ
                    </div>
                </Link>
                <div>
                    <MarqueeText direction="right" duration={80}>
                        {newsList.map((newsItem, index) => (
                            <Link
                                href={`/newsDetails/${encodeURIComponent(String(newsItem.id))}?from=%2F`}
                                key={`${newsItem.id ?? newsItem.title ?? "news"}-${index}`}
                            >
                                <span>
                                    <span className="mx-5">•</span>
                                    <span>{newsItem.title}</span>
                                </span>
                            </Link>
                        ))}
                    </MarqueeText>
                </div>
            </div>

        </div>
    );
};

export default Marquee;