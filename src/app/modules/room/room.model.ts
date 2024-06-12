import { model, Schema } from "mongoose";
import { Troom } from "./room.interface";

const RoomSchema = new Schema<Troom>({
    name: {
        type: String,
        required: true,
    },
    roomNo: {
        type: String,
        required: true,
    },
    floorNo: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    pricePerSlot: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


const Room = model<Troom>("Room", RoomSchema);

export default Room;