const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class AdMedia extends Model {}
AdMedia.init({
  mediaType: DataTypes.STRING
}, { sequelize, modelName: 'adMedia' });

async function findById(id) {
  const adMedia = await AdMedia.findOne({
    where: {
      id
    }
  });
  return adMedia;
}

async function deleteById(id) {
  await AdMedia.destroy({
    where: {
      id
    }
  });
}
