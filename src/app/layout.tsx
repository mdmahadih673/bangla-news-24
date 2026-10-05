import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import HeaderPage from "@/components/header";
import Marquee from "@/components/Marquee";
import { ToastContainer } from "react-toastify";

const notoSerifBangla = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBangla.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HeaderPage />
        <Marquee />
        <main className="w-full">

          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
