import { NextResponse } from "next/server";
import UserModel from "@/models/UserModel";


export async function GET(req) {
    try {
        const token = req.cookies.get("admin_token")?.value;
        if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

        const data = await UserModel.find({})
        return NextResponse.json({ users: data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: error.message }, { status: 500 })
    }
}