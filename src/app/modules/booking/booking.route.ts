import express from "express";
import { BookingController } from "./booking.controller";
import authenticate from "../../middlewares/authenticate";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/bookings",
  authenticate(USER_ROLE.user),
  BookingController.CreateBooking
);
router.get(
  "/bookings",
  authenticate(USER_ROLE.admin),
  BookingController.GetAllBookings
);
router.get(
  "/my-bookings",
  authenticate(USER_ROLE.user),
  BookingController.getOwnBooking
);
router.put(
  "/bookings/:id",
  authenticate(USER_ROLE.admin),
  BookingController.updateBooking
);

export const BookingRoutes = router;
