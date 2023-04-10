// Import modules
const express = require("express");
const router = express.Router();

// Import service and model
const CountryService = require("./services/CountryService");
const Country = require("./models/Country");

// Create instance of service
const countryService = new CountryService();

// Define routes
router.post("/", async (req, res) => {
  // Create a new country
  try {
    // Get the country data from the request body
    const countryDTO = req.body;

    // Create a country object and save it to the database
    const country = new Country(countryDTO.name, countryDTO.code);
    await countryService.addCountry(country);

    // Return the created country
    res.status(200).json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getCountries", async (req, res) => {
  // Get all countries
  try {
    // Get all countries from the database
    const countries = await countryService.getCountries();

    // Return the countries
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});