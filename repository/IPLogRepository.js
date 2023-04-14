const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
  host: 'localhost',
  dialect: 'mysql'
});

class IPLog extends Model {}
IPLog.init({
  ipAddress: DataTypes.STRING,
  userAgent: DataTypes.STRING
}, { sequelize, modelName: 'ipLog' });
