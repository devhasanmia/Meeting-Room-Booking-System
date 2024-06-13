import { USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
