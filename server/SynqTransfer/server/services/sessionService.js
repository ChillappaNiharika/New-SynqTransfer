const Session = require("../models/Session");

exports.saveSessionData = async (data) => {
  return await Session.create(data);
};

exports.fetchHistory = async (email, userId) => {
  return await Session.find({
    $or: [{ email }, { userId }],
  }).sort({ createdAt: -1 });
};
