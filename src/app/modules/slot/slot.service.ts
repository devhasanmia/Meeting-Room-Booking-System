import AppError from "../../errors/AppError";
import { Tcredential } from "../../interface/credential";
import credentialValidator from "../../utils/credentialValidator";
import Room from "../room/room.model";
import { Tslot } from "./slot.interface";
import Slot from "./slot.model";

const createSlot = async (user: Tcredential, payload: Tslot) => {
  await credentialValidator(user);
  const room = await Room.findById(payload.room);
  console.log(user);
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
  const data = await Slot.find({ isBooked: false }).populate("room");
  if (!data) {
    throw new AppError(404, "Slot not found");
  }
  if (data.length === 0) {
    throw new AppError(404, "Slot not found");
  }
  return data;
};

export const SlotService = {
  createSlot,
  getAvailabilitySlot,
};
