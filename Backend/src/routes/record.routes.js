const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../utils/validate");
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const {
  createRecord,
  getRecords,
  deleteRecord
} = require("../controllers/record.controller");

// CREATE → admin + analyst
router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  [
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("type").isIn(["income", "expense"]),
    body("category").notEmpty()
  ],
  validate,
  createRecord
);

// GET → all users
router.get("/", protect, getRecords);

// DELETE → admin only
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteRecord
);

module.exports = router;