import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import { comparePassword, generateToken } from "@/lib/auth";
import dbConnect from "@/lib/connectDB";
import { cookies } from "next/headers";



export async function POST(req) {
    try {

        await dbConnect()
        const body = await req.json()
        const { email, password } = body

        console.log(email, password)

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ msg: "user not registered" }, { status: 404 })
        }
        const status = comparePassword(password, user.password)

        if (!status) return NextResponse.json({ msg: "invalid credentials" }, { status: 400 })

        const token = await generateToken(user)
        const cookieStore = await cookies()
        cookieStore.set("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: "/"
        })

        return NextResponse.json({msg: "login success"}, {status: 200})

    } catch (error) {
        console.log("Error", error.message)
        return NextResponse.json({ msg: "server error" }, { status: 500 })
    }
}