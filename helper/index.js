module.exports = {
  checkForAttribs: async video =>
    video
      ? {
          href: video.attribs.href,
          img: video.attribs.style
        }
      : undefined,
  cleanRegEx: data => data.replace(/^\s+|\s+$|\s+(?=\s)[\n]/g, '')
}
