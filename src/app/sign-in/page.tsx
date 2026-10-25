"use client";

import { authClient, signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LogoGithub } from "@gravity-ui/icons";

export default function SignInPage() {
  const router = useRouter();

  const handleSocialSignIn = async (provider: "google" | "github") => {
    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: response, error } = await authClient.signIn.email({
      email: String(data.email),
      password: String(data.password),
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`${response.user.name} সাইন ইন সফল হয়েছে`);
    router.push("/");
  };

  return (
    <section className="flex w-full justify-center px-5 py-12">
      <div className="w-full max-w-[440px] rounded-2xl border border-stone-200 bg-white p-7 shadow-lg">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-[#b42318]">
          বাংলা নিউজ ২৪
        </p>
        <Form className="mt-3 flex flex-col gap-3" onSubmit={onSubmit}>
          <h1 className="mb-1 text-center text-2xl font-black tracking-tight text-stone-900">
            সাইন ইন
          </h1>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা লিখুন";
              }
              return null;
            }}
          >
            <Label className="mb-1 block text-xs font-medium text-stone-800">
              ইমেইল
            </Label>
            <Input className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-900 shadow-none" />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label className="mb-1 block text-xs font-medium text-stone-800">
              পাসওয়ার্ড
            </Label>
            <Input
              type="password"
              className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-900 shadow-none"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <Button
            type="submit"
            className="mt-1 h-10 w-full rounded-md bg-[#b42318] text-sm font-semibold text-white shadow-none hover:bg-[#8f1d13]"
          >
            সাইন ইন করুন
          </Button>

          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span className="h-px flex-1 bg-stone-200" />
            অথবা
            <span className="h-px flex-1 bg-stone-200" />
          </div>

          <Button
            type="button"
            className="min-h-11 w-full rounded-lg border border-stone-300 bg-white font-medium text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
            onClick={() => handleSocialSignIn("google")}
          >
            <span aria-hidden="true" className="text-lg font-bold text-blue-600">
              G
            </span>
            গুগল দিয়ে সাইন ইন করুন
          </Button>
          <Button
            type="button"
            className="min-h-11 w-full rounded-lg border border-stone-300 bg-white font-medium text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
            onClick={() => handleSocialSignIn("github")}
          >
            <LogoGithub aria-hidden="true" className="size-5" />
            গিটহাব দিয়ে সাইন ইন করুন
          </Button>

          <p className="mt-1 text-center text-xs text-stone-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link className="font-medium text-[#b42318]" href="/sign-up">
              সাইন আপ করুন
            </Link>
          </p>
        </Form>
      </div>
    </section>
  );
}
