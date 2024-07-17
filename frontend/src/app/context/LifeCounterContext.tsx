'use client'
import { createContext, useState, useEffect, ReactNode} from 'react'
import { z } from 'zod'
import * as io from 'socket.io-client'
const socket = io.connect(`${process.env.NEXT_PUBLIC_BACKEND}`)
import useTimer from './useTimer'

interface LifeCounterContextType {
    player1Life: number | undefined,
    player2Life: number | undefined,
    reset: (life: number) => void,
    incrementPlayer1Life: () => void,
    incrementPlayer2Life: () => void,
    decrementPlayer1Life: () => void,
    decrementPlayer2Life: () => void,
    setTime: (time: number) => void,
    timer: number | undefined,
    properTime: string | undefined,
    addExtension: (time: number) => void,
    syncTime: () => void,
    pauseTime: () => void,
    resumeTime: () => void,
    pause: boolean,
    startStopWatch: () => void,
    stopWatchMode: boolean
}

let LifeCounterInitValues: LifeCounterContextType = {
    player1Life: 40,
    player2Life: 40,
    reset: (life: number) => null,
    incrementPlayer1Life: () => null,
    incrementPlayer2Life: () => null,
    decrementPlayer1Life: () => null,
    decrementPlayer2Life: () => null,
    setTime: (time: number) => null,
    timer: 0,
    properTime: "",
    addExtension: (time: number) => null,
    syncTime: () => null,
    pauseTime: () => null,
    resumeTime: () => null,
    pause: false,
    startStopWatch: () => null,
    stopWatchMode: false
}

const LifeCounterContext = createContext<LifeCounterContextType>(LifeCounterInitValues)

interface ProviderProps {
    children: ReactNode
}


export const LifeCounterProvider: React.FC<ProviderProps> = ({children}) => {

    const {timeLeft, setTimeLeft, properTime, pause, setPause, stopWatchMode, setStopWatchMode} = useTimer()

    const [player1Life, setPlayer1Life] = useState<number | undefined>(undefined)
    const [player2Life, setPlayer2Life] = useState<number | undefined>(undefined)

    useEffect(() => {
        socket.emit("syncDataWithMe")
    }, [])

    const reset = (life: number) => {
        setPlayer1Life(life)
        setPlayer2Life(life)
        socket.emit('updatePlayer1Life', life)
        socket.emit('updatePlayer2Life', life)
        
    }

    const incrementPlayer1Life = () => {
        setPlayer1Life(prev => {
            const newValue = (prev ? prev : 0) + 1
            socket.emit('updatePlayer1Life', newValue)
            return newValue
        })
        
    }

    const incrementPlayer2Life = () => {
        setPlayer2Life(prev => {
            const newValue = (prev ? prev : 0) + 1
            socket.emit('updatePlayer2Life', newValue)
            return newValue
        })
    }

    const decrementPlayer1Life = () => {
        setPlayer1Life(prev => {
            const newValue = (prev ? prev : 0) - 1
            socket.emit('updatePlayer1Life', newValue)
            return newValue
        })
    }

    const decrementPlayer2Life = () => {
        setPlayer2Life(prev => {
            const newValue = (prev ? prev : 0) - 1
            socket.emit('updatePlayer2Life', newValue)
            return newValue
        })
    }

    const pauseTime = () => {
        socket.emit('pauseTime')
    }

    const resumeTime = () => {
        socket.emit('resumeTime')
    }

    const setTime = (time: number) => {
        setStopWatchMode(false)
        setTimeLeft(time)
        socket.emit("setTimer", time)
        socket.emit("stopStopWatch")
    }

    const addExtension = (time: number) => {
        const newTime = timeLeft + time
        setTimeLeft(newTime)
        socket.emit("setTimer", newTime)
    }

    const syncTime = () => {
        socket.emit("setTimer", timeLeft)
    }

    const startStopWatch = () => {
        socket.emit("startStopWatch")
    }

    useEffect(() => {
        socket.on("updatePlayer1Life", (data) => {
            setPlayer1Life(data)
        })
        socket.on("updatePlayer2Life", (data) => {
            setPlayer2Life(data)
        })
        socket.on("updateTimer", (data) => {
            setTimeLeft(data)
        })
        socket.on("pauseTime", () => {
            setPause(true)
        })
        socket.on("resumeTime", () => {
            setPause(false)
        })
        socket.on("startStopWatch", () => {
            setTimeLeft(0)
            setStopWatchMode(true)
        })
        socket.on("stopStopWatch", () => {
            setStopWatchMode(false)
        })


    }, [socket.on])
    

  return (
    <LifeCounterContext.Provider value={{player1Life, player2Life, reset, incrementPlayer1Life, incrementPlayer2Life, decrementPlayer1Life, decrementPlayer2Life, timer: timeLeft, properTime, setTime, addExtension, syncTime, pause, pauseTime, resumeTime, stopWatchMode, startStopWatch}}>
        {children}
    </LifeCounterContext.Provider>
  )
}

export default LifeCounterContext