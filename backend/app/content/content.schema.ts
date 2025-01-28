import mongoose, { Schema, Document } from "mongoose";
import { IContent } from "./content.dto";
import { ISEO } from "../seo/seo.dto";
import { IMedia } from "../media/media.dto";


const ContentSchema = new Schema<IContent>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String },
    tags: { type: [String], default: [] },
    author: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    seo: { type: mongoose.Schema.Types.ObjectId, ref: "SEO" }, 
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }], 
  },
  { timestamps: true }
);

export default mongoose.model<IContent>("Content", ContentSchema);
