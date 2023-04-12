//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

const TagRepository = require('../repository/TagRepository');
const UserRepository = require('../repository/UserRepository');
const LomyVerifiedRepository = require('../repository/LomyVerifiedRepository');

class TagService {
  constructor() {
    this.tagRepository = new TagRepository();
    this.userRepository = new UserRepository();
    this.lomyVerifiedRepository = new LomyVerifiedRepository();
  }

  createTag(tagDTO) {
    const tag = { tag: tagDTO.tag, value: 0.0, count: 0 };
    return this.tagRepository.save(tag);
  }

  getAllTags() {
    return this.tagRepository.findAll();
  }

  verifyTag(tagId, user) {
    const tag = this.tagRepository.findById(tagId);
    if (!tag) return null;
    const lomyVerified = { user, tag };
    return this.lomyVerifiedRepository.save(lomyVerified);
  }

  deleteVerification(tagId, user) {
    const tag = this.tagRepository.findById(tagId);
    if (!tag) return;
    this.lomyVerifiedRepository.deleteByUserAndTag(user, tag);
  }
}

module.exports = TagService;