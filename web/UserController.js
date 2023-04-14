const express = require("express");
const router = express.Router();
const UserService = require("../service/UserService");
const User = require("../model/User");
const userService = new UserService();

router.post("/", async (req, res) => {
  try {
    const userDTO = req.body;
    const user = new User(userDTO.username, userDTO.password, userDTO.email);
    await userService.signup(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/activate", async (req, res) => {
  try {
    const email = req.body.email;
    const activationCode = req.body.activationCode;
    const isActivated = await userService.activateUser(email, activationCode);
    if (isActivated) {
      res.status(200).json({
        message:
          "congrats your account is activated! \n please login with your credentials now",
      });
    } else {
      res.status(400).json({
        message:
          "incorrect activation code please check your email again, we send you new activation code",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginDTO = req.body;
    const result = await userService.signin(loginDTO, req);
    if (result.length > 0) {
      if (result[0].toString() === "NOT ACTIVATED") {
        await userService.sendActivationCode(loginDTO.username);
        res.status(403).json({ message: "please activate this user" });
      } else {
        res.status(200).json(result);
      }
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;