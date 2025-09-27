import { NextResponse } from "next/server";
import Subscription from "@/models/subscriptionModel";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";
import { decryptToken } from "@/lib/auth";

export async function POST(req) {
    try {
        await dbConnect()
        const body = await req.json()

        const token = req.cookies.get("access_token")?.value;
        if (!token) {
            return NextResponse.json({ loggedIn: false });
        }
        const payload = await decryptToken(token)

        body.user = payload.sub
        body.bookedDates = generateDates(body.startDate, body.plan)

        const subscription = await Subscription.create(body)

        await generateJobs(subscription)

        return NextResponse.json(
            {
                msg: "Subscription created successfully",
                subscription,
                jobs: body.bookedDates.length
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}
export async function GET(req) {
    try {
        const subscriptions = await Subscription.find({})
        return NextResponse.json({ subscriptions: subscriptions })
    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}

const generateDates = (startDate, plan) => {
    const recurringDates = []
    let add = 0
    let n = 0

    if (plan.includes("4W")) {
        add = 7
        n = 3
    }
    else {
        add = 14
        n = 1
    }

    const date = new Date(startDate)
    recurringDates.push(date.toISOString().split("T")[0]);

    for (let i = 0; i < n; i++) {
        date.setDate(date.getDate() + add)
        recurringDates.push(date.toISOString().split("T")[0])
    }

    return recurringDates
}


const generateJobs = async (subscription) => {
    try {
        await Promise.all(
            subscription.bookedDates.map((d) => {
                Job.create({
                    subscriptionId: subscription._id,
                    communityId: subscription.community,
                    date: new Date(d.toISOString().split("T")[0]),
                    jobType: subscription.plan.includes("CLASSIC") ? "classic" : "deep",
                    bathrooms: subscription.bathrooms
                })
            })
        )
    } catch (error) {
        console.error("Error creating jobs:", error.message);
        throw new Error("Job generation failed");
    }
}
