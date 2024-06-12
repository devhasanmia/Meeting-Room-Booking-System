import { model, Schema } from "mongoose";
import { Tbooking } from "./booking.interface";


const bookingSchema = new Schema<Tbooking>({
    room: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Room"
    },
    slots: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Slot"
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    totalAmount: {
        type: Number,
        required: true
    },
    isConfirmed: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"],
        default: "confirmed"
    }
}, { timestamps: true });


const Booking = model<Tbooking>("Booking", bookingSchema);

export default Booking;