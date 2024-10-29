import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { RoomRoutes } from "../modules/room/room.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { paymentRoutes } from "../modules/booking/payment/payment.routes";
const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/",
    route: RoomRoutes,
  },
  {
    path: "/",
    route: SlotRoutes,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
  {
    path: "/",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
