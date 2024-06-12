import { Types } from "mongoose";

export type Tbooking = {
    room: Types.ObjectId,
    slots: Types.ObjectId[],
    user: Types.ObjectId,
    totalAmount: number,
    isConfirmed: "confirmed" | "unconfirmed" | "canceled"
}