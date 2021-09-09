const User = require('../models/user.model')
const ResultHandler = require('../utils/resultHandler')
const utils = require('../utils/utils')

const resultHandler = new ResultHandler()

class UserController {
  async ProtectedRoute(req, res, next) {
    resultHandler.Success(res, {passed: 'true'})
  }

  async Login(req, res, next) {
    try {
      const user = await User.findOne({email: req.body.email})
      if (!user) return resultHandler.NotFound(res, 'user not found')
      const matched = utils.validPassword(req.body.password, user.hash, user.salt)
      if (!matched) return resultHandler.BadRequest(res, 'wrong password')
      const jwt = utils.genJWT(user);
      resultHandler.Success(res, { token: jwt.token, expiresIn: jwt.expires })
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }

  async Register(req, res, next) {
    User.findOne({email: req.body.email}, (err, obj) => {
      if (obj) {
        resultHandler.BadRequest(res, 'user exists')
      } else {
        const saltHash = utils.genPassword(req.body.password)

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
          email: req.body.email,
          salt,
          hash
        })

        newUser.save()
          .then(user => {
            const jwt = utils.genJWT(user)
            console.log(jwt)
            resultHandler.Success(res, { token: jwt.token, expiresIn: jwt.expires })
          })
          .catch(e => {
            resultHandler.BadRequest(res)
          })
      }
    })
  }
}

module.exports = UserController