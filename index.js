const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

  const courseSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      minlength : 5,
      maxlength: 255,
      //match: 
    },
    category: {
      type: String,
      enum: ['web', 'mobile', 'network'],
    },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished : Boolean,
    price: {
      type: Number,
      required: function() { return this.isPublished },
      min: 10,
      max: 200,
    }
  });

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Benoit',
        tags: ["angular", 'frontend'],
        isPublished: true,
        price: 15
    });
    try {
      const result = await course.save();
      console.log(result);
    }
    catch(ex) {
      console.log(ex.message);
    }
}

createCourse();

async function getCourses() {
//     // eq (equal)
//     // ne (not equal)
//     // gt (greater than)
//     // gte (greated than or equal)
//     // lt (less than)
//     // lte (less than or equal)
//     // in
//     // nin (not in)

//     // or
//     // and

//     const pageNumber = 2;
//     const pageSize = 10;

  const courses = await Course
    .find({ author: 'Mosh', isPublished: true})
//         //.find({ price: { $gte: 10, $lte: 20 } })
//         //.find()
//         //.or([ { author: "Benoit"}, { isPublished: true}])
//         //.find({ price: { $in: [10, 15, 20]  }})

//         //Start with 
//         //.find({ author: /^Beno/i })
//         //End with 
//         //.find({ author: /noit$/i })
//         // Contains Benoit
//         //.find({ author: /.*benoit.*/i })
//         .skip((pageNumber - 1) * pageSize)
//         .limit(pageSize)
//         .sort({ name: 1})
//         //.select({ name: 1, tags: 1 });
//         .count();
  console.log(courses);
}

getCourses();


// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     if (!course) return;

//     course.isPublished = true;
//     course.author = 'Another Author';

//    const result = await course.save();
//    console.log(result);
// }

// async function updateCourse(id) {
//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: 'jack',
//             isPublished: false
//         }
//     }, { new: true });
//    console.log(course);
// }

// async function removeCourse(id) {
//     const result = await Course.deleteOne({ _id: id, });
//    console.log(result);
// }

// removeCourse('62bb184317a22622a8905a20');