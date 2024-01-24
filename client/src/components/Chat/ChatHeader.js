import React from 'react'

const ChatHeader = ({group}) => {
  return (
      <div className="bg-white w-full h-full ">
        {
          group &&  <div className=" bg-white flex gap-5 w-full font-serif pl-4 p-2  items-center ">
          <p className="text-3xl rounded-full bg-black text-white  pl-3 pr-3 pt-1 pb-1 ">{group.groupName[0].toUpperCase()}</p>
          <div className="w-3/5">
           <p className="text-2xl">{group.groupName}</p>
          </div>
       </div>
        }
      </div>
     
  )
}

export default ChatHeader