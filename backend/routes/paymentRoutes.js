const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const router =  express.Router()
const {isAuthenticatedUser,autharizeRole} = require("../middleware/auth")

router.route("/payment/process").post(isAuthenticatedUser,autharizeRole("admin"), processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser,autharizeRole("admin"), sendStripeApiKey );
module.exports = router;