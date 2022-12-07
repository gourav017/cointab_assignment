const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const authenticationFunctionality = express.Router();

authenticationFunctionality.post("/signup", (req, res) => {
  let { email, password } = req.body;

  bcrypt.hash(password, 6, async function (err, hash) {
    if (err) {
      res.send("something went wrong! please try agian");
    } else {
      let user = await userModel.create({
        email,
        password: hash,
        maxAttemptaDay: 5,
      });
      res.send({ msg: "Signup sucessfull", user });
    }
  });
});

authenticationFunctionality.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  let hash = user.password;

  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      var token = jwt.sign(
        { email: email, userId: user._id },
        process.env.SECRET_KEY
      );
      res.send({ msg: "login sucessfull", token: token, userId: user._id });
    } else {
      res.send("invalid credencial");
    }
  });
});

module.exports = authenticationFunctionality;
