const $ = require('cheerio')

module.exports = async objectOfReviews => {
  try {
    /** Testing Suit */
    // return objectOfReviews[0].children
    //   .filter(item => item.name === 'div')[0]
    //   .children.filter(item => item.name === 'div')[1]
    //   .children[1].children[1].children[0].children.filter(item => item.name === 'td')[1]
    //   .children.filter(i => i.name === 'a')[0].children[0].data

    const arrOfReviews = []

    for (const key in objectOfReviews) {
      if (objectOfReviews[key]['name'] === 'div') {
        arrOfReviews.push(objectOfReviews[key])
      }
    }

    return arrOfReviews.map(item => {
      const userObj = {
        userName: item.children
          .filter(item => item.name === 'div')[0]
          .children.filter(item => item.name === 'div')[1]
          .children[1].children[1].children[0].children.filter(
            item => item.name === 'td'
          )[1]
          .children.filter(i => i.name === 'a')[0].children[0].data,

        profilePic: item.children
          .filter(item => item.name === 'div')[0]
          .children.filter(item => item.name === 'div')[1]
          .children[1].children[1].children[0].children.filter(
            item => item.name === 'td'
          )[0].children[1].children[1].children[1].attribs.src,
      }
      return userObj
    })

    // .children
    //   .filter(item => item.name === 'div')[0]
    //   .children.filter(item => item.name === 'div')[1]
    //   .children[1].children[1].children[0].children.filter(item => item.name === 'td')[0]
    //   .children[1].children[1].children[1].attribs.src
  } catch (error) {
    console.log(error)
  }
}
