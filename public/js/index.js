let socket = io()
socket.on('connect', () => {
    console.log(` I am connected with the server!`)
})