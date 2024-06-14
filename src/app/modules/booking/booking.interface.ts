import { Types } from "mongoose";

export type Tbooking = {
  totalAmount?: number;
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  date: Date;
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
  isDeleted: boolean;
};
