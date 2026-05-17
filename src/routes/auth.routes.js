const express = require("express");

const router = express.Router();

const {
  login,
} = require("../controllers/auth.controller");

const verifyToken = require("../middleware/auth.middleware");

const authorizeRoles = require("../middleware/role.middleware");

/* TEST ROUTE */

router.get("/test", (req, res) => {

  return res.json({
    success: true,
    message: "Auth Route Working",
  });

});

/* LOGIN */

router.post("/login", login);

/* PROTECTED ADMIN ROUTE */

router.get(
  "/admin-dashboard",
  verifyToken,
  authorizeRoles("ADMIN"),
  (req, res) => {

    return res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });

  }
);

module.exports = router;