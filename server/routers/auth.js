const { check } = require("express-validator");
const { validate } = require("../utils/validation");

const { Router } = require("express");
const router = Router();

const { login, refresh } = require("../controllers/auth");

router.route("/login").post(
  [
    check("username")
      .isLength({ min: 3 })
      .withMessage("the username must have minimum length of 3")
      .trim(),
    check("password")
      .isLength({ min: 3, max: 15 })
      .withMessage("your password should have min and max length between 3-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character")
      .trim(),
  ],
  validate,
  login
);
router.route("/refresh").post(refresh);

module.exports = router;
