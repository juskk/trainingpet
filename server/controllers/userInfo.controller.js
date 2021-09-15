const UserInfo = require('../models/userInfo.model')
const ResultHandler = require('../utils/resultHandler')

const resultHandler = new ResultHandler()

class UserInfoController {
  async getInfo(req, res) {
    try {
      const info = await UserInfo.findOne({userId: req.params.userId})
      if (!info) resultHandler.NotFound(res)
      else resultHandler.Success(res, info)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async setInfo(req, res) {
    try {
      const info = new UserInfo({...req.body})
      const userInfo = await info.save()
      resultHandler.Success(res, userInfo)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
  async updateInfo(req, res) {
    try {
      const info = await UserInfo.findByIdAndUpdate(req.params.id, {...req.body})
      resultHandler.Success(res, info)
    } catch(e) {
      resultHandler.BadRequest(res)
    }
  }
}

module.exports = UserInfoController