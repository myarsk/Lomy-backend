const { Model, DataTypes } = require('sequelize');

class Country extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      country: {
        type: DataTypes.STRING,
        unique: true
      },
      language: {
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      modelName: 'Country',
      tableName: 'COUNTRY'
    });
  }

  getId() {
    return this.id;
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

  constructor(country, language) {
    super();
    this.country = country;
    this.language = language;
  }

  toString() {
    return `Country { id=${this.id}, country='${this.country}', language='${this.language}' }`;
  }
}

module.exports = Country;