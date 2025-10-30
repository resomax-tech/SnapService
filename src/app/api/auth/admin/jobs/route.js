import { NextResponse } from "next/server";
import { toDateKey } from "@/lib/normalizeDate";
import db_connect from "@/lib/connectDB";
import JobModel from "@/models/JobModel";
import CommunityModel from "@/models/CommunityModel";
import SubscriptionModel from "@/models/subscriptionModel";
import WorkerModel from "@/models/WorkerModel";
export async function GET(req) {
  try {
    await db_connect();

    const { searchParams } = new URL(req.url);
    const date = toDateKey(searchParams.get("date"));
    const community = searchParams.get("community");

    if (!date || !community) {
      return NextResponse.json(
        { error: "Missing required parameters: date and community" },
        { status: 400 }
      );
    }

    const jobs = await JobModel.find({
      community,
      dateKey: date,
    })
      .populate({
        path: "subscription",
        populate: {
          path: "user",
          select: "name mobile",
        },
      })
      .populate("community", "name");

    const formatted = jobs.map((job) => ({
      id: job._id,
      customer: job.subscription?.user?.name ?? "N/A",
      mobile: job.subscription?.user?.mobile ?? "N/A",
      community: job.community?.name ?? "N/A",
      flat: job.subscription?.flatNo ?? "N/A",
      bathrooms: job.bathrooms ?? 0,
      workType: job.workType ?? "N/A",
      status: job.status ?? "N/A",
    }));

    return NextResponse.json({ formatted }, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json()
    const {ids, status} = body

    if (!ids) {
      return NextResponse.json({ msg: "job id's required" })
    }

    const data = await JobModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status } }
    )

    return NextResponse.json({ msg: "jobs status updated", data }, { status: 200 })

  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ msg: error.message }, { status: 500 })
  }
}