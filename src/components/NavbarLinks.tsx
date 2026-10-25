import Link from "next/link";

interface Category {
  slug?: string;
  title?: string;
  scrapable?: boolean;
}

const NavbarLinksPage = async () => {
  const response = await fetch("https://news-api-v2.vercel.app/api/categories");
  const categories = await response.json();

  const categoryList: Category[] = Array.isArray(categories?.data)
    ? categories.data
    : [];

  const filteredCategoryList = categoryList.filter(
    (category) => category.scrapable,
  );

  return (
    <nav className="sticky top-0 z-30 border-t border-stone-100 bg-[#8f1d13] text-white">
      <div className="container mx-auto flex gap-1 overflow-x-auto px-3 py-2 text-sm font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Link
          href="/"
          className="shrink-0 rounded-md px-3 py-1.5 transition hover:bg-white/15"
        >
          হোম
        </Link>

        {filteredCategoryList.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="shrink-0 rounded-md px-3 py-1.5 whitespace-nowrap transition hover:bg-white/15"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavbarLinksPage;
