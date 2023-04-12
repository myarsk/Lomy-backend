// Import modules
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Create app and router
const app = express();
const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Import services and repositories
// const PostService = require('../service/PostService');
// const UserService = require('../services/UserService');
// const FileService = require('../services/FileService');
// const MediaRepository = require('../repositories/MediaRepository');
// const PostRepository = require('../repositories/PostRepository');

// Create instances of services and repositories
const postService = new PostService(PostRepository, MediaRepository);
const userService = new UserService();
const fileService = new FileService();
const mediaRepository = new MediaRepository();
const postRepository = new PostRepository();

// Define routes
router.get('/', async (req, res) => {
  // Get all posts
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  // Get a post by id
  try {
    const id = req.params.id;
    const post = await postService.getPostById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.array('files'), async (req, res) => {
  // Create a new post
  try {
    // Get the user from the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.getUserById(decodedToken.userId);

    // Create the post
    const { title, description } = req.body;
    const files = req.files;
    const mediaIds = await Promise.all(
      files.map(async (file) => {
        const mediaId = await fileService.createMedia(file);
        return mediaId;
      })
    );
    const post = await postService.createPost(title, description, user.id, mediaIds);

    // Return the created post
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  // Update a post by id
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const updatedPost = await postService.updatePost(id, title, description);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a post by id
  try {
    const id = req.params.id;
    const deletedPostId = await postService.deletePost(id);
    if (deletedPostId) {
      res.status(200).json(deletedPostId);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

const swearWords = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
const foundedSwearWords = [];
const words1 = createPostDTO.postText;
const words = words1.split(" ");
for (const s of swearWords) {
  if (words.includes(s)) foundedSwearWords.push(s);
}
if (foundedSwearWords.length !== 0) {
  return new ResponseEntity(foundedSwearWords, HttpStatus.FORBIDDEN);
}
if (files !== null) {
  files.forEach((file) => fileService.uploadFile(file, user1.get().userName));
}
const post = postService.createPost(createPostDTO, user, httpServletRequest);
const media = [];
if (post !== null) {
  if (files !== null) {
    files.forEach((file) =>
      media.push(
        mediaRepository.save(
          new Media(user.userName + "_" + file.originalFilename)
        )
      )
    );
 


app.delete('/delete', async (req, res) => {
  try {
    await postService.removePost(req.body.postId);
    res.status(200).send('Post deleted successfully');
  } catch (exception) {
    res.status(400).send('Error deleting post');
  }
});


app.get('/:id', async (req, res) => {
  const postId = req.params.id;
  const token = req.headers.authorization;
  let userToken;
  let user1 = null;
  let user = null;

  if (token != null) {
      userToken = jwtProvider.getUsername(token);
      user1 = await userService.getByUserName(userToken);
      user = null;
      if (user1.isPresent())
          user = user1.get();
  }

  const post = await postService.getPostById(postId);
  if (post.isPresent()) {
      const t = [];
      t.push(post.get());
      if (user != null)
          res.status(HttpStatus.OK).json(postService.classifyPost(t, user));
      else
          res.status(HttpStatus.OK).json(t);
  } else {
      res.status(HttpStatus.BAD_REQUEST).send();
  }
});


app.post('/filterByTag', async (req, res) => {
  const { isExperience, tag } = req.query;
  const token = req.headers.authorization;
  const pageable = req.body;

  let userToken;
  let user1 = null;
  let user = null;

  if (token !== null) {
    userToken = jwtProvider.getUsername(token);
    user1 = await userService.getByUserName(userToken);
    if (user1.isPresent()) user = user1.get();
  }

  let posts;
  try {
    posts = await postService.getPostsByTag(isExperience, tag, pageable);
  } catch (exception) {
    return res.status(400).send();
  }

  if (posts.length !== 0) {
    if (user !== null)
      return res.status(200).send(postService.classifyPost(posts, user));
    else return res.status(200).send(posts);
  }

  return res.status(400).send();
});

app.post('/addComment', async (req, res) => {
  const { commentDTO } = req.query;
  const token = req.headers.authorization;
  const httpServletRequest = req.body;

  let comment;
  let userToken = jwtProvider.getUsername(token);
  let user1 = userService.getByUserName(userToken);
  if (!user1.isPresent()) return res.status(401).send();
  let user = user1.get();

  try {
    comment = await postService.addCommentToPost(
      commentDTO,
      user,
      httpServletRequest
    );
  } catch (exception) {
    return res.status(400).send();
  }

  if (comment !== null) return res.status(200).send(comment);

  return res.status(400).send();
});

 app.post('/getAllPostComments', async (req, res) => {
  const { postId } = req.query;
  const token = req.headers.authorization;

  let userToken;
  let user1 = null;
  let user = null;

  if (token !== null) {
    userToken = jwtProvider.getUsername(token);
    user1 = await userService.getByUserName(userToken);
    if (user1.isPresent()) user = user1.get();
  }

  let comments;
  try {
    comments = await postService.getPostComments(postId);
  } catch (exception) {
    return res.status(400).send();
  }

  if (comments.length > 0) {
    if (user !== null)
      return res.status(200).send(postService.classifyComments(comments, user));
    else return res.status(200).send(comments);
  }

  return res.status(400).send();
});

app.post('/likePost', async (req, res) => {
  const { postId } = req.query;
  const token = req.headers.authorization;

  let userToken = jwtProvider.getUsername(token);
  let user1 = userService.getByUserName(userToken);
  if (!user1.isPresent()) return res.status(401).send();
  let user = user1.get();

  let post;
  try {
    post = await postService.likePost(postId, user);
  } catch (exception) {
    return res.status(400).send();
  }

  if (post !== null) return res.status(200).send(post);

  return res.status(400).send();
});

const { postService } = require('./post.service');
const { jwtProvider } = require('./jwt.provider');
const { userService } = require('./user.service');

exports.dislikePost = async (req, res) => {
  const { postId } = req.body;
  const token = req.headers.authorization;
  const userToken = jwtProvider.getUsername(token);
  const user1 = await userService.getByUserName(userToken);
  if (!user1) return res.status(401).send();
  const user = user1.get();
  try {
    const post = await postService.dislikePost(postId, user);
    if (post) return res.status(200).send(post);
    return res.status(400).send();
  } catch (exception) {
    return res.status(400).send();
  }
};

exports.getReportedPosts = async (req, res) => {
  const { page, size } = req.query;
  const pageable = { page: parseInt(page), size: parseInt(size) };
  try {
    const posts = await postService.getReportedPosts(pageable);
    return res.status(200).send(posts);
  } catch (exception) {
    return res.status(400).send();
  }
};

exports.getPendingPosts = async (req, res) => {
  const { page, size } = req.query;
  const pageable = { page: parseInt(page), size: parseInt(size) };
  try {
    const posts = await postService.getPendingPosts(pageable);
    return res.status(200).send(posts);
  } catch (exception) {
    return res.status(400).send();
  }
};

exports.rejectPost = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await postService.rejectPost(postId);
    if (post) return res.status(200).send(post);
    return res.status(400).send();
  } catch (exception) {
    return res.status(400).send();
  }
};

exports.acceptPost = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await postService.acceptPost(postId);
    if (post) return res.status(200).send(post);
    return res.status(400).send();
  } catch (exception) {
    return res.status(400).send();
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;
  try {
    await postService.removeComment(commentId);
    return res.status(200).send();
  } catch (exception) {
    return res.status(400).send();
  }
};

exports.reportPost = async (req, res) => {
  const { postId } = req.body;
  try {
    const reportPostResult = await postService.reportPost(postId);
    if (!reportPostResult) return res.status(400).send();
    return res.status(200).send(reportPostResult);
  } catch (exception) {
    return res.status(400).send();
  }
  post.media = media;
}
postRepository.save(post);
return new ResponseEntity(post, HttpStatus.OK);
}
return new ResponseEntity(HttpStatus.BAD_REQUEST);

};