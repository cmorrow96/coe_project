// const { check } = require("express-validator");
// const { validate } = require("../utils/validation");

const { Router } = require("express");
const router = Router();

const { login, refresh } = require("../controllers/auth");

router.route("/login").post(login);
router.route("/refresh").post(refresh);

module.exports = router;
