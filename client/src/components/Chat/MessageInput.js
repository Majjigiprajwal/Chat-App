import React,{useState} from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";

const MessageInput = () => {

   const [message,setMessage] = useState('')

   const handleChange = (e)=>{
   
   }
  const sendMessage = ()=>{
    
  }

  return (
       <div className="w-3/5 h-1/2 gap-5 flex items-center">
       <div className="w-full h-full flex gap-2 justify-center items-center border border-solid border-1 rounded-xl bg-white">
      <input type="text" name="search"  className=" rounded-xl text-lg  w-full pl-4    border-none focus:outline-none font-serif" placeholder='Message' onChange={(e)=>handleChange(e)}/>
      <MdAttachFile className="text-2xl m-4 " />
      </div>
      <BsFillSendFill className="text-4xl text-slate-600" onClick={sendMessage} />
      </div>
  )
}

export default MessageInput