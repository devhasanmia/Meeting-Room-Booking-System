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
  const data = await Slot.find().populate("room");
  if (!data) {
    throw new AppError(404, "Slot not found");
  }
  if (data.length === 0) {
    throw new AppError(404, "Slot not found");
  }
  return data;
};

const getDateToSlot = async (query: any) => {
  const data = await Slot.find(query).populate("room");
  if (!data) {
    throw new AppError(404, "Slot not found");
  }
  if (data.length === 0) {
    throw new AppError(404, "Slot not found");
  }
  return data;
};
const getSlotById = async (id: string) => {
  const data = await Slot.findById(id);
  if (!data) {
    throw new AppError(404, "Slot not found");
  }
  return data;
};

export const SlotService = {
  createSlot,
  getAvailabilitySlot,
  getDateToSlot,
  getSlotById
};
