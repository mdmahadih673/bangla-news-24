
"use client"

import { signOut, useSession } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Link from 'next/link';

const ButtonsPage = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user

    return (
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {user ? (
                <div className='flex items-center gap-2'>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <Avatar.Image
                                alt="Blue"
                                src={user.image as string}
                            />
                            <Avatar.Fallback>B</Avatar.Fallback>
                        </Avatar>
                    </div>
                    {session?.user ? <span>Welcome, {session.user.name}</span> : null}
                    <button className=' btn btn-error' onClick={() => signOut()}>Sign out</button>
                </div>
            ) : (
                <div>
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
                        variant="danger"
                            className="rounded-md bg-red-700 px-4 font-medium text-white hover:bg-red-800"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ButtonsPage;