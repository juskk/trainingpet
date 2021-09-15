const Course = require('../models/course.model')
const ResultHandler = require('../utils/resultHandler')

const resultHandler = new ResultHandler()

class CourseController {
  async getCourses(req, res) {
    try {
      const courses = await Course.find()
      resultHandler.Success(res, courses)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async getUserCourses(req, res) {
    try {
      const courses = await Course.find({userId: req.params.userId})
      resultHandler.Success(res, courses)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async getCourse(req, res) {
    try {
      const course = await Course.findById(req.params.id)
      resultHandler.Success(res, course)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async createCourse(req, res) {
    try {
      console.log(req.body)
      const newCourse = new Course({...req.body})
      const course = await newCourse.save()
      resultHandler.Created(res, course)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async removeCourse(req, res) {
    try {
      const course = await Course.findByIdAndRemove(req.params.id)
      resultHandler.Success(res, course)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async updateCourse(req, res) {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {...req.body}, {new: true, useFindAndModify: false})
      resultHandler.Success(res, updatedCourse)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
}

module.exports = CourseController