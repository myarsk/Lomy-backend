const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import modules
const ActivityType = require('./model/ActivityType');
const Ad = require('./model/Ad');
const AdMedia = require('./model/AdMedia');
const Comment = require('./model/Comment');
const Country = require('./model/Country');
const IPLog = require('./model/IPLog');
const LomyVerified = require('./model/LomyVerified');
const Media = require('./model/Media');
//const Post = require('./model/Post');
const Reaction = require('./model/Reaction');
const Role = require('./model/Role');
const Tag = require('./model/Tag');
const Type = require('./model/Type');
const User = require('./model/User');
const UserRole = require('./model/UserRole');
const Visible = require('./model/Visible');
const Verified = require('./model/Verified');
//const UserDTO = require('./dto/UserDTO');
//const CreatPostDTO = require('./dto/CreatPostDTO');
//const LoginDTO = require('./dto/LoginDTO');
//const TagDTO = require('./dto/TagDTO');
//const TypeDTO = require('./dto/TypeDTO');
const SwearWord = require('./languageUtils/SwearWord');
const TypeController = require('./web/TypeController');
const TagController = require('./web/TagController');
//const CountryDTO = require('./dto/CountryDTO');
const JwtProvider = require('./security/JwtProvider');
const JwtTokenFilter = require('./security/JwtTokenFilter');
const LomyUserDetailsService = require('./security/LomyUserDetailsService');
//const RequestService = require('./security/RequestService');
//const RequestServiceImpl = require('./security/RequestServiceImpl');
const WebSecurityConfiguration = require('./security/WebSecurityConfiguration');
//const AddService = require('./service/AddService');
//const CountryService = require('./service/CountryService');
const uploadFile = require('./uploadFile');
//const TagService = require('./service/TagService');
//const TypeService = require('./service/TypeService');
//const UserService = require('./service/UserService');
//const PostService = require('./service/PostService');
//const FileService = require('./service/FileService');
//const FileStorageException = require('./service/FileStorageException');
const AdMediaController = require('./web/AdMediaController');
const CountryController = require('./web/CountryController');
const PostController = require('./web/PostController');
const UserController = require('./web/UserController');

// Initialize express app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js project!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});