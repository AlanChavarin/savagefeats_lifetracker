
import { useContext } from "react"
import LifeCounterContext from "../context/LifeCounterContext"

function ResetForm() {

    const {setTime} = useContext(LifeCounterContext)

    const onClick = (minutes: number) => {
        setTime(minutes*60)
    }


  return (
    <div className="flex gap-[16px] items-start lg:gap-[32px] justify-start flex-col lg:flex-row"> 

        <button type="submit" onClick={() => {onClick(55)}} className="bg-white hover:bg-slate-100 px-[32px] box-shadow hidden lg:block">
            55′
        </button>

        <button type="submit" onClick={() => {onClick(35)}} className="bg-white hover:bg-slate-100 px-[32px] box-shadow hidden lg:block">
            35′
        </button>

        <div className="lg:hidden flex flex-row gap-[16px]"> 
            <button type="submit" onClick={() => {onClick(55)}} className="bg-white hover:bg-slate-100 px-[32px] box-shadow">
                55′
            </button>

            <button type="submit" onClick={() => {onClick(35)}} className="bg-white hover:bg-slate-100 px-[32px] box-shadow">
                35′
            </button>
        </div>

    </div>
  )
}
export default ResetForm