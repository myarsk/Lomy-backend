const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
  host: 'localhost',
  dialect: 'mysql'
});

class Country extends Model {}
Country.init({
  country: DataTypes.STRING
}, { sequelize, modelName: 'country' });

async function findById(id) {
  const country = await Country.findOne({
    where: {
      id
    }
  });
  return country;
}

async function deleteById(id) {
  await Country.destroy({
    where: {
      id
    }
  });
}

async function findByCountry(c) {
  const country = await Country.findOne({
    where: {
      country: c
    }
  });
  return country;
}

