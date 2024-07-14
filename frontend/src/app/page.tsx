'use client'
import Button from "./life/Button"
import { useContext } from "react"
import LifeCounterContext from "./context/LifeCounterContext"
import { Hourglass } from 'react-loader-spinner'

function LifeCounter() {

    const {player1Life, player2Life, properTime, pause, pauseTime, resumeTime } = useContext(LifeCounterContext)

    const onClick = () => {
      // pause time here 
      if(!pause){
        pauseTime()
      }
      if(pause){
        resumeTime()
      }
    }

  return (

    <div className="relative touch-none">
      <div className="flex relative">
          <div className="bg-[#B85E9F] flex-1 flex flex-col items-center justify-around">
              <Button sign="plus" player={1}/>
              <div className="text-[13vh] sm:text-[18vh] text-shadow select-none absolute">{player1Life}</div>
              <Button sign="minus" player={1}/>
          </div>
          <div className="bg-[#5EB877] flex-1 flex flex-col items-center justify-around">
              <Button sign="plus" player={2}/>
              <div className="text-[13vh] sm:text-[18vh] text-shadow select-none absolute">{player2Life}</div>
              <Button sign="minus" player={2}/>
          </div>
      </div>

      <div onClick={() => onClick()} className={`bg-white text-[10vh] sm:text-[12vh] md:text-[15vh] flex justify-center absolute bottom-0 left-[50%] translate-x-[-50%] px-[4vw] rounded-t-[16px] md:rounded-t-[32px] box-shadow select-none hover:bg-slate-200 cursor-pointer ${pause ? 'text-red-500' : 'text-black'}`}>
        {properTime}
      </div>

      <div className="absolute bottom-0 left-[50%] translate-x-[-50%] pointer-events-none font-sans font-bold text-[19px] text-red-500">
        {pause && "TIME IS PAUSED"}
      </div>

      {(player1Life === undefined) && (player2Life === undefined) &&
        <div className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['Black', 'Black']} />
        </div>}
      

      {/* <div className="font-bold font-sans text-[19px] absolute left-0 top-0">
        Instance: {process.env.NEXT_PUBLIC_INSTANCE}
      </div> */}
    </div>
  )
}
export default LifeCounter