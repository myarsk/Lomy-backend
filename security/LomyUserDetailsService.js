//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// Node.js version
// const UserRepository = require('./UserRepository');
const JwtProvider = require('./JwtProvider');
// const { withUsername } = require('spring-security-core');

class LomyUserDetailsService {
  constructor() {
    this.userRepository = new UserRepository();
    this.jwtProvider = new JwtProvider();
  }

  async loadUserByUsername(s) {
    const user = await this.userRepository.findByUserName(s);

    if (!user) {
      throw new UsernameNotFoundException(`User with name ${s} doesn't exist`);
    }

    user.getUserName()
      .password(user.getPassword())
      .authorities(user.getRoles())
      .accountExpired(false)
      .accountLocked(false)
      .credentialsExpired(false)
      .disabled(false)
      .build();
  }

  async loadUserByJwtToken(jwtToken) {
    if (this.jwtProvider.isValidToken(jwtToken)) {
      const userDetails = withUsername(this.jwtProvider.getUsername(jwtToken))
        .authorities(this.jwtProvider.getRoles(jwtToken))
        .password('')
        .accountExpired(false)
        .accountLocked(false)
        .credentialsExpired(false)
        .disabled(false)
        .build();

      return Promise.resolve(userDetails);
    }

    return Promise.resolve();
  }

  async loadUserByJwtTokenAndlomyvijb_lomy(jwtToken) {
    if (this.jwtProvider.isValidToken(jwtToken)) {
      const userDetails = await this.loadUserByUsername(this.jwtProvider.getUsername(jwtToken));

      return Promise.resolve(userDetails);
    }

    return Promise.resolve();
  }
}

module.exports = LomyUserDetailsService;