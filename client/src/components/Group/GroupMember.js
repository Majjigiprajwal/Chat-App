import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const GroupMember = ({member,isAdmin}) => {
  
       const token = JSON.parse(localStorage.getItem('token'))
       const removeFromGroup = async (userId,groupId)=>{
              try{
                const response = await axios.post('http://localhost:4000/remove-groupMember',{userId,groupId},{
                  headers :{
                      'Authorization': `Bearer ${token}`
                    }
              })
              toast.success('Successfully removed from Group', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
              }
              catch(error){
                     console.log(error)
                     toast.error('Failed to remove from Group', {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      });
              }
       }

  return (
    <div className="flex w-full  mt-5 gap-3 items-center font-serif no-scrollbar">
     <p className="text-2xl bg-black text-white rounded-full pl-3 pr-3 pt-1 pb-1 font-serif font-bold ">{member.user.name[0].toUpperCase()}</p>
    <div className=" flex items-center w-4/5 gap-4">
     <p className="text-xl overflow-hidden w-3/5 overflow-x-auto whitespace-nowrap">{member.user.name}</p>
    {isAdmin && <button className="border-2  border-red-500 p-1 rounded-xl text-base hover:bg-red-600 hover:text-white font-serif font-bold"onClick={()=>removeFromGroup(member.userId,member.groupId)}>Remove</button> }
    </div>
 </div>
  )
}

export default GroupMember