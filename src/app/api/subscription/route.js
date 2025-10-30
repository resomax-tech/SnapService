import { NextResponse } from "next/server";
import Subscription from "@/models/subscriptionModel";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";
import { getAvailableWorkers, assignJobsToWorkers } from "@/lib/handlers";
import { normalizeLocalDate, toDateKey } from "@/lib/normalizeDate";
import { decryptToken } from "@/lib/auth";


export async function GET(req) {
    try {
        await dbConnect();
        const subscriptions = await Subscription.find({});
        return NextResponse.json({ subscriptions });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const token = req.cookies.get("access_token")?.value;

        if (!token) {
            return NextResponse.json({ loggedIn: false }, { status: 401 });
        }

        const payload = await decryptToken(token);
        body.user = payload.sub;

        // Normalize dates before saving
        if (!Array.isArray(body.bookedDates) || body.bookedDates.length === 0) {
            return NextResponse.json({ error: "No booking dates provided" }, { status: 400 });
        }

        // Convert "YYYY-MM-DD" → Date objects
        const bookedDates = body.bookedDates.map(toDateKey);

        //  Create subscription
        const subscription = await Subscription.create({
            ...body,
            bookedDates,
        });

        // Generate Jobs (await properly)
        await generateJobs(subscription);

        return NextResponse.json(
            {
                msg: "Subscription created successfully",
                subscriptionId: subscription._id,
                totalJobs: bookedDates.length,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Subscription creation error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


const generateJobs = async (subscription) => {
    try {
        console.log("subscription: ", subscription);

        const jobType = subscription.plan?.toLowerCase().includes("classic")
            ? "classic"
            : "deep";

        const jobs = [];

        // ✅ Step 1: Create Jobs (wait for each properly)
        for (const d of subscription.bookedDates) {
            const normalized = normalizeLocalDate(d);
            const dateKey = toDateKey(d);

            const job = await Job.create({
                subscription: subscription._id,
                community: subscription.community,
                date: normalized,
                dateKey,
                workType: jobType,
                bathrooms: subscription.bathrooms,
                status: "pending",
            });

            jobs.push(job);
        }

        console.log(`🧾 Created ${jobs.length} jobs for subscription ${subscription._id}`);

        // ✅ Step 2: Group Jobs by Date
        const groupedByDate = jobs.reduce((acc, job) => {
            if (!acc[job.dateKey]) acc[job.dateKey] = [];
            acc[job.dateKey].push(job);
            return acc;
        }, {});

        // ✅ Step 3: Auto-Assign Workers
        const summary = [];

        for (const dateKey of Object.keys(groupedByDate)) {
            const jobsForDate = groupedByDate[dateKey];
            const communityId = jobsForDate[0].community;
            const workType = jobsForDate[0].workType;

            // 1️⃣ Get available workers for that community/date
            const workerCapacities = await getAvailableWorkers(communityId, workType, dateKey);

            if (!workerCapacities || workerCapacities.length === 0) {
                summary.push({ community: communityId, workType, assigned: 0, msg: "No available workers" });
                continue;
            }

            // 2️⃣ Assign jobs to workers
            const updates = await assignJobsToWorkers(jobsForDate, workerCapacities);

            summary.push({
                community: communityId,
                workType,
                assigned: updates.length,
                workersUsed: workerCapacities.length,
            });

            console.log(`✅ Assigned ${updates.length} jobs for ${communityId} on ${dateKey}`);
        }

        console.log("🎉 Auto-assignment complete for subscription:", subscription._id);
        console.log("Summary:", summary);
    } catch (error) {
        console.error("❌ Error creating or assigning jobs:", error.message);
        throw new Error("Job generation failed");
    }
};

