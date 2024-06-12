import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const signup: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = await UserService.signup(payload);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: user,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await UserService.login(payload);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: user.token,
    data: user.data,
  });
});

export const UserController = {
  signup,
  login,
};
