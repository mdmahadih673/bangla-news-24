import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link href="/" className="text-2xl font-black text-white">
              বাংলা নিউজ <span className="text-red-500">২৪</span>
            </Link>
            <p className="mt-2 max-w-md text-sm leading-6 text-stone-400">
              বাংলাদেশ ও বিশ্বের খবর, এক জায়গায়। সত্যের খোঁজে, প্রতি মুহূর্তে।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <Link href="/" className="transition hover:text-white">
              হোম
            </Link>
            <Link href="/sign-in" className="transition hover:text-white">
              সাইন ইন
            </Link>
            <Link href="/profile" className="transition hover:text-white">
              প্রোফাইল
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-800 pt-5 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} বাংলা নিউজ ২৪। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
