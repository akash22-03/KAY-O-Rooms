const mongoose = require("mongoose");

var mongoURL = "mongodb://localhost:27017/mern-rooms";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
  console.log('MongoDB connection failed')
})
connection.on('connected', () => {
  console.log('MongoDB Connection Successfull.')
})

module.exports = mongoose;