const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const port = process.env.PORT || 3003
const publicPath = path.join(__dirname, './public')
console.log(publicPath)
const moment = require('moment')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath))

server = http.createServer(app)

const io = socketIO(server.listen(port, () => {
    console.log(`server started at ${port}`)
}))

io.on('connection', (socket) => {
    console.log(`Client with ${socket.id} is connected!`)
    io.emit('newUserJoin', {sockName : socket.id})

    socket.on('disconnect', () => {
        console.log(`Client with ${socket.id} is dis-connected!`)
    })

    socket.on('createMessage', (data, callback) => {
        io.emit('studInfo', {data: data, sockName: socket.id, time: moment().format('Do MMM YY')})
        callback()
    })
})

// mongodb://<dbuser>:<dbpassword>@ds211504.mlab.com:11504/mlabdb
// mlab API key - mLKK7m_9Iv5jthJ6NyLdU97bZmb8jsOP