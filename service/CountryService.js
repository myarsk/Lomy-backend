//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported 

const CountryRepository = require('./CountryRepository');

class CountryService {
  constructor() {
    this.countryRepository = new CountryRepository();
  }

  addCountry(countryDTO) {
    const country = { country: countryDTO.country, language: countryDTO.language };
    this.countryRepository.save(country);
    return country;
  }

  getCountries() {
    const countries = [];
    this.countryRepository.findAll().forEach((country) => {
      countries.push(country);
    });
    return countries;
  }
}

module.exports = CountryService;