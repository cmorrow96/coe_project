const { check } = require("express-validator");
const { validate } = require("../utils/validation");

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getGamesFromFavourites,
  addGameToFavourites,
  updateGameInFavourites,
  deleteGameFromFavourites,
} = require("../controllers/user");

const { Router } = require("express");
const router = Router();

router.route("/:id(\\d+)").get(getUser);
router.route("/").get(getUsers);

router.route("/").post(
  [
    check("username")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character")
      .trim(),
  ],
  validate,
  createUser
);

router.route("/:id(\\d+)").put(updateUser);

router.route("/:id(\\d+)").delete(deleteUser);

router.route("/:id(\\d+)/favourites/").get(getGamesFromFavourites);

router.route("/:id(\\d+)/favourites/").post(addGameToFavourites);

router.route("/:id(\\d+)/favourites/:fav_id(\\d+)").put(updateGameInFavourites);

router
  .route("/:id(\\d+)/favourites/:fav_id(\\d+)")
  .delete(deleteGameFromFavourites);

module.exports = router;
