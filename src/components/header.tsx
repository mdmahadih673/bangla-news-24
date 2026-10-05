import Image from "next/image";
import logo from "@/assets/logo.webp";
import { Button } from "@heroui/react";
import NavbarLinksPage from "./NavbarLinks";
import Link from "next/link";

const HeaderPage = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container relative mx-auto flex min-h-[72px] items-center px-4">

                {/* Center Logo + Website Info */}
                <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
                        <Image
                            src={logo}
                            alt="Bangla News 24 Logo"
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain"
                            priority
                        />
                    </div>

                    <div className="leading-tight">
                        <h1 className="text-xl font-bold tracking-tight text-red-700 sm:text-2xl">
                            Bangla News 24
                        </h1>

                        <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                            {date}
                        </p>
                    </div>

                </div>

                {/* Right Side Buttons */}
                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <Link href={'/sign-in'}>

                        <Button
                            variant="ghost"
                            className="font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Sign In
                        </Button>
                    </Link>

                    <Link href={'/sign-up'}>
                        <Button
                            className="rounded-md bg-red-700 px-4 font-medium text-white hover:bg-red-800"
                        >
                            Sign Up
                        </Button>
                    </Link>

                </div>

            </div>
            <NavbarLinksPage />
        </header>
    );
};

export default HeaderPage;