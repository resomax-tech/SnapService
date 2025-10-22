import { NextResponse } from "next/server";
import Worker from "@/models/WorkerModel";
import mongoose from "mongoose";
import Job from "@/models/JobModel";
import dbConnect from "@/lib/connectDB";
import { normalizeLocalDate, toDateKey } from "@/lib/normalizeDate";

const getDaysWindow = (weeks) => {
  if (weeks?.includes("4W")) return 45;
  if (weeks?.includes("2W")) return 30;
  return 30;
};

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const community = searchParams.get("community");
    const workType = searchParams.get("plan");
    const weeks = searchParams.get("weeks");
    const startDate = searchParams.get("startDate");

    // console.log(community, workType, weeks, startDate);

    if (!community || !mongoose.Types.ObjectId.isValid(community)) {
      return NextResponse.json({ msg: "Invalid or missing community ID" }, { status: 400 });
    }

    // ✅ Correct plural and spelling
    const workers = await Worker.find({
      communities: { $in: [new mongoose.Types.ObjectId(community)] },
      workType,
    });

    console.log("Found workers:", workers.length);

    const totalSlots = workers.reduce((sum, w) => sum + w.maxBathrooms, 0);

    if (workers.length === 0) {
      return NextResponse.json({
        availableDates: {},
        msg: "No workers found for this community and plan",
      });
    }

    const availableDates = await checkAvailability(startDate, totalSlots, community, workType, weeks);

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

const checkAvailability = async (startDate, totalSlots, communityId, workType, weeks) => {
  const availability = {};

  const today = startDate ? normalizeLocalDate(startDate) : normalizeLocalDate(new Date());
  const endDate = normalizeLocalDate(new Date(today));
  endDate.setDate(today.getDate() + getDaysWindow(weeks) + 1);

  // console.log("StartDate", toDateKey(today));
  // console.log("endDate", toDateKey(endDate));

  // console.log(today, endDate, workType, weeks);
  console.log(toDateKey(today), toDateKey(endDate), workType, weeks, totalSlots);
  
  
  

  const booked = await Job.aggregate([
    {
      $match: {
        community: new mongoose.Types.ObjectId(String(communityId)),
        workType: workType.toLowerCase(),
        dateKey: { $gte: toDateKey(today) , $lt: toDateKey(endDate) },
      },
    },
    {
      $group: {
        _id: "$dateKey",
        totalBathrooms: { $sum: "$bathrooms" },
      },
    },
  ]);

  console.log("Found bookings:", booked.length); 

  const bookedMap = booked.reduce((acc, b) => {    
    acc[b._id] = b.totalBathrooms;
    return acc;
  }, {});
 

  for (let i = 0; i < getDaysWindow(weeks); i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateKey = toDateKey(date);
    const isHoliday = date.getDay() === 0;

    if (isHoliday) {
      availability[dateKey] = { available: 0, total: totalSlots, isHoliday };
      continue;
    }

    const bookedBathrooms = bookedMap[dateKey] || 0;

    availability[dateKey] = {
      available: totalSlots - bookedBathrooms,
      total: totalSlots,
      isHoliday,
    };
  }

  return availability;
};
