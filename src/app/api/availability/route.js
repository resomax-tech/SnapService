import { NextResponse } from "next/server";
import Worker from "@/models/WorkerModel";
import mongoose from "mongoose";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";
import { normalizeLocalDate, toDateKey } from "@/lib/normalizeDate";
import JobModel from "@/models/JobModel";

const getDaysWindow = (weeks) => {
  if (weeks?.includes("4W")) return 45;
  if (weeks?.includes("2W")) return 30;
  return 30;
};

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const communityId = searchParams.get("community");
    const workType = searchParams.get("plan");
    const weeks = searchParams.get("weeks");
    const startDate = searchParams.get("startDate");

    // console.log(community, workType, weeks, startDate);

    if (!communityId || !mongoose.Types.ObjectId.isValid(communityId)) {
      return NextResponse.json({ msg: "Invalid or missing community ID" }, { status: 400 });
    }

    const workers = await Worker.find({
      communities: { $in: [communityId] },
      workType,
    });

    if (workers.length === 0) {
      return NextResponse.json({
        formatted: [],
        msg: "No workers found for this community and plan",
      });
    }

    // console.log("Found workers:", workers.length);

    const totalSlots = workers.reduce((sum, w) => sum + w.maxBathrooms, 0);



    const availableDates = await checkAvailability(startDate, totalSlots, workers, communityId, workType, weeks);

    const formatted = Object.entries(availableDates)
      .map(([date, info]) => ({
        date,
        ...info,
        fullBooked: info.available <= 0,
        isHoliday: info.isHoliday || false,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return NextResponse.json({ formatted });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}



const checkAvailability = async (startDate, totalSlots, workers, communityId, workType, weeks) => {
  const availability = {};

  const today = startDate ? normalizeLocalDate(startDate) : normalizeLocalDate(new Date());
  const endDate = normalizeLocalDate(new Date(today));
  endDate.setDate(today.getDate() + getDaysWindow(weeks) + 1);

  const workerIds = workers.map((w) => w._id);

  // 🧮 1️⃣ Aggregate all jobs (assigned) for these workers across ALL communities
  const jobsAggregation = await JobModel.aggregate([
    {
      $match: {
        worker: { $in: workerIds },
        dateKey: { $gte: toDateKey(today), $lt: toDateKey(endDate) },
      },
    },
    {
      $group: {
        _id: { worker: "$worker", dateKey: "$dateKey" },
        totalBathrooms: { $sum: "$bathrooms" },
      },
    },
  ]);

  // 🗺️  Build global usage map per date & worker
  const workerUsageMap = {};
  for (const record of jobsAggregation) {
    const { worker, dateKey } = record._id;
    if (!workerUsageMap[dateKey]) workerUsageMap[dateKey] = {};
    workerUsageMap[dateKey][worker.toString()] = record.totalBathrooms;
  }

  // 🧮 2️⃣ Aggregate local community bookings (unassigned jobs or community-only)
  const communityBookings = await JobModel.aggregate([
    {
      $match: {
        community: new mongoose.Types.ObjectId(String(communityId)),
        workType: workType.toLowerCase(),
        dateKey: { $gte: toDateKey(today), $lt: toDateKey(endDate) },
      },
    },
    {
      $group: {
        _id: "$dateKey",
        totalBathrooms: { $sum: "$bathrooms" },
      },
    },
  ]);

  const communityBookedMap = communityBookings.reduce((acc, b) => {
    acc[b._id] = b.totalBathrooms;
    return acc;
  }, {});

  // 🗓️ 3️⃣ Calculate availability per day
  for (let i = 0; i < getDaysWindow(weeks); i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateKey = toDateKey(date);
    const isHoliday = date.getDay() === 0;

    if (isHoliday) {
      availability[dateKey] = { available: 0, total: totalSlots, isHoliday };
      continue;
    }

    // 🧠 Calculate remaining capacity per worker (across communities)
    let remainingSlots = 0;
    for (const w of workers) {
      const used = workerUsageMap[dateKey]?.[w._id.toString()] || 0;
      const remaining = Math.max(0, w.maxBathrooms - used);
      remainingSlots += remaining;
    }

    // 🧮 Subtract current community’s booked bathrooms
const available = Math.max(0, remainingSlots);

    availability[dateKey] = {
      available,
      total: totalSlots,
      isHoliday,
    };
  }

  return availability;
};

