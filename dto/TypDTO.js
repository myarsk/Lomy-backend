//Node.js 10.14.0
//Plain Javascript and Node.js is supported
class TypeDTO {
  constructor(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  toString() {
    return `TypeDTO{type='${this.type}'}`;
  }
}

module.exports = TypeDTO;