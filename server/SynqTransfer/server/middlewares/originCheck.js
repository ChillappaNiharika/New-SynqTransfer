// middlewares/originCheck.js
module.exports = function checkOrigin(req, res, next) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || [];
  const origin = req.get("origin") || req.get("referer");

  if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return next();
  }

  return res.status(403).json({ error: "Access denied: Invalid origin" });
};
