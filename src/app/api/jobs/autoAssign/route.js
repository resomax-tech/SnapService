import { NextResponse } from "next/server";
import JobModel from "@/models/JobModel";
import CommunityModel from "@/models/CommunityModel";

import { getUnassignedJobs, getAvailableWorkers, assignJobsToWorkers } from "@/lib/handlers";
import dbConnect from "@/lib/connectDB";
import { toDateKey } from "@/lib/normalizeDate";
import WorkerModel from "@/models/WorkerModel";


export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const date = toDateKey(searchParams.get("date"));

        const token = req.cookies.get("admin_token")?.value;
        if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
        const groupedJobs = await getUnassignedJobs(date)

        if (Object.keys(groupedJobs).length === 0) {
            return NextResponse.json({ msg: "No unassigned jobs found" });
        }


        const summary = []

        for (const key of Object.keys(groupedJobs)) {
            const [communityId, workType] = key.split('_')
            const jobs = groupedJobs[key]

            const workerCapacities = await getAvailableWorkers(communityId, workType, date);
            if (workerCapacities.length === 0) {
                summary.push({ community: communityId, workType, assigned: 0, msg: "No available workers" });
                continue;
            }


            const updates = await assignJobsToWorkers(jobs, workerCapacities)

            summary.push({
                community: communityId,
                workType,
                jobs,
                assigned: updates.length,
                workersUsed: workerCapacities.length
            });
        }

        return NextResponse.json({
            msg: "Auto-assignment completed",
            date,
            summary
            // groupedJobs
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
