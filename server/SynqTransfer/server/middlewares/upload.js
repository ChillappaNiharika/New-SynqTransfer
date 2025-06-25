const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

// Disk Storage (for ≤ 2GB)
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// S3 Storage (for > 2GB)
const s3Storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Middleware to decide based on Content-Length
const dynamicUpload = (req, res, next) => {
  const contentLength = parseInt(req.headers["content-length"]);
  const TWO_GB = 2 * 1024 * 1024 * 1024;

  const storage = contentLength > TWO_GB ? s3Storage : diskStorage;

  const upload = multer({
    storage,
    limits: {
      files: 500,
      fileSize: 20 * 1024 * 1024 * 1024, // 20GB max per file
    },
  }).array("files", 500);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "File upload failed." });
    }
    next();
  });
};

module.exports = dynamicUpload;
