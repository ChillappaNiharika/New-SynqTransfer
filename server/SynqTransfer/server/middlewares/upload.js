// middlewares/upload.js
const AWS = require("aws-sdk");
const busboy = require("busboy");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { PassThrough } = require("stream");

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();
AWS.config.logger = console;

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

  bb.on("file", async (fieldname, file, fileInfo) => {
  const filename = fileInfo.filename || "unnamed";
  const key = `${Date.now()}-${filename}`;
  const partSize = 10 * 1024 * 1024; // 10MB per part
  let partNumber = 1;
  let uploadedSize = 0;
  let buffer = Buffer.alloc(0);
  const parts = [];

  console.log(`📤 Starting multipart upload for: ${filename}`);

  try {
    // Step 1: Initiate multipart upload
    const multipart = await s3.createMultipartUpload({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: req.headers['content-type'],
    }).promise();

    const uploadId = multipart.UploadId;
    console.log(`🆔 Multipart Upload ID: ${uploadId}`);

    // Step 2: Upload parts manually as stream
    file.on("data", async (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      uploadedSize += chunk.length;

      if (buffer.length >= partSize) {
        file.pause();

        const partBuffer = buffer.slice(0, partSize);
        buffer = buffer.slice(partSize);

        console.log(`⬆️ Uploading part ${partNumber} (${partBuffer.length} bytes)`);

        const uploadedPart = await s3.uploadPart({
          Bucket: process.env.S3_BUCKET,
          Key: key,
          UploadId: uploadId,
          PartNumber: partNumber,
          Body: partBuffer,
        }).promise();

        parts.push({ ETag: uploadedPart.ETag, PartNumber: partNumber });
        console.log(`✅ Part ${partNumber} uploaded`);

        partNumber++;
        file.resume();
      }
    });

    file.on("end", async () => {
      if (buffer.length > 0) {
        console.log(`⬆️ Uploading final part ${partNumber} (${buffer.length} bytes)`);

        const finalPart = await s3.uploadPart({
          Bucket: process.env.S3_BUCKET,
          Key: key,
          UploadId: uploadId,
          PartNumber: partNumber,
          Body: buffer,
        }).promise();

        parts.push({ ETag: finalPart.ETag, PartNumber: partNumber });
        console.log(`✅ Final part ${partNumber} uploaded`);
      }

      // Step 3: Complete upload
      await s3.completeMultipartUpload({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: { Parts: parts },
      }).promise();

      console.log(`🎉 Multipart upload complete for: ${filename}`);

      req.files = req.files || [];
      req.files.push({
        originalname: filename,
        key,
        location: `s3://${process.env.S3_BUCKET}/${key}`,
        size: uploadedSize,
        isS3: true,
      });
    });

  } catch (err) {
    console.error("❌ Error in multipart upload:", err);
    return res.status(500).json({ error: "Multipart upload failed" });
  }
});

  bb.on("error", (err) => {
  console.error("❌ Busboy error:", err);
  io.emit("upload-error", { error: "Streaming upload error." });
  res.status(500).json({ error: "Streaming upload failed" });
});

  io.emit("upload-start", { message: "Upload started." });

  req.pipe(bb);
};

module.exports = manualStreamUpload;
