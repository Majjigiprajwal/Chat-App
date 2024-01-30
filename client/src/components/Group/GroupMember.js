import React,{useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Modal from 'react-modal'
import GroupMemberModal from '../../Modals/GroupMemberModal';

const GroupMember = ({member,isAdmin,setGroupMembers,groupMembers,group,admins,setAdmins}) => {
        console.log(groupMembers)
      const [isModalOpen,setIsModalOpen] = useState(false)
       const token = JSON.parse(localStorage.getItem('token'))

       const closeModal = ()=>{
        setIsModalOpen(false)
       }

       const openModal = ()=>{
          setIsModalOpen(true)
       }
       const removeFromGroup = async (userId,groupId)=>{
              try{
                const response = await axios.post('http://localhost:4000/remove-groupMember',{userId,groupId},{
                  headers :{
                      'Authorization': `Bearer ${token}`
                    }
              })
              const filteredMembers = groupMembers.filter((member)=> member.userId !== userId )
              setGroupMembers(filteredMembers)
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

          const adminRole = async (userId,groupId,member)=>{
                          
                      try{
                        const response = await axios.post('http://localhost:4000/admin-role',{userId,groupId},{
                          headers :{
                              'Authorization': `Bearer ${token}`
                            }
                      })
                           setAdmins((prev)=>([...prev,member]))
                           const filteredGroupMembers = groupMembers.filter((members)=> member.id !== members.id)
                           setGroupMembers(filteredGroupMembers)
                           closeModal()
                      }
                      catch(error){
                           console.log(error)
                      }
          }

  return (
    <div className="rounded-lg w-full">
    <button className="flex w-full items-center gap-3 p-3 font-serif no-scrollbar hover:bg-slate-200" disabled={!isAdmin} onClick={openModal}>
     <p className="text-2xl bg-black text-white rounded-full pl-3 pr-3 pt-1 pb-1 font-serif font-bold ">{member.user.name[0].toUpperCase()}</p>
    <div className="w-full text-left flex  gap-1">
     <p className="text-xl overflow-hidden w-full overflow-x-auto whitespace-nowrap">{member.user.name}</p>
    </div>
 </button>
   <Modal  isOpen={isModalOpen}  className="flex items-center justify-center h-screen w-full">
          <GroupMemberModal  closeModal={closeModal} group={group} member={member} removeFromGroup={removeFromGroup} adminRole={adminRole} />
      </Modal>
 </div>
  )
}

export default GroupMember