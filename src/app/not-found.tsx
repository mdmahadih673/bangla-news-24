import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6">
      <div className="absolute top-0 left-0 h-1 w-full bg-[#b42318]" />
      <div className="relative z-10 max-w-xl text-center">
        <h1 className="text-[120px] font-black leading-none tracking-tight text-stone-900 sm:text-[160px]">
          ৪০৪
        </h1>
        <h2 className="mt-6 text-2xl font-black text-stone-900 sm:text-3xl">
          পাতাটি পাওয়া যায়নি
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-500 sm:text-base">
          আপনি যে পাতাটি খুঁজছেন সেটি সরানো হয়েছে, নাম বদলেছে, অথবা এখন নেই।
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#b42318] px-6 py-3 font-semibold text-white shadow-md shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-[#8f1d13]"
        >
          ← হোমে ফিরুন
        </Link>
      </div>
    </div>
  );
}
