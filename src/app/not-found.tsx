
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />

      <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-50 rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gray-50 rounded-full" />

      <div className="relative z-10 text-center max-w-xl">
        {/* 404 */}
        <div className="relative inline-block">
          <h1 className="text-[120px] sm:text-[160px] md:text-[190px] font-black leading-none tracking-tight text-gray-900">
            404
          </h1>

          {/* Red Accent */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-red-600" />
        </div>

        {/* Title */}
        <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 text-sm sm:text-base leading-6">
          Sorry, the page you are looking for could not be found.
          It may have been removed, renamed, or temporarily unavailable.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-7 px-6 py-3
          bg-red-600 hover:bg-red-700
          text-white font-semibold rounded-md
          transition-all duration-300
          hover:-translate-y-0.5
          shadow-md shadow-red-600/20"
        >
          ← Back to Home
        </Link>

        {/* News Style Line */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="w-12 h-px bg-gray-300" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            News • Updates • Stories
          </span>
          <span className="w-12 h-px bg-gray-300" />
        </div>
      </div>
    </main>
  );
}
