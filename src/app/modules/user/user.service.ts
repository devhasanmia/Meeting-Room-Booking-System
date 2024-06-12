import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const signup = async (payload: TUser) => {
  const user = await User.create(payload);
  const data = await User.findById(user._id).select("-password");
  return data;
};

const login = async (payload: TLogin) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials");
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    config.SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  const data = await User.findById(user._id).select("-password -__v");

  return {
    data,
    token: accessToken,
  };
};
export const UserService = {
  signup,
  login,
};
