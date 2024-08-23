'use client'
import { useContext, useEffect } from "react"
import LifeCounterContext from "../context/LifeCounterContext"
import AdminButton from "./AdminButton"
import useTimer from "../context/useTimer"
import TimerForm from "./TimerForm"
import TimerExtensionForm from "./TimerExtensionForm"
import { Hourglass } from "react-loader-spinner"
import StopWatchForm from "./StopWatchForm"
import ResetForm from "./ResetForm"

function Admin() {

    const {player1Life, player1LifeChange, player2Life, player2LifeChange, reset, properTime, pauseTime, pause, resumeTime, stopWatchMode} = useContext(LifeCounterContext)

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
    <div className="select-none w-[100vw] h-[100vh] flex flex-col items-center gap-[16px] lg:gap-[32px] text-[24px] md:text-[48px] relative">

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

        <div className="flex justify-center items-center gap-[0px] flex-col lg:flex-row">

    
            <div className="hidden lg:flex flex-col items-center bg-[#B85E9F] px-[96px] pb-[64px]">
                <div className="text-[96px] text-shadow relative">
                    {player1Life}
                    <div className="absolute right-[-64px] top-0 text-[48px]">
                        {player1LifeChange > 0 && <>+</>}
                        {player1LifeChange !== 0 && player1LifeChange}
                    </div>
                </div>
                <div className="flex gap-[48px]">
                    <AdminButton sign="plus" player={1}/>
                    <AdminButton sign="minus" player={1}/>
                </div>
            </div>

            <div className="hidden lg:flex flex-col items-center bg-[#5EB877] px-[96px] pb-[64px]">
                <div className="text-[96px] text-shadow relative">
                    {player2Life}
                    <div className="absolute right-[-64px] top-0 text-[48px]">
                        {player2LifeChange > 0 && <>+</>}
                        {player2LifeChange !== 0 && player2LifeChange}
                    </div> 
                </div>
                <div className="flex gap-[48px]">
                    <AdminButton sign="plus" player={2}/>
                    <AdminButton sign="minus" player={2}/>
                </div>
            </div>

            <div className="flex lg:hidden flex-row items-center bg-[#B85E9F] p-[32px] gap-[16px] w-full justify-around">
                <AdminButton sign="plus" player={1}/>
                <div className="text-[96px] text-shadow relative">
                    {player1Life}
                    <div className="absolute right-[-64px] top-0 text-[48px]">
                        {player1LifeChange > 0 && <>+</>}
                        {player1LifeChange !== 0 && player1LifeChange}
                    </div>
                </div>
                <AdminButton sign="minus" player={1}/>
            </div>

            <div className="flex lg:hidden flex-row items-center bg-[#5EB877] p-[32px] gap-[16px] w-full justify-around">
                <AdminButton sign="plus" player={2}/>
                <div className="text-[96px] text-shadow relative">
                    {player2Life}
                    <div className="absolute right-[-64px] top-0 text-[48px]">
                        {player2LifeChange > 0 && <>+</>}
                        {player2LifeChange !== 0 && player2LifeChange}
                    </div>    
                </div>
                <AdminButton sign="minus" player={2}/>
            </div>

            <div className="py-[24px] lg:py-[0px] lg:px-[128px] lg:min-h-[256px] bg-slate-50 h-full justify-center items-center text-shadow flex flex-row lg:flex-col gap-[32px] w-full lg:w-fit relative">
                <div className={`${pause ? 'text-red-500' : 'text-black'}`}>
                    {properTime}
                </div>

                <div className="flex flex-col xl:flex-row gap-[32px]">
                    {/* <button className="text-nowrap box-shadow px-[32px] bg-white hover:bg-slate-200 text-[24px] lg:text-[32px]" onClick={() => syncTime()}>Sync Time</button> */}

                    <button className={`box-shadow px-[32px] text-nowrap ${pause ? 'bg-red-200 hover:bg-red-400' : 'bg-white hover:bg-slate-200'}  text-[24px] lg:text-[32px]`} onClick={() => onClick()}>{pause ? 'Resume Time' : 'Pause Time'}</button>
                </div>

                {/* <div className="text-[13px] text-red-500 font-bold font-sans absolute bottom-0 left-[50%] translate-x-[-50%]">{pause && "TIME IS PAUSED"}</div> */}

                {/* <div className="text-[13px] font-bold font-sans absolute bottom-[16px] left-[50%] translate-x-[-50%]">{stopWatchMode && "Stop Watch Active"}</div> */}
            </div>

        </div>


        <div className="grid grid-cols-[minmax(auto,max-content)_1fr] gap-[16px] pb-[32px]">
            {/* life reset form */}

            <div>Life: </div>

            <div className="flex gap-[16px] md:gap-[32px] justify-start flex-row">
                <button onClick={() => reset(40)} className="box-shadow bg-white w-[64px] md:w-[196px] hover:bg-slate-200">
                    40
                </button>

                <button onClick={() => reset(20)} className="box-shadow bg-white w-[64px] md:w-[196px] hover:bg-slate-200">
                    20
                </button>
            </div>

            <div>Timer: </div>
            <TimerForm />
            <div>Reset: </div>
            <ResetForm/>
            <div>Style: </div>
            <StopWatchForm />
        </div>

        {/* <div className="font-bold font-sans text-[19px] absolute left-0 top-0">
            Instance: {process.env.NEXT_PUBLIC_INSTANCE}
        </div> */}

    </div>
    
  )
}
export default Admin