import { Types } from "mongoose";

export type Tbooking = {
  date: string;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
  totalAmount?: number;
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
  isDeleted: boolean;
  payment: "Paid" | "Unpaid";
  transactionId: string;
};
