const rp = require('request-promise')
const $ = require('cheerio')
const url = 'https://myanimelist.net/topanime.php'

const fetchData = async () => {
  try {
    const html = await rp(url)
    console.log($('.detail > .di-ib > .hoverinfo_trigger', html).length)
    console.log($('.detail > .di-ib > .hoverinfo_trigger', html))
  } catch (error) {
    console.log(error)
  }
}

fetchData()
