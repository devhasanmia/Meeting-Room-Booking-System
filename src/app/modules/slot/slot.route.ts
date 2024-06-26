import express from "express";
import { SlotController } from "./slot.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidation } from "./slot.validation";
import { USER_ROLE } from "../user/user.constant";
import authenticate from "../../middlewares/authenticate";
const router = express.Router();

router.post(
  "/slots",
  authenticate(USER_ROLE.admin),
  validateRequest(SlotValidation.slotValidationSchema as any),
  SlotController.createSlot
);

router.get("/slots/availability", SlotController.getAllSlot);

export const SlotRoutes = router;
