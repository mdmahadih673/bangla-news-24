"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import logo from "@/assets/logo.webp";

const BrandMark = () => {
  const clicks = useRef(0);
  const resetTimer = useRef<number | undefined>(undefined);

  const handleClick = () => {
    clicks.current += 1;
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      clicks.current = 0;
    }, 1400);

    if (clicks.current >= 5) {
      clicks.current = 0;
      window.dispatchEvent(new Event("bn24-easter-egg"));
    }
  };

  return (
    <Link href="/" onClick={handleClick} className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        <Image
          src={logo}
          alt="বাংলা নিউজ ২৪"
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
          priority
        />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-xl font-black tracking-tight text-stone-900 sm:text-2xl">
          বাংলা নিউজ <span className="text-[#b42318]">২৪</span>
        </span>
        <span className="hidden text-[11px] font-medium tracking-[0.18em] text-stone-500 uppercase sm:block">
          সত্য · দ্রুত · নির্ভরযোগ্য
        </span>
      </span>
    </Link>
  );
};

export default BrandMark;
