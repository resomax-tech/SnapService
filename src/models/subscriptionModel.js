import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true
  },
  plan: {
    type: String,
    enum: ["2W_CLASSIC", "2W_DEEP", "4W_CLASSIC", "4W_DEEP"],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  bookedDates: [
    {
      type: Date
    }
  ],
  bathrooms: {
    type: Number,
    required: true,
    default: 1
  },
  status: {
    type: String,
    enum: ["active", "expired", "paused", "cancelled"],
    default: "active"
  },
  flatNo: {
    type: String,
    required: true
  },
  message: {
    type: String,
  }
  
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
