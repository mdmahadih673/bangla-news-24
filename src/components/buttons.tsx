"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, Button, Spinner } from "@heroui/react";
import Link from "next/link";
import { toast } from "react-toastify";

const ButtonsPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("সাইন আউট সফল হয়েছে");
  };

  if (isPending) {
    return (
      <div className="ml-auto flex items-center">
        <Spinner aria-label="অ্যাকাউন্ট লোড হচ্ছে" />
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-2 sm:gap-3">
      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/profile" className="flex items-center gap-2">
            <Avatar className="size-9">
              {user.image && (
                <Avatar.Image alt={user.name} src={user.image as string} />
              )}
              <Avatar.Fallback>
                {user.name?.charAt(0).toUpperCase() || "?"}
              </Avatar.Fallback>
            </Avatar>
            <span className="hidden max-w-36 truncate text-sm font-medium text-stone-700 sm:inline">
              {user.name}
            </span>
          </Link>
          <button
            className="rounded-md border border-stone-200 px-3 py-1.5 text-sm font-semibold text-stone-700 transition hover:border-red-200 hover:text-[#b42318]"
            onClick={handleSignOut}
            type="button"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="font-medium text-stone-700 hover:bg-stone-100"
            >
              সাইন ইন
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              variant="danger"
              className="rounded-md bg-[#b42318] px-4 font-medium text-white hover:bg-[#8f1d13]"
            >
              সাইন আপ
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ButtonsPage;
