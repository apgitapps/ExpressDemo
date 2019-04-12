//notes:
//const - cannot be rassigned
//let - variable to represent 1 thing, for loops/algorithms
//var - when variable will be reassigned
//to run, "set app_password=1234"

const express = require("express");
const app = express();
const config = require("config"); //get app settings
const helmet = require("helmet"); //for setting http headers
const morgan = require("morgan"); //http request logger
const Joi = require("joi"); //uppercase for Joi class
const debug = require("debug")("app:startup");
const logger = require("./middleware/logger"); //middleware func
const courses = require("./routes/courses"); //load courses module
const home = require("./routes/home");

app.set("view engine", "pug"); //templating engine
app.set("views", "./views"); //default tempaltes

app.use(express.json()); //parse json
app.use(express.urlencoded({ extended: true })); //for key value pairs
app.use(express.static("public")); //public folder
app.use(helmet());
app.use(logger);
app.use("/api/courses", courses); //path (for shortening), router object
app.use("/", home);

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if(app.get("env") === "development")
{
    app.use(morgan("tiny"));
    debug("Morgan enabled..."); //console.log
}

app.use(function(req, res, next)
    {
        console.log("Authenticating...");
        next();
    });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));