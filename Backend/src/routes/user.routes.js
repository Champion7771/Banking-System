const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const {
  getUsers,
  updateUserRole,
  toggleUserStatus
} = require("../controllers/user.controller");


router.get("/", protect, authorize("admin", "analyst"), getUsers);
router.put("/:id/role", protect, authorize("admin"), updateUserRole);
router.put("/:id/status", protect, authorize("admin"), toggleUserStatus);

module.exports = router;