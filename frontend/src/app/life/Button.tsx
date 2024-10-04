'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import LifeCounterContext from "../context/LifeCounterContext"

function Button({sign, player}: {sign: ("plus" | "minus"), player: (1 | 2)}) {

    const { incrementPlayer1Life, incrementPlayer2Life, decrementPlayer1Life, decrementPlayer2Life} = useContext(LifeCounterContext)

    const onClick = () => {

        if(sign === 'plus' && !isActivelyHolding){
            if(player === 1){
                incrementPlayer1Life(1)
            } else if(player === 2){
                incrementPlayer2Life(1)
            }
        }

        if(sign === 'minus' && !isActivelyHolding){
            if(player === 1){
                decrementPlayer1Life(1)
            } else if(player === 2){
                decrementPlayer2Life(1)
            }
        }
    }

    const incrementBy5 = () => {

        if(sign === 'plus'){
            if(player === 1){
                incrementPlayer1Life(5)
            } else if(player === 2){
                incrementPlayer2Life(5)
            }
        }

        if(sign === 'minus'){
            if(player === 1){
                decrementPlayer1Life(5)
            } else if(player === 2){
                decrementPlayer2Life(5)
            }
        }
    }



    const [isHolding, setIsHolding] = useState(false)
    const [isActivelyHolding, setIsActivelyHolding] = useState(false)
    const timerRef = useRef(null)
    const intervalRef = useRef(null)
  
    const handleMouseDown = () => {
        setIsHolding(true)
    }
  
    const handleMouseUp = () => {
        setIsHolding(false)
        setTimeout(() => {
            setIsActivelyHolding(false)
        }, 100)
    }   

    useEffect(() => {
        if (isHolding) {

            //@ts-ignore
          timerRef.current = setTimeout(() => {
            //@ts-ignore
            incrementBy5()
            setIsActivelyHolding(true)

            //@ts-ignore
            intervalRef.current = setInterval(incrementBy5, 400)
          }, 500)
        } else {
          //@ts-ignore
          clearTimeout(timerRef.current)
          //@ts-ignore
          clearInterval(intervalRef.current)
        }
    
        return () => {
            //@ts-ignore
          clearTimeout(timerRef.current)
          //@ts-ignore
          clearInterval(intervalRef.current)
        }
      }, [isHolding])

  return (
    <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp} onClick={() => onClick()} className="h-[50vh] w-full flex items-center justify-center  cursor-pointer">
        <div className="w-[25vh] h-[25vh] max-w-[128px] max-h-[128px] md:max-w-[256px] md:max-h-[256px] bg-white rounded-full flex items-center justify-center box-shadow">
            {sign === 'plus' && <FontAwesomeIcon icon={faPlus} className="w-[18vh] h-[18vh] max-w-[72px] md:max-w-[128px] md:max-h-[128px]" />}
            {sign === 'minus' && <FontAwesomeIcon icon={faMinus} className="w-[18vh] h-[18vh] max-w-[72px] md:max-w-[128px] md:max-h-[128*px]" />}
        </div>
    </div>
    
  )
}
export default Button