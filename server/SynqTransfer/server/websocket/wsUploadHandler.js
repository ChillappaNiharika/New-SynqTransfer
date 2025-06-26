// ws/wsUploadHandler.js
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../services/fileService");

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const MAX_LOCAL_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

module.exports = (ws) => {
  let meta = null;
  let writeStream = null;
  let uploadedSize = 0;
  let s3Stream = null;

  ws.on("message", async (msg, isBinary) => {
    try {
      if (!meta) {
        // First message is metadata
        meta = JSON.parse(msg.toString());
        const filename = Date.now() + "-" + meta.filename;

        if (meta.size > MAX_LOCAL_SIZE || meta.forceS3) {
          // Upload to S3
          const passThrough = new require("stream").PassThrough();
          s3Stream = s3.upload({
            Bucket: process.env.S3_BUCKET,
            Key: filename,
            Body: passThrough,
          });

          writeStream = passThrough;
          s3Stream.promise().then(async () => {
            const fileRecord = await saveFile({
              filename: meta.filename,
              path: filename,
              size: uploadedSize,
              isS3: true,
            });
            ws.send(JSON.stringify({ type: "done", uuid: fileRecord.uuid }));
            ws.close();
          });
        } else {
          // Save locally
          const localPath = path.join("uploads", filename);
          writeStream = fs.createWriteStream(localPath);
          writeStream.on("finish", async () => {
            const fileRecord = await saveFile({
              filename: meta.filename,
              path: localPath,
              size: uploadedSize,
              isS3: false,
            });
            ws.send(JSON.stringify({ type: "done", uuid: fileRecord.uuid }));
            ws.close();
          });
        }

        ws.send(JSON.stringify({ type: "start" }));
        return;
      }

      // Binary chunk
      if (isBinary) {
        uploadedSize += msg.length;
        writeStream.write(msg);
      }
    } catch (err) {
      console.error("❌ WS Upload Error:", err);
      ws.send(JSON.stringify({ type: "error", error: err.message }));
      ws.close();
    }
  });

  ws.on("close", () => {
    if (writeStream && !writeStream.destroyed) {
      writeStream.end();
    }
  });
};
