const fileService = require("../services/fileService");
const emailService = require("../services/emailService");
const { createShortLink } = require("../utils/shortener");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { v4: uuidv4 } = require("uuid");

exports.upload = async (req, res) => {
  const { toEmail, fromEmail, title, message, option } = req.body;
  const files = req.files;

  if (!files || files.length === 0)
    return res.status(400).json({ error: "No files uploaded." });

  try {
    const zipName = `bundle-${Date.now()}.zip`;
    const zipPath = path.join("uploads", zipName);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    files.forEach((file) => {
      archive.file(file.path, { name: file.originalname });
    });
    await archive.finalize();

    // Save zip as one File entry
    const zipFile = {
      filename: zipName,
      path: zipPath,
      size: fs.statSync(zipPath).size,
    };

    const file = await fileService.saveFile(zipFile);
    const baseUrl = process.env.APP_BASE_URL || `${req.protocol}://${req.get("host")}`;
    const fullLink = `${baseUrl}/api/files/${file.uuid}`;
    const shortLink = await createShortLink(fullLink, req); // Pass req

    console.log("Base URL:", `${req.protocol}://${req.get("host")}`);
    console.log("Short Link:", shortLink);


    if (option === "email") {
      await emailService.sendFileEmail({
        to: toEmail,
        from: fromEmail,
        title,
        message,
        link: shortLink,
      });
      res.json({ message: "Email sent.", file: shortLink });
    } else {
      res.json({ message: "Link generated.", file: shortLink });
    }

     await emailService.sendConfirmationEmail({
    to: fromEmail,
    title,
    link: shortLink,
  });

  res.json({ message: "Email sent.", file: shortLink });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Something went wrong during upload." });
  }
};

exports.download = async (req, res) => {
  try {
    const file = await fileService.getFileByUUID(req.params.uuid);
    if (!file) return res.status(404).json({ error: "File not found or expired." });
    res.download(file.path, file.filename);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed." });
  }
};
