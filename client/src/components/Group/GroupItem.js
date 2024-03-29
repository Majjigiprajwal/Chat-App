import React from 'react'


const GroupItem = ({group,setGroup,setGroups,groups}) => {

  const selectGroup = (group)=>{
       setGroup(group)
  }
       
  return (
    <div className="flex gap-4  w-full  border-b items-center hover:bg-slate-100   pt-4 pb-4 pl-2 font-serif" onClick={()=>selectGroup(group)}>
       <p className="text-3xl bg-black text-white rounded-full pl-3 pr-3 pt-1 pb-1 font-serif font-bold ">{group.groupName[0].toUpperCase()}</p>
       <div className="w-full">
        <p className="text-xl">{group.groupName}</p>
        <p className="text-xs">Last Message</p>
       </div>
    </div>
  )
}

export default GroupItem