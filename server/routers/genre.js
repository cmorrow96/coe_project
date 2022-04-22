const { check } = require("express-validator");
const { validate } = require("../utils/validation");

const {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
} = require("../controllers/genre");

const { Router } = require("express");
const router = Router();

router.route("/:id(\\d+)").get(getGenre);
router.route("/").get(getGenres);

router
  .route("/")
  .post(
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("the name must have minimum length of 3")
        .trim(),
    ],
    validate,
    createGenre
  );

router.route("/:id(\\d+)").put(updateGenre);

module.exports = router;
