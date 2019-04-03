const rp = require('request-promise');
const url = 'https://myanimelist.net/anime/11061';
const $ = require('cheerio');
const { checkForAttribs, cleanRegEx } = require('./helper');

const Review = require('./components/Reviews');

const arr = [{ stiensGate: '9253' }, { Gintama: '28977' }, { HxH: '11061' }];

module.exports = async link => {
  try {
    const html = await rp(link || url);
    const sideBarInfoStr = '.js-scrollfix-bottom > div';
    const checkForTags = amount => {
      /** Checks for synonyms tag, and manga cart tag */
      let amountToBeAdded = 0;
      if ($('.di-b.mt4.mb16.ac > a > .fa-shopping-cart', html)[0]) {
        amountToBeAdded++;
        if (
          $(sideBarInfoStr, html)[7].children[1].children[0].data ===
          'Synonyms:'
        ) {
          amountToBeAdded++;
        }
      } else if (
        $(sideBarInfoStr, html)[6].children[1].children[0].data === 'Synonyms:'
      ) {
        amountToBeAdded++;
      } else {
        /** default */
        return amount;
      }
      return amount + amountToBeAdded;
    };

    const checkType = amount => {
      if (
        $(sideBarInfoStr, html)[checkForTags(7)].children.filter(
          item => item.name === 'a'
        )[0].children[0].data === 'Movie'
      ) {
        return amount - 2;
      } else return amount;
    };

    return {
      name: cleanRegEx($('.spaceit_pad', html)[0].children[2].data),
      type: $(sideBarInfoStr, html)[checkForTags(7)].children.filter(
        item => item.name === 'a'
      )[0].children[0].data,
      episodes: cleanRegEx(
        $(sideBarInfoStr, html)[checkForTags(8)].children[2].data
      ),
      status: cleanRegEx(
        $(sideBarInfoStr, html)[checkForTags(9)].children[2].data
      ),
      aired: cleanRegEx(
        $(sideBarInfoStr, html)[checkForTags(10)].children[2].data
      ),
      /** For movies checkForTags amount is --2 */
      producers: $(sideBarInfoStr, html)
        [checkType(checkForTags(13))].children.filter(item => item.name === 'a')
        .map(item => item.children[0].data),
      genres: $('.js-scrollfix-bottom > div', html)
        [checkType(checkForTags(17))].children.filter(item => item.name === 'a')
        .map(item => item.children[0]['data']),

      score: $('span[itemprop=ratingValue]', html)[0].children[0].data,
      rankingPopularityMembers: $('.di-ib.ml12.pl20.pt8', html)[0].children.map(
        item => item.children[1].children.map(item => item.data)
      ),
      background: $('span[itemprop=description]', html)[0]
        .children.map(item => item.data)
        .filter(item => {
          if (item && item.length > 3) return item;
        })
        .map(item => item.replace(/[\n"/]/g, '')),
      openingThemes: $('.di-tc.va-t > .theme-songs', html)[0]
        ? $('.di-tc.va-t > .theme-songs', html)[0]
            .children.filter(item => item.name === 'span')
            .map(item => item.children[0].data)
        : undefined,
      endingThemes: $('.di-tc.va-t > .theme-songs', html)[1]
        ? $('.di-tc.va-t > .theme-songs', html)[1]
            .children.filter(item => item.name === 'span')
            .map(item => item.children[0].data)
        : undefined,
      coverImage: $('.js-scrollfix-bottom > div > a > img', html)[0].attribs
        .src,
      videoPromotion: await checkForAttribs($('.video-promotion > a', html)[0]),

      reviews: await Review($('.borderDark', html))
    };
  } catch (error) {
    console.log(error);
  }
};
