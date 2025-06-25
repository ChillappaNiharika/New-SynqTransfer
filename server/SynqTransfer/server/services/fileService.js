const File = require("../models/File");
const { v4: uuidv4 } = require("uuid");

exports.saveFile = async (file) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  const dbFile = new File({
    filename: file.filename,
    uuid: uuidv4(),
    path: file.path,
    size: file.size,
    isS3: file.isS3 || false,
    createdAt: Date.now(),
    expiresAt,
  });
  return dbFile.save();
};

exports.getFileByUUID = (uuid) => File.findOne({ uuid });
