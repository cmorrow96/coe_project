const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => {
    res.status(200).send("Game");
})

router.route("/").post((req, res) => {
    res.status(200).send("Example Game");
})

router.route("/").put((req, res) => {
    res.status(200).send("Update Example Game");
})

module.exports = router;