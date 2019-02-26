const rp = require('request-promise')
const url = 'https://myanimelist.net/anime/32281/Kimi_no_Na_wa'
const $ = require('cheerio')

module.exports = async link => {
  try {
    const html = await rp(link || url)
    console.log({
      name: $('.spaceit_pad', html)[0].children[2].data.replace(
        /^\s+|\s+$|\s+(?=\s)[\n]/g,
        ''
      ),
      type: $('.js-scrollfix-bottom > div > a', html)[8].children[0].data,
      episodes: $('.js-scrollfix-bottom > div', html)[9].children[2].data.replace(
        /^\s+|\s+$|\s+(?=\s)[\n]/g,
        ''
      ),
      score: $('span[itemprop=ratingValue]', html)[0].children[0].data,
      rankingPopularityMembers: $('.di-ib.ml12.pl20.pt8', html)[0].children.map(item =>
        item.children[1].children.map(item => item.data)
      ),
      /**  [0].children[1].children[0].data  */
      background: $('span[itemprop=description]', html)[0]
        .children.map(item => item.data)
        .filter(item => {
          if (item && item.length > 3) return item
        })
        .map(item => item.replace(/[\n"/]/g, '')),
      openingThemes: $('.di-tc.va-t', html)[2]
        .children[3].children.filter(item => {
          if (item.name === 'span') return item
        })
        .map(item => item.children.map(item => item.data)),
      coverImage: $('.js-scrollfix-bottom > div > a > img', html)[0].attribs.src,
    })
  } catch (error) {
    console.log(error)
  }
}
