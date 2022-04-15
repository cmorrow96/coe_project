const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => {
    res.status(200).send("User");
})

router.route("/").post((req, res) => {
    res.status(200).send("Example User");
})

router.route("/").put((req, res) => {
    res.status(200).send("Update Example User Profile");
})

module.exports = router;