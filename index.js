const express = require('express');

// create an express application 

const app = express();
// app.use(middleware2);

app.use(logger);


app.use(express.json());
// learn about app.use method 
// and how it is working internally in the next class

let courses = [
  { id: 1, name: "java" },
  { id: 2, name: "javascript" },
  { id: 3, name: "python" }
]

app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/course/:id', (req, res) => {
  // console.log(req.params.id);
  console.log(typeof (req.params.id));
  let singleCourse = courses.filter((course) => {
    return course.id === +req.params.id
  })
  
  res.json(singleCourse);
})


app.post('/courses', (req, res) => {
  console.log(req.body);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }

  courses.push(course);
  res.send(courses);
})

app.put('/course/:id', (req, res) => {
  try {
    let singleCourse = courses.find((course) => {
      return course.id === +req.params.id
    })
  
    if (!singleCourse) {
      res.status(404).send('course does not exist');
    }
  
    singleCourse.name = req.body.name;
    res.send(courses);
  } catch (err) {
    res.status(500).send(err);
  }
})

// function middleware1(req, res, next) {
//   console.log("hi");
//   next();
// }

// function middleware2(req, res, next) {
//   console.log("middleware2");
//   next();
// }

// method, ip hostname, curret time

function logger(req, res, next) {
  console.log(req.method, req.ip, req.hostname, new Date());
  next();
}


// app.put()

// app.delete()

// app.get('/about', (req, res) => {
//     res.send('Hello, About page');
// });

app.listen(3000, () => {
  console.log('server is running')
});


// get post put delete?

// http methods

// get - read data
// post - write the data
// put - update the data
// delete - delete the data

// Crud - Create read update delete