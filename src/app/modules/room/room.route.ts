import authenticate from "../../middlewares/authenticate";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { RoomController } from "./room.controller";
import express from "express";
import { RoomValidation } from "./room.validation";

const router = express.Router();

router.post(
  "/rooms",
  authenticate(USER_ROLE.admin),
  validateRequest(RoomValidation.create),
  RoomController.createRoom
);
router.get("/rooms/:id", RoomController.getSingleRoom);
router.get("/rooms", RoomController.GetAllRooms);
router.put(
  "/rooms/:id",
  authenticate(USER_ROLE.admin),
  validateRequest(RoomValidation.update),
  RoomController.UpdateRoom
);
router.delete(
  "/rooms/:id",
  authenticate(USER_ROLE.admin),
  RoomController.DeleteRoom
);

export const RoomRoutes = router;
