import AppError from "../../errors/AppError";
import { Tcredential } from "../../interface/credential";
import credentialValidator from "../../utils/credentialValidator";
import Room from "../room/room.model";
import { Tslot } from "./slot.interface";
import Slot from "./slot.model";

const createSlot = async (user: Tcredential, payload: Tslot) => {
  await credentialValidator(user);
  const room = await Room.findById(payload.room);
  if (!room || room.isDeleted) {
    throw new AppError(404, "Room not found");
  }
  const newSlot = await Slot.create(payload);
  if (!newSlot) {
    throw new AppError(400, "Slot creation failed");
  }
  return newSlot;
};

const getAvailabilitySlot = async () => {
  const data = await Slot.find({ isBooked: false })
    .populate("room")
    .sort({ createdAt: -1 });
  if (!data) {
    throw new AppError(404, "Slot not found");
  }
  if (data.length === 0) {
    throw new AppError(404, "Slot not found");
  }
  return data;
};

const getDateToSlot = async (query: any) => {
  const data = await Slot.find(query).populate("room").sort({ createdAt: -1 });
  if (!data) {
    throw new AppError(404, "Slot not found");
  }
  if (data.length === 0) {
    throw new AppError(404, "Slot not found");
  }
  return data;
};
const getSlotById = async (id: string) => {
  const data = await Slot.findById(id).populate("room").sort({ createdAt: -1 });
  if (!data) {
    throw new AppError(404, "Slot not found");
  }
  return data;
};

const updateSlot = async (user: Tcredential, id: string, payload: Tslot) => {
  await credentialValidator(user);
  const room = await Room.findById(payload.room);
  if (!room || room.isDeleted) {
    throw new AppError(404, "Room not found");
  }
  const updatedSlot = await Slot.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedSlot) {
    throw new AppError(404, "Slot not found");
  }
  return updatedSlot;
};

const deleteSlot = async (user: Tcredential, id: string) => {
  await credentialValidator(user);
  const slot = await Slot.findByIdAndDelete(id);
  if (!slot) {
    throw new AppError(404, "Slot not found");
  }
  return slot;
};

export const SlotService = {
  createSlot,
  getAvailabilitySlot,
  getDateToSlot,
  getSlotById,
  deleteSlot,
  updateSlot,
};
