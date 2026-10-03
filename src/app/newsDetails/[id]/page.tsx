import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface NewsBodyItem {
    type: string;
    text?: string;
    url?: string;
    caption?: string;
    altText?: string;
    width?: number;
    height?: number;
    copyrightHolder?: string;
}

interface NewsArticle {
    title: string;
    category?: string | null;
    publishedAt?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
    description?: {
        blocks?: Array<{
            model?: {
                blocks?: Array<{
                    model?: {
                        text?: string;
                    };
                }>;
            };
        }>;
    };
    body?: NewsBodyItem[];
}

const NewsDetailsPage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ from?: string | string[] }>;
}) => {
    const [{ id }, { from }] = await Promise.all([params, searchParams]);
    const returnTo =
        typeof from === "string" &&
        (from === "/" || /^\/category\/[^/?#]+$/.test(from))
            ? from
            : "/";

    const response = await fetch(
        `https://news-api-v2.vercel.app/api/article/${encodeURIComponent(id)}`
    );
    if (!response.ok) {
        notFound();
    }

    const data = await response.json();
    const newsDetails = data?.data as NewsArticle | undefined;
    if (!newsDetails?.title) {
        notFound();
    }

    const body = Array.isArray(newsDetails.body) ? newsDetails.body : [];
    const description =
        newsDetails.description?.blocks
            ?.flatMap((block) => block.model?.blocks ?? [])
            .map((block) => block.model?.text)
            .filter((text): text is string => Boolean(text))
            .join("\n") ?? "";
    const heroImage =
        newsDetails.imageUrl ??
        body.find((item) => item.type === "image" && item.url)?.url;
    const parsedDate = newsDetails.publishedAt
        ? new Date(newsDetails.publishedAt)
        : null;
    const publishedDate =
        parsedDate && !Number.isNaN(parsedDate.getTime())
            ? parsedDate.toLocaleDateString("bn-BD", { dateStyle: "long" })
            : null;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
            <div className="mx-auto max-w-5xl">
                <Link
                    href={returnTo}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:text-red-600"
                >
                    <span aria-hidden="true" className="text-lg">←</span>
                    <span>আগের পাতায় ফিরুন</span>
                </Link>

                <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
                    <header className="mx-auto max-w-4xl px-5 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-12">
                        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-full bg-red-50 px-3 py-1.5 font-bold text-red-700">
                                {newsDetails.category || "প্রধান খবর"}
                            </span>
                            {publishedDate && (
                                <time
                                    dateTime={newsDetails.publishedAt ?? undefined}
                                    className="text-gray-500"
                                >
                                    {publishedDate}
                                </time>
                            )}
                        </div>

                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                            বাংলা নিউজ ২৪ · সংবাদ বিস্তারিত
                        </p>
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
                            {newsDetails.title}
                        </h1>
                    </header>

                    {heroImage && (
                        <figure className="mx-auto max-w-4xl px-4 sm:px-10">
                            <div className="overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl">
                                <Image
                                    src={heroImage}
                                    alt={newsDetails.imageAlt || newsDetails.title}
                                    width={1200}
                                    height={675}
                                    priority
                                    sizes="(max-width: 768px) 100vw, 900px"
                                    className="max-h-[560px] w-full object-cover"
                                />
                            </div>
                        </figure>
                    )}

                    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-10 sm:py-10">
                        {description && (
                            <p className="mb-8 rounded-xl border-l-4 border-red-600 bg-red-50/70 px-5 py-4 text-lg font-medium leading-8 text-gray-800 sm:text-xl">
                                {description}
                            </p>
                        )}

                        <div className="space-y-7">
                            {body.map((item, index) => {
                                if (item.type === "image" && item.url) {
                                    if (item.url === heroImage) {
                                        return null;
                                    }

                                    return (
                                        <figure
                                            key={`${item.url}-${index}`}
                                            className="overflow-hidden rounded-xl bg-gray-100"
                                        >
                                            <Image
                                                src={item.url}
                                                alt={item.altText || item.caption || newsDetails.title}
                                                width={item.width || 1200}
                                                height={item.height || 675}
                                                sizes="(max-width: 768px) 100vw, 768px"
                                                className="h-auto max-h-[520px] w-full object-cover"
                                            />
                                            {(item.caption || item.copyrightHolder) && (
                                                <figcaption className="px-4 py-3 text-sm leading-6 text-gray-500">
                                                    {item.caption}
                                                    {item.copyrightHolder && (
                                                        <span> · ছবি: {item.copyrightHolder}</span>
                                                    )}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                }

                                if (item.type === "subheading" && item.text) {
                                    return (
                                        <h2
                                            key={`${item.type}-${index}`}
                                            className="border-l-4 border-red-600 pl-4 text-2xl font-bold leading-snug text-gray-900"
                                        >
                                            {item.text}
                                        </h2>
                                    );
                                }

                                if (item.type === "text" && item.text) {
                                    return (
                                        <p
                                            key={`${item.type}-${index}`}
                                            className="whitespace-pre-line text-lg leading-9 text-gray-700"
                                        >
                                            {item.text}
                                        </p>
                                    );
                                }

                                return null;
                            })}
                        </div>

                        <div className="mt-10 border-t border-gray-100 pt-6 text-sm text-gray-500">
                            সংবাদ সূত্র: বাংলা নিউজ ২৪
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
};

export default NewsDetailsPage;
