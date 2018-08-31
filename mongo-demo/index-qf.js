const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB...')
});
  // .then(() => console.log('Connected to MongoDB...'))
  // .catch(err => console.log('Could not connect to MongoDB', err));

// mongoose.set('debug', true);

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
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
  // const pageNumber = 2;
  // const pageSize = 10;
  const courses = await Course
    // .skip((pageNumber - 1) * pageSize)
    .find()
    // .limit(10)
    .or([{author: 'Mosh'}, {price: {$lte: 15}}])
    .sort({ name: 1 })
    // .count();
  console.log(courses);
}
//  getCourses();

async function updateCourse(id) {
Course.findById(id, (err, doc) => {
  console.log(doc);
  }
);
 
  // if (!course) return;
  // course.set({
  //     author: 'Joe',
  //     isPublished: false
  // });
  // course.save();
  }

  // if (!course) return;

  // course.isPublished = true;
  // course.author = 'Another author xxxx';

  // const result = await course.save();
//   console.log(result);
// }

async function updateCourseF(id) {
  console.log(id);
  const courses = await Course
  .findById(id)
  .select('name author prices')
  console.log(courses);
  // .then(console.log(course));

  // if (!course) return;

  // course.author = 'Another author';
  

 
    //   .find()
    // // .limit(10)
    // .or([{ author: 'Mosh' }, { name: /.*by.*/i }])

  // if (!course) return;
  // course.isPublished = true;
  // const result = await course.save();
  // console.log(result);
} 
// updateCourse('5a68fde3f09ad7646ddec17e');
updateCourseF('5a68fe2142ae6a6482c4c9cb');