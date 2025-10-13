import { NextResponse } from "next/server";
import Worker from "@/models/WorkerModel";
import mongoose from "mongoose";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";

export async function GET(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url);

    const community = searchParams.get('community')
    const workType = searchParams.get('plan')

    if (!community || !mongoose.Types.ObjectId.isValid(community)) {
      return NextResponse.json({ msg: "Invalid or missing community ID" }, { status: 400 });
    }

    const workers = await Worker.find({ community: new mongoose.Types.ObjectId(community), workType });

    const totalSlots = workers.reduce((sum, w) => sum + w.maxJobs, 0);

    if (workers.length === 0) {
      return NextResponse.json({ availableDates: {}, msg: "No workers found for this community and plan" });
    }

    const availableDates = await checkAvailability(totalSlots, community, workType)

    const formatted = Object.entries(availableDates).map(([date, info]) => ({
      date,
      ...info,
      fullBooked: info.available <= 0,
      isHoliday: info.isHoliday || false
    })).sort((a, b) => new Date(a.date) - new Date(b.date))

    return NextResponse.json({ formatted })
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}

const checkAvailability = async (totalSlots, communityId, workType) => {
  const availability = {};

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setUTCDate(today.getUTCDate() + 30);


  // 🔹 Single aggregation for all 30 days
  const booked = await Job.aggregate([
    {
      $match: {
        community: new mongoose.Types.ObjectId(String(communityId)),
        workType: workType.toLowerCase(),
        date: { $gte: today, $lt: endDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" }, // group by day
        },
        totalBathrooms: { $sum: "$bathrooms" },
      },
    },
  ]);


  // Convert aggregation result into a map { "2025-03-07": 5, "2025-03-08": 10, ... }
  const bookedMap = booked.reduce((acc, b) => {
    acc[b._id] = b.totalBathrooms;
    return acc;
  }, {});

  // Build availability for each of the next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() + i);

    const dateKey = date.toISOString().split("T")[0];
    const isHoliday = date.getUTCDay() === 0
    // Skip Sundays
    if (isHoliday) {
      availability[dateKey] = {
        available: 0,
        total: totalSlots,
        isHoliday
      };
      continue;
    }

    const bookedBathrooms = bookedMap[dateKey] || 0;

    availability[dateKey] = {
      available: totalSlots - bookedBathrooms,
      total: totalSlots,
      isHoliday
    };
  }

  return availability;
};
