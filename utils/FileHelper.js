const fs = require("fs");

// Function to normalize file path by replacing backslashes with forward slashes
const normalizePath = (path) => {
  return path.replace(/\\/g, "/");
};

// Function to remove file from folder
const removeFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error("Error removing file:", error);
    return false;
  }
};

module.exports = {
  normalizePath,
  removeFile,
};
