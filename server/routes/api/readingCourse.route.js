const express = require('express')
const router = express.Router()
const ReadingCourseController = require('../../controllers/readingCourse.controller')

const readingCourseController = new ReadingCourseController()

router.route('/create/:userId').get(readingCourseController.createFolder)
router.route('/get/:userId').get(readingCourseController.getCourses)
router.route('/check/:userId').post(readingCourseController.checkCourse)
router.route('/add/:userId').post(readingCourseController.addCourse)
router.route('/remove/:userId').post(readingCourseController.removeCourse)

module.exports = router