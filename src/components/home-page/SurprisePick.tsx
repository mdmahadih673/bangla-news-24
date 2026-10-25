"use client";

import { useState } from "react";

const jokes = [
  { setup: "শিক্ষক: বলো তো, অলসতার সবচেয়ে বড় উদাহরণ কী?", punchline: "ছাত্র: স্যার, উত্তরটা কাল বলব—আজ খুব ক্লান্ত!" },
  { setup: "বন্ধু: তোর মোবাইল এত চুপচাপ কেন?", punchline: "আমি: ওকে সাইলেন্টে রেখেছি, এখন ও আমার কথা শোনে!" },
  { setup: "শিক্ষক: বিদ্যুৎ কোথা থেকে আসে?", punchline: "ছাত্র: পাশের বাসা থেকে, আমাদের বাসায় গেলেই তো লোডশেডিং!" },
  { setup: "মা: পরীক্ষায় কয়টা প্রশ্নের উত্তর দিয়েছিস?", punchline: "ছেলে: সবগুলোর! কিছু প্রশ্নের উত্তর জানতাম, বাকিগুলোর প্রশ্নই ভুল ছিল!" },
  { setup: "বন্ধু: ডায়েট কেমন চলছে?", punchline: "আমি: দারুণ! খাবারের ছবি দেখে পেট ভরে যাচ্ছে… তারপর খাবারটা খেয়ে ফেলি।" },
  { setup: "ঘড়ি: তোমার সময় খুব খারাপ যাচ্ছে!", punchline: "আমি: তোমারও তো—সারাদিন ঘুরেই যাচ্ছ!" },
];

export default function SurprisePick() {
  const [pickIndex, setPickIndex] = useState<number | null>(null);
  const joke = pickIndex === null ? null : jokes[pickIndex];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#8f1d13] via-[#a82318] to-[#c23a28] p-5 text-white shadow-lg shadow-red-950/10 sm:p-6">
      <div aria-hidden="true" className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[22px] border-white/10" />
      <div className="relative">
        <p className="text-[10px] font-bold tracking-[0.24em] text-red-100/80">একটু অন্যরকম</p>
        <h2 className="mt-2 text-xl font-black">আজকের সারপ্রাইজ জোকস 😄</h2>
        <div aria-live="polite" className="mt-3 min-h-20 text-sm leading-6 text-white/85">
          {joke ? (
            <>
              <p className="font-semibold text-white">{joke.setup}</p>
              <p className="mt-1">{joke.punchline}</p>
            </>
          ) : (
            <p>একটু হাসি হলে দিনটা আরও সুন্দর—নিচে চাপ দিয়ে একটা জোকস শুনুন!</p>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPickIndex((current) => {
              const next = Math.floor(Math.random() * (jokes.length - 1));
              return current === null || next >= current ? next + (current === null ? 0 : 1) : next;
            })}
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#8f1d13] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {joke ? "আরেকটা জোকস শোনান ↻" : "একটা জোকস শোনান ✨"}
          </button>
        </div>
      </div>
    </section>
  );
}
