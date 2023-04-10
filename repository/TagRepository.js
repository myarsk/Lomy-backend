const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class Tag extends Model {}
Tag.init({
  tag: DataTypes.STRING
}, { sequelize, modelName: 'tag' });

async function findById(id) {
  const tag = await Tag.findOne({
    where: {
      id
    }
  });
  return tag;
}

async function findByTag(tag) {
  const tag = await Tag.findOne({
    where: {
      tag
    }
  });
  return tag;
}