import { Types } from "mongoose";

export type Tcredential = {
    userId: Types.ObjectId;
    email: string;
    role: "user" | "admin";
    iat: number;
    exp: number;
  }