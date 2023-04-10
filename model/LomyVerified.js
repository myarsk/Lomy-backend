const { Model, DataTypes } = require('sequelize');

class LomyVerified extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    }, {
      sequelize,
      modelName: 'LomyVerified',
      tableName: 'LOMYVERIFIED'
    });
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setTag(tag) {
    this.tag = tag;
  }

  getTag() {
    return this.tag;
  }

  constructor(user, tag) {
    super();
    this.user = user;
    this.tag = tag;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
  }
}

module.exports = LomyVerified;