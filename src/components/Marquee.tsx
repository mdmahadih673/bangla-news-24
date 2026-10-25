import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface NewsItem {
  id?: string | number;
  title: string;
}

const Marquee = async () => {
  const newsItems = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10",
  );
  const newsData = await newsItems.json();
  const newsList: NewsItem[] = Array.isArray(newsData?.data)
    ? newsData.data
    : [];

  return (
    <div className="border-b border-red-900/20 bg-[#b42318] text-white">
      <div className="container mx-auto flex items-center">
        <div className="flex shrink-0 items-center gap-2 bg-[#8f1d13] px-4 py-2 text-sm font-black tracking-wide">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-white" />
          সর্বশেষ
        </div>
        <div className="min-w-0 flex-1 overflow-hidden py-2">
          <MarqueeText direction="right" duration={80}>
            {newsList.map((newsItem, index) => (
              <Link
                href={`/newsDetails/${encodeURIComponent(String(newsItem.id))}?from=%2F`}
                key={`${newsItem.id ?? newsItem.title ?? "news"}-${index}`}
                className="hover:underline"
              >
                <span className="mx-5">◆</span>
                <span>{newsItem.title}</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
