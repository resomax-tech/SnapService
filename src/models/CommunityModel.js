import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  plans: {
    twoweekclassic: { type: Number, required: true },
    twoweekdeep: { type: Number, required: true },
    fourweekclassic: { type: Number, required: true },
    fourweekdeep: { type: Number, required: true },
  }
}, { timestamps: true });

// ensure unique index with case-insensitive collation
communitySchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export default mongoose.models.Community || mongoose.model('Community', communitySchema);
