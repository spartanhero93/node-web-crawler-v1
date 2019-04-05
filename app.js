const app = require('express')()
const rp = require('request-promise')
const $ = require('cheerio')
const cors = require('cors')

const url = 'https://myanimelist.net/topanime.php'
const animeItem = require('./animeItem')

/** Fetch single */
const fetchData = async () => {
  try {
    const data = await animeItem()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
fetchData()

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

// app.use(cors())
// app.get('/', async (req, res) => {
//   try {
//     const data = await animeItem()
//     console.log(data)
//   } catch (error) {
//     res.send(error)
//   }
// })
// app.listen(3001, () => console.log('running server'))
