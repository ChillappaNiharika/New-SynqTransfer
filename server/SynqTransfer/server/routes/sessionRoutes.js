const express = require("express");
const router = express.Router();
const {
  saveSession,
  getHistory,
} = require("../controllers/sessionController");

router.post("/save", saveSession);
router.get("/history", getHistory);

module.exports = router;
