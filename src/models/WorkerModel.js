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
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    workType: {
        type: String,
        enum: ["classic", "deep"],
        require: true
    },
    maxBathrooms: {
        type: Number,
        default: 7
    },
    active: {
        type: Boolean,
        default: true
    },
    lastAssignedDate: {
        type: String
    }

}, { timestamps: true });

WorkerSchema.index({ workType: 1, communities: 1 });
export default mongoose.models.Worker || mongoose.model("Worker", WorkerSchema)