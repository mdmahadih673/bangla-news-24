import NavbarLinksPage from "./NavbarLinks";
import ButtonsPage from "./buttons";
import BrandMark from "./BrandMark";
import LiveClock from "./LiveClock";

const HeaderPage = () => {
  return (
    <header className="w-full border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="border-b border-stone-100 bg-stone-50">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-1.5">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#b42318]">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-[#b42318]" />
            সরাসরি
          </div>
          <LiveClock />
        </div>
      </div>

      <div className="container mx-auto flex min-h-[76px] items-center justify-between gap-4 px-4 py-3">
        <BrandMark />
        <ButtonsPage />
      </div>

      <NavbarLinksPage />
    </header>
  );
};

export default HeaderPage;
