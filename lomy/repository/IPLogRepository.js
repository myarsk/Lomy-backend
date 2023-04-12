const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class IPLog extends Model {}
IPLog.init({
  ipAddress: DataTypes.STRING,
  userAgent: DataTypes.STRING
}, { sequelize, modelName: 'ipLog' });
