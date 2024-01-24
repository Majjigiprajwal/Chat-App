import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const JoinGroup = ({closeModal,setGroups}) => {
      
    const [groupList,setGroupList] = useState([])

      const token = JSON.parse(localStorage.getItem('token'))

      useEffect(()=>{
        const getGroups = async ()=>{
              try{
                const response = await axios.get('http://localhost:4000/get-allgroups',{
                    headers :{
                        'Authorization': `Bearer ${token}`
                      }
                })
                console.log(response.data.data)
                setGroupList(response.data.data)
              }
              catch(error){
                toast.error('Failed to Fetch Groups', {
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
          getGroups()
      },[token])
    
       const joinGroup = async (groupId,groupName)=>{
            try{
                const response = await axios.post('http://localhost:4000/join-group',{groupId},{
                    headers :{
                        'Authorization': `Bearer ${token}`
                      }
                })
                 const group = response.data.data
                 const obj = {
                    id:groupId,
                    groupName:groupName
                 }
                 group.group = obj
                 setGroups((prevGroups)=>[...prevGroups,group])
                     closeModal()
            }
            catch(error){
                console.log(error)
            }
       }


  return (
    <div className="bg-black rounded-lg w-2/6 h-4/6  flex flex-col  items-center no-scrollbar ">
         <div className="flex justify-between w-full p-4">
    <h1 className="text-white text-4xl m-4 font-normal font-serif ">Groups</h1>
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
          <div className="w-full h-full overflow-hidden overflow-y-auto pl-10 pr-10 no-scrollbar">
              {
                groupList?.map((group)=>{
                    return  <div key={group.id} className="flex items-center mt-5">
                    <p className="w-9/12 text-white text-[27px] font-serif font-normal hover:text-red-400 ">{group.groupName}</p>
                    <button className="2/12 pl-2 pr-2 pt-1 pb-1 font-serif  font-bold border-2 border-white text-white rounded-lg hover:bg-white hover:text-black" onClick={()=>joinGroup(group.id,group.groupName)}>JOIN</button>
                </div>
                })
              }
          </div>
    </div>
  )
}

export default JoinGroup
