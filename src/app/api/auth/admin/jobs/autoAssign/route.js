import { NextResponse } from "next/server";
import JobModel from "@/models/JobModel";
import CommunityModel from "@/models/CommunityModel";
import WorkerModel from "@/models/WorkerModel";

import dbConnect from "@/lib/connectDB";
import { toDateKey } from "@/lib/normalizeDate";
import { getUnassignedJobs, getAvailableWorkers, assignJobsToWorkers } from "@/lib/handlers";


export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const dateKey = searchParams.get("date") || toDateKey(new Date());

        const token = req.cookies.get("admin_token")?.value;
        if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

        // handler 1 - get unassigned jobs
        const groupedJobs = await getUnassignedJobs(dateKey)
        console.log(groupedJobs);


        if (Object.keys(groupedJobs).length === 0) {
            return NextResponse.json({ msg: "No unassigned jobs found" });
        }


        const summary = []

        for (const key of Object.keys(groupedJobs)) {
            const [communityId, workType] = key.split('_')
            const jobs = groupedJobs[key]

            // handler 2 - get available workers 
            const workerCapacities = await getAvailableWorkers(communityId, workType, dateKey);
            if (workerCapacities.length === 0) {
                summary.push({ community: communityId, workType, assigned: 0, msg: "No available workers" });
                continue;
            }


            // handler 3 - assign jobs to workers
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
            dateKey,
            summary
            // groupedJobs
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
