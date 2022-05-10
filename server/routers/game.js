const { check } = require("express-validator");
const { validate } = require("../utils/validation");

const {
  getGame,
  getGames,
  createGame,
  updateGame,
  deleteGame,
  getComments,
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/game");

const { Router } = require("express");
const router = Router();

router.route("/:id(\\d+)").get(getGame);
router.route("/").get(getGames);

router
  .route("/")
  .post(
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("the name must have minimum length of 3")
        .trim(),
      check("release date")
        .isDate()
        .withMessage("please provide the release date of game")
        .trim(),
      check("description")
        .isLength({ max: 500 })
        .withMessage(
          "give a brief description of the game within 500 characters"
        )
        .trim(),
    ],
    validate,
    createGame
  );

router.route("/:id(\\d+)").put(updateGame);

router.route("/:id(\\d+)").delete(deleteGame);

router.route("/:id(\\d+)/comments/").get(getComments);

router
  .route("/:id(\\d+)/comments/")
  .post(
    [
      check("post")
        .isLength({ min: 500 })
        .withMessage("ensure post is within 500 characters")
        .trim(),
    ],
    validate,
    createComment
  );

router.route("/:id(\\d+)/comments/:comment_id(\\d+)").put(editComment);

router.route("/:id(\\d+)/comments/:comment_id(\\d+)").delete(deleteComment);

module.exports = router;
