
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userName: {
        type: DataTypes.STRING,
        unique: true
      },
      language: {
        type: DataTypes.STRING,
        defaultValue: 'en'
      },
      isActivated: DataTypes.BOOLEAN,
      activationCode: DataTypes.INTEGER,
      theme: {
        type: DataTypes.STRING,
        defaultValue: 'white'
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true
        },
        set(value) {
          this.setDataValue('password', value);
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'USERS'
    });
  }

  static associate(models) {
    this.belongsToMany(models.UserRole, {
      through: 'SECURITY_ROLE',
      foreignKey: 'user_id',
      otherKey: 'role_id'
    });
  }

  generateActivationCode() {
    const random = Math.floor(Math.random() * (50000 - 1000 + 1) + 1000);
    this.activationCode = random;
  }
}

module.exports = User;