const AWS = require("aws-sdk");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const manualStreamUpload = (req, res, next) => {
  const contentLength = parseInt(req.headers["content-length"] || "0");
  const TWO_GB = 2 * 1024 * 1024 * 1024;

  if (contentLength <= TWO_GB) {
    const multer = require("multer");
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, "uploads/"),
      filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
    });
    return multer({ storage }).array("files")(req, res, next);
  }

  console.log("🚀 Using streaming upload for S3");

  const bb = busboy({ headers: req.headers });
  const files = [];

  bb.on("file", (fieldname, file, filename) => {
    const key = `${Date.now()}-${filename}`;
    const uploadStream = s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file,
      ContentType: req.headers['content-type'],
    }).promise();

    const fileData = {
      originalname: filename,
      key,
      location: `s3://${process.env.S3_BUCKET}/${key}`,
      size: 0,
      isS3: true,
    };

    files.push(uploadStream.then(() => fileData));
  });

  bb.on("field", (fieldname, val) => {
    req.body = req.body || {};
    req.body[fieldname] = val;
  });

  bb.on("finish", async () => {
    try {
      const uploaded = await Promise.all(files);
      req.files = uploaded;

      // fetch actual sizes from S3
      await Promise.all(
        req.files.map(async (file) => {
          const head = await s3.headObject({
            Bucket: process.env.S3_BUCKET,
            Key: file.key,
          }).promise();
          file.size = head.ContentLength;
        })
      );

      next();
    } catch (err) {
      console.error("❌ S3 Upload Error:", err);
      return res.status(500).json({ error: "Failed to upload to S3" });
    }
  });

  req.pipe(bb);
};

module.exports = manualStreamUpload;
