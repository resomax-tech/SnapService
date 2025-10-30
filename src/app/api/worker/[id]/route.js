import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import Worker from "@/models/WorkerModel";
import Community from "@/models/CommunityModel";

export async function GET(req, { params }) {
    try {
        await dbConnect()
        const { id } = await params
        const worker = await Worker.findById(id)
        return NextResponse.json({ data: worker }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    try {
        await dbConnect()
        const { id } = params
        const body = await req.json()
        const updated = await Worker.findByIdAndUpdate(id, body, { new: true })
        console.log("updated: ", updated);

        return NextResponse.json({ updated: updated }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect()
        const { id } = params
        await Worker.findByIdAndDelete(id)
        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}