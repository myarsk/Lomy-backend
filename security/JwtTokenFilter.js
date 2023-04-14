//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

// Node.js version
const logger = require('log4js').getLogger('JwtTokenFilter');
const LomyUserDetailsService = require('./LomyUserDetailsService');
// const { SecurityContextHolder, PreAuthenticatedAuthenticationToken } = require('spring-security-core');

class JwtTokenFilter {
  constructor(userDetailsService) {
    this.userDetailsService = userDetailsService || new LomyUserDetailsService();
  }

  async doFilter(req, res, filterChain) {
    logger.info('Process request to check for a JSON Web Token');

    const headerValue = req.headers.authorization;
    const token = this.getBearerToken(headerValue);

    if (token) {
      const userDetails = await this.userDetailsService.loadUserByJwtToken(token);

      if (userDetails) {
        SecurityContextHolder.getContext().setAuthentication(
          new PreAuthenticatedAuthenticationToken(userDetails, '', userDetails.getAuthorities())
        );
      }
    }

    filterChain.doFilter(req, res);
  }

  getBearerToken(headerVal) {
    const BEARER = 'Bearer';

    if (headerVal && headerVal.startsWith(BEARER)) {
      return headerVal.replace(BEARER, '').trim();
    }

    return null;
  }
}

module.exports = JwtTokenFilter;