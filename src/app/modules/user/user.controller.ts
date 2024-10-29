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

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await UserService.login(payload);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token: user.token,
      data: user.data,
    });
  }
);

const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await UserService.getAllUser();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All User Retrieved successfully",
      data: user,
    });
  }
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const user = await UserService.updateUser(id, payload);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: user,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: user,
    });
  }
);

export const UserController = {
  signup,
  login,
  getAllUser,
  updateUser,
  deleteUser,
};
