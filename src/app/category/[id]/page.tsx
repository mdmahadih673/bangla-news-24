import { NewsItem } from "@/components/home-page/HomePage";
import NewsCardPage from "@/components/NewsCardPage";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: slug } = await params;

  const response = await fetch(
    `https://news-api-v2.vercel.app/api/category/${slug}`,
  );
  const data = await response.json();
  const categoryData: NewsItem[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="container mx-auto mt-8 mb-12 px-4">
      <h1 className="mb-6 border-b-2 border-[#b42318] pb-3 text-2xl font-black text-stone-900">
        {data.title}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryData.length > 0 ? (
          categoryData.map((news) => (
            <NewsCardPage
              key={news.id ?? news.title}
              news={news}
              returnTo={`/category/${slug}`}
            />
          ))
        ) : (
          <p className="col-span-full py-8 text-center text-stone-600">
            এই বিভাগে কোনো খবর পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
