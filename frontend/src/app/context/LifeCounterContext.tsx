'use client'
import { createContext, useState, useEffect, ReactNode} from 'react'
import { z } from 'zod'
import * as io from 'socket.io-client'
const socket = io.connect(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}`)
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
    syncTime: () => void
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
    syncTime: () => null
}

const LifeCounterContext = createContext<LifeCounterContextType>(LifeCounterInitValues)

interface ProviderProps {
    children: ReactNode
}

const responseSchema = z.object({
    player1Life: z.number(),
    player2Life: z.number(),
    timer: z.number()
})


export const LifeCounterProvider: React.FC<ProviderProps> = ({children}) => {

    const {timeLeft, setTimeLeft, properTime} = useTimer()

    const [player1Life, setPlayer1Life] = useState<number | undefined>(undefined)
    const [player2Life, setPlayer2Life] = useState<number | undefined>(undefined)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_APP}data/`)
        .then(r => r.json())
        .then(data => {
            const validatedData = responseSchema.safeParse(data)
            if(validatedData.success){
                setPlayer1Life(validatedData.data.player1Life)
                setPlayer2Life(validatedData.data.player2Life)
                //setTimeLeft(validatedData.data.timer)
            } else {
                throw new Error('unexpected data')
            }
        })
        .catch(error => {
            console.error(error)
        })
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

    const setTime = (time: number) => {
        setTimeLeft(time)
        socket.emit("setTimer", time)
    }

    const addExtension = (time: number) => {
        const newTime = timeLeft + time
        setTimeLeft(newTime)
        socket.emit("setTimer", newTime)
    }

    const syncTime = () => {
        socket.emit("setTimer", timeLeft)
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

    }, [socket.on])
    

  return (
    <LifeCounterContext.Provider value={{player1Life, player2Life, reset, incrementPlayer1Life, incrementPlayer2Life, decrementPlayer1Life, decrementPlayer2Life, timer: timeLeft, properTime, setTime, addExtension, syncTime}}>
        {children}
    </LifeCounterContext.Provider>
  )
}

export default LifeCounterContext