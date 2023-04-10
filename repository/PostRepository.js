const Post = require('./model/post');
const { Op } = require('sequelize');

async function findPostById(postId) {
  const post = await Post.findOne({
    where: {
      id: postId,
    },
  });
  return post;
}

async function findExperienceOrCriticismPosts(isExperience, postStatus, page) {
  const posts = await Post.findAndCountAll({
    where: {
      isExperience,
      postStatus,
    },
    limit: 10,
    offset: (page - 1) * 10,
  });
  return posts;
}

async function findPostsByCountry(isExperience, country, postStatus, page) {
  const posts = await Post.findAndCountAll({
    where: {
      isExperience,
      country,
      postStatus,
    },
    limit: 10,
    offset: (page - 1) * 10,
  });
  return posts;
}

async function findPostsByUserAndId(user, id) {
  const post = await Post.findOne({
    where: {
      user_id: user.id,
      id,
    },
  });
  return !!post;
}

async function findPostsByType(isExperience, type, postStatus, page) {
  const posts = await Post.findAndCountAll({
    where: {
      isExperience,
      type,
      postStatus,
    },
    limit: 10,
    offset: (page - 1) * 10,
  });
  return posts;
}

async function findPostsByCountryAndType(isExperience, country, type, postStatus, page) {
  const posts = await Post.findAndCountAll({
    where: {
      isExperience,
      country,
      type,
      postStatus,
    },
    limit: 10,
    offset: (page - 1) * 10,
  });
  return posts;
}
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class Post extends Model {}
Post.init({
  isExperience: DataTypes.BOOLEAN,
  postStatus: DataTypes.INTEGER,
  tag: DataTypes.STRING,
  verified: DataTypes.BOOLEAN,
  likes: DataTypes.INTEGER,
  numberOfReports: DataTypes.INTEGER
}, { sequelize, modelName: 'post' });

async function findByIsExperienceAndPostStatusAndTagLikeOrderByVerifiedDescLikesDesc(isExperience, postStatus, tag, pageable) {
  const posts = await Post.findAll({
    where: {
      isExperience,
      postStatus,
      tag
    },
    order: [
      ['verified', 'DESC'],
      ['likes', 'DESC']
    ],
    limit: pageable.pageSize,
    offset: pageable.pageSize * pageable.pageNumber
  });
  return posts;
}

async function deleteById(id) {
  await Post.destroy({
    where: {
      id
    }
  });
}

async function findAllByPostStatusAndNumberOfReportsGreaterThanOrderByNumberOfReports(postStatus, numberOfReports, pageable) {
  const posts = await Post.findAll({
    where: {
      postStatus,
      numberOfReports: {
        [Op.gt]: numberOfReports
      }
    },
    order: [
      ['numberOfReports', 'ASC']
    ],
    limit: pageable.pageSize,
    offset: pageable.pageSize * pageable.pageNumber
  });
  return posts;
}

async function findAllByPostStatus(postStatus, pageable) {
  const posts = await Post.findAll({
    where: {
      postStatus
    },
    limit: pageable.pageSize,
    offset: pageable.pageSize * pageable.pageNumber
  });
  return posts;
}