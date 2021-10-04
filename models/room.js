const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  maxcount: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  rentPerDay: {
    type: Number,
    required: true
  },
  imageURLs: [],
  currentBookings: [],
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
})

const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel