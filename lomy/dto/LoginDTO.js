//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

class LoginDTO {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    this.username = username;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }

}

module.exports = LoginDTO;