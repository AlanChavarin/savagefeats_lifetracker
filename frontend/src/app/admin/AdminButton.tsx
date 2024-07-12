'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import LifeCounterContext from "../context/LifeCounterContext"

function AdminButton({sign, player}: {sign: ("plus" | "minus"), player: (1 | 2)}) {

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
    <div className="w-[108px] h-[108px] bg-white rounded-full flex items-center justify-center box-shadow cursor-pointer hover:bg-slate-200" onClick={() => onClick()}>
        {sign === 'plus' && <FontAwesomeIcon icon={faPlus} className="w-[64px] h-[64px]" />}
        {sign === 'minus' && <FontAwesomeIcon icon={faMinus} className="w-[64px] h-[64px]" />}
    </div>
    
  )
}
export default AdminButton