import mongoose, { Schema, Document } from "mongoose";

interface Order {
  user_id: Schema.Types.ObjectId;
  sub_total: Number;
  phone_number: string;
}

const orderSchema: Schema<Order> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    sub_total: { type: Number, required: true },
    phone_number: { type: String, required: true },
  },
  {
    timestaps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("order", orderSchema);
