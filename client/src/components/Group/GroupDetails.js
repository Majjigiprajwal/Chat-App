import React from 'react'

import GroupMember from './GroupMember'

const GroupDetails = () => {
  return (
    <div className="h-full w-full no-scrollbar">
    <div className="w-full text-black h-1/6 p-2">
        <p className="bg-black text-white w-fit p-1 rounded-3xl text-xl font-serif font-thin ">Admin</p>
        <div className="flex gap-5 mt-4 items-center">
            <p className="text-3xl bg-black text-white rounded-full pl-3 pr-3 pt-1 pb-1 font-serif font-bold ">P</p>
            <p className="text-2xl font-serif font-bold">Prajwal Majjigi</p>
        </div>
    </div>
    <div className="w-full h-5/6 p-2  overflow-hidden overflow-y-auto ">
    <p className="bg-black text-white w-fit p-1 rounded-3xl text-xl font-serif font-thin">Members</p>
    <div>
    <GroupMember /> 
    <GroupMember />
    <GroupMember />
    <GroupMember />
    <GroupMember />
    <GroupMember /> 
    <GroupMember />
    <GroupMember />
    <GroupMember />
    <GroupMember />
    <GroupMember />
    <GroupMember />
    <GroupMember />
    </div>
    </div>
    </div>
  )
}

export default GroupDetails