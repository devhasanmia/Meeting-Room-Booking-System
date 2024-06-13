import { model, Schema } from "mongoose";
import { Tbooking } from "./booking.interface";

const bookingSchema = new Schema<Tbooking>(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Slot",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now(),
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
