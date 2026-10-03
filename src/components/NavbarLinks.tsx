import Link from "next/link";

interface Category {
    slug?: string;
    title?: string;
    scrapable?: boolean;
}

const NavbarLinksPage = async () => {
    const response = await fetch(
        "https://news-api-v2.vercel.app/api/categories"
    );

    const categories = await response.json();

    const categoryList: Category[] = Array.isArray(categories?.data)
        ? categories.data
        : [];

    const filteredCategoryList = categoryList.filter(
        (category) => category.scrapable
    );

    return (
        <div className="flex w-full items-center justify-center gap-4 border-b border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm sm:gap-6 sm:py-3 sm:text-base">

            <Link
                href="/"
                className="transition hover:text-red-600"
            >
                হোম
            </Link>

            {filteredCategoryList.map((category) => (
                <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="transition hover:text-red-600"
                >
                    {category.title}
                </Link>
            ))}

        </div>
    );
};

export default NavbarLinksPage;