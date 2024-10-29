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
      name: user.name,
      userId: user._id,
      role: user.role,
    },
    config.SECRET_KEY as string,
    { expiresIn: "30d" }
  );
  const data = await User.findById(user._id).select("-password -__v");
  return {
    data,
    token: accessToken,
  };
};

const getAllUser = async () => {
  const userData = User.find({ role: "user" }).select("-password -__v");
  return userData;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
}

export const UserService = {
  signup,
  login,
  getAllUser,
  updateUser,
  deleteUser
};
