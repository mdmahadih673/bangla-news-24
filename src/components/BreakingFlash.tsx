"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "bn24-breaking-seen";

const BreakingFlash = () => {
  const [open, setOpen] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  const dismiss = useCallback(() => {
    setOpen(false);
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    const timer = window.setTimeout(() => setOpen(true), 600);
    const autoClose = window.setTimeout(dismiss, 5200);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(autoClose);
    };
  }, [dismiss]);

  useEffect(() => {
    const onEgg = () => {
      setEasterEgg(true);
      window.setTimeout(() => setEasterEgg(false), 1800);
    };

    window.addEventListener("bn24-easter-egg", onEgg);
    return () => window.removeEventListener("bn24-easter-egg", onEgg);
  }, []);

  return (
    <>
      {open && (
        <div className="fixed inset-x-0 top-0 z-[80] breaking-drop">
          <div className="relative overflow-hidden bg-[#8f1d13] text-white shadow-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent breaking-scan" />
            <div className="container mx-auto flex items-center gap-4 px-4 py-3 sm:py-4">
              <span className="shrink-0 rounded-sm bg-white px-2 py-1 text-[10px] font-black tracking-[0.2em] text-[#8f1d13] sm:text-xs">
                জরুরি
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold leading-snug sm:text-lg">
                  স্বাগতম — বাংলা নিউজ ২৪-এ এখনই চলছে সত্যের খোঁজ
                </p>
                <p className="hidden text-xs text-white/80 sm:block">
                  লোগোতে পাঁচবার ক্লিক করুন। একটা গোপন শিরোনাম অপেক্ষা করছে।
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
              >
                খবর পড়ুন
              </button>
            </div>
          </div>
        </div>
      )}

      {easterEgg && (
        <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              className="paper-float absolute text-2xl"
              style={{
                left: `${8 + ((index * 17) % 84)}%`,
                bottom: `${10 + (index % 5) * 8}%`,
                animationDelay: `${index * 40}ms`,
              }}
            >
              🗞️
            </span>
          ))}
          <div className="absolute left-1/2 top-24 w-[min(90vw,28rem)] -translate-x-1/2 rounded-xl bg-stone-950/90 px-5 py-4 text-center text-white shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
              গোপন শিরোনাম
            </p>
            <p className="mt-2 text-lg font-extrabold">
              আপনি একজন সত্যিকারের পাঠক
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BreakingFlash;
