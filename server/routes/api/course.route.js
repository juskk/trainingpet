const router = require('express').Router();
const CourseController = require('../../controllers/course.controller')

const courseController = new CourseController()

router.route('/').get(courseController.getCourses)
router.route('/createdBy/:userId').get(courseController.getUserCourses)
router.route('/:id').get(courseController.getCourse)
router.route('/remove/:id').get(courseController.removeCourse)
router.route('/update/:id').post(courseController.updateCourse)
router.route('/add').post(courseController.createCourse)

module.exports = router