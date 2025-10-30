import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const body = await req.json()        
        const { username, password } = body
        console.log(username, password);
        console.log(process.env.ADMIN_USERNAME, process.env.PASSWORD);
        
        if (username === process.env.ADMIN_USERNAME && password === process.env.PASSWORD) {
            const payload = {
                role: "admin",
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" })
            
            const cookieStore = await cookies()
            cookieStore.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/"
            })

            return NextResponse.json({ msg: `Login successful! Welcome Admin` }, { status: 200 })
        }

        return NextResponse.json({ msg: "invalid login credentials " }, { status: 400 })
    } catch (error) {
        console.log(error.message);
    }
}