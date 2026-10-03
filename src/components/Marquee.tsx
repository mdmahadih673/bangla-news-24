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
        <div className=" bg-red-600 py-2 text-white font-semibold">
            <div className="flex items-center container mx-auto">

                <div className="py-2 px-5 font-extrabold bg-red-800 text-sm sm:text-base">
                    সর্বশেষ
                </div>

                <MarqueeText direction="right" duration={10}>
                    {newsList.map((newsItem, index) => (
                        <span key={newsItem.id ?? `${newsItem.title ?? "news"}-${index}`}>
                            <span className="mx-5">•</span>
                            <span>
                                {newsItem.title}
                            </span>
                        </span>
                    ))}
                </MarqueeText>
            </div>

        </div>
    );
};

export default Marquee;