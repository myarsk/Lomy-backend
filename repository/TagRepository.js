const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
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

async function findByTag(t) {
  const tag = await Tag.findOne({
    where: {
      tag: t
    }
  });
  return tag;
}