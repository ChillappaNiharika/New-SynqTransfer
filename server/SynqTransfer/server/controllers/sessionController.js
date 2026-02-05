const sessionService = require("../services/sessionService");

exports.saveSession = async (req, res) => {
  try {
    const session = await sessionService.saveSessionData(req.body);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  const { email, userId } = req.query;

  try {
    const sessions = await sessionService.fetchHistory(email, userId);
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
