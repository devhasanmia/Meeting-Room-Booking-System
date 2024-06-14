import AppError from "../../errors/AppError";
import { Tcredential } from "../../interface/credential";
import credentialValidator from "../../utils/credentialValidator";
import Room from "../room/room.model";
import Slot from "../slot/slot.model";
import { Tbooking } from "./booking.interface";
import Booking from "./booking.model";

const createBooking = async (user: Tcredential, payload: Tbooking) => {
  await credentialValidator(user);
  const room = await Room.findById(payload.room);
  if (!room || room.isDeleted) {
    throw new AppError(404, "Room not found");
  }
  const slots = await Slot.find({ _id: { $in: payload.slots } });
  if (slots.length !== payload.slots.length) {
    throw new AppError(404, "One or more slots not found");
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
  payload.totalAmount = taka;
  payload.isConfirmed = "unconfirmed";
  console.log(payload);
  const booking = await Booking.create(payload);
  await Slot.updateMany(
    { _id: { $in: payload.slots } },
    { $set: { isBooked: true } }
  );
  await (
    await (await booking.populate("room")).populate("slots")
  ).populate({ path: "user", select: "-password" });

  return booking;
};

const getAllBookings = async (user: Tcredential) => {
  await credentialValidator(user);
  const bookings = await Booking.find({ isDeleted: false })
    .populate({ path: "room", select: "-isDeleted" })
    .populate({ path: "slots", select: "-isDeleted" })
    .populate({ path: "user", select: "-password" });
  return bookings;
};

const OwnBooking = async (user: Tcredential) => {
  await credentialValidator(user);
  const UserId = user.userId;
  const bookings = await Booking.find({ user: UserId, isDeleted: false });
  return bookings;
};

const updateBooking = async (
  user: Tcredential,
  id: string,
  payload: Partial<Tbooking>
) => {
  await credentialValidator(user);
  const booking = await Booking.findById(id);
  if (!booking || booking.isDeleted) {
    throw new AppError(404, "Booking not found");
  }
  const bookingUpdate = Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return bookingUpdate;
};


const deleteBooking = async (user: Tcredential, id: string) => {
  await credentialValidator(user);
  const booking = await Booking.findByIdAndUpdate(id, { isDeleted: true }, {new: true});
  if (!booking || booking.isDeleted) {
    throw new AppError(404, "Booking not found");
  }
  return booking
}
export const BookingService = {
  createBooking,
  getAllBookings,
  OwnBooking,
  updateBooking,
  deleteBooking
};
