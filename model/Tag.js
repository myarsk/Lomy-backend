
const { Model, DataTypes } = require('sequelize');

class Tag extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tag: {
        type: DataTypes.STRING,
        unique: true
      },
      rating: {
        type: DataTypes.DOUBLE
      },
      numberOfRaters: {
        type: DataTypes.INTEGER
      }
    }, {
      sequelize,
      modelName: 'Tag',
      tableName: 'TAG'
    });
  }

  getId() {
    return this.id;
  }

  constructor(tag, rating, numberOfRaters) {
    super();
    this.tag = tag;
    this.rating = rating;
    this.numberOfRaters = 0;
  }

  getNumberOfRaters() {
    return this.numberOfRaters;
  }

  setNumberOfRaters(numberOfRaters) {
    this.numberOfRaters = numberOfRaters;
  }

  getTag() {
    return this.tag;
  }

  setTag(tag) {
    this.tag = tag;
  }

  getRating() {
    return this.rating;
  }

  setRating(rating) {
    this.rating = rating;
  }

  toString() {
    return `Tag { id=${this.id}, tag='${this.tag}', numberOfRaters=${this.numberOfRaters}, rating=${this.rating} }`;
  }
}

module.exports = Tag;