import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/payment/confirmation", paymentController.confirmation);
router.post("/payment/paymentFaild", paymentController.paymentFaild);
router.get("/payment/paymentFaild", paymentController.paymentFaild);

export const paymentRoutes = router;
