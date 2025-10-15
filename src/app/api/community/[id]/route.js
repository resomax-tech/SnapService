import { NextResponse } from "next/server";
import Community from "@/models/CommunityModel";
import Worker from "@/models/WorkerModel";
import dbConnect from "@/lib/connectDB";



export async function GET(req, context) {
    try {
        const params = await context.params
        const { id } = params
        await dbConnect()
        const community = await Community.findById(id)
        return NextResponse.json({ data: community }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

// to update a community
export async function PATCH(req, { params }) {
    try {
        const { id } = params
        await dbConnect()
        const body = await req.json()
        const updated = await Community.findByIdAndUpdate(id, body, { new: true })
        return NextResponse.json({ updated: updated }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

// to delete a community
export async function DELETE(req, { params }) {
    try {
        const { id } = params
        await dbConnect()
        await Community.findByIdAndDelete(id)
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}