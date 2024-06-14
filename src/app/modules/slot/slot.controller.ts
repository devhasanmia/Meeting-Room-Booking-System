import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { SlotService } from "./slot.service";
import { Tcredential } from "../../interface/credential";

const createSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const user = req.user;
  const slot = await SlotService.createSlot(user as Tcredential, payload);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Slots created successfully",
    data: slot,
  });
});

const getAllSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const slot = await SlotService.getAvailabilitySlot();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Available slots retrieved successfully",
    data: slot,
  });
});

export const SlotController = {
  createSlot,
  getAllSlot,
};
