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
let pause = false
let stopWatchMode = false

let time = {
    minutes: 55,
    seconds: 0,
    startTime: new Date((55*60+0)*1000),
    referenceDate: new Date()
}

io.on('connection', socket => {
    console.log('a user connected: ' + socket.id)

    socket.on("updatePlayer1Life", (data) => {
        player1Life = parseInt(data.value)
        console.log(data.socketid)
        io.sockets.emit("updatePlayer1Life", {value: player1Life, socketid: data.socketid})
        console.log("player1Life updated with value: ", player1Life)
    })

    socket.on("updatePlayer2Life", (data) => {
        player2Life = parseInt(data.value)
        console.log(data.socketid)
        io.sockets.emit("updatePlayer2Life", {value: player2Life, socketid: data.socketid})
        console.log("player2Life updated with value: ", player2Life)
    })

    socket.on("setTimer", (data) => {
        time.minutes = Math.floor(parseInt(data)/60)
        time.seconds = Math.floor(parseInt(data)%60)
        time.referenceDate = new Date()
        time.startTime = new Date((time.minutes*60+time.seconds)*1000)
        io.sockets.emit("updateTimer", (time.seconds + time.minutes*60))
    })

    socket.on('syncDataWithMe', () => {
        console.log("newConnectionEvent")
        socket.emit("updatePlayer1Life", {value: player1Life, socketid: undefined})
        socket.emit("updatePlayer2Life", {value: player2Life, socketid: undefined})
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

        //capture time at pause
        time.startTime = new Date((time.minutes*60 + time.seconds)*1000)

        io.sockets.emit('pauseTime')
    })

    socket.on("resumeTime", () => {
        console.log('resumeTime')
        pause = false

        //set new reference date
        time.referenceDate = new Date()

        io.sockets.emit('resumeTime')
    })

    socket.on("startStopWatch", () => {
        console.log("startStopWatch")
        stopWatchMode = true
        // time.minutes = 0
        // time.seconds = 0
        time.referenceDate = new Date()
        time.startTime = new Date((time.minutes*60+time.seconds)*1000)
        // io.sockets.emit("updateTimer", (time.seconds + time.minutes*60))
        io.sockets.emit("startStopWatch")
    })

    socket.on("stopStopWatch", () => {
        console.log("stopStopWatch")
        stopWatchMode = false
        time.referenceDate = new Date()
        time.startTime = new Date((time.minutes*60+time.seconds)*1000)
        io.sockets.emit("stopStopWatch")
    })
   
})

const countDownTime = () => {
        if(!pause){
            if(!stopWatchMode){
                if(time.minutes || time.seconds){
                    const date = new Date()
                    const dateDifference = new Date(date.getTime() - time.referenceDate.getTime())
                    const finalTimeSum = new Date(time.startTime.getTime() - dateDifference.getTime())
                    //console.log(`${finalTimeSum.getUTCHours()*60 + finalTimeSum.getMinutes()}:${finalTimeSum.getSeconds()}`)
                    time.seconds = finalTimeSum.getSeconds()
                    time.minutes = finalTimeSum.getUTCHours()*60 + finalTimeSum.getMinutes()
                    console.log(`${time.minutes}:${time.seconds}`)
                    io.sockets.emit("updateTimer", (time.seconds + time.minutes*60))
                }
            } else {
                const date = new Date()
                const dateDifference = new Date(date.getTime() - time.referenceDate.getTime())
                const finalTimeSum = new Date(time.startTime.getTime() + dateDifference.getTime())
                console.log(`${finalTimeSum.getUTCHours()*60 + finalTimeSum.getMinutes()}:${finalTimeSum.getSeconds()}`)
                time.seconds = finalTimeSum.getSeconds()
                time.minutes = finalTimeSum.getUTCHours()*60 + finalTimeSum.getMinutes()
                io.sockets.emit("updateTimer", (time.seconds + time.minutes*60))
            }
        }
    }

setInterval(countDownTime, 1000)

// time.seconds = 10
// time.minutes = 120
// time.startTime = new Date((time.minutes*60+time.seconds)*1000)

// time.referenceDate = new Date()






server.listen(process.env.PORT, () => {
    console.log('Server started on port ' + '8080')
    //console.log('App is currently in ' + process.env.NODE_ENV + ' mode.')
})