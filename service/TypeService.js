//Node.js 10.14.0
//Plain Javascript and Node.js is supported

const TypeRepository = require('../repository/TypeRepository');

class TypeService {
  constructor() {
    this.typeRepository = new Type();
  }

  createType(typeDTO) {
    const type = { type: typeDTO.type };
    return this.typeRepository.save(type);
  }

  getTypes() {
    return this.typeRepository.findAll();
  }
}

module.exports = TypeService;