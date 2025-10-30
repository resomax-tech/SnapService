import { NextResponse } from "next/server";
import JobModel from "@/models/JobModel";
import UserModel from "@/models/UserModel";
import WorkerModel from "@/models/WorkerModel";
import CommunityModel from "@/models/CommunityModel";
import subscriptionModel from "@/models/subscriptionModel";
import db_connect from "@/lib/connectDB";


export async function GET(req) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

    await db_connect()
    const workerCount = await WorkerModel.countDocuments();
    const communityCount = await CommunityModel.countDocuments();
    const subscriptionCount = await subscriptionModel.countDocuments();
    const usersCount = await UserModel.countDocuments();

    const totalWorkers = await WorkerModel.find({});
    const totalUsers = await UserModel.find({});
    const totalCommunities = await CommunityModel.find({});
    const totalSubscriptions = await subscriptionModel.find({});

    const jobsPerCommunity = await JobModel.aggregate([
        { $group: { _id: "$community", jobs: { $sum: 1 } } },
    ]);

    // Plan distribution
    const planDistribution = await subscriptionModel.aggregate([
        { $group: { _id: "$plan", count: { $sum: 1 } } },
    ]);

    return NextResponse.json({
        totalWorkers,
        totalCommunities,
        totalUsers,
        totalSubscriptions,
        workerCount,
        usersCount,
        communityCount,
        subscriptionCount,
        jobsPerCommunity: jobsPerCommunity.map((j) => ({
            community: j._id,
            jobs: j.jobs,
        })),
        planDistribution: planDistribution.map((p) => ({
            plan: p._id,
            value: p.count,
        })),
    })
}