import { NextResponse } from "next/server";
import Worker from "@/models/WorkerModel";
import mongoose from "mongoose";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";
import { normalizeLocalDate, toDateKey, fromDateKey } from "@/lib/normalizeDate";


const getDaysWindow = (weeks) => {
  if (weeks?.includes("4W")) return 45;  // cover 4-week plan safely
  if (weeks?.includes("2W")) return 30;  // cover 2-week plan safely
  return 30; // default fallback
};

export async function GET(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url);

    const community = searchParams.get('community')
    const workType = searchParams.get('plan')
    const weeks = searchParams.get('weeks')
    const startDate = searchParams.get('startDate')


    if (!community || !mongoose.Types.ObjectId.isValid(community)) {
      return NextResponse.json({ msg: "Invalid or missing community ID" }, { status: 400 });
    }

    const workers = await Worker.find({ community: new mongoose.Types.ObjectId(community), workType });

    const totalSlots = workers.reduce((sum, w) => sum + w.maxJobs, 0);

    if (workers.length === 0) {
      return NextResponse.json({ availableDates: {}, msg: "No workers found for this community and plan" });
    }

    const availableDates = await checkAvailability(startDate, totalSlots, community, workType, weeks)

    const formatted = Object.entries(availableDates).map(([date, info]) => ({
      date,
      ...info,
      fullBooked: info.available <= 0,
      isHoliday: info.isHoliday || false
    })).sort((a, b) => new Date(a.date) - new Date(b.date))

    return NextResponse.json({ formatted })
  } catch (error) {
    console.log(error);

    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}

const checkAvailability = async (startDate, totalSlots, communityId, workType, weeks) => {
  const availability = {};

  const today = startDate ? normalizeLocalDate(startDate) : normalizeLocalDate(new Date());

  const endDate = normalizeLocalDate(new Date(today))
  endDate.setDate(today.getDate() + getDaysWindow(weeks) + 1);

  //   console.log("Searching jobs between:", today.toISOString(), "and", endDate.toISOString());
  // console.log("WorkType:", workType.toLowerCase());

  // const test = await Job.findOne({
  //   community: new mongoose.Types.ObjectId(String(communityId)),
  //   workType: workType.toLowerCase(),
  // });

  // console.log("Found Job:", test);



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

  console.log(communityId, booked, workType, today, endDate);



  // Convert aggregation result into a map { "2025-03-07": 5, "2025-03-08": 10, ... }
  const bookedMap = booked.reduce((acc, b) => {
    acc[b._id] = b.totalBathrooms;
    return acc;
  }, {});

  // Build availability for each of the next 30 days
  for (let i = 0; i < getDaysWindow(weeks); i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateKey = toDateKey(date).split("T")[0];
    const isHoliday = date.getDay() === 0
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
