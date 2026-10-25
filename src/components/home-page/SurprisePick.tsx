"use client";

import { useState } from "react";
import Link from "next/link";
import type { NewsItem } from "./HomePage";

export default function SurprisePick({ news }: { news: NewsItem[] }) {
  const picks = news.filter((item) => item.id != null && item.title);
  const [pickIndex, setPickIndex] = useState<number | null>(null);
  const pick = pickIndex === null ? null : picks[pickIndex];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#8f1d13] via-[#a82318] to-[#c23a28] p-5 text-white shadow-lg shadow-red-950/10 sm:p-6">
      <div aria-hidden="true" className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[22px] border-white/10" />
      <div className="relative">
        <p className="text-[10px] font-bold tracking-[0.24em] text-red-100/80">একটু অন্যরকম</p>
        <h2 className="mt-2 text-xl font-black">আজকের সারপ্রাইজ খবর ✨</h2>
        <p className="mt-2 min-h-12 text-sm leading-6 text-white/80">
          {pick?.title ?? "খবরের ভিড়ে একটা গল্প বেছে নিন—পরের শিরোনামটা হতে পারে আপনার পছন্দের!"}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!picks.length}
            onClick={() => setPickIndex(Math.floor(Math.random() * picks.length))}
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#8f1d13] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            একটা খবর বেছে দিন
          </button>
          {pick && (
            <Link
              href={`/newsDetails/${encodeURIComponent(String(pick.id))}?from=%2F`}
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              খবরটি পড়ুন ↗
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
