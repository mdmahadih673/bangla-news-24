import Image from "next/image";
import logo from "@/assets/logo.webp";

const HeaderPage = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="flex items-center p-4 container mx-auto">

            <div>
                <Image
                    src={logo}
                    alt="Logo"
                    width={40}
                    height={40}
                />
            </div>
            <div className="ml-4 ">
                <h1 className="text-2xl font-bold text-red-700 ">Bangla News 24</h1>
                <p className="text-xs text-neutral-500">{date}</p>
            </div>
        </div>
    );
};

export default HeaderPage;