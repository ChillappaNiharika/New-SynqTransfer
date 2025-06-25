// middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

module.exports = multer({
  storage,
  limits: {
    files: 500,
    fileSize: 1024 * 1024 * 1024 * 20, // 20GB per file
  }
});
