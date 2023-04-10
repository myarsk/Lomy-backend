
const { Model, DataTypes } = require('sequelize');

class UserRole extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      roleName: DataTypes.STRING,
      description: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'UserRole',
      tableName: 'USER_ROLE'
    });
  }

  getAuthority() {
    return this.roleName;
  }
}

module.exports = UserRole;