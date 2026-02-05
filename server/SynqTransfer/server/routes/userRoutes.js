const express = require("express");
const router = express.Router();
const { registerOrFetchUser } = require("../controllers/userController");

router.post("/signin", registerOrFetchUser);

module.exports = router;
