const Course = require('../models/course.model')

class CourseController {
  async getCourses(req, res) {
    try {
      const courses = await Course.find()
      res.status(200).json({success: true, data: courses})
    } catch(e) {
      res.status(400).json({success: false, errorMessage: e})
    }
  }
  async getCourse(req, res) {
    try {
      const course = await Course.findById(req.params.id)
      res.status(200).json({success: true, data: course})
    } catch(e) {
      res.status(400).json({success: false, errorMessage: e})
    }
  }
  async createCourse(req, res) {
    try {
      const newCourse = new Course({...req.body})
      const course = await newCourse.save()
      res.status(200).json({success: true, data: course})
    } catch(e) {
      res.status(400).json({success: false, errorMessage: e})
    }
  }
  async removeCourse(req, res) {
    try {
      const course = await Course.findByIdAndRemove(req.params.id)
      res.status(200).json({success: true, data: course})
    } catch(e) {
      res.status(400).json({success: false, errorMessage: e})
    }
  }
  async updateCourse(req, res) {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {...req.body}, {new: true, useFindAndModify: false})
      console.log(updatedCourse)
      res.status(200).json({success: true, data: updatedCourse})
    } catch(e) {
      res.status(400).json({success: false, errorMessage: e})
    }
  }
}

module.exports = CourseController