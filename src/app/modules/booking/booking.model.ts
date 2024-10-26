import { model, Schema } from "mongoose";
import { Tbooking } from "./booking.interface";

const bookingSchema = new Schema<Tbooking>(
  {
    date: {
      type: String,
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Slot",
      },
    ],
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    isConfirmed: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed",
    },
    payment: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Booking = model<Tbooking>("Booking", bookingSchema);

export default Booking;
