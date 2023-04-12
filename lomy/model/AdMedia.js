const { Model, DataTypes } = require('sequelize');

class AdMedia extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      adMedia: {
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      modelName: 'AdMedia',
      tableName: 'ADMEDIA'
    });
  }

  getId() {
    return this.id;
  }

  getAdMedia() {
    return this.adMedia;
  }

  setAdMedia(adMedia) {
    this.adMedia = adMedia;
  }

  constructor(adMedia) {
    super();
    this.adMedia = adMedia;
  }

  toString() {
    return `AdMedia { id=${this.id}, adMedia='${this.adMedia}' }`;
  }
}

module.exports = AdMedia;