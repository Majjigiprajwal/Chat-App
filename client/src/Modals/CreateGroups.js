import React,{useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateGroups = ({closeModal,setGroups}) => {

  const [groupName,setGroupName] = useState()

  const token = JSON.parse(localStorage.getItem('token'))

  const createGroup = async ()=>{
   
       try{
        const response = await  axios.post('http://localhost:4000/create-group',{groupName},{
          headers :{
            'Authorization': `Bearer ${token}`
          }
         })
         toast.success("Successfully Created Group", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          const group = response.data.data
          const obj = {
            id : response.data.data.id,
            groupName: response.data.data.groupName
          }
          group.group = obj;
          setGroups((prevgroups)=>[...prevgroups,group])
          closeModal()
       }
       catch(error){
        toast.error("Failed to Create Group", {
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

  const handleChange = (e)=>{
    setGroupName(e.target.value)
    console.log(groupName)
}
  return (
    <div className="bg-black rounded-lg w-2/6  flex flex-col justify-center items-center ">
         <div className="flex justify-between w-11/12 m-2 ">
    <h1 className="text-white text-3xl m-4 font-normal font-serif">Create Group</h1>
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
          <div className="w-9/12 mt-5 ml-10 mr-10 ">
          <label htmlFor="groupName" className="block   text-2xl font-serif font-normal leading-6 text-white mb:text-xl">
                Group Name
              </label>
              <div className="mt-4">
                <input
                  id="groupName"
                  name="groupName"
                  type="text"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full font-serif rounded-md border-0 py-1 px-1.5 text-lg font-normal  text-black shadow-sm ring-1 ring-inset  placeholder:text-black focus:ring-2  mb:text-xl"
                />
              </div>
          </div>
          <button className="text-blaack rounded-lg p-2 text-xl m-1 bg-white mt-10 mb-10 " onClick={createGroup}>Create Group</button>
    </div>
  )
}

export default CreateGroups
