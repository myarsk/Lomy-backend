const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class Type extends Model {}
Type.init({
  type: DataTypes.STRING
}, { sequelize, modelName: 'type' });

async function findById(id) {
  const type = await Type.findOne({
    where: {
      id
    }
  });
  return type;
}

async function findByType(t) {
  const type = await Type.findOne({
    where: {
      type: t
    }
  });
  return type;
}