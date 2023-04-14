const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
  host: 'localhost',
  dialect: 'mysql'
});
const UserService = require("../service/UserService");


class UserRole extends Model {}
UserRole.init({
  roleName: DataTypes.STRING
}, { sequelize, modelName: 'userRole' });

async function findByRoleName(roleName) {
  const userRole = await UserRole.findOne({
    where: {
      roleName
    }
  });
  return userRole;
}