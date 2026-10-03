import { NewsItem } from "@/components/home-page/HomePage";
import NewsCardPage from "@/components/NewsCardPage";

const CategoryPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id: slug } = await params;

    const response = await fetch(
        `https://news-api-v2.vercel.app/api/category/${slug}`
    );

    const data = await response.json();

    console.log(data);

    const categoryData = data.data;

    return (
        <div className="container mx-auto mt-8">

            <h1 className="mb-4 py-2 text-2xl  border-b-3 border-red-500 font-bold text-black">
                {data.title}
            </h1>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categoryData.map((news: NewsItem) => (
                    <NewsCardPage key={news.id} news={news} />
                ))}
            </div>

        </div>
    );
};

export default CategoryPage;