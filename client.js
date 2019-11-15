class Anime {
  constructor () {
    this.name = ''
    this.id = ''
    this.list = document.getElementById('list')
    this.iframe = document.getElementById('iframe')
    this.changeAnimeName = document.getElementById('changeAnimeName')
    this.changeAnimeId = document.getElementById('changeAnimeId')
  }

  handleAnimeText (e) {
    this.name = e.target.value
  }
  handleAnimeId (e) {
    this.id = e.target.value
    console.log(e.target.value)
  }
  createAnimeLink () {
    const li = document.createElement('li')
    li.innerHTML = `<h4>${this.name}: ${this.id}</h4>`
    list.appendChild(li)
    fetch(`http://localhost:3001/${this.id}`, {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json)
          this.changeAnimeName.value = ''
          this.changeAnimeId.value = ''
        })
      }
    })
  }

  init () {
    this.changeAnimeName.addEventListener('input', e => this.handleAnimeText(e))
    this.changeAnimeId.addEventListener('input', e => this.handleAnimeId(e))
    document.getElementById('submitAnime').addEventListener('click', () => this.createAnimeLink())
  }
}

const A = new Anime()
A.init()
