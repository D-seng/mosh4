const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB/mongo-exercises...'))
  .catch(err => console.log('Could not connect to MongoDB/mongo-exercises...'));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String, String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
})

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return courses = await Course
    //.find()
    //.find({ price: { $gte: 10, $lt: 20 }})
    //.find({ price: { $in: [10, 15, 20]}})
    .find({ isPublished: true, tags: 'backend'})
    // .or([{ author: 'Mosh'}, { isPublished: true}])
    .sort( { author: 1 } )
    .select( { name: 1, author: 1})
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();