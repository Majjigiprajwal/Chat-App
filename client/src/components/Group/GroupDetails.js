import React,{useEffect,useState} from 'react'
import axios from 'axios'
import GroupMember from './GroupMember'
import { parseJwt } from '../../util/jwtParser'

const GroupDetails = ({group}) => {

  const [groupMembers,setGroupMembers] = useState([])
  const [admin,setAdmin] = useState({})
  const [admins,setAdmins] = useState([])
  const [isAdmin,setIsAdmin] = useState(false)
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(()=>{
         const getGroupMembers = async ()=>{
            try{
              const response = await axios.get(`http://localhost:4000/groupMembers?groupId=${group.id}`,{
                headers :{
                  'Authorization': `Bearer ${token}`
                }
              }) 
              const updatedGroupMembers = [];
              let foundAdmin = {};
              const updatedAdmins = [];
              let userIsAdmin = false;
                 response.data?.data?.forEach((member)=>{
                       if(member.role === 'admin'){
                            updatedAdmins.push(member)
                            const userData = parseJwt(token)
                            if(member.userId === userData.userId){
                              foundAdmin= member
                              userIsAdmin = true
                            }
                       }
                       else{
                               updatedGroupMembers.push(member)
                       }
                 })
                 setGroupMembers(updatedGroupMembers);
                 setAdmin(foundAdmin);
                 setAdmins(updatedAdmins);
                 setIsAdmin(userIsAdmin);
                console.log(updatedGroupMembers)
                console.log(foundAdmin)
                console.log(updatedAdmins)
                console.log(userIsAdmin)
            }
            catch(error){
               console.log(error)
            }
         }
         if(group){
          getGroupMembers()
         }
  },[token,group])

  return (
    <div className="h-full w-full no-scrollbar">
    <div className="w-full text-black min-h-1/6 p-2">
        <p className="bg-black text-white w-fit p-1 rounded-3xl text-xl font-serif font-thin ">Admin</p>
        {
          admins.map((admin)=>{
            return <div className="flex gap-5 mt-4 items-center">
            <p className="text-3xl bg-black text-white rounded-full pl-3 pr-3 pt-1 pb-1 font-serif font-bold ">{admin?.user?.name[0].toUpperCase()}</p>
            <p className="text-2xl font-serif font-bold">{admin?.user?.name}</p>
        </div>
          })
        }
    </div>
    <div className="w-full max-h-5/6  overflow-hidden overflow-y-auto ">
    <p className="bg-black text-white w-fit p-1 ml-2 mb-2 rounded-3xl text-xl font-serif font-thin">Members</p>
    <div className="rounded-lg">
      {
        groupMembers?.map((member)=>{
          return  <GroupMember key={member.id} admins={admins} setAdmins={setAdmins} member={member} group={group} groupMembers={groupMembers} setGroupMembers={setGroupMembers} isAdmin={isAdmin}/> 
        })
      }
    </div>
    </div>
    </div>
  )
}

export default GroupDetails