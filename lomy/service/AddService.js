// Import the required modules
const AdMedia = require("../model/AdMedia"); // Assuming this is a mongoose model
const AdMediaRepository = require("../repository/AdMediaRepository"); // Assuming this is a custom module

// Define a service class
class AddService {
  constructor() {
    // Create an instance of the repository
    this.adMediaRepository = new AdMediaRepository();
  }

  // Define a method that creates an ad media
  async createAd(adMedia) {
    // Create a new ad media instance with the given string
    const adMedia1 = new AdMedia(adMedia);
    // Save the ad media using the repository and return the result
    return await this.adMediaRepository.save(adMedia1);
  }

  // Define a method that returns all ad media
  async getAll() {
    // Find all ad media using the repository and return the result
    return await this.adMediaRepository.findAll();
  }
}

// Export the class as a module
module.exports = AddService;