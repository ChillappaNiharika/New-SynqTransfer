const mongoose = require("mongoose");

const shortLinkSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ShortLink", shortLinkSchema);
