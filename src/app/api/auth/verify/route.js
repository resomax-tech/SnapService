import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const key = process.env.JWT_SECRET;

export async function GET(req) {
    try {
        const token = req.cookies.get("access_token")?.value;

        if (!token) {
            return NextResponse.json({ loggedIn: false });
        }

        const payload = jwt.verify(token, key);


        return NextResponse.json({ loggedIn: true, user: payload });
    } catch (error) {
        console.error("JWT verify error:", error.message);
        return NextResponse.json({ loggedIn: false, reason: error.message });
    }

}
