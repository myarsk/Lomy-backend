// Import modules
const express = require("express");
const router = express.Router();

// Import service
// const AddService = require("../service/AddService");

// Create instance of service
const addService = new AddService();

// Define routes
router.post("/create", async (req, res) => {
  // Create a new ad
  try {
    // Get the ad data from the request body
    const ad = req.body.ad;

    // Create an ad object and save it to the database
    const result = await addService.createAd(ad);

    // Return the created ad
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  // Get all ads
  try {
    // Get all ads from the database
    const ads = await addService.getAll();

    // Return the ads
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});