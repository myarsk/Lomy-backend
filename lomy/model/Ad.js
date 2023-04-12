// Import the required modules
const mongoose = require("mongoose"); // Assuming mongoose is used for MongoDB
const AdMedia = require("./AdMedia"); // Assuming this is a mongoose model
const Country = require("./Country"); // Assuming this is a mongoose model

// Define a schema for the ad model
const adSchema = new mongoose.Schema({
  // Define the properties and types
  country: {
    type: mongoose.Schema.Types.ObjectId, // Use an object id to reference the country model
    ref: "Country", // Specify the reference model name
  },
  adMedia: {
    type: mongoose.Schema.Types.ObjectId, // Use an object id to reference the ad media model
    ref: "AdMedia", // Specify the reference model name
  },
});

// Define a model for the ad schema
const Ad = mongoose.model("Ad", adSchema);

// Export the model as a module
module.exports = Ad;