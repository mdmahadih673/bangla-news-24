import Link from 'next/link';
interface NewsBodyItem {
    type: string;
    text?: string;
    url?: string;
    caption?: string;
    altText?: string;
    width?: number;
    height?: number;
}
const NewsDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const response = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`);
    const data = await response.json();
    const newsDetails = data.data;

    return (
        <div className="min-h-screen bg-gray-50 py-8">


            <div className="container mx-auto px-4">
            

                <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">

                    {/* Category */}
                    <p className="mb-4 text-sm font-semibold text-red-600">
                        প্রধান খবর
                    </p>

                    {/* Title */}
                    <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                        {newsDetails.title}
                    </h1>

                    {/* Divider */}
                    <div className="my-6 h-px bg-gray-200"></div>

                    {/* Author / Date */}
                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>বাংলা নিউজ ২৪</span>
                        <span>•</span>
                        <span>সর্বশেষ খবর</span>
                    </div>

                    {/* Description */}
                    <div className="rounded-lg bg-gray-50 p-5">
                        <p className="text-lg leading-8 text-gray-700">
                            {newsDetails.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text}
                        </p>
                    </div>

                    {/* News Body */}
                    <div className="mt-8 space-y-6">

                        {newsDetails.body?.map((item: NewsBodyItem, index: number) => {

                            if (item.type === "text") {
                                return (
                                    <p
                                        key={index}
                                        className="text-[17px] leading-8 text-gray-800"
                                    >
                                        {item.text}
                                    </p>
                                );
                            }

                            if (item.type === "subheading") {
                                return (
                                    <h2
                                        key={index}
                                        className="border-l-4 border-red-600 pl-4 text-2xl font-bold text-gray-900"
                                    >
                                        {item.text}
                                    </h2>
                                );
                            }

                            return null;
                        })}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default NewsDetailsPage;