const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
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

exports.findById = findById;
exports.deleteById = deleteById;
