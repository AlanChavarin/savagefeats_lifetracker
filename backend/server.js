const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
app.use(cors())
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    console.log('a user connected: ' + socket.id)

    // socket.on("join_room", (data) => {
    //     socket.join(data)
    // })
    
    socket.on("send_message", (data) => {
        console.log(data)
        io.sockets.emit("receive_message", data)
    })
})

server.listen('8080', () => {
    console.log('App started on port ' + '8080')
    //console.log('App is currently in ' + process.env.NODE_ENV + ' mode.')
})