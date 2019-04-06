const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
{
    //uses index.pug
    res.render("index", 
    {
        title: "My Express router", 
        message: "Hello"
    });
});

module.exports = router;