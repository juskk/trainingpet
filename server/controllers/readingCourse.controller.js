const ReadingCourse = require('../models/readingCourse.model')
const ResultHandler = require('../utils/resultHandler')

const resultHandler = new ResultHandler()

class ReadingCourseController {
  async createFolder(req, res) {
    try {
      const hasFolder = await ReadingCourse.findOne({userId: req.params.userId})
      if (hasFolder) {
        resultHandler.BadRequest(res, 'folder exists')
      } else {
        const info = {
          userId: req.params.userId,
          courses: []
        }
        const folder = new ReadingCourse(info)
        const item = await folder.save()
        resultHandler.Success(res, item)
      }
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async getCourses(req, res) {
    try {
      const courses = await ReadingCourse.find({userId: req.params.userId})
      resultHandler.Success(res, courses)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async checkCourse(req, res) {
    try {
      const folder = await ReadingCourse.findOne({userId: req.params.userId})
      console.log(folder)
      const course = folder.courses.find(course => course.courseId === req.body.courseId)
      if (!course) resultHandler.Success(res, {reading: false})
      else resultHandler.Success(res, {reading: true})
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async addCourse(req, res) {
    try {
      const courseInfo = {...req.body}
      const objInfo = await ReadingCourse.findOne({userId: req.params.userId})
      const newObjInfoCourses = objInfo.courses
      newObjInfoCourses.push(courseInfo)
      objInfo.courses = newObjInfoCourses
      await ReadingCourse.findOneAndUpdate({userId: req.params.userId}, objInfo)
      resultHandler.Success(res, objInfo)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async removeCourse(req, res) {
    try {
      const objInfo = await ReadingCourse.findOne({userId: req.params.userId})
      const newObjInfoCourses = objInfo.courses.filter(course => course.courseId !== req.body.courseId)
      console.log(newObjInfoCourses)
      objInfo.courses = newObjInfoCourses
      await ReadingCourse.findOneAndUpdate({userId: req.params.userId}, objInfo)
      resultHandler.Success(res, objInfo)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
}

module.exports = ReadingCourseController
