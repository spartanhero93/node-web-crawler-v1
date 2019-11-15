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
/** Fetch single */
app.use(cors())
app.get('/:id', async (req, res) => {
  try {
    // console.log('User hit endpoint')
    // const data = await fetchData()
    // console.log(data)
    // res.send(await data)
    const { name, episodes, status, aired, coverImage, score, videoPromotion, producers, genres } = await animeItem(req.params.id)
    APIModel.findOne({ name }, (err, animeExists) => {
      if (err) return console.log(err)
      if (animeExists) return console.log('Anime already exists!')

      const newAnimeModel = new APIModel({
        name,
        id: req.params.id,
        episodes,
        status,
        aired,
        coverImage,
        score,
        videoPromotion: {
          href: videoPromotion.href || 'none',
          img: videoPromotion.img || 'none'
        },
        producers,
        genres
      })
      console.log(newAnimeModel)
      return newAnimeModel.save(saveError => (saveError ? console.log('Error', error) : res.send(newAnimeModel)))
    })
  } catch (error) {
    res.send(error)
  }
})
app.listen(3001, () => console.log('running server'))
