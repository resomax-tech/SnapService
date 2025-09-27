import { NextResponse } from "next/server";
import Worker from "@/models/WorkerModel";
import mongoose from "mongoose";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";

export async function GET(req) {
    try {
        await dbConnect()
        const { searchParams } = new URL(req.url);
        const communityId = searchParams.get('community')
        const planType = searchParams.get('plan')

        const workers = await Worker.find({ community: communityId, workType: planType });

        const totalSlots = workers.reduce((sum, w) => sum + w.maxJobs, 0);

        const availableDates = await checkAvailability(totalSlots, communityId, planType)

        return NextResponse.json({ availableDates })
    } catch (error) {
        return NextResponse.json({ msg: error.message })
    }
}

const checkAvailability = async (totalSlots, communityId, planType) => {
    const availability = {}

    for (let i = 0; i < 30; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)

        if (date.getDay() === 0) {
            availability[date.toISOString().split("T")[0]] = { available: 0, total: totalSlots }
            continue
        }

        const booked = await Job.aggregate([
            { $match: { community: new mongoose.Types.ObjectId(String(communityId)), date, type: planType.toLowerCase() } },
            { $group: { _id: null, totalBathrooms: { $sum: "$bathrooms" } } }
        ])
        const bookedBathrooms = booked[0]?.totalBathrooms || 0;

        availability[date.toISOString().split("T")[0]] = {
            available: totalSlots - bookedBathrooms,
            total: totalSlots
        }

    }

    return availability
}