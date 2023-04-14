const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
  host: 'localhost',
  dialect: 'mysql'
});

class Ad extends Model {}
Ad.init({
  adName: DataTypes.STRING
}, { sequelize, modelName: 'ad' });

class AdMedia extends Model {}
AdMedia.init({
  mediaType: DataTypes.STRING
}, { sequelize, modelName: 'adMedia' });

class Country extends Model {}
Country.init({
  country: DataTypes.STRING
}, { sequelize, modelName: 'country' });

Ad.belongsTo(Country);
Ad.belongsTo(AdMedia);

async function findByCountry(country) {
  const ads = await Ad.findAll({
    where: {
      country
    }
  });
  return ads;
}

async function findByIdIs(id) {
  const ad = await Ad.findOne({
    where: {
      id
    }
  });
  return ad;
}

async function deleteByAdMediaAndCountry(adMediaId, countryId) {
  await Ad.destroy({
    where: {
      adMediaId,
      countryId
    }
  });
}
