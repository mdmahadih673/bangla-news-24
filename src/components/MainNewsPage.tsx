import Link from "next/link";
import { NewsItem } from "./home-page/HomePage";
import Image from "next/image";

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
      <Link
        href={`/newsDetails/${encodeURIComponent(String(firstNewsItem.id))}?from=%2F`}
        className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-900/10"
      >
        {firstNewsItem.imageUrl && (
          <div className="overflow-hidden">
            <Image
              src={firstNewsItem.imageUrl}
              alt={firstNewsItem.imageAlt ?? firstNewsItem.title}
              width={600}
              height={350}
              className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[360px]"
            />
          </div>
        )}
        <div className="p-5 sm:p-6">
          <p className="mb-3 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold tracking-wide text-[#b42318]">
            {firstNewsItem.category ?? "প্রধান খবর"}
          </p>
          <h2 className="text-xl font-black leading-snug text-stone-900 transition group-hover:text-[#b42318] md:text-3xl">
            {firstNewsItem.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
            {firstNewsItem.description}
          </p>
          <p className="mt-3 text-xs text-stone-400">
            {date}
            {firstNewsItem.publishedAt ? ` | ${firstNewsItem.publishedAt}` : ""}
          </p>
        </div>
      </Link>

      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        {otherNewsItems.slice(0, 6).map((newsItem, index) => (
          <Link
            key={`${newsItem.id ?? newsItem.title}-${index}`}
            href={`/newsDetails/${encodeURIComponent(String(newsItem.id))}?from=%2F`}
            className="group block border-b border-stone-100 p-5 last:border-b-0 transition hover:bg-red-50/50"
          >
            <p className="mb-1 text-xs font-bold text-[#b42318]">
              {newsItem.category ?? "খবর"}
            </p>
            <h3 className="text-base font-bold leading-6 text-stone-800 transition group-hover:text-[#b42318]">
              {newsItem.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNewsPage;
