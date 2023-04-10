const PostRepository = require('./PostRepository');
const CommentRepository = require('./CommentRepository');
const CountryRepository = require('./CountryRepository');
const TagRepository = require('./TagRepository');
const TypeRepository = require('./TypeRepository');
const UserRepository = require('./UserRepository');
const RequestServiceImpl = require('./RequestServiceImpl');
const LomyVerifiedRepository = require('./LomyVerifiedRepository');
const IPLogRepository = require('./IPLogRepository');

class PostService {
  constructor() {
    this.postRepository = new PostRepository();
    this.commentRepository = new CommentRepository();
    this.countryRepository = new CountryRepository();
    this.tagRepository = new TagRepository();
    this.typeRepository = new TypeRepository();
    this.userRepository = new UserRepository();
    this.requestService = new RequestServiceImpl();
    this.lomyVerifiedRepository = new LomyVerifiedRepository();
    this.ipLogRepository = new IPLogRepository();
  }
}
 createPost(createPostDTO, user, httpServletRequest) {
    const tag = await tagRepository.findByTag(createPostDTO.getTag());
    let verified;
    let verified1 = UNVERIFIED;
    if (!tag) {
      tag = await tagRepository.save(new Tag(createPostDTO.getTag(), 0.0, 0));
    }
  
    verified = await lomyVerifiedRepository.findByUserAndTag(user, tag);
    if (verified) {
      verified1 = VERIFIED;
    }
  
    const country = await countryRepository.findByCountry(createPostDTO.getCountry());
    const type = await typeRepository.findByType(createPostDTO.getType());
    let post = null;
    if (country && type) {
      post = new Post(
        createPostDTO.getPostText(),
        createPostDTO.getExperience(),
        createPostDTO.getVisible(),
        verified1,
        user,
        country,
        type,
        tag,
        createPostDTO.getRating()
      );
    }
  
    if (post) {
      tag.setRating(tag.getRating() + createPostDTO.getRating());
      tag.setNumberOfRaters(tag.getNumberOfRaters() + 1);
      await tagRepository.save(tag);
      const log = new IPLog(user, ActivityType.CREATE_POST);
      await ipLogRepository.save(log);
      console.log(`user: ${user.getUserName()}, have Email: ${user.getEmail()}, ip: ${requestService.getClientIP(httpServletRequest)}`);
      return postRepository.save(post);
    }
    
    return null;
  }

   removePost(postId) {
    const p = await postRepository.findById(postId);
    await commentRepository.deleteAllByPost(p);
    await postRepository.deleteById(postId);
  }
  
   removeComment(commentId) {
    await commentRepository.deleteById(commentId);
  }
  
   getPostById(id) {
    return postRepository.findById(id);
  }
  
   async classifyPost(result, user) {
    for (const p of result) {
      p.setAuthor(await postRepository.existsByUserIsAndIdIs(user, p.getId()));
      p.setDisliked(await commentRepository.existsByUserIsAndReactionIs(user, Reaction.DISLIKE));
      p.setLiked(await commentRepository.existsByUserIsAndReactionIs(user, Reaction.LIKE));
    }
    return result;
  }
   async getPosts(country1, type1, isExperience, pageable) {
    let result = [];
    if (!country1 && !type1) {
      result = await postRepository.findByIsExperienceAndPostStatus(isExperience, 2, pageable).getContent();
    } else if (!country1) {
      const type = await typeRepository.findByType(type1);
      if (type) {
        result = await postRepository.findByIsExperienceAndTypeAndPostStatus(isExperience, type, 2, pageable).getContent();
      }
    } else if (!type1) {
      const country = await countryRepository.findByCountry(country1);
      if (country) {
        result = await postRepository.findByIsExperienceAndCountryAndPostStatus(isExperience, country, 2, pageable).getContent();
      }
    }
    const country = await countryRepository.findByCountry(country1);
    const type = await typeRepository.findByType(type1);
    if (type && country) {
      result = await postRepository.findByIsExperienceAndCountryAndTypeAndPostStatus(isExperience, country, type, 2, pageable).getContent();
    }
  
    return result;
  }
  
   async getPostsByTag(isExperience, tag1, pageable) {
    const tag2 = await tagRepository.findByTag(tag1);
    if (!tag2) {
      return null;
    }
    const tag = tag2;
    const posts = await postRepository.findByIsExperienceAndPostStatusAndTagLikeOrderByVerifiedDescLikesDesc(isExperience, 2, tag, pageable);
    return posts.getContent();
  }
  
   async classifyComments(comments, user) {
    for (const c of comments) {
      c.setAuthor(await commentRepository.existsByUserIsAndIdIs(user, c.getId()));
    }
  
    return comments;
  }
  

   async addCommentToPost(commentDTO, user, httpServletRequest) {
    const post = await postRepository.findById(commentDTO.postId);
    let comment;
    if (!post) {
      return null;
    }
//        comment = commentRepository.findAllByUserAndPost(user.get(), post.get());
//        if (comment.isEmpty() || !comment.get().getComment().equals(commentDTO.getComment()))
//
 async addCommentToPost(commentDTO, user, httpServletRequest) {
    const post = await postRepository.findById(commentDTO.postId);
    const comment = new Comment(post, commentDTO.visible, user);
    comment.setComment(commentDTO.comment);
    const log = new IPLog(user, ActivityType.ADD_COMMENT);
    await ipLogRepository.save(log);
    console.log(`user: ${user.getUserName()}, have Email: ${user.getEmail()}, ip: ${requestService.getClientIP(httpServletRequest)}`);
    return await commentRepository.save(comment);
  }


     async getPostComments(postId) {
        const post = await postRepository.findById(postId);
        return post.map(value => commentRepository.getAllByPost(value).
          stream().
          filter(comment => comment.getComment() !== null).
          collect(Collectors.toList())).
          orElseGet(() => []);
      }
      
       async likePost(postId, user) {
        const post = await postRepository.findById(postId);
      
        if (!(user && post)) {
          return null;
        }
      
        let comment = await commentRepository.findByUserAndPostAndCommentIsNull(user, post);
        if (!comment) {
          comment = new Comment(post, Visible.INVISIBLE, user);
        }
      
        if (comment.getReaction() === Reaction.LIKE) {
          return null;
        } else if (comment.getReaction() === Reaction.DISLIKE) {
          comment.setReaction(Reaction.LIKE);
          post.setDislikes(post.getDislikes() - 1);
        }
        comment.setReaction(Reaction.LIKE);
        post.setLikes(post.getLikes() + 1);
        await commentRepository.save(comment);
        return await postRepository.save(post);
      }


       async dislikePost(postId, user) {
        const post = await postRepository.findById(postId);
      
        if (!(user && post)) {
          return null;
        }
      
        let comment = await commentRepository.findByUserAndPostAndCommentIsNull(user, post);
        if (!comment) {
          comment = new Comment(post, Visible.INVISIBLE, user);
        }
      
        if (comment.getReaction() === Reaction.DISLIKE) {
          return null;
        } else if (comment.getReaction() === Reaction.LIKE) {
          comment.setReaction(Reaction.DISLIKE);
          post.setLikes(post.getLikes() - 1);
        }
        comment.setReaction(Reaction.DISLIKE);
        post.setDislikes(post.getDislikes() + 1);
        await commentRepository.save(comment);
        return await postRepository.save(post);
      }
      
       async reportPost(postId) {
        const post = await postRepository.findById(postId);
      
        if (!post) {
          return null;
        }
      
        post.setNumberOfReports(post.getNumberOfReports() + 1);
        return await postRepository.save(post);
      }
      
       async getReportedPosts(pageable) {
        return await postRepository.findAllByPostStatusAndNumberOfReportsGreaterThanOrderByNumberOfReports(2, 0, pageable);
      }
      
       async getPendingPosts(pageable) {
        return await postRepository.findAllByPostStatus(1, pageable);
      }
      
       async rejectPost(postId) {
        const post = await postRepository.findById(postId);
      
        if (!post) {
          return null;
        }
      
        post.setPostStatus(0);
        return await postRepository.save(post);
      }

       async acceptPost(postId) {
        const post = await postRepository.findById(postId);
      
        if (!post) {
          return null;
        }
      
        post.setPostStatus(2);
        return await postRepository.save(post);
      }