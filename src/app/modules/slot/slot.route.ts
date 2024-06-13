import express from "express";
import { SlotController } from "./slot.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidation } from "./slot.validation";
const router = express.Router();

router.post("/slots", validateRequest(SlotValidation.slotValidationSchema), SlotController.createSlot);


export const SlotRoutes = router;