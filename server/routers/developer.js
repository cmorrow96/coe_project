const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => {
    res.status(200).send("Developer");
})

router.route("/").post((req, res) => {
    res.status(200).send("Example Developer");
})

router.route("/").put((req, res) => {
    res.status(200).send("Update Example Developer");
})

module.exports = router;