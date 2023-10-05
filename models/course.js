const mongoose = require('mongoose')
const {Schema} = mongoose

const courseSchema = new Schema({
    course: String,
})

const CourseModel = mongoose.model('Course', courseSchema)
module.exports = CourseModel