import authenticate from "../../middlewares/authenticate";
import { USER_ROLE } from "../user/user.constant";
import { RoomController } from "./room.controller";
import express from "express";

const router = express.Router();

router.post("/rooms", authenticate(USER_ROLE.admin), RoomController.createRoom);
router.get("/rooms/:id", RoomController.getSingleRoom);
router.get("/rooms/", RoomController.GetAllRooms);
router.put(
  "/rooms/:id",
  authenticate(USER_ROLE.admin),
  RoomController.UpdateRoom
);
router.delete(
  "/rooms/:id",
  authenticate(USER_ROLE.admin),
  RoomController.DeleteRoom
);

export const RoomRoutes = router;
