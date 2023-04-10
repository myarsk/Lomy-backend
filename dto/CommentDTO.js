//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

class CommentDTO {
  constructor(comment, postId, visible) {
    this.comment = comment;
    this.postId = postId;
    this.visible = visible;
  }

  getVisible() {
    return this.visible;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  getComment() {
    return this.comment;
  }

  setComment(comment) {
    this.comment = comment;
  }

  getPostId() {
    return this.postId;
  }

  setPostId(postId) {
    this.postId = postId;
  }

  toString() {
    return `CommentDTO{ comment=${this.comment}, postId=${this.postId} }`;
  }
}

module.exports = CommentDTO;