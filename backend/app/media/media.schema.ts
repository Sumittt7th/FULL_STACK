import mongoose, { Schema, Document } from "mongoose";
import { IMedia } from "./media.dto";


const MediaSchema = new Schema<IMedia>(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    createdBy: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IMedia>("Media", MediaSchema);
