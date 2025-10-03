import { NextResponse } from "next/server";

export const config = {
    matcher: ['/reviews/:path*']
}
export function middleware(req) {
    const token = req.cookies.get('access_token')?.value
    console.log("token", token);
    try {
        if (!token) return NextResponse.redirect(new URL('/customer/account/login', req.url))

        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL('/customer/account/login', req.url))
    }
}
