const { Model, DataTypes } = require('sequelize');

class IPLog extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      activityType: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      modelName: 'IPLog',
      tableName: 'IPLog'
    });
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setActivityType(activityType) {
    this.activityType = activityType;
  }

  getActivityType() {
    return this.activityType;
  }

  setDate(date) {
    this.date = date;
  }

  getDate() {
    return this.date;
  }

  constructor(user, activityType) {
    super();
    this.user = user;
    this.activityType = activityType;
    this.date = new Date();
  }
}

module.exports = IPLog;