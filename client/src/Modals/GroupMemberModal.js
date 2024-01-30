import React from 'react'

const GroupMemberModal = ({closeModal,member,group,removeFromGroup,adminRole}) => {
        
    return (
      <div className="bg-black rounded-lg w-2/6  flex flex-col justify-center items-center ">
           <div className="flex justify-between w-11/12 m-2 ">
      <h1 className="text-white text-3xl m-4 font-normal font-serif">Group Settings</h1>
      <button className="text-white" onClick={()=>closeModal()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            </div>
            <div className="w-9/12 flex flex-col gap-5 mt-5 ml-10 mr-10 ">
                 <div className="flex gap-5">
                 <p className="text-white font-serif text-2xl">Group Name :- </p>
                 <p className="text-white font-serif text-2xl">{group.groupName}</p>
                 </div>
                 <div className="flex gap-5">
                 <p className="text-white font-serif text-2xl">Member :- </p>
                 <p className="text-white font-serif text-2xl">{member.user.name}</p>
                 </div>
            </div>
            <div className="flex ">
            <button className="text-black rounded-lg p-2 text-xl  m-1 bg-white mt-10 mb-10  font-serif hover:border-2 hover:border-white hover:bg-black hover:text-white" onClick={()=>adminRole(member.userId,group.id,member)}>Assign Admin Role</button>
            <button className="text-black rounded-lg p-2 text-xl m-1 bg-white mt-10 mb-10 font-serif hover:border-2 hover:border-whi  hover:bg-black hover:text-white" onClick={()=>removeFromGroup(member.userId,group.id)}>Remove From Group</button>
            </div>
      </div>
  )
}

export default GroupMemberModal
