'use client'
import Button from "./life/Button"
import { useContext, useState } from "react"
import LifeCounterContext from "./context/LifeCounterContext"
import { Hourglass } from 'react-loader-spinner'
import { faExpand, faUpRightAndDownLeftFromCenter, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function LifeCounter() {

    const {player1Life, player2Life, player1LifeChange, player2LifeChange, properTime, pause, pauseTime, resumeTime, stopWatchMode } = useContext(LifeCounterContext)

    const onClick = () => {
      // pause time here 
      if(!pause){
        pauseTime()
      }
      if(pause){
        resumeTime()
      }
    }

    const [fullScreen, setFullScreen] = useState(false) 

    const fullscreenHandler = () => {
      if(!fullScreen){
        document.getElementById('page')?.requestFullscreen()
        setFullScreen(true)
      } else {
        document.exitFullscreen()
        setFullScreen(false)
      }
    }

  return (

    <div className="relative touch-manipulation select-none" id="page">
      <div className="flex relative">
          <div className="bg-[#B85E9F] flex-1 flex flex-col items-center justify-around">
              <Button sign="plus" player={1}/>
              <div className="text-[13vh] sm:text-[18vh] text-shadow select-none absolute pointer-events-none">
                {player1Life}
                <div className="absolute right-[-64px] top-0 text-[48px]">
                  {player1LifeChange > 0 && <>+</>}
                  {player1LifeChange !== 0 && player1LifeChange}
                </div>
              </div>
              <Button sign="minus" player={1}/>
              
          </div>
          <div className="bg-[#5EB877] flex-1 flex flex-col items-center justify-around">
              <Button sign="plus" player={2}/>
              <div className="text-[13vh] sm:text-[18vh] text-shadow select-none absolute pointer-events-none">
                {player2Life}
                <div className="absolute right-[-64px] top-0 text-[48px]">
                  {player2LifeChange > 0 && <>+</>}
                  {player2LifeChange !== 0 && player2LifeChange}
                </div>
              </div>
              <Button sign="minus" player={2}/>
              
          </div>
      </div>


      <div tabIndex={-1} onClick={() => onClick()} className={`bg-white text-[10vh] sm:text-[12vh] md:text-[15vh] flex justify-center absolute bottom-0 left-[50%] translate-x-[-50%] px-[4vw] rounded-t-[16px] md:rounded-t-[32px] box-shadow select-none hover:bg-slate-200 cursor-pointer ${pause ? 'text-red-500' : 'text-black'}`}>
        {properTime}
      </div>

      <div tabIndex={-1} className="absolute bottom-0 left-[50%] translate-x-[-50%] flex gap-[16px]">
        {/* <div className=" pointer-events-none font-sans font-bold text-[16px] text-black">
          {stopWatchMode && <><FontAwesomeIcon icon={faClock}/>&nbsp; STOPWATCH MODE ACTIVE</>}
        </div> */}

        <div className="pointer-events-none font-sans font-bold text-[10px] md:text-[16px] text-slate-700">
          {pause ? "Tap to Resume" : "Tap to Pause"}
        </div>
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


        <div className="text-black absolute top-0 right-[50%] translate-x-[50%] text-[24px] cursor-pointer bg-white box-shadow-extra-small p-[4px] rounded-b-[4px] flex items-center justify-center" onClick={() => fullscreenHandler()}>
          <FontAwesomeIcon icon={ faUpRightAndDownLeftFromCenter}/>
        </div>
      

      {/* <div className="font-bold font-sans text-[19px] absolute left-0 top-0">
        Instance: {process.env.NEXT_PUBLIC_INSTANCE}
      </div> */}
    </div>
  )
}
export default LifeCounter