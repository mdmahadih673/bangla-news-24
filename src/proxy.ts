import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from './lib/auth'


export async function proxy(request: NextRequest) {
    const session = await getAuth().api.getSession({
        headers: request.headers
    })

    if (!session) {
        return NextResponse.redirect(new URL('/sign-up', request.url))

    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/newsDetails/:path*'
    ],
}