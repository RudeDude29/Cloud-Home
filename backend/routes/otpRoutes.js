const express = require("express");
const { generateOtp , verifyOtp } = require("../controller/otpControllers");

const otpRouter = express.Router();

otpRouter.get("/generate-otp", generateOtp);

otpRouter.post("/verifyOtp",verifyOtp);

module.exports = otpRouter;
