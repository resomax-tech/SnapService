import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Mobile must be 10 digits"]
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    workType: {
        type: String,
        enum: ["classic", "deep"],
        require: true
    },
    maxJobs: {
        type: Number,
        enum: [5, 7],
        default: 5,
        require: true
    }

}, { timestamps: true });

export default mongoose.models.Worker || mongoose.model("Worker", WorkerSchema)