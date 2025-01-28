import mongoose, { Schema, Document } from "mongoose";
import {type IFormSchema } from "./form.dto";


const FormSchema = new Schema<IFormSchema>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fields: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
        label: { type: String, required: true },
        placeholder: { type: String },
        options: { type: [String] },
        validations: {
          required: { type: Boolean },
          maxLength: { type: Number },
          minLength: { type: Number },
          regex: { type: String },
        },
      },
    ],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFormSchema>("Form", FormSchema);
