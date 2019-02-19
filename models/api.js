const mongoose = require('mongoose')
const { Schema } = mongoose

const ApiSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  valid: {
    type: Boolean,
    required: true
  }
})

const ApiModel = new mongoose.model('Api', ApiSchema)
module.exports = ApiModel
