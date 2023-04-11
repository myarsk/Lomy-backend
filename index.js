// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import modules
const User = require('./User');
const Tag = require('./Tag');
const Type = require('./Type');
const Post = require('./Post');
const Country = require('./Country');
const Ad = require('./Ad');
const ActivityType = require('./ActivityType');
const AdMedia = require('./AdMedia');
const Comment = require('./Comment');
const IPLog = require('./IPLog');
const LomyVerified = require('./LomyVerified');
const Media = require('./Media');
const Reaction = require('./Reaction');
const Role = require('./Role');
const UserRole = require('./UserRole');
const Visible = require('./Visible');
const Verified = require('./Verified');
const UserDTO = require('./UserDTO');
const CreatPostDTO = require('./CreatPostDTO');
const LoginDTO = require('./LoginDTO');
const TagDTO = require('./TagDTO');
const TypeDTO = require('./TypeDTO');
const SwearWord = require('./SwearWord');
const TypeController = require('./TypeController');
const TagController = require('./TagController');
const CountryDTO = require('./CountryDTO');
const JwtProvider = require('./JwtProvider');
const JwtTokenFilter = require('./JwtTokenFilter');
const LomyUserDetailsService = require('./LomyUserDetailsService');
const getClientIP = require('./getClientIP');
const RequestServiceImpl = require('./RequestServiceImpl');
const WebSecurityConfiguration = require('./WebSecurityConfiguration');
const AddService = require('./AddService');
const CountryService = require('./CountryService');
const uploadFile = require('./uploadFile');
const FileStorageException = require('./FileStorageException')
const TagService = require('./TagService');
const TypeService = require('./TypeService');
const UserService = require('./UserService');
const PostService = require('./PostService');

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
