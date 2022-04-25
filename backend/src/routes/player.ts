// @ts-ignore
const express = require("express");
const router = express.Router();

/* GET quotes listing. */
router.get('/', function(req, res, next) {
    res.json({
        data: [
            {
                id: 0,
                name: 'Floha258',
                twitch: 'Floha258',
                pronouns: "he/him",
                country: "de",
                discord: "Floha258"
            }
        ]
    });
});

module.exports = router;
