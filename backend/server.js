const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
require('dotenv').config()
app.use(cors())
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: process.env.CORS,
        methods: ["GET", "POST"]
    }
})

let player1Life = 40
let player2Life = 40
let timeLeft = 0
let pause = false

io.on('connection', socket => {
    console.log('a user connected: ' + socket.id)

    socket.on("updatePlayer1Life", (data) => {
        player1Life = parseInt(data)
        io.sockets.emit("updatePlayer1Life", player1Life)
        console.log("player1Life updated with value: ", player1Life)
    })

    socket.on("updatePlayer2Life", (data) => {
        player2Life = parseInt(data)
        io.sockets.emit("updatePlayer2Life", player2Life)
        console.log("player2Life updated with value: ", player2Life)
    })

    socket.on("setTimer", (data) => {
        timeLeft = parseInt(data)
        io.sockets.emit("updateTimer", timeLeft)
        console.log("timer updated with value: ", timeLeft)
    })

    socket.on('syncDataWithMe', () => {
        console.log("newConnectionEvent")
        socket.emit("updatePlayer1Life", player1Life)
        socket.emit("updatePlayer2Life", player2Life)
        if(pause){
            socket.emit("pauseTime")
        } else {
            socket.emit("resumeTime")
        }
        //socket.emit("updateTimer", timeLeft)
    })

    socket.on("pauseTime", () => {
        console.log('pauseTime')
        pause = true
        io.sockets.emit('pauseTime')
    })

    socket.on("resumeTime", () => {
        console.log('resumeTime')
        pause = false
        io.sockets.emit('resumeTime')
    })
})

server.listen(process.env.PORT, () => {
    console.log('Server started on port ' + '8080')
    //console.log('App is currently in ' + process.env.NODE_ENV + ' mode.')
})