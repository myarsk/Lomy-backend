
// Import modules
const express = require("express");
const router = express.Router();

// Import service and model
const UserService = require("./services/UserService");
const User = require("./models/User");

// Create instance of service
const userService = new UserService();

// Define routes
router.post("/", async (req, res) => {
  // Create a new user
  try {
    // Get the user data from the request body
    const userDTO = req.body;

    // Create a user object and save it to the database
    const user = new User(userDTO.username, userDTO.password, userDTO.email);
    await userService.signup(user);

    // Return the created user
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/activate", async (req, res) => {
  // Activate a user
  try {
    // Get the email and activation code from the request body
    const email = req.body.email;
    const activationCode = req.body.activationCode;

    // Activate the user in the database
    const isActivated = await userService.activateUser(email, activationCode);

    // Return a success or failure message
    if (isActivated) {
      res.status(200).json({
        message: "congrats your account is activated! \n please login with your credentials now",
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
  // Login a user
  try {
    // Get the login data from the request body
    const loginDTO = req.body;

    // Sign in the user and get the token and user object
    const result = await userService.signin(loginDTO, req);

    // Return a success or failure message
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