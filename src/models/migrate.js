import mongoose from "mongoose";
import WorkerModel from "./WorkerModel.js";
const MONGO_URI =
  "mongodb+srv://resomaxtech_db_user:Reso%402025@snapservice.qtscbp3.mongodb.net/snapserviceDB";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected");

    // Rename `maxJobs` to `maxBathrooms`
    const result = await WorkerModel.updateMany(
      {},
      { $rename: { maxJobs: "maxBathrooms" } }
    );

    console.log(`✅ ${result.modifiedCount} documents updated.`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    await mongoose.connection.close();
  }
})();
