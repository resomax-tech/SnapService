import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import Worker from "@/models/WorkerModel";
import Community from "@/models/CommunityModel";

export async function GET(req, context) {
    try {
        await dbConnect()
        const { params } = await context

        const worker = await Worker.findById(params.id)
        return NextResponse.json({ data: worker }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    try {
        const { id } = params
        await dbConnect()
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
        const { id } = params
        await dbConnect()
        await Worker.findByIdAndDelete(id)
        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}