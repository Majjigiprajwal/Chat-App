import React from 'react'
import Image from '../../assets/logo192.png'
const ChatHeader = () => {
  return (
      <div className=" bg-white flex gap-5 w-full font-serif pl-4 p-2  items-center ">
       <p className="text-3xl rounded-full bg-black text-white  pl-3 pr-3 pt-1 pb-1 ">G</p>
       <div className="w-3/5">
        <p className="text-2xl">Expense Tracker</p>
       </div>
    </div>
  )
}

export default ChatHeader