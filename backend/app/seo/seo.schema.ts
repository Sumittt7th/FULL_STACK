import mongoose, { Schema, Document } from "mongoose";
import { ISEO } from "./seo.dto";

interface ISEODocument extends ISEO, Document {}

const SEOSchema = new Schema<ISEODocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    canonicalUrl: { type: String, required: true },
    robots: { type: String, default: "index, follow" },
    createdBy: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ISEODocument>("SEO", SEOSchema);
