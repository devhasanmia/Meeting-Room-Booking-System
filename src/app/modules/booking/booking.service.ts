import AppError from "../../errors/AppError";
import Room from "../room/room.model";
import Slot from "../slot/slot.model";
import User from "../user/user.model";
import { Tbooking } from "./booking.interface";
import Booking from "./booking.model";

const createBooking = async (payload: Tbooking) => {
  const room = await Room.findById(payload.room);
  //   console.log(room);
  if (!room || room.isDeleted) {
    throw new AppError(404, "Room not found");
  }
  const slots = await Slot.find({ _id: { $in: payload.slots } });
  if (slots.length !== payload.slots.length) {
    throw new AppError(404, "One or more slots not found");
  }
  const user = await User.findById(payload.user);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  let totalDuration = 0;
  slots.forEach((slot) => {
    const [startHour, startMinute] = slot.startTime.split(":").map(Number);
    const [endHour, endMinute] = slot.endTime.split(":").map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const duration = endTimeInMinutes - startTimeInMinutes;
    totalDuration += duration;
  });

  const hour = totalDuration / 60;
  const taka = room.pricePerSlot * hour;

  const booking = await Booking.create(payload);
  await Slot.updateMany({ $set: { isBooked: true } });
  await (await (await booking.populate("room")).populate("slots")).populate({ path: "user", select: "-password" });

  return {
    booking,
    taka,
  };
};

const getAllBookings = async () => {
    const bookings = await Booking.find({ isDeleted: false }).populate({ path: "room", select: "-isDeleted" }).populate({ path: "slots", select: "-isDeleted" }).populate({ path: "user", select: "-password" });
    return bookings;
}

const OwnBooking = async () => {
    const bookings = await Booking.find({ isDeleted: false }).populate({ path: "room", select: "-isDeleted" }).populate({ path: "slots", select: "-isDeleted" }).populate({ path: "user", select: "-password" });
    return bookings;
}

export const BookingService = {
  createBooking,
  getAllBookings,
  OwnBooking
};