import mongoose, { Schema, Document } from "mongoose";

interface Order {
  phone_number: string;
  first_name: string;
  last_name: string;
  date: string;
  video_id: string;
}

const weddingSchema: Schema<Order> = new Schema(
  {
    phone_number: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    date: { type: String, required: true },
    video_id: { type: String},
  },
  {
    timestaps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("wedding", weddingSchema);
