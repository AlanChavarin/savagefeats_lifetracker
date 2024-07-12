'use client'
import { useContext, useEffect } from "react"
import LifeCounterContext from "../context/LifeCounterContext"
import AdminButton from "./AdminButton"
import useTimer from "../context/useTimer"
import TimerForm from "./TimerForm"
import TimerExtensionForm from "./TimerExtensionForm"

function page() {

    const {player1Life, player2Life, reset, properTime, syncTime} = useContext(LifeCounterContext)

  return (
    <div className="select-none w-[100vw] h-[100vh] flex flex-col gap-[16px] lg:gap-[64px] text-[32px] md:text-[64px]">
        <div className="flex justify-center items-center gap-[0px] flex-col lg:flex-row">

    
            <div className="hidden lg:flex flex-col items-center bg-[#B85E9F] px-[96px] pb-[64px]">
                <div className="text-[96px] text-shadow">{player1Life}</div>
                <div className="flex gap-[48px]">
                    <AdminButton sign="plus" player={1}/>
                    <AdminButton sign="minus" player={1}/>
                </div>
            </div>

            <div className="hidden lg:flex flex-col items-center bg-[#5EB877] px-[96px] pb-[64px]">
                <div className="text-[96px] text-shadow">{player2Life}</div>
                <div className="flex gap-[48px]">
                    <AdminButton sign="plus" player={2}/>
                    <AdminButton sign="minus" player={2}/>
                </div>
            </div>

            <div className="flex lg:hidden flex-row items-center bg-[#B85E9F] p-[32px] gap-[16px] w-full justify-around">
                <AdminButton sign="plus" player={1}/>
                <div className="text-[96px] text-shadow">{player1Life}</div>
                <AdminButton sign="minus" player={1}/>
            </div>

            <div className="flex lg:hidden flex-row items-center bg-[#5EB877] p-[32px] gap-[16px] w-full justify-around">
                <AdminButton sign="plus" player={2}/>
                <div className="text-[96px] text-shadow">{player2Life}</div>
                <AdminButton sign="minus" player={2}/>
            </div>            

            <div className="py-[24px] lg:py-[0px] lg:px-[128px] lg:min-h-[256px] bg-slate-50 h-full justify-center items-center text-shadow flex flex-row lg:flex-col gap-[32px] w-full lg:w-fit">
                <div>
                    {properTime}
                </div>

                <button className="box-shadow px-[32px] bg-white hover:bg-slate-200 text-[24px] lg:text-[32px]" onClick={() => syncTime()}>Sync Time</button>
            </div>

        </div>

        <div className="flex px-16px] gap-[32px] justify-center flex-row">
            <div className="">
                Reset: 
            </div>

            <button onClick={() => reset(40)} className="box-shadow bg-white w-[196px] hover:bg-slate-200">
                40
            </button>

            <button onClick={() => reset(20)} className="box-shadow bg-white w-[196px] hover:bg-slate-200">
                20
            </button>
        </div>

        <TimerForm />
        <TimerExtensionForm/>

    </div>
    
  )
}
export default page