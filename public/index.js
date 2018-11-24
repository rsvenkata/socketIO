
let socket = io()
socket.on('connect', () => {
    console.log(` I am connected with the server!`)
})

jQuery('#send-location').on('click', () => {
  
    if(!navigator.geolocation)
      return alert('Geo not available!')

      navigator.geolocation.getCurrentPosition((position) => {
          console.log(position)
      }, () => {
          console.log('Unable to get location')
      })
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        name: jQuery('[name=message]').val()
    }, () => {
        jQuery('[name=message]').val('')
    })
})

socket.on('studInfo', (data) => {
    let li1 = jQuery('<li></li>');
    li1.text(`User says ==> ${data.data.name} ${data.time}`)  //${data.sockName} :
    jQuery('#Messages').append(li1)
})

socket.on('newUserJoin', (data) => {
let li2 = jQuery('<li></li>');
    //jQuery('#Messages').append(li2.text(`${data.sockName} joined the chat`))
    jQuery('#Messages').append(li2.text(`New user joined the chat`))
})