const $ = require('cheerio')

module.exports = async objectOfReviews => {
  try {
    /** Testing Suit */
    const arrOfReviews = []

    for (const key in objectOfReviews) {
      if (objectOfReviews[key]['name'] === 'div') {
        arrOfReviews.push(objectOfReviews[key])
      }
    }

    const singleReview = arrOfReviews[0]
    const filteredReview = singleReview['children'].filter(
      i => i.name === 'div'
    )

    const firstSec = filteredReview[0]
    const secondSec = filteredReview[1]
    const thirdSec = filteredReview[2]

    const filteredFirstSec = firstSec['children'].filter(i => i.name === 'div')
    const dateBlock = filteredFirstSec[0]
    const nameBlock = filteredFirstSec[1]

    return nameBlock['children'].filter(i => i.name === 'table')[0]['children']
    // [0]
    // .children.filter(item => item.name === 'div')[1]
    // .children[1].children[1].children[0].children.filter(item => item.name === 'td')[1]
    // .children.filter(i => i.name === 'div')[0]
    // ['children'].filter(i => i.name === 'strong')[0]
    // ['children'].filter(i => i.name === 'span')[0]['children'][0]['data']

    /*** 
     * const arrOfReviews = []
    for (const key in objectOfReviews) {
      if (objectOfReviews[key]['name'] === 'div') {
        arrOfReviews.push(objectOfReviews[key])
      }
    }

    return arrOfReviews.map(item => {
      const userObj = {
        userName: item['children']
          .filter(item => item.name === 'div')[0]
          ['children'].filter(item => item.name === 'div')[1]
          ['children'][1]['children'][1]['children'][0]['children'].filter(
            item => item.name === 'td'
          )[1]
          ['children'].filter(i => i.name === 'a')[0]['children'][0].data,

        numOfPeopleFoundHelpful: item['children']
          .filter(item => item.name === 'div')[0]
          ['children'].filter(item => item.name === 'div')[1]
          ['children'][1]['children'][1]['children'][0]['children'].filter(
            item => item.name === 'td'
          )[1]
          ['children'].filter(i => i.name === 'div')[0]
          ['children'].filter(i => i.name === 'strong')[0]
          ['children'].filter(i => i.name === 'span')[0]['children'][0]['data'],

        profilePic: item['children']
          .filter(item => item.name === 'div')[0]
          ['children'].filter(item => item.name === 'div')[1]
          ['children'][1]['children'][1]['children'][0]['children'].filter(
            item => item.name === 'td'
          )[0]['children'][1]['children'][1]['children'][1].attribs.src,
        dateOfReview: item['children']
      }
      return userObj
    })

    ['children']
      .filter(item => item.name === 'div')[0]
      .children.filter(item => item.name === 'div')[1]
      .children[1].children[1].children[0].children.filter(item => item.name === 'td')[0]
      .children[1].children[1].children[1].attribs.src
      */
  } catch (error) {
    console.log(error)
  }
}
