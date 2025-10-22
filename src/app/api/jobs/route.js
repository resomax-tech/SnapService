import { NextResponse } from "next/server";
import JobModel from "@/models/JobModel";
import CommunityModel from "@/models/CommunityModel";
import WorkerModel from "@/models/WorkerModel";

import dbConnect from "@/lib/connectDB";
import { toDateKey } from "@/lib/normalizeDate";


export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    let date = toDateKey(searchParams.get("date"));

    const token = req.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));


    const jobs = await JobModel.find({
      dateKey: date,
    })
      // .populate({
      //   path: "subscription",
      //   populate: { path: "user", select: "name mobile" }
      // })
      // .populate("community", "name");

    // const formatted = jobs.map(job => ({
    //   id: job._id,
    //   customer: job.subscription?.user?.name ?? "N/A",
    //   mobile: job.subscription?.user?.mobile ?? "N/A",
    //   community: job.community?.name ?? "N/A",
    //   flat: job.subscription?.flatNo,
    //   bathrooms: job.bathrooms,
    //   workType: job.workType,
    //   status: job.status
    // }));

    return NextResponse.json({ jobs: jobs }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}





