const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

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