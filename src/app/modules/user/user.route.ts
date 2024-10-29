import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { validateUser } from "./user.validation";
import authenticate from "../../middlewares/authenticate";
import { USER_ROLE } from "./user.constant";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(validateUser.create),
  UserController.signup
);

router.post("/login", UserController.login);

router.get("/all", authenticate(USER_ROLE.admin), UserController.getAllUser);
router.put("/:id", authenticate(USER_ROLE.admin), UserController.updateUser);
router.delete("/:id", authenticate(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
