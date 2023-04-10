
// Define a custom error class that inherits from Error
class FileStorageException extends Error {
    constructor(msg) {
      super(msg); // Call the parent constructor with the message
      this.msg = msg; // Store the message as a property
    }
  
    // Define a getter method for the message
    getMsg() {
      return this.msg;
    }
  }
  
  // Export the class as a module
  module.exports = FileStorageException;