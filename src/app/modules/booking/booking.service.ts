import AppError from "../../errors/AppError";
import { Tcredential } from "../../interface/credential";
import credentialValidator from "../../utils/credentialValidator";
import Room from "../room/room.model";
import Slot from "../slot/slot.model";
import User from "../user/user.model";
import { Tbooking } from "./booking.interface";
import Booking from "./booking.model";
import { initiatePayment } from "./payment/payment.utils";

const createBooking = async (user: Tcredential, payload: Tbooking) => {
  await credentialValidator(user);
  const slots = await Slot.find({ _id: { $in: payload.slots } });
  if (slots.length !== payload.slots.length) {
    throw new AppError(404, "One or more slots not found");
  }

  const room = await Room.findById(payload.room);
  if (!room || room.isDeleted) {
    throw new AppError(404, "Room not found");
  }
  const userExist = await User.findById(payload.user);
  if (!userExist) {
    throw new AppError(404, "User not found");
  }
  // Check Role
  if (userExist.role !== "user") {
    throw new AppError(403, "You are not allowed to create a booking");
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
  const amount = room.pricePerSlot * hour;
  payload.totalAmount = amount;

  payload.isConfirmed = "unconfirmed";
  // Slots isBooked = flase or not
  await Slot.find({ _id: { $in: payload.slots } }).then((slots) => {
    slots.forEach((slot) => {
      if (slot.isBooked) {
        throw new AppError(400, "Slot is already booked");
      }
    });
  });
  const booking = await Booking.create(payload);
  await Slot.updateMany(
    { _id: { $in: payload.slots } },
    { $set: { isBooked: true } }
  );
  await (
    await (await booking.populate("room")).populate("slots")
  ).populate({ path: "user", select: "-password" });
  const tnxIdgen = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${randomString}-${timestamp}`;
  };
  const paymentData = {
    tran_id: tnxIdgen(),
    amount: booking.totalAmount,
  };
  const paymentSession = initiatePayment(paymentData);
  return paymentSession;
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
  const booking = await Booking.findById(id);
  if (!booking || booking.isDeleted) {
    throw new AppError(404, "Booking not found");
  }
  const deleteBooking = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return deleteBooking;
};
export const BookingService = {
  createBooking,
  getAllBookings,
  OwnBooking,
  updateBooking,
  deleteBooking,
};
