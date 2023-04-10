const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.STRING
      },
      reaction: {
        type: DataTypes.STRING
      },
      visible: {
        type: DataTypes.STRING
      },
      isAuthor: {
        type: DataTypes.BOOLEAN,
        field: 'isAuthor',
        defaultValue: false
      },
      isLiked: {
        type: DataTypes.BOOLEAN,
        field: 'isLiked',
        defaultValue: false
      },
      isDisliked: {
        type: DataTypes.BOOLEAN,
        field: 'isDisliked',
        defaultValue: false
      }
    }, {
      sequelize,
      modelName: 'Comment',
      tableName: 'COMMENT'
    });
  }

  getId() {
    return this.id;
  }

  getComment() {
    return this.comment;
  }

  setComment(comment) {
    this.comment = comment;
  }

  getReaction() {
    return this.reaction;
  }

  setReaction(reaction) {
    this.reaction = reaction;
  }

  getVisible() {
    return this.visible;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  getPost() {
    return this.post;
  }

  setPost(post) {
    this.post = post;
  }

  constructor(post, visible, user) {
    super();
    this.user = user;
    this.post = post;
    this.visible = visible;
  }

  toString() {
    return `Comment { id=${this.id}, comment='${this.comment}', reaction='${this.reaction}', visible='${this.visible}', post=${this.post}, user=${this.user} }`;
  }
}

module.exports = Comment;