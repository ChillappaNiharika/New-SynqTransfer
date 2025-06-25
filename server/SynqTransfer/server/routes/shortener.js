const express = require("express");
const ShortLink = require("../models/ShortLink");
const router = express.Router();

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const record = await ShortLink.findOne({ slug });
  if (record) {
    return res.redirect(record.originalUrl);
  }
  res.status(404).send("Link not found");
});

module.exports = router;
