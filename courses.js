const mongoose = require('mongoose');
const express = require('express');

// create an express application 

const app = express();
app.use(express.json());
const dburl = "mongodb+srv://siddharth:FOrYp6GZmOTZWgh9@cluster0.bpjvihj.mongodb.net/scaler?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dburl).then(function (connection) {
    console.log("connected to db");
}).catch(err => console.log(err));

const courseSchema = new mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    creator: String,
    isPublished: {type: Boolean, required: true},
    publisedDate: { type: Date, default: Date.now },
    Ratings: Number
});
  
const courseModel = mongoose.model("courses", courseSchema);

app.get('/api/courses/', async(req, res) => {
    let courses = await courseModel.find();
    res.json(courses);
});

app.post('/api/courses', async(req, res) => {
    const course = new courseModel({
        name: req.body.name,
        creator: req.body.creator,
        isPublished: req.body.isPublished,
        Ratings: req.body.Ratings,
    });

    await course.save();
    res.send(course);
})

app.put('/api/course/:id', async(req, res) => {
    try {
      let course = await courseModel.findById(req.params.id);
    
      if (!course) {
        res.status(404).send('course does not exist');
      }
      console.log(a);
    
      course.name = req.body.name;
      await course.save();

      res.send(course);
    } catch (err) {
      res.status(500).send(err);
    }
})

app.listen(3000, () => {
    console.log('server is running')
});