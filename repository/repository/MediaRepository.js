const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class Media extends Model {}
Media.init({
  url: DataTypes.STRING,
  type: DataTypes.STRING
}, { sequelize, modelName: 'media' });

class Post extends Model {}
Post.init({
  title: DataTypes.STRING,
  content: DataTypes.STRING
}, { sequelize, modelName: 'post' });

Post.hasMany(Media);
Media.belongsTo(Post);

async function getMediaByPost(postId) {
  const media = await Media.findAll({
    where: {
      postId
    }
  });
  return media;
}