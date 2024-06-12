import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { validateUser } from "./user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(validateUser.create),
  UserController.signup
);
router.post("/login", UserController.login);

export const UserRoutes = router;
