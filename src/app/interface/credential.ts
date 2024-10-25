import { Types } from "mongoose";

export type Tcredential = {
    userId: Types.ObjectId;
    name: string;
    email: string;
    role: "user" | "admin";
    iat: number;
    exp: number;
  }