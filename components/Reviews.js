const $ = require('cheerio')

module.exports = async objectOfReviews => {
  try {
    /** Testing Suit */
    const recursivelyMap = item => {
      let found = false

      obtainElement = i => {
        i.map(item => {
          
        })
      }
      while(found) {
        
      }
    }


    return objectOfReviews[0].children.filter(item => item.name === 'div')
    // [0]
    // .children.filter(item => item.name === 'div')[1]
    // .children[1].children[1].children[0].children.filter(item => item.name === 'td')[1]
    // .children.filter(i => i.name === 'div')[0]
    // ['children'].filter(i => i.name === 'strong')[0]
    // ['children'].filter(i => i.name === 'span')[0]['children'][0]['data']

    const arrOfReviews = []

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
      }
      return userObj
    })

    // ['children']
    //   .filter(item => item.name === 'div')[0]
    //   .children.filter(item => item.name === 'div')[1]
    //   .children[1].children[1].children[0].children.filter(item => item.name === 'td')[0]
    //   .children[1].children[1].children[1].attribs.src
  } catch (error) {
    console.log(error)
  }
}
