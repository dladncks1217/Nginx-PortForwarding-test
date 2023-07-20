const express = require("express");
const router = express.Router();

router.get("/getnumber", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  res.json({ number: randomNumber });
});

module.exports = router;
