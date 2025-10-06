
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        default: null
    },
    community: {
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
    workType: {
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