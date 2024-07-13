'use client'
import { useContext } from "react"
import LifeCounterContext from "../context/LifeCounterContext"

function Output() {

    const { player1Life, player2Life, properTime } = useContext(LifeCounterContext)

  return (
    <div className="text-white font-bold text-[128px] w-[100vw] h-[100vh] ">
        <div>
            {player1Life}
        </div>
        <div>
            {player2Life}
        </div>
        <div>
            {properTime}
        </div>
    </div>
  )
}
export default Output