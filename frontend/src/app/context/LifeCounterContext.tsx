'use client'
import { createContext, useState, useEffect, ReactNode, useRef} from 'react'
import { z } from 'zod'
import * as io from 'socket.io-client'
//import { v4 as uuidv4 } from 'uuid'
const socket = io.connect(`${process.env.NEXT_PUBLIC_BACKEND}`)
import useTimer from './useTimer'

// get socketid

interface LifeCounterContextType {
    player1Life: number | undefined,
    player2Life: number | undefined,
    player1LifeChange: number,
    player2LifeChange: number,
    reset: (life: number) => void,
    incrementPlayer1Life: (num: number) => void,
    incrementPlayer2Life: (num: number) => void,
    decrementPlayer1Life: (num: number) => void,
    decrementPlayer2Life: (num: number) => void,
    setTime: (time: number) => void,
    timer: number | undefined,
    properTime: string | undefined,
    addExtension: (time: number) => void,
    //syncTime: () => void,
    pauseTime: () => void,
    resumeTime: () => void,
    pause: boolean,
    startStopWatch: () => void,
    stopStopWatch: () => void,
    stopWatchMode: boolean,
    socketid: string | undefined
}

let LifeCounterInitValues: LifeCounterContextType = {
    player1Life: 40,
    player2Life: 40,
    player1LifeChange: 0,
    player2LifeChange: 0,
    reset: (life: number) => null,
    incrementPlayer1Life: (num: number) => null,
    incrementPlayer2Life: (num: number) => null,
    decrementPlayer1Life: (num: number) => null,
    decrementPlayer2Life: (num: number) => null,
    setTime: (time: number) => null,
    timer: 0,
    properTime: "",
    addExtension: (time: number) => null,
    //syncTime: () => null,
    pauseTime: () => null,
    resumeTime: () => null,
    pause: false,
    startStopWatch: () => null,
    stopStopWatch: () => null,
    stopWatchMode: false,
    socketid: undefined
}

const LifeCounterContext = createContext<LifeCounterContextType>(LifeCounterInitValues)

interface ProviderProps {
    children: ReactNode
}


export const LifeCounterProvider: React.FC<ProviderProps> = ({children}) => {

    const [socketid, setSocketid] = useState<string | undefined>(undefined)

    const {timeLeft, setTimeLeft, properTime, pause, setPause, stopWatchMode, setStopWatchMode} = useTimer()

    const [player1Life, setPlayer1Life] = useState<number | undefined>(undefined)
    const [player2Life, setPlayer2Life] = useState<number | undefined>(undefined)

    const [player1LifeChange, setPlayer1LifeChange] = useState<number>(0)
    const [player2LifeChange, setPlayer2LifeChange] = useState<number>(0)

    useEffect(() => {
        socket.emit("syncDataWithMe")
    }, [])

    const reset = (life: number) => {
        setPlayer1Life(life)
        setPlayer2Life(life)
        socket.emit('updatePlayer1Life', {value: life, socketid: socketid})
        socket.emit('updatePlayer2Life', {value: life, socketid: socketid})

    }

    const incrementPlayer1Life = (num: number) => {
        setPlayer1Life(prev => {
            const newValue = (prev ? prev : 0) + num
            socket.emit('updatePlayer1Life', {value: newValue, socketid: socketid})
            return newValue
        })

        setPlayer1LifeChange(prev => prev + num)
        
    }

    const incrementPlayer2Life = (num: number) => {
        setPlayer2Life(prev => {
            const newValue = (prev ? prev : 0) + num
            socket.emit('updatePlayer2Life', {value: newValue, socketid: socketid})
            return newValue
        })

        setPlayer2LifeChange(prev => prev + num)
    }

    const decrementPlayer1Life = (num: number) => {
        setPlayer1Life(prev => {
            const newValue = (prev ? prev : 0) - num
            socket.emit('updatePlayer1Life', {value: newValue, socketid: socketid})
            return newValue
        })

        setPlayer1LifeChange(prev => prev - num)
    }

    const decrementPlayer2Life = (num: number) => {
        setPlayer2Life(prev => {
            const newValue = (prev ? prev : 0) - num
            socket.emit('updatePlayer2Life', {value: newValue, socketid: socketid})
            return newValue
        })

        setPlayer2LifeChange(prev => prev - num)
    }

    const pauseTime = () => {
        socket.emit('pauseTime')
    }

    const resumeTime = () => {
        socket.emit('resumeTime')
    }

    const setTime = (time: number) => {
        // setStopWatchMode(false)
        setTimeLeft(time)
        socket.emit("setTimer", time)
        //socket.emit("stopStopWatch")
    }

    const addExtension = (time: number) => {
        const newTime = timeLeft + time
        setTimeLeft(newTime)
        socket.emit("setTimer", newTime)
    }

    // const syncTime = () => {
    //     socket.emit("setTimer", timeLeft)
    // }

    const startStopWatch = () => {
        socket.emit("startStopWatch")
    }

    const stopStopWatch = () => {
        socket.emit("stopStopWatch")
    }

    useEffect(() => {
        setSocketid(socket.id)
    }, [socket.id])

    // useEffect(() => {
    //     const handleConnect = () => {
    //         const newSocketId = socket.id
    //         setSocketid(newSocketId)
    //         console.log("Connected with socket ID:", newSocketId)
    //     }

    //     // If socket is already connected, set the ID immediately
    //     if (socket.connected) {
    //         handleConnect()
    //     }

    //     // Set up listener for future connections
    //     socket.on('connect', handleConnect)

    //     // Clean up the listener when the component unmounts
    //     return () => {
    //         socket.off('connect', handleConnect)
    //     }
    // }, [])


    useEffect(() => {

        socket.on("updatePlayer1Life", (data) => {
            if(data.socketid !== socket.id || data.socketid === undefined){
                setPlayer1Life(data.value)
            }
        })
        socket.on("updatePlayer2Life", (data) => {
            if(data.socketid !== socket.id || data.socketid === undefined){
                setPlayer2Life(data.value)
            }
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
            setStopWatchMode(true)
        })
        socket.on("stopStopWatch", () => {
            setStopWatchMode(false)
        })

    }, [socket.on, socketid])


    const timeoutRef = useRef<number | null>(null)
    const lastValueRef = useRef<string>('')

    useEffect(() => {
        // Clear the existing timeout
        // @ts-ignore
        if (timeoutRef.current !== null) {
            // @ts-ignore
          clearTimeout(timeoutRef.current)
        }
    
        // If the value has changed, update lastValueRef
        // @ts-ignore
        if (player2LifeChange !== lastValueRef.current) {
            // @ts-ignore
          lastValueRef.current = player2LifeChange
        }
    
        // Set a new timeout
        // @ts-ignore
        timeoutRef.current = window.setTimeout(() => {
          // Check if the value hasn't changed in the last 5 seconds
          // @ts-ignore
          if (player2LifeChange === lastValueRef.current) {
            // @ts-ignore
            //console.log('Value remained unchanged for 5 seconds:', player2LifeChange)
            // Your event logic here
            setPlayer2LifeChange(0)
          }
        }, 1600)
    
        // Cleanup function
        return () => {
            // @ts-ignore
          if (timeoutRef.current !== null) {
            // @ts-ignore
            clearTimeout(timeoutRef.current)
          }
        }
        
      }, [player2LifeChange])


        const timeoutRef1 = useRef<number | null>(null)
        const lastValueRef1 = useRef<string>('')

      useEffect(() => {
        // Clear the existing timeout
        // @ts-ignore
        if (timeoutRef1.current !== null) {
            // @ts-ignore
          clearTimeout(timeoutRef1.current)
        }
    
        // If the value has changed, update lastValueRef
        // @ts-ignore
        if (player1LifeChange !== lastValueRef1.current) {
            // @ts-ignore
          lastValueRef1.current = player1LifeChange
        }
    
        // Set a new timeout
        // @ts-ignore
        timeoutRef1.current = window.setTimeout(() => {
          // Check if the value hasn't changed in the last 5 seconds
          // @ts-ignore
          if (player1LifeChange === lastValueRef1.current) {
            // @ts-ignore
            //console.log('Value remained unchanged for 5 seconds:', player1LifeChange)
            // Your event logic here
            setPlayer1LifeChange(0)
          }
        }, 1600)
    
        // Cleanup function
        return () => {
            // @ts-ignore
          if (timeoutRef1.current !== null) {
            // @ts-ignore
            clearTimeout(timeoutRef1.current)
          }
        }
        
      }, [player1LifeChange])
    

    

  return (
    <LifeCounterContext.Provider value={{player1Life, player2Life, player1LifeChange, player2LifeChange, reset, incrementPlayer1Life, incrementPlayer2Life, decrementPlayer1Life, decrementPlayer2Life, timer: timeLeft, properTime, setTime, addExtension, pause, pauseTime, resumeTime, stopWatchMode, startStopWatch, stopStopWatch, socketid}}>
        {children}
    </LifeCounterContext.Provider>
  )
}

export default LifeCounterContext