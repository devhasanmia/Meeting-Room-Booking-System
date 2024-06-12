import { RoomController } from "./room.controller";
import express from "express";

const router = express.Router();

router.post("/rooms", RoomController.createRoom);
router.get("/rooms/:id", RoomController.getSingleRoom);
router.get("/rooms/", RoomController.GetAllRooms);
router.put("/rooms/:id", RoomController.UpdateRoom);
router.delete("/rooms/:id", RoomController.DeleteRoom);

export const RoomRoutes = router;
