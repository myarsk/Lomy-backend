//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

class CountryDTO {
  constructor(country, language) {
    this.country = country;
    this.language = language;
  }

  getCountry() {
    return this.country;
  }

  setCountry(country) {
    this.country = country;
  }

  getLanguage() {
    return this.language;
  }

  setLanguage(language) {
    this.language = language;
  }

  toString() {
    return `CountryDTO{ country=${this.country}, language=${this.language} }`;
  }
}

module.exports = CountryDTO;