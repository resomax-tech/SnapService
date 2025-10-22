import { NextResponse } from "next/server";
import { toDateKey } from "@/lib/normalizeDate";
import db_connect from "@/lib/connectDB";
import JobModel from "@/models/JobModel";
import CommunityModel from "@/models/CommunityModel";
import subscriptionModel from "@/models/subscriptionModel";
import WorkerModel from "@/models/WorkerModel";





export async function GET(req) {
    try {
        await db_connect()
        const { searchParams } = new URL(req.url);
        const date = toDateKey(searchParams.get("date"));
        const worker = searchParams.get("worker")

        const jobs = await JobModel.find({
            worker,
            dateKey: date
        }).populate({
            path: "subscription",
            populate: { path: "user", select: "name mobile" }
        }).populate("community", "name");

        const formatted = jobs.map(job => ({
            id: job._id,
            customer: job.subscription?.user?.name ?? "N/A",
            mobile: job.subscription?.user?.mobile ?? "N/A",
            community: job.community?.name ?? "N/A",
            flat: job.subscription?.flatNo,
            bathrooms: job.bathrooms,
            workType: job.workType,
            status: job.status
        }));


        // console.log(formatted);


        return NextResponse.json({ formatted: formatted }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}