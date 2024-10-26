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
  const slots = await SlotService.getAvailabilitySlot();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Available slots retrieved successfully",
    data: slots,
  });
});

const getDateToSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const { date, room } = req.query;
  const query: any = {};
  if (date && room) {
    query.date = date;
    query.room = room;
  } else if (!date && !room) {
    return next({
      statusCode: 400,
      message: "Both 'date' and 'room' query parameters are required.",
    });
  }
  const slots = await SlotService.getDateToSlot(query);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Available slots retrieved successfully",
    data: slots,
  });
});

const getSlotById: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slots = await SlotService.getSlotById(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Slot retrieved successfully",
    data: slots,
  });
});
export const SlotController = {
  createSlot,
  getAllSlot,
  getDateToSlot,
  getSlotById
};
