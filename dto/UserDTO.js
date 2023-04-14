const Role = require('../model/Role');

class UserDTO {
  constructor(userName, password, email) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = Role.ROLE_AUTHOR;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }

  getUserName() {
    return this.userName;
  }

  setUserName(userName) {
    this.userName = userName;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getRole() {
    return this.role;
  }

  toString() {
    return `UserDTO{userName='${this.userName}', email='${this.email}', role=${this.role}}`;
  }
}

module.exports = UserDTO;