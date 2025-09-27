import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import Worker from "@/models/WorkerModel";
import Community from "@/models/CommunityModel";


export async function GET(req) {
    try {
        await dbConnect()
        const workers = await Worker.find({})
        return NextResponse.json({ data: workers }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await dbConnect()
        const body = await req.json()
        const worker = await Worker.create(body)
        return NextResponse.json(worker, { status: 201 })
    } catch (err) {
                console.log(err.message);

        if (err.code === 11000) {
            return NextResponse.json(
                { error: "Worker already exists" },
                { status: 409 }
            );
        }
        throw err;
    }
}