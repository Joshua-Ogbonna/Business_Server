const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3040;

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/invoice"));

mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log(
      `Database successfully connected on ${process.env.MONGODB_URI}`
    );
  }
);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${3040}`);
});
