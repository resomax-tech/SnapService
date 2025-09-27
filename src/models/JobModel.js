
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        default: null
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true
    },
    bathrooms: {
        type: Number,
        required: true,
        default: 1
    },
    date: {
        type: Date,
        required: true
    },
    jobType: {
        type: String,
        enum: ["classic", "deep"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "assigned", "completed"],
        default: "pending"
    }
}, { timestamps: true });


export default mongoose.models.Job || mongoose.model("Job", JobSchema)