const app = require('express')()

const rp = require('request-promise')
const $ = require('cheerio')
const url = 'https://myanimelist.net/topanime.php'

const animeItem = require('./animeItem')

const fetchData = async () => {
  try {
    const arrOfLinks = []
    const html = await rp(url)

    for (let i = 0; i < 50; i++) {
      arrOfLinks.push($('.detail > .di-ib > .hoverinfo_trigger', html)[i].attribs.href)
    }

    const data = await animeItem(arrOfLinks[0])
    console.log(await data)

    // for (let i = 0; i < arrOfLinks.length; i++) {
    //   setTimeout(async () => {
    //     console.log(await animeItem(arrOfLinks[i]))
    //   }, i * 3000)
    // }
  } catch (error) {
    console.log(error)
  }
}

fetchData()

// app.get('/', async (req, res) => {
//   const data = await animeItem()
//   res.send({ data })
// })

// app.listen(3000, () => console.log(`Listening on port 3000`))

/** Fetch single */
// const single = async () => {
//   const data = await animeItem()
//   console.log(data)
// }

// single()
