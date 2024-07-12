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
})

// setInterval(() => {
//     if(timeLeft > 0){
//         timeLeft--
//         console.log(timeLeft)
//         io.sockets.emit("updateTimer", timeLeft)
//     }
// }, 1000)

app.listen("8081", () => {
    console.log('App started on port ' + '8081')
})

app.get('/data/', async (req, res) => {
    res.status(200)
    res.json({
        player1Life,
        player2Life,
        timer: timeLeft
    })
})

server.listen('8080', () => {
    console.log('Server started on port ' + '8080')
    //console.log('App is currently in ' + process.env.NODE_ENV + ' mode.')
})