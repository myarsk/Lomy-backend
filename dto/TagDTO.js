//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

class TagDTO {
  constructor(tag) {
    this.tag = tag;
  }

  getTag() {
    return this.tag;
  }

  setTag(tag) {
    this.tag = tag;
  }

  toString() {
    return `TagDTO{tag='${this.tag}'}`;
  }
}

module.exports = TagDTO;