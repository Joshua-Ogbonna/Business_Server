const express = require("express");
const router = express.Router();

const {
  register,
  login,
  resetPassword,
  forgotPassword,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/resetPassword").post(resetPassword);
router.route("/forgotPassword").post(forgotPassword);

module.exports = router;
