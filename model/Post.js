// node.js module that exports a class called Post
class Post {
    constructor(
      id,
      postText,
      isExperience,
      likes,
      dislikes,
      visible,
      verified,
      tag,
      user,
      country,
      type,
      numberOfReports,
      postRating,
      postDate,
      postStatus,
      media
    ) {
      this.id = id;
      this.postText = postText;
      this.isExperience = isExperience;
      this.likes = likes;
      this.dislikes = dislikes;
      this.visible = visible;
      this.verified = verified;
      this.tag = tag;
      this.user = user;
      this.country = country;
      this.type = type;
      this.numberOfReports = numberOfReports;
      this.postRating = postRating;
      this.postDate = postDate;
      this.postStatus = postStatus;
      this.media = media;
  
      // transient properties
      this.isAuthor = false;
      this.isLiked = false;
      this.isDisliked = false;
      
    }
  
    // getters and setters for transient properties
    getAuthor() {
      return this.isAuthor;
    }
  
    setAuthor(author) {
      this.isAuthor = author;
    }
  
    getLiked() {
      return this.isLiked;
    }
  
    setLiked(liked) {
      this.isLiked = liked;
    }
  
    getDisliked() {
      return this.isDisliked;
    }
  
    setDisliked(disliked) {
      this.isDisliked = disliked;
    }
  }
    //TODO Add createDate field
class Post {
  constructor(
    id,
    postText,
    isExperience,
    visible,
    verified,
    user,
    country,
    type,
    tag,
    postRating
  ) {
    this.id = id;
    this.postText = postText;
    this.isExperience = isExperience;
    this.visible = visible;
    this.verified = verified;
    this.user = user;
    this.country = country;
    this.type = type;
    this.tag = tag;
    this.postRating = postRating;

    // default values
    this.likes = 0;
    this.dislikes = 0;
    this.postDate = new Date();
    this.postStatus = 1;
    this.numberOfReports = 0;
  }

  // getters and setters
  getPostRating() {
    return this.postRating;
  }

  setPostRating(postRating) {
    this.postRating = postRating;
  }

  getPostDate() {
    return this.postDate;
  }

  setPostDate(postDate) {
    this.postDate = postDate;
  }

  getId() {
    return this.id;
  }

  getPostText() {
    return this.postText;
  }

  setPostText(postText) {
    this.postText = postText;
  }

  getExperience() {
    return this.isExperience;
  }

  setExperience(experience) {
    this.isExperience = experience;
  }

  getLikes() {
    return this.likes;
  }

  setLikes(likes) {
    this.likes = likes;
  }

  getDislikes() {
    return this.dislikes;
  }

  setDislikes(dislikes) {
    this.dislikes = dislikes;
  }

  getVisible() {
    return this.visible;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  getVerified() {
    return this.verified;
  }

  setVerified(verified) {
    this.verified = verified;
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  getCountry() {
    return this.country;
  }

  setCountry(country) {
    this.country = country;
  }

   getType() {
     return this.type; 
   }
   
   setType(type) { 
     this.type = type; 
   }
   
   getTag() { 
     return this.tag; 
   }
   
   setTag(tag) { 
     this.tag = tag; 
   }
   
   getPostStatus() { 
     return this.postStatus; 
   }
   
   setPostStatus(postStatus) { 
     this.postStatus = postStatus; 
   }
   
   getNumberOfReports() { 
     return this.numberOfReports; 
   }
   
   setNumberOfReports(numberOfReports) { 
     this.numberOfReports = numberOfReports; 
   }
   getType() { 
     return this.type; 
 } 
  
 setType(type) { 
     this.type = type; 
 } 
  
 getTag() { 
     return this.tag; 
 } 
  
 setTag(tag) { 
     this.tag = tag; 
 } 
  
 toString() { 
     return "Post{" + 
             "id=" + this.id + 
             ", postText='" + this.postText + '\'' + 
             ", isExperience='" + this.isExperience + '\'' + 
             ", likes=" + this.likes + 
             ", dislikes=" + this.dislikes + 
             ", visible='" + this.visible + '\'' + 
             ", verified='" + this.verified + '\'' + 
             ", user=" + this.user + 
             ", country=" + this.country + 
             ", type=" + this.type + 
             ",tag=" + this.tag + 
             ", postRating=" + this.postRating + "}"; 
 }
}

module.exports = Post;






















    