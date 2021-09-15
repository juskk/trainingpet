const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfoSchema = new Schema({
  surname: String,
  name: String,
  age: Number,
  userId: String,
})

const UserInfo = mongoose.model('UserInfo', UserInfoSchema)
module.exports = UserInfo