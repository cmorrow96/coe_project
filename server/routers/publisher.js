const { check } = require("express-validator");
const { validate } = require("../utils/validation");

const {
  getPublisher,
  getPublishers,
  createPublisher,
  updatePublisher,
} = require("../controllers/publisher");

const { Router } = require("express");
const router = Router();

router.route("/:id(\\d+)").get(getPublisher);
router.route("/").get(getPublishers);

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
    createPublisher
  );

router.route("/:id(\\d+)").put(updatePublisher);

module.exports = router;
