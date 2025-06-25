const File = require("../models/File");
const fs = require("fs");
const path = require("path");

const cleanExpiredFiles = async () => {
  const expired = await File.find({ expiresAt: { $lt: new Date() } });
  for (const doc of expired) {
    try {
      fs.unlinkSync(path.resolve(doc.path));
      await doc.remove();
      console.log("Deleted expired file:", doc.filename);
    } catch (err) {
      console.error("Error deleting file:", doc.filename, err);
    }
  }
};

module.exports = cleanExpiredFiles;
