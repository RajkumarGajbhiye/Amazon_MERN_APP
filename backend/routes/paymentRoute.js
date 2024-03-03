import express from "express";
import { protect } from "../controller/userController.js";
import { processPayment, sendStripeApiKey } from "../controller/paymentController.js";

const router = express.Router();

router.route("/payment/process").post(protect, processPayment);

router.route("/stripeapikey").get(protect, sendStripeApiKey);

export default router;
