import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";
import argon2 from "argon2";

const signup = async (payload: TUser) => {
  payload.password = await argon2.hash(payload.password);
  const user = await User.create(payload);
  const data = await User.findById(user._id).select("-password");
  return data;
};

export type TLogin = {
  email: string;
  password: string;
};

const login = async (payload: TLogin) => {
  const { email, password } = payload;
  console.log("Login payload:", email, password); // Data found

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials");
  }

  console.log("Stored user:", user); // Log the user object
  console.log("Stored user password:", user.password); // Log the stored password

  if (!user.password) {
    throw new AppError(400, "User has no password set");
  }

  const isMatch = await argon2.verify(user.password, password);
  console.log("Password match:", isMatch); // Check if password matches

  if (!isMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials");
  }

  const data = await User.findById(user._id).select("-password");
  return data;
};

export const UserService = {
  signup,
  login,
};
