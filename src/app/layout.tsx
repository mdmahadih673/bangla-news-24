import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import HeaderPage from "@/components/header";
import Marquee from "@/components/Marquee";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/footer";
import BreakingFlash from "@/components/BreakingFlash";
import type { Metadata } from "next";

const notoSerifBangla = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: {
    default: "বাংলা নিউজ ২৪",
    template: "%s | বাংলা নিউজ ২৪",
  },
  description:
    "বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, বিভাগভিত্তিক সংবাদ এবং নির্ভরযোগ্য আপডেট — বাংলা নিউজ ২৪।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBangla.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <BreakingFlash />
        <HeaderPage />
        <Marquee />
        <main className="w-full flex-1">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
