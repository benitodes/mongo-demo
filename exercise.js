const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Could not connect to MongoDB...'))

const courseSchema = new mongoose.Schema ({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ tags: 'backend', isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
}

// async function getCourses() {
//     return await Course
//         .find({ tags: 'backend', isPublished: true })
//         .sort({ name: 1 })
//         .select({ name: 1, author: 1 })
// }

// async function getCourses() {
//     return await Course
//         .find({ isPublished: true })
//         .or([ { tags: 'frontend', tags: 'backend'} ] )
//         .sort({ price: -1 })
//         .select({ name: 1, author: 1, price: 1 })
// }

async function getCourses() {
    return await Course
        .find()
        .or([
            { price: {$gte: 15 }},
            { name: /.*by.*/i }
        ])
        .sort({ name: 1 })
        .select({ name: 1, author: 1, price: 1 })
}

async function run () {
    const courses = await getCourses();
    console.log(courses);
}

run();

