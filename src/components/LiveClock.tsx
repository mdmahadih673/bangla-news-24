"use client";

import { useEffect, useState } from "react";

function formatNow() {
  const date = new Date();
  return {
    iso: date.toISOString(),
    label: date.toLocaleString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

const LiveClock = () => {
  const [now, setNow] = useState<{ iso: string; label: string } | null>(null);

  useEffect(() => {
    const update = () => setNow(formatNow());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time
      className="min-h-4 text-[11px] tracking-wide text-stone-500 sm:text-xs"
      dateTime={now?.iso}
    >
      {now?.label ?? "\u00a0"}
    </time>
  );
};

export default LiveClock;
