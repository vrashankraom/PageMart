const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const { getToken, processPayment } = require("../controllers/paymentb");
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
