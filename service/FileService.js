
// Import the required modules
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Define the upload directory
const uploadDir = "/var/www/html/dist/img/uploads";

// Define a storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, req.body.userName + "_" + file.originalname); // Set the file name with the user name
  },
});

// Define an upload middleware with the storage engine
const upload = multer({ storage: storage });

// Define a function that handles file upload requests
function uploadFile(req, res) {
  // Use the upload middleware to process the file
  upload.single("file")(req, res, (err) => {
    if (err) {
      // If there is an error, send a response with the error message
      res.status(500).send({ message: "Could not store file " + req.file.originalname + ". Please try again!" });
    } else {
      // If there is no error, send a response with the file details
      res.status(200).send({ message: "File uploaded successfully", file: req.file });
    }
  });
}

// Export the function as a module
module.exports = uploadFile;