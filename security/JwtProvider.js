//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

// Node.js version
const jwt = require('jsonwebtoken');
const { Base64 } = require('js-base64');
const { SimpleGrantedAuthority } = require('spring-security-core');

class JwtProvider {
  constructor(secretKey, validityInMilliseconds) {
    this.secretKey = Base64.encode(secretKey);
    this.validityInMilliseconds = validityInMilliseconds;
    this.parser = jwt;
  }

  createToken(username, roles) {
    const claims = {
      sub: username,
      roles: roles.map(role => new SimpleGrantedAuthority(role.authority))
    };
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.validityInMilliseconds);

    return this.parser.sign({
      data: claims,
      exp: expiresAt.getTime()
    }, this.secretKey);
  }

  isValidToken(token) {
    try {
      this.parser.verify(token, this.secretKey);
      return true;
    } catch (err) {
      return false;
    }
  }

  getUsername(token) {
    token = token.replace('Bearer', '').trim();
    if (this.isValidToken(token)) {
      const [, payload] = token.split('.');
      const decodedPayload = Base64.decode(payload);
      const { sub } = JSON.parse(decodedPayload);
      return sub;
    }
    return null;
  }

  getRoles(token) {
    token = token.replace('Bearer', '').trim();
    if (this.isValidToken(token)) {
      const [, payload] = token.split('.');
      const decodedPayload = Base64.decode(payload);
      const { roles } = JSON.parse(decodedPayload);
      return roles.map(roleClaim => new SimpleGrantedAuthority(roleClaim.authority));
    }
    return null;
  }
}

module.exports = JwtProvider;