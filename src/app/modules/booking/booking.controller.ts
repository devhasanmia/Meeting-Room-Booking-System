import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./booking.service";

const CreateBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const booking = await BookingService.createBooking(payload);
  console.log(booking.isConfirmed);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    booking,
  });
});

const GetAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await BookingService.getAllBookings();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const getOwnBooking = catchAsync(async (req, res, next) => {
  const bookingUser = req.user;
  const bookings = await BookingService.OwnBooking(bookingUser);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const updateBooking = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;
  const booking = await BookingService.updateBooking(id, payload);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking updated successfully",
    data: booking,
  });
});

export const BookingController = {
  CreateBooking,
  GetAllBookings,
  getOwnBooking,
  updateBooking
};
