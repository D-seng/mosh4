const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB...')
});
// .then(() => console.log('Connected to MongoDB...'))
// .catch(err => console.log('Could not connect to MongoDB', err));

// mongoose.set('debug', true);

const courseSchema = new mongoose.Schema({
  tags: [String],
  name: String,
  author: String,
  isPublished: Boolean,
  date: { type: Date, default: Date.now }
})

const Course = mongoose.model('Course', courseSchema);

async function updateCourseF(id) {
  console.log(id);
  const result = await Course.update( {_id: id }, {
    $set: {
      author: 'Anna',
      isPublished: false
    }
  });

    console.log(result);
}

updateCourseF('5b7f81ba7d26455e07cb866f');
