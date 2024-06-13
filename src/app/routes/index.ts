import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { RoomRoutes } from "../modules/room/room.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoutes } from "../modules/booking/booking.route";
const router = Router();
const moduleRoutes = [
  {
    path: "/api/auth/",
    route: UserRoutes,
  },
  {
    path: "/api",
    route: RoomRoutes,
  },
  {
    path: "/api",
    route: SlotRoutes,
  },
  {
    path: "/api",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
