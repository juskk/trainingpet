const courseRouter = require('./api/course.route')
const userRouter = require('./api/user.route')
const userInfoRouter= require('./api/userInfo.route')
const readingCourseRouter = require('./api/readingCourse.route')

class AppRouter {
  constructor(app) {
    this.app = app
    }
  init() {
    this.app.get('/', (_req, res) => res.send('API running'));
    this.app.use('/courses', courseRouter)
    this.app.use('/reading-courses', readingCourseRouter)
    this.app.use('/user', userInfoRouter)
    this.app.use('/auth', userRouter)
  }
}

module.exports = AppRouter