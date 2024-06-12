import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { RoomRoutes } from "../modules/room/room.route";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
