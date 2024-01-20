import React from 'react'

const GroupMember = () => {
  return (
    <div className="flex w-full  mt-5 gap-3 items-center font-serif no-scrollbar">
     <p className="text-2xl bg-black text-white rounded-full pl-3 pr-3 pt-1 pb-1 font-serif font-bold ">P</p>
    <div className=" flex items-center w-4/5 gap-4">
     <p className="text-xl overflow-hidden w-3/5 overflow-x-auto whitespace-nowrap">Prajwal G Majjigi</p>
     <button className="border-2  border-red-500 p-1 rounded-xl text-base hover:bg-red-600 hover:text-white font-serif font-bold">Remove</button>
    </div>
 </div>
  )
}

export default GroupMember