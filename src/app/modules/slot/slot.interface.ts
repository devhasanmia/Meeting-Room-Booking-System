import { Types } from "mongoose"

export type Tslot = {
    room: Types.ObjectId,
    date: string,
    startTime: string,
    endTime: string,
    isBooked: boolean,
}