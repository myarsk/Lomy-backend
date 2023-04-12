const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class LomyVerified extends Model {}
LomyVerified.init({
  verified: DataTypes.BOOLEAN
}, { sequelize, modelName: 'lomyVerified' });

class User extends Model {}
User.init({
  email: DataTypes.STRING,
  userName: DataTypes.STRING
}, { sequelize, modelName: 'user' });

class Tag extends Model {}
Tag.init({
  name: DataTypes.STRING
}, { sequelize, modelName: 'tag' });

LomyVerified.belongsTo(User);
LomyVerified.belongsTo(Tag);

async function findByUserAndTag(userId, tagId) {
  const lomyVerified = await LomyVerified.findOne({
    where: {
      userId,
      tagId
    }
  });
  return lomyVerified;
}

async function deleteByUserAndTag(userId, tagId) {
  await LomyVerified.destroy({
    where: {
      userId,
      tagId
    }
  });
}
