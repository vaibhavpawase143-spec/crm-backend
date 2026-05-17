const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Health Route Working",
  });
});

module.exports = router;