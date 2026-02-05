const userService = require("../services/userService");

exports.registerOrFetchUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const user = await userService.createOrGetUser(email);

    res.json({
      email: user.email,
      uniqueId: user.uniqueId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
