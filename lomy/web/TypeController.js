// Import modules
const express = require("express");
const router = express.Router();

// Import service and model
const TypeService = require("../service/TypeService");
const Type = require("../model/Type");

// Create instance of service
const typeService = new TypeService();

// Define routes
router.post("/", async (req, res) => {
  // Create a new type
  try {
    // Get the type data from the request body
    const typeDTO = req.body;

    // Create a type object and save it to the database
    const type = new Type(typeDTO.name);
    await typeService.createType(type);

    // Return the created type
    res.status(200).json(type);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getTypes", async (req, res) => {
  // Get all types
  try {
    // Get all types from the database
    const types = await typeService.getTypes();

    // Return the types
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});