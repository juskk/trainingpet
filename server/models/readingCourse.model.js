const mongoose = require('mongoose')
const Schema = mongoose.Schema

const readingCourseSchema = new Schema({
  courses: Array,
  userId: String
})

const readingCourse = mongoose.model('ReadingCourse', readingCourseSchema)
module.exports = readingCourse