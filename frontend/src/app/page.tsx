'use client'
import { useEffect } from 'react'
import * as io from 'socket.io-client'
const socket = io.connect("http://localhost:8080")

export default function Home() {

  const onClick = () => {
    const message: string = (document.getElementById('input') as HTMLInputElement)?.value

    socket.emit("send_message", message)

  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("message recieved: " + data)
    })
  }, [socket.on])

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex flex-col gap-[8px]">
        <input type="text" className="border-[1px] border-black" id="input"/>
        <button onClick={() => onClick()} className="border-[1px] border-slate-700 border-r-2 hover:bg-slate-300">
          Send message
        </button>
        
      </div>
    </div>
  )
}
