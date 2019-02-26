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

    arrOfLinks.map(link => animeItem(link))
  } catch (error) {
    console.log(error)
  }
}

app.get('/', async (req, res) => {
  const data = await animeItem()
  res.send({ data })
})

app.listen(3000, () => console.log(`Listening on port 3000`))

//fetchData()
const runSingleThread = async () => {
  const data = await animeItem()

  console.log(data)
}
runSingleThread()
