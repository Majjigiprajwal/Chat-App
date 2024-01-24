import React,{useEffect,useState} from 'react'
import axios from 'axios'
import GroupMember from './GroupMember'
import { parseJwt } from '../../util/jwtParser'

const GroupDetails = ({group}) => {

  const [groupMembers,setGroupMembers] = useState([])
  const [admin,setAdmin] = useState({})
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
              const adminMember = response.data.data.find((member) => member.group.admin === member.user.id);
                  if (adminMember) {
                     setAdmin(()=>adminMember);
                     const userData = parseJwt(token)
                     if(userData.userId === adminMember.group.admin){
                                setIsAdmin(true)
                       }else{
                        setIsAdmin(false)
                       }
                   }   
                   setGroupMembers((prev)=>response.data.data)
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
    <div className="w-full text-black h-1/6 p-2">
        <p className="bg-black text-white w-fit p-1 rounded-3xl text-xl font-serif font-thin ">Admin</p>
        {
          groupMembers.length > 0  &&   <div className="flex gap-5 mt-4 items-center">
          <p className="text-3xl bg-black text-white rounded-full pl-3 pr-3 pt-1 pb-1 font-serif font-bold ">{admin?.user?.name[0].toUpperCase()}</p>
          <p className="text-2xl font-serif font-bold">{admin?.user?.name}</p>
      </div>
        }
    </div>
    <div className="w-full h-5/6 p-2  overflow-hidden overflow-y-auto ">
    <p className="bg-black text-white w-fit p-1 rounded-3xl text-xl font-serif font-thin">Members</p>
    <div>
      {
        groupMembers?.map((member)=>{
          return  <GroupMember key={member.id} member={member}  isAdmin={isAdmin}/> 
        })
      }
    </div>
    </div>
    </div>
  )
}

export default GroupDetails