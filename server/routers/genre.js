const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => {
    res.status(200).send("genres");
})

router.route("/").post((req, res) => {
    res.status(200).send("Example Genre");
})

module.exports = router;