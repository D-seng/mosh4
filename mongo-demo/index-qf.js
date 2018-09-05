const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(() => {
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Not Connected to Database ERROR!', err);
});
  // .then(() => console.log('Connected to MongoDB...'))
  // .catch(err => console.log('Could not connect ßto MongoDB', err));

mongoose.set('debug', true);

const courseSchema = new mongoose.Schema({
  name: {type: String, 
    required: true,
    minlength: 5,
    maxlength: 255},
    category: {
      type: String,
      enum: ['web', 'mobile', 'network'],
      required: true},
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        // Do async work
        setTimeout(() => {
          const result = (v && v.length > 0);
          callback(result)
        }, 3000)
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    max: 20,
    min: 10,
    // get: v => Math.round(v),
    set: v => Math.round(v),
    required: function() { return this.isPublished; }
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    author: 'Joe',
    name: 'Coffee Script',
    tags: ['web'],
    isPublished: true,
    category: 'web',
    price: 12.4
  });
  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  }
  catch(err) {
    console.log(err.message);
  }
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
  const result = await Course.update({ _id: id }, {
    $set: {
      author: 'Jill'
    }
  });
  console.log(result);
}

async function updateCourseAndReturn(id) {
const result = await Course.findByIdAndUpdate(id, {
  $set: {
    author: 'Jill'
  }
  }, {new: true });
  console.log(result);
}

async function updateCourseF(id) {
  console.log(id);
  const course = await Course.findById(id);
  if (!course) return;
  course.author = 'Bill';
  const result = await course.save();
  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

createCourse();

// updateCourse('5a68fde3f09ad7646ddec17e');
// removeCourse('5b7f81ba7d26455e07cb866f');