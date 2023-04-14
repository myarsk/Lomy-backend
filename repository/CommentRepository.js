const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lomyvijb_lomy', 'lomyvijb_admin', 'NpNEZ3GFT6cF2jR', {
  host: 'localhost',
  dialect: 'mysql'
});

class Comment extends Model {}
Comment.init(
  {
    comment: DataTypes.STRING
  },
  { sequelize, modelName: 'comment' }
);

class Post extends Model {}
Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  },
  { sequelize, modelName: 'post' }
);

class Reaction extends Model {}
Reaction.init(
  {
    reactionType: DataTypes.STRING
  },
  { sequelize, modelName: 'reaction' }
);

class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    userName: DataTypes.STRING
  },
  { sequelize, modelName: 'user' }
);

Comment.belongsTo(Post);
Comment.belongsTo(User);
Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'parentComment' });

async function deleteById(id) {
  await Comment.destroy({ where: { id } });
}

async function getAllByPost(postId) {
  const comments = await Comment.findAll({ where: { postId } });
  return comments;
}

async function getAllByPostAndUserIs(postId, userId) {
  const comments = await Comment.findAll({ where: { postId, userId } });
  return comments;
}

async function findByUserAndPostAndCommentIsNull(userId, postId) {
  const comment = await Comment.findOne({
    where: { userId, postId, commentId: null }
  });
  return comment;
}

async function existsByUserIsAndIdIs(userId, id) {
  const exists = await Comment.findOne({ where: { userId, id } });
  return exists !== null;
}

async function existsByUserIsAndReactionIs(userId, reactionType) {
  const exists = await Comment.findOne({ where: { userId, reactionType } });
  return exists !== null;
}

async function deleteAllByPost(postId) {
  await Comment.destroy({ where: { postId } });
}
