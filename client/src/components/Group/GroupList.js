import React from 'react'
import GroupItem from './GroupItem'


const GroupList = ({setGroup,groups}) => {
  
  return (
    <div className="w-full h-full  overflow-hidden overflow-y-auto">
      {
        groups?.map((group)=>{
          return <GroupItem key={group.group.id} group={group.group} setGroup={setGroup} />
        })
      }
    </div>
  )
}

export default GroupList