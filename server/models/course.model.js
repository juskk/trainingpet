const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
  name: String,
  description: String,
  isPublic: Boolean,
  author: String,
  userId: String,
}, {timestamps: true})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course