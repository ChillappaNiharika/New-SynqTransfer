const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: String,
  email: String,
  totalCounts: Number,
  startTime: String,
  endTime: String,
  totalDuration: String,
  avgTime: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", SessionSchema);
