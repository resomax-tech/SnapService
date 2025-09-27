import { NextResponse } from "next/server";
import Community from "@/models/CommunityModel";
import Worker from "@/models/WorkerModel";
import dbConnect from "@/lib/connectDB";



export async function GET(req, context) {
    try {
        await dbConnect()
        const { params } = await context
        const community = await Community.findById(params.id).populate("workers", "name mobile")
        return NextResponse.json({ data: community }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

// to update a community
export async function PATCH(req, context) {
    try {
        await dbConnect()
        const { params } = await context
        const body = await req.json()
        const updated = await Community.findByIdAndUpdate(params.id, body, { new: true })
        return NextResponse.json({ updated: updated }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

// to delete a community
export async function DELETE(req, context) {
    try {
        await dbConnect()
        const {params} = await context
        await Community.findByIdAndDelete(params.id)
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}