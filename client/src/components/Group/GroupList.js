import React from 'react'
import GroupItem from './GroupItem'


const GroupList = ({setGroup,groups,setGroups}) => {
  
  return (
    <div className="w-full h-full  overflow-hidden overflow-y-auto">
      {
        groups?.map((group)=>{
          return <GroupItem key={group.group.id} group={group.group} setGroup={setGroup} groups={groups} setGropus={setGroups}/>
        })
      }
    </div>
  )
}

export default GroupList