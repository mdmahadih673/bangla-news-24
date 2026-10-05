"use client";

import { useSession } from "@/lib/auth-client";
import { Avatar, Spinner } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    useEffect(() => {
        if (!isPending && !user) {
            router.replace("/sign-in");
        }
    }, [isPending, router, user]);

    if (isPending || !user) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <Spinner aria-label="প্রোফাইল লোড হচ্ছে" />
            </div>
        );
    }

    return (
        <section className="w-full bg-[#fafafa] px-5 py-10">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <Link
                    href="/edit"
                    className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#c9000b] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a90009] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9000b]"
                >
                    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                    </svg>
                    প্রোফাইল সম্পাদনা
                </Link>
                <Avatar className="size-24">
                    {user.image && <Avatar.Image alt={user.name} src={user.image} />}
                    <Avatar.Fallback>
                        {user.name?.charAt(0).toUpperCase() || "?"}
                    </Avatar.Fallback>
                </Avatar>
                <h1 className="text-2xl font-bold text-[#d92020]">আমার প্রোফাইল</h1>

                <dl className="w-full space-y-4 rounded-lg bg-gray-50 p-5 text-sm">
                    <div>
                        <dt className="font-medium text-gray-500">নাম</dt>
                        <dd className="mt-1 text-gray-900">{user.name}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">ইমেইল</dt>
                        <dd className="mt-1 break-all text-gray-900">{user.email}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
