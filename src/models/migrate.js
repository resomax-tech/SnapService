import mongoose from "mongoose";
import WorkerModel from "./WorkerModel.js";

const MONGO_URI = "mongodb+srv://resomaxtech_db_user:Reso%402025@snapservice.qtscbp3.mongodb.net/snapserviceDB";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected");

    // Find all workers that still have `community` field (old name)
    const workers = await WorkerModel.find({ community: { $exists: true } });

    console.log(`🔍 Found ${workers.length} workers to update`);

    for (const worker of workers) {
      // Create array if it's a single value
      const newCommunities = Array.isArray(worker.community)
        ? worker.community
        : [worker.community];

      // Update document: set communities and remove old field
      await WorkerModel.updateOne(
        { _id: worker._id },
        {
          $set: { communities: newCommunities },
          $unset: { community: "" }
        }
      );

      console.log(`✅ Updated: ${worker.name}`);
    }

    console.log("🎉 Migration complete!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    mongoose.connection.close();
  }
})();
