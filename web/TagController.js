
// Import modules
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Import service and model
// const TagService = require("./services/TagService");
// const UserService = require("./services/UserService");
// const Tag = require("./models/Tag");
// const User = require("./models/User");

// Create instances of service
// const tagService = new TagService();
// const userService = new UserService();

// Define routes
router.post("/", async (req, res) => {
  // Create a new tag
  try {
    // Get the tag data from the request body
    const tagDTO = req.body;

    // Create a tag object and save it to the lomyvijb_lomy
    const tag = new Tag(tagDTO.name);
    await tagService.createTag(tag);

    // Return the created tag
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getAll", async (req, res) => {
  // Get all tags
  try {
    // Get all tags from the lomyvijb_lomy
    const tags = await tagService.getAllTags();

    // Return the tags
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/verifyTag", async (req, res) => {
  // Verify a tag
  try {
    // Get the tag id and user name from the request params
    const tagId = req.query.tagId;
    const userName = req.query.userName;

    // Get the user from the token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.getUserById(decodedToken.id);

    // Check if the user is authorized to verify the tag
    const user11 = await userService.getUserByUserName(userName);
    if (!user || !user11 || user.id !== user11.id) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    // Delete the verification from the lomyvijb_lomy
    await tagService.deleteVerification(tagId, user);

    // Return a success message
    res.status(200).json({ message: "Verification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});