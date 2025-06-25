const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const fileService = require("../services/fileService");
const emailService = require("../services/emailService");
const { createShortLink } = require("../utils/shortener");

const s3 = new AWS.S3();

exports.upload = async (req, res) => {
  const { toEmail, fromEmail, title, message, option } = req.body;
  const files = req.files;

  console.log(`📨 Upload Request From: ${fromEmail} To: ${toEmail}`);
  console.log(`📁 Total files received: ${files.length}`);
  console.log("📂 Files Metadata:", files.map(f => ({
    name: f.originalname,
    size: f.size,
    storage: f.location ? "S3" : "Local"
  })));

  if (!files || files.length === 0)
    return res.status(400).json({ error: "No files uploaded." });

  try {
    let fileRecord;

    if (!files[0].location) {
      console.log("🗜️ Zipping files locally...");

      const zipName = `bundle-${Date.now()}.zip`;
      const zipPath = path.join("uploads", zipName);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.pipe(output);
      files.forEach((file) => {
        archive.file(file.path, { name: file.originalname });
      });

      await archive.finalize();

      console.log("📦 ZIP created:", zipName, "Size:", fs.statSync(zipPath).size);

      const zipFile = {
        filename: zipName,
        path: zipPath,
        size: fs.statSync(zipPath).size,
        isS3: false,
      };
      fileRecord = await fileService.saveFile(zipFile);
    } else {
      console.log("☁️ S3 Upload completed for:", files[0].key);

      const s3File = {
        filename: files[0].originalname,
        path: files[0].key,
        size: files[0].size,
        isS3: true,
      };
      fileRecord = await fileService.saveFile(s3File);
    }

    const baseUrl = process.env.APP_BASE_URL || `${req.protocol}://${req.get("host")}`;
    const fullLink = `${baseUrl}/api/files/${fileRecord.uuid}`;
    const shortLink = await createShortLink(fullLink, req);

    console.log("🔗 Short link generated:", shortLink);

    if (option === "email") {
      await emailService.sendFileEmail({
        to: toEmail,
        from: fromEmail,
        title,
        message,
        link: shortLink,
      });
      console.log("📧 Email sent to:", toEmail);
    }

    await emailService.sendConfirmationEmail({
      to: fromEmail,
      title,
      link: shortLink,
    });
    console.log("📨 Confirmation email sent to:", fromEmail);

    res.json({ message: "Link generated.", file: shortLink });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Something went wrong during upload." });
  }
};

exports.download = async (req, res) => {
  try {
    const file = await fileService.getFileByUUID(req.params.uuid);
    if (!file) return res.status(404).json({ error: "File not found or expired." });

    if (file.isS3) {
      const stream = s3
        .getObject({
          Bucket: process.env.S3_BUCKET,
          Key: file.path,
        })
        .createReadStream();

      res.attachment(file.filename);
      stream.pipe(res);
    } else {
      res.download(file.path, file.filename);
    }
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ error: "Download failed." });
  }
};
