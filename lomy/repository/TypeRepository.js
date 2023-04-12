const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

class TypeRepository extends Model {}
TypeRepository.init({
  type: DataTypes.STRING
}, { sequelize, modelName: 'TypeRepository' });

async function findById(id) {
  const types = await Type.findOne({
    where: {
      id
    }
  });
  return TypeRepository;
}

async function findByType(TypeRepository) {
  const type = await Type.findOne({
    where: {
      TypeRepository
    }
  });
  return TypeRepository;
}