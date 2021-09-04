const courseRouter = require('./api/course.route')

class AppRouter {
  constructor(app) {
    this.app = app
    }
  init() {
    this.app.get('/', (_req, res) => res.send('API running'));
    this.app.use('/courses', courseRouter)
  }
}

module.exports = AppRouter