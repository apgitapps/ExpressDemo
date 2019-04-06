const express = require("express");
const router = express.Router();
const courses =
[
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];

// - GET 
//   + show courses 
router.get("/", (req, res) =>
{
    res.send(courses);
});

//   + show specific course
router.get("/:id", (req, res) =>
{
    //get the course that matches ID
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) 
    { 
        res.status(404).send("The course ID was not found!"); 
        return;
    }

    res.send(course);
});

// - POST 
//   + add course
router.post("/", (req, res) =>
{
    const { error } = validateCourse(req.body); //gets result.error

    if(error)
    {
        //400: bad request
        res.status(400).send(error.details[0].message);
        return; //do not want to execute any more of function
    }

    const course = { id: courses.length + 1, name: req.body.name };

    courses.push(course); //object posted to server
    res.send(course); //return new object in response body
});
    
// - PUT
//   + update course
router.put("/:id", (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) 
    { 
        res.status(404).send("The course ID was not found!"); 
        return;
    }

    const { error } = validateCourse(req.body); //gets result.error

    if(error)
    {
        res.status(400).send(error.details[0].message);
        return; //do not want to execute any more of function
    }

    course.name = req.body.name;
    res.send(course);
});
   
router.delete("/:id", (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) 
    { 
        res.status(404).send("The course ID was not found!"); 
        return;
    }

    const index = courses.indexOf(course); //find course index in array

    courses.splice(index, 1); //remove 1 object at index
    res.send(course);

});

function validateCourse(course)
{
    const schema = { name: Joi.string().min(3).required() };
    return Joi.validate(course, schema);
}

module.exports = router;