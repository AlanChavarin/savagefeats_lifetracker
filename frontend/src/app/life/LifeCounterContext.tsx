'use client'
import { createContext, useState, useEffect, ReactNode, useCallback, SetStateAction, Dispatch} from 'react'

interface LifeCounterContextType {
    player1Life: number,
    player2Life: number,
    reset: (life: number) => void,
    incrementPlayer1Life: () => void,
    incrementPlayer2Life: () => void,
    decrementPlayer1Life: () => void,
    decrementPlayer2Life: () => void,
}

let LifeCounterInitValues: LifeCounterContextType = {
    player1Life: 40,
    player2Life: 40,
    reset: (life: number) => null,
    incrementPlayer1Life: () => null,
    incrementPlayer2Life: () => null,
    decrementPlayer1Life: () => null,
    decrementPlayer2Life: () => null
}

const LifeCounterContext = createContext<LifeCounterContextType>(LifeCounterInitValues)

interface ProviderProps {
    children: ReactNode
}

export const LifeCounterProvider: React.FC<ProviderProps> = ({children}) => {

    const [player1Life, setPlayer1Life] = useState<number>(40)
    const [player2Life, setPlayer2Life] = useState<number>(40)

    const reset = (life: number) => {
        setPlayer1Life(life)
        setPlayer2Life(life)
    }

    const incrementPlayer1Life = () => {
        setPlayer1Life(prev => prev + 1)
    }

    const incrementPlayer2Life = () => {
        setPlayer2Life(prev => prev + 1)
    }

    const decrementPlayer1Life = () => {
        setPlayer1Life(prev => prev - 1)
    }

    const decrementPlayer2Life = () => {
        setPlayer2Life(prev => prev - 1)
    }

    useEffect(() => {
        console.log(player1Life, player2Life)
    }, [player1Life, player2Life])  
    

  return (
    <LifeCounterContext.Provider value={{player1Life, player2Life, reset, incrementPlayer1Life, incrementPlayer2Life, decrementPlayer1Life, decrementPlayer2Life}}>
        {children}
    </LifeCounterContext.Provider>
  )
}

export default LifeCounterContext