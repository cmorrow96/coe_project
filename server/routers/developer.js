const { check } = require("express-validator");
const { validate } = require("../utils/validation");

const {
  getDeveloper,
  getDevelopers,
  createDeveloper,
  updateDeveloper,
} = require("../controllers/developer");

const { Router } = require("express");
const router = Router();

router.route("/:id(\\d+)").get(getDeveloper);
router.route("/").get(getDevelopers);

router
  .route("/")
  .post(
    [
      check("name")
        .isLength({ min: 2 })
        .withMessage("the name must have minimum length of 2")
        .trim(),
    ],
    validate,
    createDeveloper
  );

router.route("/:id(\\d+)").put(updateDeveloper);

module.exports = router;
