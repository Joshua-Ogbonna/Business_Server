const Business = require("../models/BusinessModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register route

exports.register = async (req, res, next) => {
  let {
    name,
    email,
    password,
    phoneNo,
    businessName,
    businessType,
    businessAddress,
    businessState,
    businessCountry,
    noOfEmployees,
    confirmPassword,
  } = req.body;
  try {
    let existingUser = await Business.findOne({ email: req.body.email });
    console.log(existingUser);
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    if (!confirmPassword) {
      return res.json({ message: "Confirm Password required" });
    }
    if (password !== confirmPassword) {
      return res.json({ message: "Passwords should match" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const business = new Business({
          name,
          email,
          password: hash,
          phoneNo,
          businessName,
          businessType,
          businessAddress,
          businessState,
          businessCountry,
          noOfEmployees,
        });
        let newBusiness = business.save();
        const token = jwt.sign({ user: newBusiness._id }, process.env.SECRET);
        res
          .cookie("token", token, {
            httpOnly: true,
          })
          .send();
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Login route

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  let errorMessage = "";

  if (!email || !password) {
    errorMessage = !email ? "Email is required" : "Password is required";
    return res.json({
      message: errorMessage,
    });
  }
  let businessInfo = await Business.findOne({ email });
  if (!businessInfo) {
    return res.status(404).json({
      message: "User not found! Please check your details or register",
    });
  }
  const correctPassword = await bcrypt.compare(password, businessInfo.password);
  if (!correctPassword) {
    return res.json({
      message: "Incorrect Password!",
    });
  }
  const token = jwt.sign({ user: businessInfo._id }, process.env.SECRET);
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .send();
};

// Logout route
exports.logout = (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).send()
}

exports.forgotPassword = (req, res, next) => {
  res.json("Reset Password Route");
};

exports.resetPassword = (req, res, next) => {
  res.json("Reset Password Route");
};
