const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
  host: 'localhost',
  dialect: 'mysql'
});

class User extends Model {}
User.init({
  email: DataTypes.STRING,
  userName: DataTypes.STRING
}, { sequelize, modelName: 'user' });

async function findById(id) {
  const user = await User.findOne({
    where: {
      id
    }
  });
  return user;
}

async function findByEmail(email) {
  const user = await User.findOne({
    where: {
      email
    }
  });
  return user;
}

async function findByUserName(userName) {
  const user = await User.findOne({
    where: {
      userName
    }
  });
  return user;
}