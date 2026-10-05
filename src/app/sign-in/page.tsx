"use client";

import { authClient, signIn } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LogoGithub } from "@gravity-ui/icons";

export default function SignInPage() {
    const handleSocialSignIn = async (provider: "google" | "github") => {
        const { error } = await signIn.social({
            provider,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message);
        }
    };

    const router = useRouter();

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
        <section className="w-full bg-[#fafafa] px-5 py-4">
            <div className="mx-auto w-full max-w-[520px]">
                <Form className="flex flex-col gap-3" onSubmit={onSubmit}>
                    <h1 className="mb-1 text-center text-2xl font-bold tracking-tight text-[#d92020]">
                        সাইন ইন
                    </h1>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="mb-1 block text-xs font-medium text-[#1f1f1f]">
                            ইমেইল
                        </Label>
                        <Input className="h-9 rounded-md border border-[#cfcfcf] bg-white px-3 text-sm text-[#1f1f1f] shadow-none" />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>

                    <TextField isRequired name="password" type="password">
                        <Label className="mb-1 block text-xs font-medium text-[#1f1f1f]">
                            পাসওয়ার্ড
                        </Label>
                        <Input
                            type="password"
                            className="h-9 rounded-md border border-[#cfcfcf] bg-white px-3 text-sm text-[#1f1f1f] shadow-none"
                        />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>

                    <Button
                        type="button"
                        className="min-h-11 w-full rounded-lg border border-gray-300 bg-white font-medium text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
                        onClick={() => handleSocialSignIn("google")}
                    >
                        <span aria-hidden="true" className="text-lg font-bold text-blue-600">G</span>
                        গুগল দিয়ে সাইন ইন করুন
                    </Button>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="h-px flex-1 bg-gray-200" />
                        অথবা
                        <span className="h-px flex-1 bg-gray-200" />
                    </div>
                    <Button
                        type="button"
                        className="min-h-11 w-full rounded-lg border border-gray-300 bg-white font-medium text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
                        onClick={() => handleSocialSignIn("github")}
                    >
                        <LogoGithub aria-hidden="true" className="size-5" />
                        গিটহাব দিয়ে সাইন ইন করুন
                    </Button>

                    <Button
                        type="submit"
                        className="mt-1 h-9 w-full rounded-md bg-[#c9000b] text-sm font-semibold text-white shadow-none hover:bg-[#bf1518]"
                    >
                        সাইন ইন করুন
                    </Button>

                    <p className="mt-1 text-center text-xs text-[#3a3a3a]">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link className="font-medium text-[#d71920]" href="/sign-up">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </Form>

            </div>
        </section>
    );
}
