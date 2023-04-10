//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

const Visible = require('./Visible');

class CreatePostDTO {
  constructor(visible, country, tag, type, rating, postText, isExperience) {
    this.visible = visible;
    this.country = country;
    this.tag = tag;
    this.type = type;
    this.rating = rating;
    this.postText = postText;
    this.isExperience = isExperience;
  }

  getVisible() {
    return this.visible;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  getCountry() {
    return this.country;
  }

  setCountry(country) {
    this.country = country;
  }

  getTag() {
    return this.tag;
  }

  setTag(tag) {
    this.tag = tag;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getRating() {
    return this.rating;
  }

  setRating(rating) {
    this.rating = rating;
  }

  getPostText() {
    return this.postText;
  }

  setPostText(postText) {
    this.postText = postText;
  }

  getIsExperience() {
    return this.isExperience;
  }

  setIsExperience(isExperience) {
    this.isExperience = isExperience;
  }

  getPhotos() {
    return this.photos;
  }

  setPhotos(photos) {
    this.photos = photos;
  }

  toString() {
    return `CreatePostDTO{ visible=${this.visible}, countryId=${this.country}, tag=${this.tag}, typeId=${this.type}, rating=${this.rating}, postText=${this.postText}, isExperience=${this.isExperience} }`;
  }
}

module.exports = CreatePostDTO;