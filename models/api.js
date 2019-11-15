const mongoose = require('mongoose')
const { Schema } = mongoose

const ApiSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  episodes: { type: String },
  status: { type: String },
  aired: { type: String },
  coverImage: { type: String },
  score: { type: String },
  videoPromotion: {
    href: String,
    img: String
  },
  producers: [String],
  genres: [String],
  background: [String],
  openingThemes: [String],
  endingThemes: [String],
  rankingPopularityMembers: [Array]
  // reviews: { type: Array[Object] }
})

const APIModel = new mongoose.model('Api', ApiSchema)
module.exports = APIModel
