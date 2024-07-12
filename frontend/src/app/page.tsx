'use client'
import Button from "./life/Button"
import { useContext } from "react"
import LifeCounterContext from "./context/LifeCounterContext"


function LifeCounter() {

    const {player1Life, player2Life, properTime} = useContext(LifeCounterContext)

  return (

    <div className="relative">
      <div className="flex relative">
          <div className="bg-[#B85E9F] flex-1 flex flex-col items-center justify-around">
              <Button sign="plus" player={1}/>
              <div className="text-[96px] text-shadow select-none absolute">{player1Life}</div>
              <Button sign="minus" player={1}/>
          </div>
          <div className="bg-[#5EB877] flex-1 flex flex-col items-center justify-around">
              <Button sign="plus" player={2}/>
              <div className="text-[96px] text-shadow select-none absolute">{player2Life}</div>
              <Button sign="minus" player={2}/>
          </div>
      </div>

      <div className="bg-white text-[96px] flex justify-center absolute bottom-0 left-[50%] translate-x-[-50%] px-[64px] rounded-t-[32px] box-shadow pointer-events-none select-none">
        {properTime}
      </div>


    </div>
  )
}
export default LifeCounter