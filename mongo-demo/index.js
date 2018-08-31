const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean, 
  
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .find()
    .sort({ name: 1})
    .count();
    console.log(courses);
}
getCourses();
