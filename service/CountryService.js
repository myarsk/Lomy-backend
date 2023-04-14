//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported 
const { findById, deleteById, findByCountry } = require('../repository/CountryRepository');

class CountryService {
  constructor() {
    // No need to create an instance of CountryRepository
  }

  async addCountry(countryDTO) {
    const country = { country: countryDTO.country, language: countryDTO.language };
    await Country.create(country);
    return country;
  }

  async getCountries() {
    const countries = await Country.findAll();
    return countries;
  }
}

module.exports = CountryService;