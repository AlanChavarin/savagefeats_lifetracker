'use client'
import { useContext } from "react"
import LifeCounterContext from "../context/LifeCounterContext"

function Output() {

    const { player1Life, player2Life, properTime } = useContext(LifeCounterContext)

  return (
    <div className="text-white font-bold text-[128px] w-[100vw] h-[100vh] ">
        <div className="flex justify-center">
            {player1Life}
        </div>
        <div className="flex justify-center">
            {player2Life}
        </div>
        <div className="flex justify-center">
            {properTime}
        </div>
    </div>
  )
}
export default Output