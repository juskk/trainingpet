const courseRouter = require('./api/course.route')
const userRouter = require('./api/user.route')

class AppRouter {
  constructor(app) {
    this.app = app
    }
  init() {
    this.app.get('/', (_req, res) => res.send('API running'));
    this.app.use('/courses', courseRouter)
    this.app.use('/auth', userRouter)
  }
}

module.exports = AppRouter