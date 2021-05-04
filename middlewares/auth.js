const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "User anauthorized! Login" });

    const verified = jwt.verify(token, process.env.SECRET);
    let { user } = verified;
    req.user = user;
    next()
  } catch (error) {
    console.error(error.message);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports = auth;
