const express = require("express");
const router = express.Router();

const {
  register,
  login,
  resetPassword,
  forgotPassword,
  logout,
  getUser,
} = require("../controllers/auth");
const auth = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/resetPassword").post(resetPassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/user").get(auth, getUser)

module.exports = router;
