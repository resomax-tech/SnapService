import mongoose from "mongoose";
import WorkerModel from "./WorkerModel.js";

let isConnected = false

const database_connection = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://resomaxtech_db_user:Reso%402025@snapservice.qtscbp3.mongodb.net/snapserviceDB")
        isConnected = true
        console.log("Database connected")
    } catch (error) {
        console.log("Error: ", error.message)
    }
}



(async () => {
  try {
    await database_connection()

    const workers = await WorkerModel.find({});
    
    for (const worker of workers) {
      console.log(worker);
      // if the worker has a single community field (not array)
      if (worker.community && !Array.isArray(worker.community)) {
        worker.community = [worker.community];
        await WorkerModel.save();
        console.log(`Updated worker: ${worker.name}`);
      }
    }

    console.log("✅ Migration complete!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Migration failed:", error);
    mongoose.connection.close();
  }
})();
