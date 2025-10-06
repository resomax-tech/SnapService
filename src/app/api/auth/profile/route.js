import User from "@/models/UserModel";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { decryptToken } from "@/lib/auth";

export async function GET(req) {
    try {
        await dbConnect()
        const token = req.cookies.get('access_token')?.value
        if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

        const { sub } = await decryptToken(token)

        const user = await User.findById(sub)

        return NextResponse.json({ user: user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(req) {
    try {
        await dbConnect()
        const token = req.cookies.get('access_token')?.value
        if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

        const { sub } = await decryptToken(token)
        const body = await req.json()

        const updated = await User.findByIdAndUpdate(sub, body, { new: true })
        return NextResponse.json({ updated: updated }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// account deleting route
export async function DELETE(req) {
    try {
        await dbConnect()
        const token = req.cookies.get('access_token')?.value
        if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

        const { sub } = await decryptToken(token)

        await User.findByIdAndDelete(sub)

        return NextResponse.json({ msg: "Account deleted successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
