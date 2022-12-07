const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const cros = require("cors");
const authenticationFunctionality = require("./controller/AuthController");
const app = express();
app.use(express.json());
app.use(cros())
app.use("/",authenticationFunctionality)

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL
    );
    console.log("sucessfully connected to DB");
  } catch (err) {
    console.log("failed to connected DB");
  }
});
