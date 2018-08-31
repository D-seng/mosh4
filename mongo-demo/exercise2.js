const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB/mongo-exercises...'))
  .catch(err => console.log('Could not connect to MongoDB/mongo-exercises...'));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String, String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
})

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    //.find()
    //.find({ price: { $gte: 10, $lt: 20 }})
    //.find({ price: { $in: [10, 15, 20]}})
    .find({ isPublished: true})
    .or([ {tags: 'backend'}, {tags: 'frontend'}])
    // .or([ {tags: 'backend'}, {tags: 'frontend'} ])
    // .or([{ author: 'Mosh'}, { isPublished: true}])
    .sort({ price: -1 })
    .select('name author price isPublished tags')
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();