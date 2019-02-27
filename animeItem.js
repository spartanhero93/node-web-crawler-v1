const rp = require('request-promise')
const url = 'https://myanimelist.net/anime/918/'
const $ = require('cheerio')

const checkForAttribs = async video => {
  if (video) {
    return {
      href: video.attribs.href,
      img: video.attribs.style,
    }
  } else {
    return undefined
  }
}
module.exports = async link => {
  try {
    const html = await rp(link || url)
    return {
      name: $('.spaceit_pad', html)[0].children[2].data.replace(
        /^\s+|\s+$|\s+(?=\s)[\n]/g,
        ''
      ),
      type: $('.js-scrollfix-bottom > div > a', html)[8].children[0].data,
      episodes: $('.js-scrollfix-bottom > div', html)[9].children[2].data.replace(
        /^\s+|\s+$|\s+(?=\s)[\n]/g,
        ''
      ),
      status: $('.js-scrollfix-bottom > div', html)[10].children[2].data.replace(
        /^\s+|\s+$|\s+(?=\s)[\n]/g,
        ''
      ),
      aired: $('.js-scrollfix-bottom > div', html)[11].children[2].data.replace(
        /^\s+|\s+$|\s+(?=\s)[\n]/g,
        ''
      ),
      premiered: $(),
      producers: $('.js-scrollfix-bottom > div', html)[14]
        .children.filter(item => {
          if (item.name === 'a') {
            return item
          }
        })
        .map(item => item.children[0]['data']),
      genres: $('.js-scrollfix-bottom > div', html)[18]
        .children.filter(item => {
          if (item.name === 'a') {
            return item
          }
        })
        .map(item => item.children[0]['data']),

      score: $('span[itemprop=ratingValue]', html)[0].children[0].data,
      rankingPopularityMembers: $('.di-ib.ml12.pl20.pt8', html)[0].children.map(item =>
        item.children[1].children.map(item => item.data)
      ),
      background: $('span[itemprop=description]', html)[0]
        .children.map(item => item.data)
        .filter(item => {
          if (item && item.length > 3) return item
        })
        .map(item => item.replace(/[\n"/]/g, '')),
      openingThemes: $('.di-tc.va-t.borderDark.pb4', html)[0]
        .children[3].children.filter(item => {
          if (item.name === 'span') return item
        })
        .map(item => item.children.map(item => item.data)),
      endingThemes: $('.di-tc.va-t.borderDark.pb4', html)[1]
        .children[3].children.filter(item => {
          if (item.name === 'span') return item
        })
        .map(item => item.children.map(item => item.data)),
      coverImage: $('.js-scrollfix-bottom > div > a > img', html)[0].attribs.src,
      videoPromotion: await checkForAttribs($('.video-promotion > a', html)[0]),

      user: $('.borderDark > .spaceit > div > table > tbody > tr > td', html),
    }
  } catch (error) {
    console.log(error)
  }
}
