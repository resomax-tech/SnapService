import { NextResponse } from "next/server";
import Community from "@/models/CommunityModel";
import dbConnect from "@/lib/connectDB";


// post a new community  
export async function POST(req) {
    try {
        await dbConnect()
        const body = await req.json()
        const community = await Community.create(body);
        return NextResponse.json(community, { status: 201 })

    } catch (err) {
        if (err.code === 11000) {
            return NextResponse.json(
                { error: "Community name already exists" },
                { status: 409 }
            );
        }
        throw err;
    }
}

// retrieve all communities 
export async function GET(req) {
    try {
        await dbConnect()
        const communities = await Community.find({}, "name plans")
        return NextResponse.json({ communities: communities }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}