const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => {
    res.status(200).send("Publisher");
})

router.route("/").post((req, res) => {
    res.status(200).send("Example Publisher");
})

router.route("/").put((req, res) => {
    res.status(200).send("Update Example Publisher");
})

module.exports = router;