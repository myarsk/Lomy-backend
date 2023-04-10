
const { Model, DataTypes } = require('sequelize');

class Type extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.STRING,
        unique: true
      }
    }, {
      sequelize,
      modelName: 'Type',
      tableName: 'TYPE'
    });
  }

  getId() {
    return this.id;
  }

  constructor(type) {
    super();
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  toString() {
    return `Type { id=${this.id}, type='${this.type}' }`;
  }
}

module.exports = Type;