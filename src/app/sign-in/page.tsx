"use client";

import { signIn } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())

        const { error } = await signIn.email({
            email: String(data.email),
            password: String(data.password),
            callbackURL: "/",
        });

        if (error) {

            return;
        }

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
                        type="submit"
                        className="mt-1 h-9 w-full rounded-md bg-[#c9000b] text-sm font-semibold text-white shadow-none hover:bg-[#bf1518]"
                    >
                        সাইন ইন করুন
                    </Button>

                    {errorMessage && (
                        <p role="alert" className="text-center text-sm text-red-600">
                            {errorMessage}
                        </p>
                    )}

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
