const app = require('express')()
const cors = require('cors')
const animeItem = require('./animeItem')
const mongoose = require('mongoose')
require('dotenv').config()

const APIModel = require('./models/api')

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true },
  () => console.log('Mongoose connected')
)

// const fetchData = async () => {
//   try {
//     const arrOfLinks = []
//     const html = await rp(url)

//     for (let i = 0; i < 50; i++) {
//       arrOfLinks.push(
//         $('.detail > .di-ib > .hoverinfo_trigger', html)[i].attribs.href
//       )
//     }

//     for (let i = 0; i < 5; i++W) {
//       setTimeout(async () => {
//         console.log(await aniWmeItem(arrOfLinks[i]))
//       }, i * 3000)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
const arr = [{ name: 'Plastic Memories', id: 27775 }, { name: 'Sakura-sou no Pet na Kanojo', id: 13759 }, { name: 'ef: A Tale of Memories.', id: 2924 }]
const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

/** Fetch single */
app.use(cors())
app.get('/getAnime/:id', async (req, res) => {
  const data = await animeItem(req.params.id)
  res.send(JSON.stringify(data, getCircularReplacer()))
})
app.get('/getAllAnime', async (req, res) => {
  console.log('user hit allAnime')
  APIModel.find({}, (err, anime) => (err ? console.log(err) : anime ? res.send(anime) : ''))
})
app.post('/postAnime', async (req, res) => {
  try {
    const {
      name,
      type,
      episodes,
      status,
      aired,
      coverImage,
      score,
      videoPromotion,
      producers,
      genres,
      background,
      openingThemes,
      endingThemes,
      rankingPopularityMembers
    } = await animeItem(req.params.id)
    APIModel.findOne({ name }, (err, animeExists) => {
      if (err) return console.log(err)
      if (animeExists) return console.log('Anime already exists!')
      console.log(videoPromotion)
      const newAnimeModel = new APIModel({
        name,
        id: req.params.id,
        type,
        episodes,
        status,
        aired,
        coverImage,
        rankingPopularityMembers,
        score,
        videoPromotion: videoPromotion
          ? {
            href: videoPromotion.href ? videoPromotion.href : 'none',
            img: videoPromotion.img || 'none'
          }
          : 'no videoPromo',
        producers,
        genres,
        background: background.join(),
        openingThemes,
        endingThemes
      })
      console.log(newAnimeModel)
      return newAnimeModel.save(saveError => (saveError ? console.log('Error', error) : res.send(newAnimeModel)))
    })
  } catch (error) {
    res.send(error)
  }
})
app.listen(3001, () => console.log('running server'))
