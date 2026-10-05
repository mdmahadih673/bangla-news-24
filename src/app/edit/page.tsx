"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Avatar, Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import React from "react";


export default function EditProfilePage() {
    const { data: session, isPending } = useSession()
    const user = session?.user

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newData = Object.fromEntries(formData.entries()) as { name: string, image: string }

        await authClient.updateUser({
            ...newData
        })

    }

    return (
        <section className="w-full bg-[#fafafa] px-5 py-10">
            <div className="mx-auto w-full max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-[#d92020]">প্রোফাইল সম্পাদনা</h1>
                    <Link
                        href="/profile"
                        className="text-sm font-medium text-gray-600 underline-offset-4 hover:text-[#c9000b] hover:underline"
                    >
                        ফিরে যান
                    </Link>
                </div>

                <div className="mb-6 flex justify-center">
                    <Avatar className="size-20">
                        {user?.image && <Avatar.Image alt={user.name} src={user.image} />}
                        <Avatar.Fallback>
                            {user?.name?.charAt(0).toUpperCase() || "?"}
                        </Avatar.Fallback>
                    </Avatar>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField isRequired name="name" defaultValue={user?.name ?? ""}>
                        <Label className="mb-1 block text-sm font-medium text-gray-700">নাম</Label>
                        <Input className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900" />
                        <FieldError className="text-xs text-red-600" />
                    </TextField>

                    <TextField name="image" type="url" defaultValue={user?.image ?? ""}>
                        <Label className="mb-1 block text-sm font-medium text-gray-700">
                            প্রোফাইল ছবির URL
                        </Label>
                        <Input className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900" />
                        <FieldError className="text-xs text-red-600" />
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={isPending}
                        className="mt-2 h-10 w-full rounded-lg bg-[#c9000b] font-semibold text-white transition hover:bg-[#a90009] disabled:opacity-60"
                    >
                        পরিবর্তন সংরক্ষণ করুন
                    </Button>
                </Form>
            </div>
        </section>
    );
}
