'use client'
import Button from "./Button"
import { useContext } from "react"
import LifeCounterContext from "./LifeCounterContext"


function LifeCounter() {

    const {player1Life, player2Life} = useContext(LifeCounterContext)

  return (
    <div className="flex w-[100vw] h-[100vh] relative">
        <div className="bg-[#B85E9F] flex-1 flex flex-col items-center justify-around h-full">
            <Button sign="plus" player={1}/>
            <div className="text-[128px] text-shadow absolute">{player1Life}</div>
            <Button sign="minus" player={1}/>
        </div>
        <div className="bg-[#5EB877] flex-1 flex flex-col items-center justify-around h-full">
            <Button sign="plus" player={2}/>
            <div className="text-[128px] text-shadow absolute">{player2Life}</div>
            <Button sign="minus" player={2}/>
        </div>
    </div>
  )
}
export default LifeCounter