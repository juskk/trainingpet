const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

require('dotenv').config()

const AppRouter = require('./routes/index.js')

const app = express()
app.use(cors())
app.use(express.json())

require('./utils/passport')(passport)
app.use(passport.initialize())

const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB is running')
})

const rout = new AppRouter(app)
rout.init()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`) 
})