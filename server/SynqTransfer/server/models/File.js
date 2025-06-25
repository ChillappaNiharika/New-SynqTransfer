const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  uuid: { type: String, required: true },
  path: String,
  size: Number,
  sender: String,
  receiver: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

module.exports = mongoose.model("File", fileSchema);
