const { Model, DataTypes } = require('sequelize');

class Media extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      media: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Media',
      tableName: 'MEDIA'
    });
  }

  constructor(media) {
    super();
    this.media = media;
  }

  getId() {
    return this.id;
  }

  getMedia() {
    return this.media;
  }

  setMedia(media) {
    this.media = media;
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  }

  toString() {
    return `Media{id=${this.id}, media='${this.media}}'`;
  }
}

module.exports = Media;
