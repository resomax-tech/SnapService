import { NextResponse } from "next/server";
import Subscription from "@/models/subscriptionModel";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";
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

        // console.log("subscription: ", subscription);
        // console.log(jobType);
        


        await Promise.all(
            subscription.bookedDates.map((d) => {

                const normalized = normalizeLocalDate(d)
                const dateKey = toDateKey(d)

                Job.create({
                    subscription: subscription._id,
                    community: subscription.community,
                    date: normalized,
                    dateKey,
                    workType: jobType,
                    bathrooms: subscription.bathrooms,
                })
            }
            )
        );

        console.log(`Created ${subscription.bookedDates.length} jobs for subscription ${subscription._id}`);
    } catch (error) {
        console.error("❌ Error creating jobs:", error.message);
        throw new Error("Job generation failed");
    }
};
