import { model, Schema } from "mongoose";
import { Tslot } from "./slot.interface";

const slotSchema = new Schema<Tslot>({
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        required: true,
    },
})