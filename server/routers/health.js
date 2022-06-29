const { Router } = require("express");
const router = Router();

const {
  checkHealth
} = require("../controllers/health");


router.route("/").get(checkHealth);

module.exports = router;
