const $ = require('cheerio')

module.exports = async objectOfReviews => {
  try {
    const arrOfReviews = []

    for (const key in objectOfReviews) {
      if (objectOfReviews[key]['name'] === 'div') {
        arrOfReviews.push(objectOfReviews[key])
      }
    }

    return arrOfReviews.map(
      item =>
        item.children
          .filter(item => item.name === 'div')[0]
          .children.filter(item => item.name === 'div')[1]
          .children[1].children[1].children[0].children.filter(
            item => item.name === 'td'
          )[0].children[1].children[1].children[1].attribs.src
    )

    // .children
    //   .filter(item => item.name === 'div')[0]
    //   .children.filter(item => item.name === 'div')[1]
    //   .children[1].children[1].children[0].children.filter(item => item.name === 'td')[0]
    //   .children[1].children[1].children[1].attribs.src
  } catch (error) {
    console.log(error)
  }
}
