const mongoose = require('mongoose');

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

async function createCourse() {
    const course = new courseModel({
        name: "MongoDB",
        creator: "Siddharth",
        isPublished: true,
        Ratings: 4.5
    });

    await course.save();
}

// createCourse();

async function updateCourse(id){
    let course = await courseModel.findById(id);

    if (!course) return
    course.name = "MERN"
    course.creator = "Vineetha"

    await course.save();
}



// updateCourse("6663c4c45b606a10bb9cf1c9");

async function deleteCourse(id) {
    let course = await courseModel.findByIdAndDelete(id);
}

deleteCourse("6663c4c45b606a10bb9cf1c9");