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

    // console.log($('.detail > .di-ib > .hoverinfo_trigger', html).length)
    // console.log($('.detail > .di-ib > .hoverinfo_trigger', html))
  } catch (error) {
    console.log(error)
  }
}

//fetchData()
animeItem()
