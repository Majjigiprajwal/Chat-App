import React,{useState,useEffect} from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const MessageInput = ({group}) => {

   const [message,setMessage] = useState({
    message : "",
    groupId: group.id
   })
    
   const token = JSON.parse(localStorage.getItem('token'))

   useEffect(() => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      groupId: group.id,
    }));
  }, [group]);

   const handleChange = (e)=>{
    setMessage({
      ...message,
      message: e.target.value,
    });
   }
  const sendMessage = async  ()=>{

    if (message.message.trim() === '') {
      toast.error("Please type the message", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return;
    }
       try{
           const response = await  axios.post('http://localhost:4000/send-message',message,{
            headers :{
              'Authorization': `Bearer ${token}`
            }
           })
           setMessage({
            ...message,
            message: '',
          });
           
       }
       catch(error){
        toast.error("Failed to save message", {
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
       <div className="w-3/5 h-1/2 gap-5 flex items-center">
       <div className="w-full h-full flex gap-2 justify-center items-center border border-solid border-1 rounded-xl bg-white">
      <input type="text" name="search"  className=" rounded-xl text-lg  w-full pl-4    border-none focus:outline-none font-serif" placeholder='Message' value={message.message} onChange={(e)=>handleChange(e)} required/>
      <MdAttachFile className="text-2xl m-4 text-black" />
      </div>
      <BsFillSendFill className="text-4xl text-black" onClick={sendMessage} />
      </div>
  )
}

export default MessageInput