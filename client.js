const list = document.getElementById('list')
const changeName = document.getElementById('changeAnimeName')
const changeId = document.getElementById('changeAnimeId')
const submitAnime = document.getElementById('submitAnime')

changeName.addEventListener('input', e => handleAnimeText(e))
changeId.addEventListener('input', e => handleAnimeText(e))
submitAnime.addEventListener('click', createAnimeLink)

let currentAnimeText = ''
let id = ''

function createAnimeLink () {
  const li = document.createElement('li')
  li.innerHTML = `<h4>${currentAnimeText}</h4><h5>${id}</h5>`
  return list.appendChild(li)
}

function handleAnimeText (e) {
  currentAnimeText = e.target.value
  console.log(e.target.value)
}
function handleAnimeId (e) {
  id = e.target.value
  console.log(e.target.value)
}
