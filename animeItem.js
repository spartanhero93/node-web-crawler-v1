const rp = require('request-promise')
const url = 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood'
const $ = require('cheerio')

module.exports = async link => {
  try {
    const html = await rp(link || url)
    return {
      name: $('.spaceit_pad', html)[0].children[2].data,
      score: $('span[itemprop=ratingValue]', html)[0].children[0].data
    }
  } catch (error) {
    console.log(error)
  }
}
