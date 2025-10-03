import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import { comparePassword, generateToken } from "@/lib/auth";
import dbConnect from "@/lib/connectDB";
import { cookies } from "next/headers";



export async function POST(req) {
    try {

        await dbConnect()
        const body = await req.json()
        const { mobile, password } = body

        const user = await User.findOne({ mobile })
        if (!user) {
            return NextResponse.json({ msg: "user not registered" }, { status: 404 })
        }
        const status = comparePassword(password, user.password)

        if (!status) return NextResponse.json({ msg: "invalid credentials" }, { status: 400 })

        const token = await generateToken(user)
        const cookieStore = await cookies()
        cookieStore.set("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",  // more forgiving than strict
            path: "/"
        })

        return NextResponse.json({ msg: `Login successful! Welcome ${user.name}` }, { status: 200 })

    } catch (error) {
        console.log("Error", error.message)
        return NextResponse.json({ msg: "server error" }, { status: 500 })
    }
}


export async function GET(req) {
    try {
        await dbConnect()
        const data = await User.find({})
        return NextResponse.json({ registered_users: data })
    } catch (error) {
        return NextResponse.json({ msg: error.message }, { status: 500 })
    }
}