const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

exports.createOrGetUser = async (email) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      uniqueId: uuidv4(),
    });
  }

  return user;
};
