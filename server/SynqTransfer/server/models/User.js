const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  uniqueId: { type: String, unique: true },
});

module.exports = mongoose.model("User", UserSchema);
