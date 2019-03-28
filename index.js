//notes:
//const - cannot be rassigned
//let - variable to represent 1 thing, for loops/algorithms
//var - when variable will be reassigned

const express = require("express");
const app = express();
const courses =
        [
            { id: 1, name: "course1" },
            { id: 2, name: "course2" },
            { id: 3, name: "course3" }
        ];

// - GET 

//   + main page 
app.get("/", (req, res) =>
    {
        res.send("Hello world");
    });

//   + show courses 
app.get("/api/courses", (req, res) =>
    {
        res.send(courses);
    });

//   + show specific course
app.get("/api/courses/:id", (req, res) =>
    {
        //get the course that matches ID
        const course = courses.find(c => c.id === parseInt(req.params.id));
        
        if(!course) 
        { res.status(404).send("The course ID was not found!"); }
        
        res.send(course);
    });

// - POST 

//   + add course
app.post("/api/courses", (req, res) =>
    {
        if(!req.body.name || req.body.name.length < 3)
        {
            //400: bad request
            res.status(400).send("Name is required and should be\n\
                minimum 3 characters!");
            return; //do not want to execute any more of function
        }
        
        const course = { id: courses.length + 1, name: req.body.name };
        
        courses.push(course); //object posted to server
        res.send(course); //return new object in response body
    });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));