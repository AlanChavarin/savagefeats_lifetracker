'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import LifeCounterContext from "../context/LifeCounterContext"

function Button({sign, player}: {sign: ("plus" | "minus"), player: (1 | 2)}) {

    const { incrementPlayer1Life, incrementPlayer2Life, decrementPlayer1Life, decrementPlayer2Life} = useContext(LifeCounterContext)

    const onClick = () => {

        if(sign === 'plus'){
            if(player === 1){
                incrementPlayer1Life()
            } else if(player === 2){
                incrementPlayer2Life()
            }
        }

        if(sign === 'minus'){
            if(player === 1){
                decrementPlayer1Life()
            } else if(player === 2){
                decrementPlayer2Life()
            }
        }
    }

  return (
    <div onClick={() => onClick()} className="h-[50vh] w-full flex items-center justify-center hover:bg-slate-50 hover:bg-opacity-[10%] cursor-pointer">
        <div className="w-[25vh] h-[25vh] max-w-[128px] max-h-[128px] md:max-w-[256px] md:max-h-[256px] bg-white rounded-full flex items-center justify-center box-shadow">
            {sign === 'plus' && <FontAwesomeIcon icon={faPlus} className="w-[18vh] h-[18vh] max-w-[72px] md:max-w-[128px] md:max-h-[128px]" />}
            {sign === 'minus' && <FontAwesomeIcon icon={faMinus} className="w-[18vh] h-[18vh] max-w-[72px] md:max-w-[128px] md:max-h-[128*px]" />}
        </div>
    </div>
    
  )
}
export default Button