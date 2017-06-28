window.$(document).ready(() => {
  console.log('the dom is loaded and main.js is running!')
  $('#load').click(evt => {
    loadAllHerps();
  })

  $('#add').submit(evt => {
    addHerp(evt);
  })

});

function loadAllHerps() {
  $.ajax({
    method: 'GET',
    url: '/api/herps'
  })
    .then(allCritters => {
      let critterHtml = allCritters.map(critter => {
        return `<li><img class="profile" src=${critter.picture_url} /> - ${critter.name} - $${critter.price}</li>`
      })
      $('#herp-list').empty().append(critterHtml);
    })
    .catch(console.error)
}

function addHerp(e) {
  e.preventDefault();
  let name = e.target[0].value;
  let price = e.target[1].value;
  let image_url = e.target[2].value;
  $.ajax({
    method: 'POST',
    url: '/api/herps',
    data: {
      name: name,
      price: price,
      picture_url: image_url
    }
  })
    .then(newHerp => {
      $('#herp-list').append(`<li><img class="profile" src=${newHerp.picture_url} /> - ${newHerp.name} - $${newHerp.price}</li>`)
    })
    .catch(console.error)
}
