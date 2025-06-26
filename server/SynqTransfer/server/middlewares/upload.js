// middlewares/upload.js
const AWS = require("aws-sdk");
const busboy = require("busboy");
const fs = require("fs");
const multer = require("multer");
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

  // ✅ MULTER path (under 2GB)
  if (contentLength <= TWO_GB) {
    console.log("📦 Using Multer for upload (content-length <= 2GB)");

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(`📁 Storing to /uploads/ as ${file.originalname}`);
        cb(null, "uploads/");
      },
      filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
    });

    const upload = multer({ storage }).array("files");

    return upload(req, res, (err) => {
      if (err) {
        console.error("❌ Multer error:", err);
        return res.status(500).json({ error: "Failed to upload using Multer." });
      }
      if (!req.files || req.files.length === 0) {
        console.warn("⚠️ No files received via Multer");
        return res.status(400).json({ error: "No files uploaded." });
      }

      console.log(`✅ Multer received ${req.files.length} files`);
      next();
    });
  }

  // ✅ S3 streaming path (above 2GB)
  console.log("☁️ Using S3 streaming upload via Busboy");

  const bb = busboy({ headers: req.headers });
  const files = [];
  const io = req.app.get("io");
  let uploadedSize = 0;

  bb.on("file", (fieldname, file, fileInfo) => {
  const filename = typeof fileInfo === "string" ? fileInfo : (fileInfo?.filename || fileInfo?.name || "unknown");
    console.log("📤 Streaming file to S3:", filename);
    const key = `${Date.now()}-${filename}`;

    const uploadStream = s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file,
      ContentType: req.headers['content-type'],
    });

    const fileData = {
      originalname: filename,
      key,
      location: `s3://${process.env.S3_BUCKET}/${key}`,
      size: 0,
      isS3: true,
    };

    const managedUpload = uploadStream.on("httpUploadProgress", (progress) => {
      const percent = progress.total
      ? Math.round((progress.loaded / progress.total) * 100)
      : Math.min(100, Math.round((progress.loaded / contentLength) * 100));
      console.log(`📈 Progress for ${filename}: ${percent}%`);
      io.emit("upload-progress", { filename, percent });
    }).promise();

    files.push(managedUpload.then(() => fileData));
  });

  bb.on("field", (fieldname, val) => {
    console.log(`📝 Form field received: ${fieldname} = ${val}`);
    req.body = req.body || {};
    req.body[fieldname] = val;
  });

  bb.on("finish", async () => {
    try {
  const uploaded = await Promise.all(files);
  req.files = uploaded;

  await Promise.all(
    req.files.map(async (file) => {
      const head = await s3.headObject({
        Bucket: process.env.S3_BUCKET,
        Key: file.key,
      }).promise();
      file.size = head.ContentLength;
    })
  );

  io.emit("upload-complete", { message: "Upload completed." });

  console.log("✅ Upload finished. Passing control to controller...");
  next(); // only go to fileController.upload after all done

} catch (err) {
  console.error("❌ S3 Upload Error:", err);
  io.emit("upload-error", { error: "Upload failed." });
  return res.status(500).json({ error: "Failed to upload to S3" });
}
  });

  bb.on("error", (err) => {
    console.error("❌ Busboy error:", err);
    return res.status(500).json({ error: "Streaming parser error" });
  });

  io.emit("upload-start", { message: "Upload started." });

  req.pipe(bb);
};

module.exports = manualStreamUpload;
