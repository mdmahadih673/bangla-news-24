"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUpPage() {
    const hendelGithubSignIn = async () => {
        const { data, error } = await signIn.social({
            provider: "github",
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
        const name = String(data.name);

        const { error } = await signUp.email({
            name,
            email: String(data.email),
            image: typeof data.image === "string" ? data.image : undefined,
            password: String(data.password),
            callbackURL: "/sign-in",
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success(`${name} সাইন আপ সফল হয়েছে`);
        router.push("/sign-in");

    };

    return (
        <section className="w-full bg-[#fafafa] px-5 py-4">
            <div className="mx-auto w-full max-w-130">
                <Form className="flex flex-col gap-3" onSubmit={onSubmit}>
                    <h1 className="mb-1 text-center text-2xl font-bold tracking-tight text-[#d92020]">
                        সাইন আপ
                    </h1>

                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label className="mb-1 block text-xs font-medium text-[#1f1f1f]">নাম</Label>
                        <Input
                            className="h-9 rounded-md border border-[#cfcfcf] bg-white px-3 text-sm text-[#1f1f1f] shadow-none placeholder:text-[#7d7d7d]"
                            placeholder=""
                        />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>

                    <TextField
                        isRequired
                        name="image"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label className="mb-1 block text-xs font-medium text-[#1f1f1f]">ইমেজ</Label>
                        <Input
                            className="h-9 rounded-md border border-[#cfcfcf] bg-white px-3 text-sm text-[#1f1f1f] shadow-none placeholder:text-[#7d7d7d]"
                            placeholder=""
                        />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>

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
                        <Label className="mb-1 block text-xs font-medium text-[#1f1f1f]">ইমেইল</Label>
                        <Input
                            className="h-9 rounded-md border border-[#cfcfcf] bg-white px-3 text-sm text-[#1f1f1f] shadow-none placeholder:text-[#7d7d7d]"
                            placeholder=""
                        />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }

                            return null;
                        }}
                    >
                        <Label className="mb-1 block text-xs font-medium text-[#1f1f1f]">পাসওয়ার্ড</Label>
                        <Input
                            type="password"
                            className="h-9 rounded-md border border-[#cfcfcf] bg-white px-3 text-sm text-[#1f1f1f] shadow-none placeholder:text-[#7d7d7d]"
                            placeholder=""
                        />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>
                    <Button
                        type="button"
                        className="min-h-11 w-full rounded-xl border border-white/10 bg-white/5 font-medium text-blue-600 transition hover:bg-white/10"
                        onClick={hendelGithubSignIn}
                    >
                        Sign up with Github
                    </Button>

                    <Button
                        type="submit"
                        className="mt-1 h-9 w-full rounded-md bg-[#c9000b] text-sm font-semibold text-white shadow-none hover:bg-[#bf1518]"
                    >
                        সাইন আপ করুন
                    </Button>

                    <p className="mt-1 text-center text-xs text-[#3a3a3a]">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href={"/sign-in"} >
                            <span className="font-medium text-[#d71920]">সাইন ইন করুন</span>
                        </Link>
                    </p>
                </Form>
            </div>
        </section>
    );
}