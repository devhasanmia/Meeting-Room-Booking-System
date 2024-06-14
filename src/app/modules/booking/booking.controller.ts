import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./booking.service";
import { Tcredential } from "../../interface/credential";

const CreateBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const user = req.user;
  const payload = req.body;
  const booking = await BookingService.createBooking(
    user as Tcredential,
    payload
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    data:booking,
  });
});

const GetAllBookings = catchAsync(async (req, res, next) => {
  const user = req.user;
  const bookings = await BookingService.getAllBookings(user as Tcredential);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All bookings retrieved successfully",
    data: bookings,
  });
});

const getOwnBooking = catchAsync(async (req, res, next) => {
  const user = req.user;
  const bookings = await BookingService.OwnBooking(user as Tcredential);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const updateBooking = catchAsync(async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  const payload = req.body;
  const booking = await BookingService.updateBooking(
    user as Tcredential,
    id,
    payload
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking updated successfully",
    data: booking,
  });
});

const deleteBooking = catchAsync(async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  const booking = await BookingService.deleteBooking(
    user as Tcredential,
    id
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking deleted successfully",
    data: booking,
  });
})

export const BookingController = {
  CreateBooking,
  GetAllBookings,
  getOwnBooking,
  updateBooking,
  deleteBooking
};
