import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./booking.service";


const CreateBooking: RequestHandler = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const booking = await BookingService.createBooking(payload);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking created successfully",
        data: booking.booking,
        totalAmount: booking.taka,

    })
})

const GetAllBookings = catchAsync(async (req, res, next) => {
    const bookings = await BookingService.getAllBookings();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: bookings,
    })
})

const getOwnBooking = catchAsync(async (req, res, next) => {
    const bookings = await BookingService.getAllBookings();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: bookings,
    })
})


export const BookingController = {
    CreateBooking,
    GetAllBookings,
    getOwnBooking
}